import { createLogger } from './utils/create-logger';
import * as dotenv from 'dotenv';
import { alkemioClientFactory } from './utils/alkemio-client.factory';

const main = async () => {
  await resetAllEcoverses();
};

export const resetAllEcoverses = async () => {
  dotenv.config();
  const logger = createLogger();

  const alClient = await alkemioClientFactory();
  logger.info(`Alkemio server: ${alClient.config.apiEndpointPrivateGraphql}`);
  await alClient.validateConnection();

  const ecoverses = await alClient.hubs();
  logger.info(`Ecoverses count: ${ecoverses?.length}`);
  if (ecoverses) {
    let count = 0;
    for (const ecoverse of ecoverses) {
      count++;
      logger.info(`[${count}] - processing ecoverse (${ecoverse.displayName})`);
      await alClient.authorizationResetHub({ ecoverseID: ecoverse.id });
    }
  }
};

main().catch(error => {
  console.error(error);
});
