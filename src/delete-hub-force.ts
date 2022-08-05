import { createLogger } from './utils/create-logger';
import * as dotenv from 'dotenv';
import { alkemioClientFactory } from './utils/alkemio-client.factory';

const main = async () => {
  const hubID = process.argv[2];
  await deleteHub(hubID);
};

export const deleteHub = async (hubID: string) => {
  dotenv.config();
  const logger = createLogger();

  const alClient = await alkemioClientFactory();
  logger.info(`Alkemio server: ${alClient.config.apiEndpointPrivateGraphql}`);
  await alClient.validateConnection();

  const hubInfo = await alClient.hubInfo(hubID);
  logger.info(`Hub information: ${hubInfo?.nameID}`);
  if (hubInfo?.nameID) {
    const opportunities = await alClient.opportunities(hubID);
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
    const challenges = await alClient.challenges(hubID);
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
