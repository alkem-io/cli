import { createLogger } from './utils/create-logger';
import * as dotenv from 'dotenv';
import { alkemioClientFactory } from './utils/alkemio-client.factory';

const main = async () => {
  await removeOrganizationsFromUser();
};

export const removeOrganizationsFromUser = async () => {
  dotenv.config();
  const logger = createLogger();

  const alClient = await alkemioClientFactory();
  logger.info(`Alkemio server: ${alClient.config.apiEndpointPrivateGraphql}`);
  await alClient.validateConnection();

  const USER_ID = 'wouter-heijnen-3442';

  const userInfo = await alClient.privateClient.user({ userID: USER_ID });
  logger.info(`User information: ${userInfo?.data?.user.displayName}`);
  if (userInfo?.data?.user?.nameID) {
    const userRoles = await alClient.privateClient.rolesUser({ id: USER_ID });
    const orgMemberships = userRoles.data?.rolesUser?.organizations;
    if (orgMemberships) {
      for (const org of orgMemberships) {
        logger.info(`==> Organization: ${org?.nameID}`);
        await alClient.privateClient.removeUserFromOrganization({
          organizationID: org.id,
          userID: USER_ID,
        });
        await alClient.privateClient.removeUserAsOrganizationAdmin({
          organizationID: org.id,
          userID: USER_ID,
        });
      }
    }
  }
};

main().catch(error => {
  console.error(error);
});
