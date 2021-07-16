import { createLogger } from './utils/create-logger';
import * as dotenv from 'dotenv';
import { createClientUsingEnvVars } from './utils/create-client-using-envvars';

const main = async () => {
  dotenv.config();
  const logger = createLogger();

  const alClient = await createClientUsingEnvVars();
  logger.info(`Alkemio server: ${alClient.config.graphqlEndpoint}`);
  await alClient.validateConnection();

  const organisations = await alClient.organisations();
  logger.info(`Organisations count: ${organisations?.length}`);
  if (organisations) {
    let count = 0;
    for (const organisation of organisations) {
      count++;
      logger.info(
        `[${count}] - processing organisation (${organisation.displayName})`
      );
      await alClient.authorizationResetOrganisation({
        organisationID: organisation.id,
      });
    }
  }
};

main().catch(error => {
  console.error(error);
});
