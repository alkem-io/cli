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
    spaceMetaInfo.Visibility = space.license.visibility;
    spaceMetaInfo.ChallengesCount = space.challenges?.length || 0;
    spaceMetaInfo.MembersCount = space.community?.usersInRole?.length || 0;
    const hostOrg = space.community?.organizationsInRole?.[0] || undefined;
    if (hostOrg) {
      spaceMetaInfo.HostOrgName = hostOrg.profile.displayName || 'unknown';
      if (hostOrg.owners && hostOrg.owners?.length > 0) {
        spaceMetaInfo.HostOrgOwnerName =
          hostOrg.owners?.[0].profile.displayName || 'unknown';
      }
    }
    const featureFlags = space.license.featureFlags || [];
    for (const featureFlag of featureFlags) {
      switch (featureFlag.name) {
        case 'WHITEBOARD_MULTI_USER':
          spaceMetaInfo.FeatureFlagWhiteboard = featureFlag.enabled;
          break;
        case 'CALLOUT_TO_CALLOUT_TEMPLATE':
          spaceMetaInfo.FeatureFlagCalloutTemplates = featureFlag.enabled;
          break;
      }
    }
    spacesMetaInfos.push(spaceMetaInfo);
    logger.info(
      `Space '${spaceMetaInfo.Name}' has visibility: ${spaceMetaInfo.Visibility},
          challenges: ${spaceMetaInfo.ChallengesCount},
          members: ${spaceMetaInfo.MembersCount},
          hosted by: ${spaceMetaInfo.HostOrgName},
          host org owner: ${spaceMetaInfo.HostOrgOwnerName}`
    );
    switch (space.license.visibility) {
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

  const workbookName = `./spaces-metadata-${dateStr}.xlsx`;

  const workbook = XLSX.utils.book_new();
  const spacesSheet = XLSX.utils.json_to_sheet(spacesMetaInfos);
  XLSX.utils.book_append_sheet(workbook, spacesSheet, worksheetName);

  XLSX.writeFile(workbook, workbookName);
};

main().catch(error => {
  console.error(error);
});
