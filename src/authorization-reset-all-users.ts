import { createLogger } from './utils/create-logger';
import * as dotenv from 'dotenv';
import { createClientUsingEnvVars } from './utils/create-client-using-envvars';

const main = async () => {
  await resetAllUsers();
};

export const resetAllUsers = async () => {
  dotenv.config();
  const logger = createLogger();

  const alClient = await createClientUsingEnvVars();
  logger.info(`Alkemio server: ${alClient.config.graphqlEndpoint}`);
  await alClient.validateConnection();

  const users = await alClient.users();
  logger.info(`Users count: ${users?.length}`);
  if (users) {
    let count = 0;
    for (const user of users) {
      count++;
      logger.info(`[${count}] - processing user (${user.displayName})`);
      await alClient.authorizationResetUser({ userID: user.id });
    }
  }
};

main().catch(error => {
  console.error(error);
});
