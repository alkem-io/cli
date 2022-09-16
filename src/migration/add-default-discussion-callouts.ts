import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';
import { CalloutType, CalloutVisibility } from '../generated/graphql';
import { CalloutState } from '@alkemio/client-lib';

const main = async () => {
  await addDefaultDiscussionCallouts();
};

export const addDefaultDiscussionCallouts = async () => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();

  await alkemioCliClient.validateConnection();

  const response = await alkemioCliClient.sdkClient.hubChallengesCallouts();
  const hubs = response?.data?.hubs;
  if (hubs) {
    logger.info(`Hubs count: ${hubs.length}`);
    let count = 0;
    for (const hub of hubs) {
      count++;
      logger.info(`[${count}] - processing hub (${hub.nameID})`);
      const discussionCallout = hub.collaboration?.callouts?.find(
        callout => callout.type === CalloutType.Comments
      );
      if (!discussionCallout) {
        const collaborationID = hub.collaboration?.id || '';
        // no discussion callout exists, create it
        await alkemioCliClient.sdkClient.createCalloutOnCollaboration({
          data: {
            ...hubDiscussionCallout,
            collaborationID: collaborationID,
          },
        });
        logger.info(
          `[${count}] ...adding default discussion callout on Hub (${hub.nameID}) - discussion callout: ${hubDiscussionCallout.displayName}`
        );
      }

      const challenges = hub.challenges;
      if (challenges) {
        for (const challenge of challenges) {
          logger.info(`     ==>  processing Challenge (${challenge?.nameID})`);
          const discussionCallout = challenge.collaboration?.callouts?.find(
            callout => callout.type === CalloutType.Comments
          );
          if (!discussionCallout) {
            const collaborationID = challenge.collaboration?.id || '';
            // no discussion callout exists, create it
            await alkemioCliClient.sdkClient.createCalloutOnCollaboration({
              data: {
                ...challengeDiscussionCallout,
                collaborationID: collaborationID,
              },
            });
            logger.info(
              `     ==>  ...adding default challenge callout on Hub (${challenge.nameID}) - discussion callout: ${challengeDiscussionCallout.displayName}`
            );
          }
        }
      }
    }
  }
};

main().catch(error => {
  console.error(error);
});

const hubDiscussionCallout = {
  type: CalloutType.Comments,
  displayName: 'Welcome, please introduce yourself to the community!',
  nameID: 'hub-welcome',
  description:
    'Please share a few words about yourself to help the community get to know each other. What brings you to this Hub and motivates you to work on these Challenges?',
  visibility: CalloutVisibility.Draft,
  state: CalloutState.Open,
  sortOrder: 1,
};

const challengeDiscussionCallout = {
  type: CalloutType.Comments,
  displayName: 'Why do you care about this Challenge?',
  nameID: 'challenge-welcome',
  description:
    'Please share why this Challenge is important to you as well as any relevant thoughts, experience or expertise.',
  visibility: CalloutVisibility.Draft,
  state: CalloutState.Open,
  sortOrder: 1,
};
