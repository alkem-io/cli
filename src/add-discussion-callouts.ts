import { createConfigUsingEnvVars } from './util/create-config-using-envvars';
import { AlkemioCliClient } from './client/AlkemioCliClient';
import { createLogger } from './util/create-logger';

const main = async () => {
  await addDiscussionCallouts();
};

export const addDiscussionCallouts = async () => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();

  await alkemioCliClient.validateConnection();

  const hubs = await alkemioCliClient.alkemioLibClient.hubs();
  logger.info(`Hubs count: ${hubs?.length}`);
  if (hubs) {
    let count = 0;
    for (const hub of hubs) {
      count++;
      logger.info(
        `[${count}] - processing hub (${hub.displayName}) - discussion callout: ${hubDiscussionCallout.displayName}`
      );

      const challenges = await alkemioCliClient.alkemioLibClient.challenges(
        hub.id
      );
      if (challenges) {
        for (const challenge of challenges) {
          logger.info(`==> Challenge: ${challenge?.nameID}`);
          logger.info(
            `     ==>  processing Challenge (${challenge?.displayName}) - discussion callout: ${challengeDiscussionCallout.displayName}`
          );
        }
      }
    }
  }
};

main().catch(error => {
  console.error(error);
});

const hubDiscussionCallout = {
  displayName: 'myDicussionCallout',
  description: 'asdf',
};

const challengeDiscussionCallout = {
  displayName: 'challengeDiscussionCallout',
  description: 'asdf',
};
