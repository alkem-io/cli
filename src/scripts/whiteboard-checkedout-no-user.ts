import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';

const main = async () => {
  await whiteboardCheckedOutNoUser();
};

const checkCollaboration = async (
  collaboration: any,
  client: AlkemioCliClient
) => {
  const logger = client.logger;
  for (const callout of collaboration.callouts) {
    const whiteboards = callout.whiteboards;
    for (const whiteboard of whiteboards) {
      const checkout = whiteboard.checkout;
      const status = checkout.status;
      const lockedBy = checkout.lockedBy;
      if (status === 'CHECKED_OUT') {
        if (lockedBy === '') {
          logger.warn(
            `[${whiteboard.id}] - identified invalid locked status (${status})`
          );
          await client.sdkClient.eventOnWhiteboardCheckout({
            whiteboardCheckoutEventData: {
              whiteboardCheckoutID: checkout.id,
              eventName: 'CHECKIN',
            },
          });
        } else {
          logger.info(
            `........==>[${whiteboard.id}] - checked out + locked by (${lockedBy})`
          );
        }
      } else {
        logger.info(`........==>[${whiteboard.id}] - not checked out`);
      }
    }
  }
};

export const whiteboardCheckedOutNoUser = async () => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();
  await alkemioCliClient.validateConnection();

  const response = await alkemioCliClient.sdkClient.whiteboards();
  const spaces = response.data.spaces;
  logger.info(`Spaces count: ${spaces?.length}`);
  if (spaces) {
    let count = 0;
    for (const space of spaces) {
      count++;
      logger.info(
        `[${count}] - processing space (${space.profile.displayName})`
      );
      await checkCollaboration(space.collaboration, alkemioCliClient);
      if (!space.challenges) {
        logger.error('no challenges');
        continue;
      }
      for (const challenge of space.challenges) {
        logger.info(`....[${challenge.nameID}] - processing challenge`);
        await checkCollaboration(challenge.collaboration, alkemioCliClient);
        if (!challenge.opportunities) {
          logger.error('no opportunities');
          continue;
        }
        for (const opportunity of challenge.opportunities) {
          logger.info(
            `.........[${opportunity.nameID}] - processing opportunity`
          );
          await checkCollaboration(opportunity.collaboration, alkemioCliClient);
        }
      }
    }
  }
};

main().catch(error => {
  console.error(error);
});
