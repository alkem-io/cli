import XLSX from 'xlsx';
import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';
import {
  beautifyCamelCase,
  generateRandomAvatar,
  isImageAccessible,
} from './utils';
import winston from 'winston';
import { ContributorAvatarMetaInfo } from './model/ContributorAvatarMetaInfo';

enum ContributorType {
  User = 'users',
  Organization = 'organizations',
  VirtualContributor = 'virtualContributors',
}

// Change the type below if you want to run the scirpt for Orgs or VCs
const SELECTED_CONTRIBUTOR_TYPE = ContributorType.User;

interface ContributorAvatarProps {
  id: string;
  nameID: string;
  firstName?: string;
  lastName?: string;
  profile: {
    id: string;
    displayName: string;
    visual?:
      | {
          id: string;
          uri: string;
        }
      | undefined;
  };
}

const args = process.argv.slice(2);
const shouldStoreAvatarsAsDocuments = args.includes('--store-as-documents');
const shouldGenerateDefaultAvatars = args.includes('--generate-default');

const main = async () => {
  await profileAvatarsInfoAsExcel();
};

const date = new Date();
const dateStr = `${date.getFullYear()}-${
  date.getMonth() + 1
}-${date.getDate()}`;

const workbookFileName = `./avatars-metadata-${dateStr}.xlsx`;

const isAvatarOnAlkemio = (avatarURL: string): boolean =>
  avatarURL.indexOf('/storage/document/') > -1;

const isAvatarDefault = (avatarURL: string): boolean =>
  avatarURL.indexOf('eu.ui-avatars.com') > -1;

const uploadDefault = async (
  alkemioCliClient: any,
  contributor: ContributorAvatarProps,
  logger: winston.Logger
) => {
  if (!contributor.profile?.id) {
    return;
  }
  try {
    await alkemioCliClient.sdkClient.adminUpdateContributorAvatars({
      profileID: contributor.profile.id,
    });
  } catch (error) {
    logger.warn(`adminUpdateContributorAvatars: ${JSON.stringify(error)}`);
  }
};

// generate and replace the visual url with a default avatar
const generateDefaultAvatar = async (
  alkemioCliClient: any,
  contributor: ContributorAvatarProps,
  logger: winston.Logger
) => {
  try {
    // Generate a random avatar URL
    const randomAvatarURL = generateRandomAvatar(
      contributor.firstName ?? contributor.profile.displayName ?? '',
      contributor.lastName ?? ''
    );

    // Update the visual to have the updated URL
    await alkemioCliClient.sdkClient.updateVisualUri({
      visualID: contributor.profile.visual?.id,
      uri: randomAvatarURL,
    });
  } catch (error) {
    logger.warn(`generateDefaultAvatar: ${JSON.stringify(error)}`);
  }
};

export const profileAvatarsInfoAsExcel = async () => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();
  await alkemioCliClient.validateConnection();

  const contributorsQueryResult =
    await alkemioCliClient.sdkClient.contributorsAvatar();

  const contributors =
    contributorsQueryResult.data[SELECTED_CONTRIBUTOR_TYPE] || [];

  console.log(`${SELECTED_CONTRIBUTOR_TYPE} count: ${contributors.length}`);

  const contributorsGroups = {
    inaccessibleAvatars: [] as ContributorAvatarMetaInfo[],
    nonAlkemioAvatars: [] as ContributorAvatarMetaInfo[],
    defaultAvatars: [] as ContributorAvatarMetaInfo[],
    alkemioAvatars: [] as ContributorAvatarMetaInfo[],
  };

  for (const c of contributors) {
    const avatarURL = c.profile.visual?.uri ?? '';
    const hasAlkemioAvatar = isAvatarOnAlkemio(avatarURL ?? '');
    const hasDefaultAvatar = isAvatarDefault(avatarURL ?? '');

    const avatarMetadata = new ContributorAvatarMetaInfo();

    avatarMetadata.Name = c.profile.displayName;
    avatarMetadata.Id = c.id;
    avatarMetadata.nameID = c.nameID;
    avatarMetadata.AvatarURL = avatarURL;

    // edge case when contributor has no avatar
    if (!avatarURL) {
      contributorsGroups.inaccessibleAvatars.push(avatarMetadata);

      if (shouldGenerateDefaultAvatars) {
        await generateDefaultAvatar(alkemioCliClient, c, logger);
      }
      continue;
    }

    // inaccessible avatars no matter the type
    const accessible = await isImageAccessible(avatarURL);
    if (!accessible) {
      contributorsGroups.inaccessibleAvatars.push(avatarMetadata);

      // if there's an inaccessible visual and a flag for generation is provided
      // (npm run users-avatar-excel -- --generate-default)
      if (shouldGenerateDefaultAvatars) {
        await generateDefaultAvatar(alkemioCliClient, c, logger);
      }
      continue;
    }

    // stored on Alkemio, all must be here
    if (hasAlkemioAvatar) {
      contributorsGroups.alkemioAvatars.push(avatarMetadata);
      continue;
    }

    if (hasDefaultAvatar) {
      contributorsGroups.defaultAvatars.push(avatarMetadata);

      // if there's a default visual (3rd party hosted) and a flag for upload is provided
      // (npm run users-avatar-excel -- --store-as-documents)
      if (shouldStoreAvatarsAsDocuments) {
        await uploadDefault(alkemioCliClient, c, logger);
      }
      continue;
    } else {
      contributorsGroups.nonAlkemioAvatars.push(avatarMetadata);

      // if there are non-png images, this might produce broken results
      // if (shouldStoreAvatarsAsDocuments) {
      //   await uploadDefault(alkemioCliClient, c, logger);
      // }
      continue;
    }
  }

  // init new excel workbook
  const workbook = XLSX.utils.book_new();

  // add all groups into excel sheets
  for (const [key, value] of Object.entries(contributorsGroups)) {
    const tabName = beautifyCamelCase(key);
    const avatarsSheet = XLSX.utils.json_to_sheet(value);
    XLSX.utils.book_append_sheet(workbook, avatarsSheet, tabName);

    logger.info(`${tabName}: ${value.length}`);
  }

  XLSX.writeFile(workbook, workbookFileName);

  process.exit(0);
};

main().catch(error => {
  console.error(error);
  process.exit(1);
});
