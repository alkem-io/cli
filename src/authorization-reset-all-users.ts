import { createConfigUsingEnvVars } from './util/create-config-using-envvars';
import { AlkemioCliClient } from './client/AlkemioCliClient';
import { createLogger } from './util/create-logger';

const main = async () => {
  await resetAllUsers();
};

export const resetAllUsers = async () => {
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
      count++;
      logger.info(`[${count}] - processing user (${user.displayName})`);
      await alkemioCliClient.authorizationResetUser({ userID: user.id });
    }
  }
};

main().catch(error => {
  console.error(error);
});
