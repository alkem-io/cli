import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';
import { SpaceMetaInfo } from './model/spaceMetaInfo';
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

  const spacesQueryResult =
    await alkemioCliClient.sdkClient.spacesLicenseUsageExcel();

  const spaces = spacesQueryResult.data.spaces || [];
  let activeSpaces = 0;
  let demoSpaces = 0;
  let archivedSpaces = 0;
  const spacesMetaInfos: SpaceMetaInfo[] = [];
  for (const space of spaces) {
    const spaceMetaInfo = new SpaceMetaInfo();
    spaceMetaInfo.Name = space.profile.displayName;
    spaceMetaInfo.Visibility = space.visibility;
    spaceMetaInfo.SubspacesCount = space.subspaces?.length || 0;
    spaceMetaInfo.AccountType = space.account.type || 'unknown';
    spaceMetaInfo.MembersCount =
      space.community?.roleSet.usersInRole?.length || 0;
    const hostOrg = space.account.host;
    if (hostOrg) {
      spaceMetaInfo.AccountProviderName =
        hostOrg.profile.displayName || 'unknown';
    }
    const flowStates =
      space.defaults?.innovationFlowTemplate?.innovationFlow?.states;
    if (flowStates) {
      const stateNames: string[] = flowStates.map((s: any) => s.displayName);
      spaceMetaInfo.DefaultInnovationFlowStates = JSON.stringify(stateNames);
    }

    spacesMetaInfos.push(spaceMetaInfo);
    logger.info(
      `Space '${spaceMetaInfo.Name}' has visibility: ${spaceMetaInfo.Visibility},
          subspaces: ${spaceMetaInfo.SubspacesCount},
          members: ${spaceMetaInfo.MembersCount},
          hosted by: ${spaceMetaInfo.AccountProviderName},
          host org owner: ${spaceMetaInfo.HostOrgOwnerName}`
    );
    switch (space.visibility) {
      case 'ACTIVE':
        activeSpaces++;
        break;
      case 'DEMO':
        demoSpaces++;
        break;
      case 'ARCHIVED':
        archivedSpaces++;
        break;
    }
  }
  logger.info(
    `...total number of spaces: ${spacesMetaInfos.length}, active: ${activeSpaces}, demo: ${demoSpaces}, archived: ${archivedSpaces}`
  );

  const date = new Date();
  const dateStr = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const workbookName = `./spaces-info-${dateStr}.xlsx`;

  const workbook = XLSX.utils.book_new();
  const spacesSheet = XLSX.utils.json_to_sheet(spacesMetaInfos);
  XLSX.utils.book_append_sheet(workbook, spacesSheet, worksheetName);

  XLSX.writeFile(workbook, workbookName);
};

main().catch(error => {
  console.error(error);
});
