import { createLogger } from './utils/create-logger';
import * as dotenv from 'dotenv';
import { alkemioClientFactory } from './utils/alkemio-client.factory';

const main = async () => {
  await resetAllUsers();
};

export const resetAllUsers = async () => {
  dotenv.config();
  const logger = createLogger();

  const alClient = await alkemioClientFactory();
  logger.info(`Alkemio server: ${alClient.config.apiEndpointPrivateGraphql}`);
  await alClient.validateConnection();

  const users = await alClient.users();
  logger.info(`Users count: ${users?.length}`);
  if (users) {
    let count = 0;
    for (const user of users) {
      count++;
      logger.info(`[${count}] - processing user (${user.displayName})`);
      if (
        user.id === '46e124b3-8904-4ede-b6ec-097bffddf4f2' ||
        user.id === '9316c475-4cc6-45d4-9231-6d3d884f5a24' ||
        user.id === '97b36b7a-f765-4ef5-9ea0-4daa062c44cb' ||
        user.id === 'ad013e98-2438-4555-84b4-aeddd824b643' ||
        user.id === 'd82ac101-8d6a-4963-94aa-e6180173a67e'
      )
        continue;
      await alClient.authorizationResetUser({ userID: user.id });
    }
  }
};

main().catch(error => {
  console.error(error);
});
