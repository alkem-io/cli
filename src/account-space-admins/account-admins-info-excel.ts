import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';
import { SpaceAdminsInfo } from './model/spaceAdminsMetaInfo';
import XLSX from 'xlsx';
import { AccountAdminsInfo } from './model/accountAdminsMetaInfo';
import { logger } from '@alkemio/client-lib';
import { AccountType } from '../generated/graphql';

const accountResourcesSheetName = 'ACCOUNT_SPACES_ADMINS';

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
    const accountAdmins = [];
    if (account.type === AccountType.User) {
      accountAdmins.push(account.host?.nameID || '');
    }
    if (account.host?.__typename === 'Organization') {
      // org
      const orgHost = account.host;
      if (orgHost.roleSet) {
        for (const admin of orgHost.roleSet.admins) {
          //logger.info(`admin: ${admin.nameID}`);
          accountAdmins.push(admin.nameID);
        }
      }
      if (orgHost.roleSet) {
        for (const owner of orgHost.roleSet.owners) {
          //logger.info(`owner: ${owner.nameID}`);
          accountAdmins.push(owner.nameID);
        }
      }
    }
    accountInfo.AccountAdmins = JSON.stringify(accountAdmins);

    accountInfos.push(accountInfo);
    for (const space of account.spaces) {
      const spaceAdminInfo: SpaceAdminsInfo = {
        ...accountInfo,
      };
      spaceAdminInfo.SpaceDisplayName = space.about.profile.displayName;
      spaceAdminInfo.SpaceID = space.id;
      spaceAdminInfo.SpaceVisibility = space.visibility || '';

      const spaceAdmins: string[] = [];
      const roleSetAdmins = space.community?.roleSet.usersInRole;
      if (roleSetAdmins) {
        roleSetAdmins.forEach(admin => spaceAdmins.push(admin.nameID));
      }

      spaceAdminInfo.SpaceAdmins = JSON.stringify(spaceAdmins);
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
