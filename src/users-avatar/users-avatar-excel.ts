import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';
import { UserAvatarMetaInfo } from './model/userAvatarMetaInfo';
import XLSX from 'xlsx';
import * as https from 'https';

const worksheetName = 'SPACES';

const main = async () => {
  await spacesLicenseUsageAsExcel();
};

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

export const spacesLicenseUsageAsExcel = async () => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();
  await alkemioCliClient.validateConnection();

  const spacesQueryResult = await alkemioCliClient.sdkClient.usersAvatar();

  const users = spacesQueryResult.data.users || [];
  const usersMetaInfo: UserAvatarMetaInfo[] = [];
  for (const user of users) {
    const avatarMetadata = new UserAvatarMetaInfo();
    const hasAlkemioAvatar = isAvatarOnAlkemio(user.profile.visual?.uri ?? '');
    const hasDefaultAvatar = isAvatarDefault(user.profile.visual?.uri ?? '');

    avatarMetadata.Name = user.profile.displayName;
    avatarMetadata.Id = user.id;
    avatarMetadata.AvatarURL = user.profile.visual?.uri ?? '';
    avatarMetadata.AvatarOnAlkemio = hasAlkemioAvatar;
    avatarMetadata.DefaultAvatar = hasDefaultAvatar;

    if (hasAlkemioAvatar) {
      avatarMetadata.AvatarAccessible = true; // hm, we could check this as well
    } else if (user.profile.visual?.uri) {
      !hasDefaultAvatar &&
        (avatarMetadata.AvatarAccessible = await isImageAccessible(
          user.profile.visual?.uri
        ));
    } else {
      avatarMetadata.NoAvatar = true;
    }

    usersMetaInfo.push(avatarMetadata);
  }
  logger.info(`...total number of users: ${usersMetaInfo.length}`);

  const date = new Date();
  const dateStr = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const workbookName = `./users-avatar-metadata-${dateStr}.xlsx`;

  const workbook = XLSX.utils.book_new();
  const spacesSheet = XLSX.utils.json_to_sheet(usersMetaInfo);
  XLSX.utils.book_append_sheet(workbook, spacesSheet, worksheetName);

  XLSX.writeFile(workbook, workbookName);

  process.exit(0);
};

main().catch(error => {
  console.error(error);
  process.exit(1);
});
