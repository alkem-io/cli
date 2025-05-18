import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';
import { SpaceMetaInfo } from './model/spaceAboutMetaInfo';
import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import XLSX from 'xlsx';

const worksheetName = 'SPACES';

export const spacesAboutInfoExcel = async () => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();
  await alkemioCliClient.validateConnection();

  const spacesQueryResult = await alkemioCliClient.sdkClient.spacesAboutInfo();

  const spaces = spacesQueryResult.data.spaces || [];
  const spacesMetaInfos: SpaceMetaInfo[] = [];
  for (const space of spaces) {
    const l0SpaceMetaInfo = new SpaceMetaInfo();
    l0SpaceMetaInfo.DisplayName = space.about.profile.displayName;
    l0SpaceMetaInfo.Description = space.about.profile.description;
    l0SpaceMetaInfo.Why = space.about.why;
    l0SpaceMetaInfo.Who = space.about.who;
    l0SpaceMetaInfo.Visibility = space.visibility;
    l0SpaceMetaInfo.AccountType = space.account.type || 'unknown';
    l0SpaceMetaInfo.Level = `${space.level}`;
    const hostOrg = space.account.host;
    if (hostOrg) {
      l0SpaceMetaInfo.AccountProviderName =
        hostOrg.profile.displayName || 'unknown';
    }

    spacesMetaInfos.push(l0SpaceMetaInfo);
    logger.info(
      `Space '${l0SpaceMetaInfo.DisplayName}' has visibility: ${l0SpaceMetaInfo.Visibility},
          hosted by: ${l0SpaceMetaInfo.AccountProviderName},
          host org owner: ${l0SpaceMetaInfo.HostOrgOwnerName}`
    );

    for (const l1Space of space.subspaces) {
      const l1SpaceMetaInfo = new SpaceMetaInfo();
      l1SpaceMetaInfo.DisplayName = l1Space.about.profile.displayName;
      l1SpaceMetaInfo.Description = l1Space.about.profile.description;
      l1SpaceMetaInfo.Why = l1Space.about.why;
      l1SpaceMetaInfo.Who = l1Space.about.who;
      l1SpaceMetaInfo.Visibility = l1Space.visibility;
      l1SpaceMetaInfo.AccountType = l1Space.account.type || 'unknown';
      l1SpaceMetaInfo.Level = `${l1Space.level}`;
      l1SpaceMetaInfo.L0ParentSpaceDisplayName = l0SpaceMetaInfo.DisplayName;
      spacesMetaInfos.push(l1SpaceMetaInfo);

      for (const l2Space of l1Space.subspaces) {
        const l2SpaceMetaInfo = new SpaceMetaInfo();
        l2SpaceMetaInfo.DisplayName = l2Space.about.profile.displayName;
        l2SpaceMetaInfo.Description = l2Space.about.profile.description;
        l2SpaceMetaInfo.Why = l2Space.about.why;
        l2SpaceMetaInfo.Who = l2Space.about.who;
        l2SpaceMetaInfo.Visibility = l2Space.visibility;
        l2SpaceMetaInfo.AccountType = l2Space.account.type || 'unknown';
        l2SpaceMetaInfo.Level = `${l2Space.level}`;
        l2SpaceMetaInfo.L0ParentSpaceDisplayName = l0SpaceMetaInfo.DisplayName;
        l2SpaceMetaInfo.L1ParentSpaceDisplayName = l1SpaceMetaInfo.DisplayName;
        spacesMetaInfos.push(l2SpaceMetaInfo);
      }
    }
  }
  logger.info(`...total number of spaces: ${spacesMetaInfos.length}`);

  const date = new Date();
  const dateStr = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const workbookName = `./spaces-about-${dateStr}.xlsx`;

  const workbook = XLSX.utils.book_new();
  const spacesSheet = XLSX.utils.json_to_sheet(spacesMetaInfos);
  XLSX.utils.book_append_sheet(workbook, spacesSheet, worksheetName);

  XLSX.writeFile(workbook, workbookName);
};

const main = async () => {
  await spacesAboutInfoExcel();
};

main().catch(error => {
  console.error(error);
});
