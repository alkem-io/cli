import { createConfigUsingEnvVars } from './util/create-config-using-envvars';
import { AlkemioCliClient } from './client/AlkemioCliClient';
import { createLogger } from './util/create-logger';
import winston from 'winston';

const main = async () => {
  const logger: winston.Logger = createLogger();
  logger.info('Starting application');
  try {
    await syncInnovationFlowClassificationTagsets(logger);
  } catch (error: any) {
    logger.error(`Error encountered: ${error.message}`);
  }
};

export const syncInnovationFlowClassificationTagsets = async (
  logger: winston.Logger
) => {
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();

  const validation = await alkemioCliClient.validateConnection();
  logger.info(`Connection validated: ${validation}`);
  await syncAllStates(alkemioCliClient, logger);
};

const syncJourneyCalloutStates = async (
  items: any[],
  alkemioCliClient: AlkemioCliClient,
  logger: winston.Logger
) => {
  const promises = items.map(async item => {
    if (!item.innovationFlow?.id) return;
    const { id: innovationFlowID } = item.innovationFlow;
    let errorMessage;
    try {
      await alkemioCliClient.sdkClient.syncStates({
        innovationFlowData: {
          innovationFlowID,
        },
      });
    } catch (error) {
      errorMessage = error;
    }
    if (!errorMessage)
      logger.info(`Synced tagsets for innovationFlow: ${innovationFlowID} `);
    else
      logger.error(
        `Failed to sync tagsets for innovationFlow: ${innovationFlowID}. Error: ${errorMessage} `
      );
  });
  await Promise.all(promises);
};

const syncAllStates = async (
  alkemioCliClient: AlkemioCliClient,
  logger: winston.Logger
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
