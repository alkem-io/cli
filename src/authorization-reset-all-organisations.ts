import { createLogger } from './utils/create-logger';
import * as dotenv from 'dotenv';
import { createClientUsingEnvVars } from './utils/create-client-using-envvars';

const main = async () => {
  dotenv.config();
  const logger = createLogger();

  const alClient = await createClientUsingEnvVars();
  logger.info(`Alkemio server: ${alClient.config.graphqlEndpoint}`);
  await alClient.validateConnection();

  const organizations = await alClient.organizations();
  logger.info(`Organizations count: ${organizations?.length}`);
  if (organizations) {
    let count = 0;
    for (const organization of organizations) {
      count++;
      logger.info(
        `[${count}] - processing organization (${organization.displayName})`
      );
      await alClient.authorizationResetOrganization({
        organizationID: organization.id,
      });
    }
  }
};

main().catch(error => {
  console.error(error);
});
