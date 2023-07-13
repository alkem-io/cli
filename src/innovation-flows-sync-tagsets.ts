import { createConfigUsingEnvVars } from './util/create-config-using-envvars';
import { AlkemioCliClient } from './client/AlkemioCliClient';
import { createLogger } from './util/create-logger';

const main = async () => {
  const logger = createLogger();
  logger.info('Starting application');
  try {
    await syncInnovationFlowClassificationTagsets(logger);
  } catch (error: any) {
    logger.error(`Error encountered: ${error.message}`);
  }
};

export const syncInnovationFlowClassificationTagsets = async (logger: any) => {
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  const logUserResult = await alkemioCliClient.logUser();
  logger.info(`User logged in: ${logUserResult}`);

  const validation = await alkemioCliClient.validateConnection();
  logger.info(`Connection validated: ${validation}`);
  await syncAllStates(alkemioCliClient, logger);
};

const syncJourneyCalloutStates = async (
  items: any[],
  alkemioCliClient: AlkemioCliClient,
  logger: any
) => {
  const promises = items.map(async item => {
    if (!item.innovationFlow?.id || !item.collaboration?.callouts) return;
    const { id: innovationFlowID } = item.innovationFlow;
    for (const callout of item.collaboration.callouts) {
      if (!callout.profile.tagsets.includes('flow-state')) continue;
      const { id: profileID } = callout.profile;
      try {
        await alkemioCliClient.sdkClient.syncStates({
          syncData: {
            innovationFlowID,
            profileID,
          },
        });
      } catch (error) {
        logger.error(error);
      }

      logger.info(`Synced tagsets for callout with profileId: ${profileID} `);
    }
  });
  await Promise.all(promises);
};

const syncAllStates = async (
  alkemioCliClient: AlkemioCliClient,
  logger: any
) => {
  logger.info('Starting to sync all states');
  const innovationFlowStates =
    await alkemioCliClient.sdkClient.innovationFlowStates();
  const { spaces } = innovationFlowStates.data;

  for (const space of spaces) {
    if (!space.challenges) continue;
    for (const challenge of space.challenges) {
      await syncJourneyCalloutStates([challenge], alkemioCliClient, logger);
      if (!challenge.opportunities) continue;
      await syncJourneyCalloutStates(
        challenge.opportunities,
        alkemioCliClient,
        logger
      );
    }
  }
  logger.info('Finished syncing all states');
};

main();
