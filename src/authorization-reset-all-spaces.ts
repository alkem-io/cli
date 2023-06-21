import { createConfigUsingEnvVars } from './util/create-config-using-envvars';
import { AlkemioCliClient } from './client/AlkemioCliClient';
import { createLogger } from './util/create-logger';
import { EntityType, retryFunction, shouldProcessEntity } from './util';

const main = async (useConfig = false) => {
  if (process.argv[2]) useConfig = process.argv[2] === 'true';
  await resetAllSpaces(useConfig);
};

export const resetAllSpaces = async (useConfig: boolean) => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();

  await alkemioCliClient.validateConnection();

  const spaces = await alkemioCliClient.spacesAllVisibilities();
  logger.info(`Spaces count: ${spaces?.length}`);
  if (spaces) {
    let count = 0;
    for (const space of spaces) {
      if (useConfig && !shouldProcessEntity(space.id, EntityType.HUB)) continue;

      count++;
      logger.info(`[${count}] - processing space (${space.nameID})`);

      await retryFunction(
        alkemioCliClient.authorizationResetSpace({ spaceID: space.id })
      );
    }
  }
};

main().catch(error => {
  console.error(error);
});
