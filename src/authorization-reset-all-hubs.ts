import { createConfigUsingEnvVars } from './util/create-config-using-envvars';
import { AlkemioCliClient } from './client/AlkemioCliClient';
import { createLogger } from './util/create-logger';

const main = async () => {
  await resetAllHubs();
};

export const resetAllHubs = async () => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();

  await alkemioCliClient.validateConnection();

  const hubs = await alkemioCliClient.alkemioLibClient.hubs();
  logger.info(`Hubs count: ${hubs?.length}`);
  if (hubs) {
    let count = 0;
    for (const hub of hubs) {
      count++;
      logger.info(`[${count}] - processing hub (${hub.displayName})`);
      await alkemioCliClient.authorizationResetHub({ hubID: hub.id });
    }
  }
};

main().catch(error => {
  console.error(error);
});
