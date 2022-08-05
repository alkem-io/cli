import { createLogger } from './utils/create-logger';
import * as dotenv from 'dotenv';
import { alkemioClientFactory } from './utils/alkemio-client.factory';

const main = async () => {
  const orgID = process.argv[2];
  await deleteOrganization(orgID);
};

export const deleteOrganization = async (orgID: string) => {
  dotenv.config();
  const logger = createLogger();

  const alClient = await alkemioClientFactory();
  logger.info(`Alkemio server: ${alClient.config.apiEndpointPrivateGraphql}`);
  await alClient.validateConnection();

  await alClient.deleteOrganization(orgID);
};

main().catch(error => {
  console.error(error);
});
