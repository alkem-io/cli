import { createConfigUsingEnvVars } from './util/create-config-using-envvars';
import { AlkemioCliClient } from './client/AlkemioCliClient';
import { createLogger } from './util/create-logger';
import { EntityType, retryFunction, shouldProcessEntity } from './util';

const main = async (useConfig = false) => {
  if (process.argv[2]) useConfig = process.argv[2] === 'true';
  await resetAllHubs(useConfig);
};

export const resetAllHubs = async (useConfig: boolean) => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();

  await alkemioCliClient.validateConnection();

  const hubs = await alkemioCliClient.hubsAllVisibilities();
  logger.info(`Hubs count: ${hubs?.length}`);
  if (hubs) {
    let count = 0;
    for (const hub of hubs) {
      if (useConfig && !shouldProcessEntity(hub.id, EntityType.HUB)) continue;

      count++;
      logger.info(`[${count}] - processing hub (${hub.nameID})`);

      await retryFunction(
        alkemioCliClient.authorizationResetHub({ hubID: hub.id })
      );
    }
  }
};

main().catch(error => {
  console.error(error);
});
