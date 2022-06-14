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

  const HUB_ID = 'digileefomgevingdemo2';

  const hubInfo = await alClient.hubInfo(HUB_ID);
  logger.info(`Hub information: ${hubInfo?.nameID}`);
  if (hubInfo?.nameID) {
    const opportunities = await alClient.opportunities(HUB_ID);
    if (opportunities) {
      for (const opportunity of opportunities) {
        logger.info(`==> Opportunity: ${opportunity?.nameID}`);
        await alClient.privateClient.deleteOpportunity({
          deleteData: {
            ID: opportunity.id,
          },
        });
      }
    }
    const challenges = await alClient.challenges(HUB_ID);
    if (challenges) {
      for (const challenge of challenges) {
        logger.info(`==> Challenge: ${challenge?.nameID}`);
        await alClient.privateClient.deleteChallenge({
          deleteData: {
            ID: challenge.id,
          },
        });
      }
    }
  }
};

main().catch(error => {
  console.error(error);
});
