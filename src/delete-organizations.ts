import { createLogger } from './utils/create-logger';
import * as dotenv from 'dotenv';
import { alkemioClientFactory } from './utils/alkemio-client.factory';

const main = async () => {
  await deleteOrganizations();
};

export const deleteOrganizations = async () => {
  dotenv.config();
  const logger = createLogger();

  const alClient = await alkemioClientFactory();
  logger.info(`Alkemio server: ${alClient.config.apiEndpointPrivateGraphql}`);
  await alClient.validateConnection();

  const organizations = await alClient.organizations();
  logger.info(`Organizations count: ${organizations?.length}`);
  if (organizations) {
    let count = 0;
    for (const organization of organizations) {
      count++;
      logger.info(
        `[${count}] - processing organization (${organization.nameID})`
      );

      if (
        organization.nameID.trim().endsWith('2') &&
        !organization.nameID.startsWith('value-tracks')
      ) {
        logger.info(`===> deleting organization (${organization.nameID})`);

        await alClient.deleteOrganization(organization.nameID);
      }
    }
  }
};

main().catch(error => {
  console.error(error);
});
