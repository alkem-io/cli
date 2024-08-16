import XLSX from 'xlsx';
import { existsSync } from 'fs';
import { AlkemioClient } from '@alkemio/client-lib';
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
const fixInaccessibleAvatars = args.includes('--generate-default');

const server = process.env.API_ENDPOINT_PRIVATE_GRAPHQL || '';
const email = process.env.AUTH_ADMIN_EMAIL || '';
const kratos = process.env.AUTH_ORY_KRATOS_PUBLIC_BASE_URL || '';
const password = process.env.AUTH_ADMIN_PASSWORD || '';

const generateClientConfig = () => ({
  apiEndpointPrivateGraphql: server,
  authInfo: {
    credentials: {
      email: email,
      password: password,
    },
    kratosPublicApiEndpoint: kratos,
  },
});

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

// this would try to download an avatar from eu.ui-avatars.com and upload it to Alkemio
// replacing user's avatar
async function handleAvatarUpload(
  user: UserAvatarProps,
  logger: winston.Logger
) {
  try {
    // Generate a random avatar URL
    const randomAvatarURL = generateRandomAvatar(user.firstName, user.lastName);

    // Download the generated avatar
    const filePath = await downloadAvatar(randomAvatarURL, user.nameID, logger);

    // Check if the file exists
    if (!filePath || !existsSync(filePath)) {
      throw new Error(`File at '${filePath}' does not exist`);
    }

    // Upload the avatar using AlkemioClient uploadImageOnVisual
    const alkemioClient = new AlkemioClient(generateClientConfig());
    await alkemioClient.enableAuthentication();
    const res = await alkemioClient.uploadImageOnVisual(
      filePath,
      user.profile.visual?.id ?? ''
    );

    if (!res || res.errors) {
      logger.error(`Uploading avatar Error: ${JSON.stringify(res)}`);
    } else {
      logger.info(`Successfully uploaded: ${JSON.stringify(res)}`);
    }
  } catch (error) {
    logger.error(`Exception occurred: ${JSON.stringify(error)}`);
  }
}

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

    if (hasAlkemioAvatar) {
      userGroups.alkemioAvatars.push(avatarMetadata);
      continue;
    }

    // edge case when user has no avatar
    if (!avatarURL) {
      userGroups.inaccessibleAvatars.push(avatarMetadata);
      continue;
    }

    if (hasDefaultAvatar) {
      userGroups.defaultAvatars.push(avatarMetadata);
      continue;
      // todo: implement download and upload to Alkemio
    } else {
      const accessible = await isImageAccessible(avatarURL);

      if (accessible) {
        userGroups.nonAlkemioAvatars.push(avatarMetadata);
        continue;
      } else {
        userGroups.inaccessibleAvatars.push(avatarMetadata);

        if (!fixInaccessibleAvatars || !user.profile.visual?.id) {
          continue;
        }

        // if there's an inaccesible visual and a flag for a fix is provided
        // (npm run users-avatar-excel -- --generate-default)
        await handleAvatarUpload(user, logger);
      }
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
