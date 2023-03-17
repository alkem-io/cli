import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';

const main = async () => {
  await canvasCheckedOutNoUser();
};

const checkCollaboration = async (
  collaboration: any,
  client: AlkemioCliClient
) => {
  const logger = client.logger;
  for (const callout of collaboration.callouts) {
    const canvases = callout.canvases;
    for (const canvas of canvases) {
      const checkout = canvas.checkout;
      const status = checkout.status;
      const lockedBy = checkout.lockedBy;
      if (status === 'CHECKED_OUT') {
        if (lockedBy === '') {
          logger.warn(
            `[${canvas.id}] - identified invalid locked status (${status})`
          );
          await client.sdkClient.eventOnCanvasCheckout({
            canvasCheckoutEventData: {
              canvasCheckoutID: checkout.id,
              eventName: 'CHECKIN',
            },
          });
        } else {
          logger.info(
            `........==>[${canvas.id}] - checked out + locked by (${lockedBy})`
          );
        }
      } else {
        logger.info(`........==>[${canvas.id}] - not checked out`);
      }
    }
  }
};

export const canvasCheckedOutNoUser = async () => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();
  await alkemioCliClient.validateConnection();

  const response = await alkemioCliClient.sdkClient.canvases();
  const hubs = response.data.hubs;
  logger.info(`Hubs count: ${hubs?.length}`);
  if (hubs) {
    let count = 0;
    for (const hub of hubs) {
      count++;
      logger.info(`[${count}] - processing hub (${hub.profile.displayName})`);
      await checkCollaboration(hub.collaboration, alkemioCliClient);
      if (!hub.challenges) {
        logger.error('no challenges');
        continue;
      }
      for (const challenge of hub.challenges) {
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
