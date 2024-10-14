import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';
import { AccountResourcesInfo } from './model/accountResourcesMetaInfo';
import XLSX from 'xlsx';

const worksheetName = 'ACCOUNT_RESOURCES';

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
  const accountResourcesInfo: AccountResourcesInfo[] = [];
  for (const account of accounts) {
    for (const space of account.spaces) {
      const accountResourceInfo = new AccountResourcesInfo();
      accountResourceInfo.AccountProviderName =
        account.host?.profile.displayName || '';
      accountResourceInfo.AccountType = account.type || 'unknown';
      accountResourceInfo.AccountID = account.id;
      accountResourceInfo.SpaceDisplayName = space.profile.displayName;
      accountResourceInfo.SpaceID = space.id;
      accountResourceInfo.ResourceType = 'Space';
      accountResourcesInfo.push(accountResourceInfo);
    }
    for (const innovationHub of account.innovationHubs) {
      const accountResourceInfo = new AccountResourcesInfo();
      accountResourceInfo.AccountProviderName =
        account.host?.profile.displayName || '';
      accountResourceInfo.AccountType = account.type || 'unknown';
      accountResourceInfo.AccountID = account.id;
      accountResourceInfo.InnovationHubDisplayName =
        innovationHub.profile.displayName;
      accountResourceInfo.InnovationHubID = innovationHub.id;
      accountResourceInfo.ResourceType = 'InnovationHub';
      accountResourcesInfo.push(accountResourceInfo);
    }
    for (const innovationPack of account.innovationPacks) {
      const accountResourceInfo = new AccountResourcesInfo();
      accountResourceInfo.AccountProviderName =
        account.host?.profile.displayName || '';
      accountResourceInfo.AccountType = account.type || 'unknown';
      accountResourceInfo.AccountID = account.id;
      accountResourceInfo.InnovationPackDisplayName =
        innovationPack.profile.displayName;
      accountResourceInfo.InnovationPackID = innovationPack.id;
      accountResourceInfo.ResourceType = 'InnovationPack';
      accountResourcesInfo.push(accountResourceInfo);
    }
    for (const virtualContributor of account.virtualContributors) {
      const accountResourceInfo = new AccountResourcesInfo();
      accountResourceInfo.AccountProviderName =
        account.host?.profile.displayName || '';
      accountResourceInfo.AccountType = account.type || 'unknown';
      accountResourceInfo.AccountID = account.id;
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

  const workbook = XLSX.utils.book_new();
  const spacesSheet = XLSX.utils.json_to_sheet(accountResourcesInfo);
  XLSX.utils.book_append_sheet(workbook, spacesSheet, worksheetName);

  XLSX.writeFile(workbook, workbookName);
};

main().catch(error => {
  console.error(error);
});
