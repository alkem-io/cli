import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';

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
  for (const space of spaces) {
    const hostOrg = space.community?.organizationsInRole?.[0] || undefined;
    let hostOrgName = '';
    let hostOrgOwner = '';
    if (hostOrg) {
      hostOrgName = hostOrg.profile.displayName || 'unknown';
      if (hostOrg.owners && hostOrg.owners?.length > 0) {
        hostOrgOwner = hostOrg.owners?.[0].profile.displayName || 'unknown';
      }
    }
    logger.info(
      `Space '${space.nameID}' has visibility: ${space.license.visibility},
          challenges: ${space.challenges?.length},
          members: ${space.community?.usersInRole?.length},
          hosted by: ${hostOrgName},
          host org owner: ${hostOrgOwner}`
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
    `...total number of spaces: ${spaces.length}, active: ${activeSpaces}, demo: ${demoSpaces}, archived: ${archivedSpaces}`
  );
};

main().catch(error => {
  console.error(error);
});
