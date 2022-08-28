import { createConfigUsingEnvVars } from './util/create-config-using-envvars';
import { AlkemioCliClient } from './client/AlkemioCliClient';
import { createLogger } from './util/create-logger';

const main = async () => {
  await resetAllOrganizations();
};

export const resetAllOrganizations = async () => {
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
      count++;
      logger.info(
        `[${count}] - processing organization (${organization.displayName})`
      );
      await alkemioCliClient.authorizationResetOrganization({
        organizationID: organization.id,
      });
    }
  }
};

main().catch(error => {
  console.error(error);
});
