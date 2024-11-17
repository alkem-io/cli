import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';
import { SpaceAdminsInfo } from './model/spaceAdminsMetaInfo';
import XLSX from 'xlsx';
import { AccountAdminsInfo } from './model/accountAdminsMetaInfo';
import { logger, Organization } from '@alkemio/client-lib';
import { AccountType } from '../generated/graphql';

const accountResourcesSheetName = 'ACCOUNT_RESOURCES';
const accountSheetName = 'ACCOUNTS';

const main = async () => {
  await accountAdminsInfoAsExcel();
};

export const accountAdminsInfoAsExcel = async () => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();
  await alkemioCliClient.validateConnection();

  const accountResourcesQueryResult =
    await alkemioCliClient.sdkClient.accountAdminsInfo();

  const accounts = accountResourcesQueryResult.data.accounts || [];
  const spaceAdminsInfo: SpaceAdminsInfo[] = [];
  const accountInfos: AccountAdminsInfo[] = [];
  for (const account of accounts) {
    const accountInfo = new AccountAdminsInfo();
    accountInfo.AccountProviderName = account.host?.profile.displayName || '';
    accountInfo.AccountType = account.type || 'unknown';
    accountInfo.AccountID = account.id;
    accountInfo.AccountAdmins = [];
    if (account.type === AccountType.User) {
      accountInfo.AccountAdmins.push(account.host?.nameID || '');
    } else {
      // org
      const orgHost = account.host as Organization;
      if (orgHost.admins) {
        orgHost.admins.forEach(admin =>
          accountInfo.AccountAdmins.push(admin.nameID)
        );
      }
      if (orgHost.owners) {
        orgHost.owners.forEach(owner =>
          accountInfo.AccountAdmins.push(owner.nameID)
        );
      }
    }
    accountInfos.push(accountInfo);
    for (const space of account.spaces) {
      const spaceAdminInfo: SpaceAdminsInfo = {
        ...accountInfo,
      };
      spaceAdminInfo.SpaceDisplayName = space.profile.displayName;
      spaceAdminInfo.SpaceID = space.id;
      spaceAdminInfo.SpaceAdmins = [];
      spaceAdminsInfo.push(spaceAdminInfo);
    }

    logger.info(`Account '${account.host?.id}' processed...`);
  }
  logger.info(
    `...total number of account resources processed: ${spaceAdminsInfo.length}`
  );

  const date = new Date();
  const dateStr = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const workbookName = `./account-space-admins-${dateStr}.xlsx`;
  logger.info(
    `Writing account spaces admins info to Excel file: ${workbookName}...`
  );
  try {
    const workbook = XLSX.utils.book_new();

    const accountsSheet = XLSX.utils.json_to_sheet(accountInfos);
    XLSX.utils.book_append_sheet(workbook, accountsSheet, accountSheetName);

    const resourcesSheet = XLSX.utils.json_to_sheet(spaceAdminsInfo);
    XLSX.utils.book_append_sheet(
      workbook,
      resourcesSheet,
      accountResourcesSheetName
    );

    XLSX.writeFile(workbook, workbookName);
    logger.info(
      `....completed writing account resources info to Excel file: ${workbookName}`
    );
  } catch (error) {
    logger.error(
      `Error occurred while writing account resources info to Excel file: ${error}`
    );
  }
};

main().catch(error => {
  logger.error(
    `Error occurred while processing account resources info: ${error}`
  );
  console.error(error);
});
