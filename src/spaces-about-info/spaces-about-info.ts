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

  const spacesQueryResult =
    await alkemioCliClient.sdkClient.spacesAboutInfo();

  const spaces = spacesQueryResult.data.spaces || [];
  const spacesMetaInfos: SpaceMetaInfo[] = [];
  for (const space of spaces) {
    const spaceMetaInfo = new SpaceMetaInfo();
    spaceMetaInfo.DisplayName = space.profile.displayName;
    spaceMetaInfo.Description = space.profile.description;
    spaceMetaInfo.Vision = space.context.vision;
    spaceMetaInfo.Impact = space.context.impact;
    spaceMetaInfo.Who = space.context.who;
    spaceMetaInfo.Visibility = space.visibility;
    spaceMetaInfo.AccountType = space.account.type || 'unknown';
    const hostOrg = space.account.host;
    if (hostOrg) {
      spaceMetaInfo.AccountProviderName =
        hostOrg.profile.displayName || 'unknown';
    }

    spacesMetaInfos.push(spaceMetaInfo);
    logger.info(
      `Space '${spaceMetaInfo.DisplayName}' has visibility: ${spaceMetaInfo.Visibility},
          hosted by: ${spaceMetaInfo.AccountProviderName},
          host org owner: ${spaceMetaInfo.HostOrgOwnerName}`
    );
  }
  logger.info(
    `...total number of spaces: ${spacesMetaInfos.length}`
  );

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
