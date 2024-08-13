import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';
import { UserAvatarMetaInfo } from './model/userAvatarMetaInfo';
import XLSX from 'xlsx';

const worksheetName = 'SPACES';

const main = async () => {
  await spacesLicenseUsageAsExcel();
};

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
    avatarMetadata.Name = user.profile.displayName;
    avatarMetadata.Id = user.id;
    avatarMetadata.AvatarURL = user.profile.visual?.uri || '';

    // TODO: If the AvatarURL starts with Alkemio, set AvatarOnAlkemio to true, and AvatarAccessible to true
    // TODO: If the AvatarURL does not start with Alkemio, set AvatarOnAlkemio to false, and check whether the avatar can be loaded

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
};

main().catch(error => {
  console.error(error);
});
