import { createConfigUsingEnvVars } from './util/create-config-using-envvars';
import { AlkemioCliClient } from './client/AlkemioCliClient';
import { createLogger } from './util/create-logger';
import { EntityType, retryFunction, shouldProcessEntity } from './util';

const main = async (useConfig = false) => {
  if (process.argv[2]) useConfig = process.argv[2] === 'true';
  await resetAllUsers(useConfig);
};

export const resetAllUsers = async (useConfig: boolean) => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();

  await alkemioCliClient.validateConnection();

  const users = await alkemioCliClient.alkemioLibClient.users();
  logger.info(`Users count: ${users?.length}`);
  if (users) {
    let count = 0;
    for (const user of users) {
      if (useConfig && !shouldProcessEntity(user.id, EntityType.USER)) continue;
      count++;
      logger.info(`[${count}] - processing user (${user.displayName})`);
      await retryFunction(
        alkemioCliClient.authorizationResetUser({ userID: user.id })
      );
    }
  }
};

main().catch(error => {
  console.error(error);
});
