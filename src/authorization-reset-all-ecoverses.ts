import { createLogger } from './utils/create-logger';
import * as dotenv from 'dotenv';
import { createClientUsingEnvVars } from './utils/create-client-using-envvars';

const main = async () => {
  dotenv.config();
  const logger = createLogger();

  const alClient = await createClientUsingEnvVars();
  logger.info(`Alkemio server: ${alClient.config.graphqlEndpoint}`);
  await alClient.validateConnection();

  const ecoverses = await alClient.ecoverses();
  logger.info(`Ecoverses count: ${ecoverses?.length}`);
  if (ecoverses) {
    let count = 0;
    for (const ecoverse of ecoverses) {
      count++;
      logger.info(`[${count}] - processing user (${ecoverse.displayName})`);
      await alClient.authorizationResetEcoverse({ ecoverseID: ecoverse.id });
    }
  }
};

main().catch(error => {
  console.error(error);
});
