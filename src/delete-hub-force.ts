import { createConfigUsingEnvVars } from './util/create-config-using-envvars';
import { AlkemioCliClient } from './client/AlkemioCliClient';
import { createLogger } from './util/create-logger';

const main = async () => {
  const hubID = process.argv[2];
  await deleteHub(hubID);
};

export const deleteHub = async (hubID: string) => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();

  await alkemioCliClient.validateConnection();

  const hubInfo = await alkemioCliClient.alkemioLibClient.hubInfo(hubID);
  logger.info(`Hub information: ${hubInfo?.nameID}`);
  if (hubInfo?.nameID) {
    const opportunities = await alkemioCliClient.alkemioLibClient.opportunities(
      hubID
    );
    if (opportunities) {
      for (const opportunity of opportunities) {
        logger.info(`==> Opportunity: ${opportunity?.nameID}`);
        await alkemioCliClient.alkemioLibClient.privateClient.deleteOpportunity(
          {
            deleteData: {
              ID: opportunity.id,
            },
          }
        );
      }
    }
    const challenges = await alkemioCliClient.alkemioLibClient.challenges(
      hubID
    );
    if (challenges) {
      for (const challenge of challenges) {
        logger.info(`==> Challenge: ${challenge?.nameID}`);
        await alkemioCliClient.alkemioLibClient.privateClient.deleteChallenge({
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
