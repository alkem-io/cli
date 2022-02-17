import { createLogger } from './utils/create-logger';
import * as dotenv from 'dotenv';
import { alkemioClientFactory } from './utils/alkemio-client.factory';

const main = async () => {
  await resetAllHubs();
};

export const resetAllHubs = async () => {
  dotenv.config();
  const logger = createLogger();

  const alClient = await alkemioClientFactory();
  logger.info(`Alkemio server: ${alClient.config.apiEndpointPrivateGraphql}`);
  await alClient.validateConnection();

  const hubs = await alClient.hubs();
  logger.info(`Hubs count: ${hubs?.length}`);
  if (hubs) {
    let count = 0;
    for (const hub of hubs) {
      count++;
      logger.info(`[${count}] - processing hub (${hub.displayName})`);
      await alClient.authorizationResetHub({ hubID: hub.id });
    }
  }
};

main().catch(error => {
  console.error(error);
});
