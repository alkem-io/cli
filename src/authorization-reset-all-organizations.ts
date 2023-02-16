import { createConfigUsingEnvVars } from './util/create-config-using-envvars';
import { AlkemioCliClient } from './client/AlkemioCliClient';
import { createLogger } from './util/create-logger';
import { EntityType, retryFunction, shouldProcessEntity } from './util';

const main = async (useConfig = false) => {
  if (process.argv[2]) useConfig = process.argv[2] === 'true';
  await resetAllOrganizations(useConfig);
};

export const resetAllOrganizations = async (useConfig: boolean) => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();

  await alkemioCliClient.validateConnection();

  const organizations = await alkemioCliClient.alkemioLibClient.organizations();
  logger.info(`Organizations count: ${organizations?.length}`);
  if (organizations) {
    let count = 0;
    for (const organization of organizations) {
      if (
        useConfig &&
        !shouldProcessEntity(organization.id, EntityType.ORGANIZATION)
      )
        continue;

      count++;
      logger.info(
        `[${count}] - processing organization (${organization.displayName})`
      );
      await retryFunction(
        alkemioCliClient.authorizationResetOrganization({
          organizationID: organization.id,
        })
      );
    }
  }
};

main().catch(error => {
  console.error(error);
});
