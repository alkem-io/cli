import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';
import { AccountResourceInfo } from './model/accountResourceMetaInfo';
import XLSX from 'xlsx';
import { AccountInfo } from './model/accountMetaInfo';
import { logger } from '@alkemio/client-lib';

const accountResourcesSheetName = 'ACCOUNT_RESOURCES';
const accountSheetName = 'ACCOUNTS';

const main = async () => {
  await accountResourcesInfoAsExcel();
};

export const accountResourcesInfoAsExcel = async () => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();
  await alkemioCliClient.validateConnection();

  const accountResourcesQueryResult =
    await alkemioCliClient.sdkClient.accountResourcesInfo();

  const accounts = accountResourcesQueryResult.data.accounts || [];
  const accountResourcesInfo: AccountResourceInfo[] = [];
  const accountInfos: AccountInfo[] = [];
  for (const account of accounts) {
    const accountInfo = new AccountInfo();
    accountInfo.AccountProviderName = account.host?.profile.displayName || '';
    accountInfo.AccountType = account.type || 'unknown';
    accountInfo.AccountID = account.id;
    accountInfos.push(accountInfo);
    for (const space of account.spaces) {
      const accountResourceInfo: AccountResourceInfo = {
        ...accountInfo,
      };
      accountResourceInfo.SpaceDisplayName = space.profile.displayName;
      accountResourceInfo.SpaceID = space.id;
      accountResourceInfo.ResourceType = 'Space';
      accountResourcesInfo.push(accountResourceInfo);
    }
    for (const innovationHub of account.innovationHubs) {
      const accountResourceInfo: AccountResourceInfo = {
        ...accountInfo,
      };
      accountResourceInfo.InnovationHubDisplayName =
        innovationHub.profile.displayName;
      accountResourceInfo.InnovationHubID = innovationHub.id;
      accountResourceInfo.ResourceType = 'InnovationHub';
      accountResourcesInfo.push(accountResourceInfo);
    }
    for (const innovationPack of account.innovationPacks) {
      const accountResourceInfo: AccountResourceInfo = {
        ...accountInfo,
      };
      accountResourceInfo.InnovationPackDisplayName =
        innovationPack.profile.displayName;
      accountResourceInfo.InnovationPackID = innovationPack.id;
      accountResourceInfo.ResourceType = 'InnovationPack';
      accountResourcesInfo.push(accountResourceInfo);
    }
    for (const virtualContributor of account.virtualContributors) {
      const accountResourceInfo: AccountResourceInfo = {
        ...accountInfo,
      };
      accountResourceInfo.VirtualContributorDisplayName =
        virtualContributor.profile.displayName;
      accountResourceInfo.VirtualContributorID = virtualContributor.id;
      accountResourceInfo.ResourceType = 'VirtualContributor';
      accountResourcesInfo.push(accountResourceInfo);
    }

    logger.info(`Account '${account.host?.id}' processed...`);
  }
  logger.info(
    `...total number of account resources processed: ${accountResourcesInfo.length}`
  );

  const date = new Date();
  const dateStr = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const workbookName = `./account-resources-info-${dateStr}.xlsx`;
  logger.info(
    `Writing account resources info to Excel file: ${workbookName}...`
  );
  try {
    const workbook = XLSX.utils.book_new();

    const accountsSheet = XLSX.utils.json_to_sheet(accountInfos);
    XLSX.utils.book_append_sheet(workbook, accountsSheet, accountSheetName);

    const resourcesSheet = XLSX.utils.json_to_sheet(accountResourcesInfo);
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
