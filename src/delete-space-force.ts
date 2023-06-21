import { createConfigUsingEnvVars } from './util/create-config-using-envvars';
import { AlkemioCliClient } from './client/AlkemioCliClient';
import { createLogger } from './util/create-logger';

const main = async () => {
  const spaceID = process.argv[2];
  await deleteSpace(spaceID);
};

export const deleteSpace = async (spaceID: string) => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();

  await alkemioCliClient.validateConnection();

  const spaceInfo = await alkemioCliClient.alkemioLibClient.spaceInfo(spaceID);
  logger.info(`Space information: ${spaceInfo?.nameID}`);
  if (spaceInfo?.nameID) {
    const opportunities = await alkemioCliClient.alkemioLibClient.opportunities(
      spaceID
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
      spaceID
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
