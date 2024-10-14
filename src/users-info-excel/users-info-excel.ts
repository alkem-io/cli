import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';
import { UserInfo } from './model/userMetaInfo';
import XLSX from 'xlsx';

const worksheetName = 'ACCOUNT_RESOURCES';

const main = async () => {
  await usersInfoAsExcel();
};

export const usersInfoAsExcel = async () => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();
  await alkemioCliClient.validateConnection();

  const accountResourcesQueryResult =
    await alkemioCliClient.sdkClient.usersInfo();

  const users = accountResourcesQueryResult.data.users || [];
  const userInfos: UserInfo[] = [];
  for (const user of users) {
    const accountResourceInfo = new UserInfo();
    accountResourceInfo.Name = user.profile.displayName || '';
    accountResourceInfo.Email = user.email;
    accountResourceInfo.ID = user.id;
    accountResourceInfo.AuthenticationMethod = user.authenticationMethod || '';
    const parts = user.email.split('@');
    if (parts.length === 2) {
      accountResourceInfo.EmailDomain = parts[1];
    }
    userInfos.push(accountResourceInfo);
  }
  logger.info(`...total number of users processed: ${userInfos.length}`);

  const date = new Date();
  const dateStr = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const workbookName = `./users-info-${dateStr}.xlsx`;

  const workbook = XLSX.utils.book_new();
  const spacesSheet = XLSX.utils.json_to_sheet(userInfos);
  XLSX.utils.book_append_sheet(workbook, spacesSheet, worksheetName);

  XLSX.writeFile(workbook, workbookName);
};

main().catch(error => {
  console.error(error);
});
