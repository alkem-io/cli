import XLSX from 'xlsx';
import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';
import {
  beautifyCamelCase,
  downloadAvatar,
  generateRandomAvatar,
  isImageAccessible,
} from './utils';
import winston from 'winston';
import { UserAvatarMetaInfo } from './model/userAvatarMetaInfo';

interface UserAvatarProps {
  id: string;
  nameID: string;
  firstName: string;
  lastName: string;
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
const shouldUploadDefaultAvatars = args.includes('--upload-default');
const shouldGenerateDefaultAvatars = args.includes('--generate-default');

const main = async () => {
  await userAvatarsInfoAsExcel();
};

const date = new Date();
const dateStr = `${date.getFullYear()}-${
  date.getMonth() + 1
}-${date.getDate()}`;

const workbookFileName = `./users-avatar-metadata-${dateStr}.xlsx`;

const isAvatarOnAlkemio = (avatarURL: string): boolean =>
  avatarURL.indexOf('/storage/document/') > -1;

const isAvatarDefault = (avatarURL: string): boolean =>
  avatarURL.indexOf('eu.ui-avatars.com') > -1;

const uploadDefault = async (
  alkemioCliClient: any,
  user: UserAvatarProps,
  logger: winston.Logger
) => {
  if (!user.profile?.id) {
    return;
  }
  try {
    await alkemioCliClient.sdkClient.adminUpdateContributorAvatars({
      profileID: user.profile.id,
    });
  } catch (error) {
    logger.warn(`adminUpdateContributorAvatars: ${JSON.stringify(error)}`);
  }
};

// generate and download default avatar in avatars folder
const generateDefaultAvatar = async (
  user: UserAvatarProps,
  logger: winston.Logger
) => {
  try {
    // Generate a random avatar URL
    const randomAvatarURL = generateRandomAvatar(user.firstName, user.lastName);

    // Update the visual to have the updated URL
    await downloadAvatar(randomAvatarURL, user.nameID, logger);
  } catch (error) {
    logger.warn(`generateDefaultAvatar: ${JSON.stringify(error)}`);
  }
};

export const userAvatarsInfoAsExcel = async () => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();
  await alkemioCliClient.validateConnection();

  const usersQueryResult = await alkemioCliClient.sdkClient.usersAvatar();

  const users = usersQueryResult.data.users || [];
  const userGroups = {
    inaccessibleAvatars: [] as UserAvatarMetaInfo[],
    nonAlkemioAvatars: [] as UserAvatarMetaInfo[],
    defaultAvatars: [] as UserAvatarMetaInfo[],
    alkemioAvatars: [] as UserAvatarMetaInfo[],
  };

  for (const user of users) {
    const avatarURL = user.profile.visual?.uri;
    const hasAlkemioAvatar = isAvatarOnAlkemio(avatarURL ?? '');
    const hasDefaultAvatar = isAvatarDefault(avatarURL ?? '');

    const avatarMetadata = new UserAvatarMetaInfo();

    avatarMetadata.Name = user.profile.displayName;
    avatarMetadata.Id = user.id;
    avatarMetadata.nameID = user.nameID;
    avatarMetadata.AvatarURL = avatarURL ?? '';

    // edge case when user has no avatar
    if (!avatarURL) {
      userGroups.inaccessibleAvatars.push(avatarMetadata);

      if (shouldGenerateDefaultAvatars) {
        await generateDefaultAvatar(user, logger);
      }
      continue;
    }

    // inaccessible avatars no matter the type
    const accessible = await isImageAccessible(avatarURL);
    if (!accessible) {
      userGroups.inaccessibleAvatars.push(avatarMetadata);

      // if there's an inaccessible visual and a flag for generation is provided
      // (npm run users-avatar-excel -- --generate-default)
      if (shouldGenerateDefaultAvatars) {
        await generateDefaultAvatar(user, logger);
      }
      continue;
    }

    // stored on Alkemio, all must be here
    if (hasAlkemioAvatar) {
      userGroups.alkemioAvatars.push(avatarMetadata);
      continue;
    }

    if (hasDefaultAvatar) {
      userGroups.defaultAvatars.push(avatarMetadata);

      // if there's a default visual (3rd party hosted) and a flag for upload is provided
      // (npm run users-avatar-excel -- --upload-default)
      if (shouldUploadDefaultAvatars) {
        await uploadDefault(alkemioCliClient, user, logger);
      }
      continue;
    } else {
      userGroups.nonAlkemioAvatars.push(avatarMetadata);
      continue;
    }
  }

  // init new excel workbook
  const workbook = XLSX.utils.book_new();

  // add all groups into excel sheets
  for (const [key, value] of Object.entries(userGroups)) {
    const tabName = beautifyCamelCase(key);
    const userSheet = XLSX.utils.json_to_sheet(value);
    XLSX.utils.book_append_sheet(workbook, userSheet, tabName);

    logger.info(`${tabName}: ${value.length}`);
  }

  XLSX.writeFile(workbook, workbookFileName);

  process.exit(0);
};

main().catch(error => {
  console.error(error);
  process.exit(1);
});
