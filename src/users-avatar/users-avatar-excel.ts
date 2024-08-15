import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';
import { UserAvatarMetaInfo } from './model/userAvatarMetaInfo';
import XLSX from 'xlsx';
import * as https from 'https';

const main = async () => {
  await userAvatarsInfoAsExcel();
};

const date = new Date();
const dateStr = `${date.getFullYear()}-${
  date.getMonth() + 1
}-${date.getDate()}`;

const workbookFileName = `./users-avatar-metadata-${dateStr}.xlsx`;

function isImageAccessible(url: string): Promise<boolean> {
  return new Promise(resolve => {
    https
      .get(url, res => resolve(res.statusCode === 200))
      .on('error', () => resolve(false));
  });
}

const isAvatarOnAlkemio = (avatarURL: string): boolean =>
  avatarURL.indexOf('/storage/document/') > -1;

const isAvatarDefault = (avatarURL: string): boolean =>
  avatarURL.indexOf('eu.ui-avatars.com') > -1;

function beautifyCamelCase(key: string): string {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before capital letters
    .replace(/^./, str => str.toUpperCase()); // Capitalize the first letter
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
        continue;
      }
      // todo: implement setup of default avatar
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
