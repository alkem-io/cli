import { createLogger } from '../util';
import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import * as process from 'node:process';

(async () => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();

  await alkemioCliClient.validateConnection();

  const {
    data: { adminSearchIngestFromScratch: taskId },
  } = await alkemioCliClient.sdkClient.adminSearchIngestFromScratch();

  let oldResultsCount = 0;
  let oldErrorsCount = 0;

  while (true) {
    const {
      data: { task },
    } = await alkemioCliClient.sdkClient.task({
      taskId,
    });
    // reverse them, because the latest results are on top, and the log is scrolling down
    const newResults = task.results
      ?.slice(0, task.results?.length - oldResultsCount)
      .reverse();
    const newErrors = task.errors
      ?.slice(0, task.errors?.length - oldErrorsCount)
      .reverse();

    oldResultsCount = task.results?.length || 0;
    oldErrorsCount = task.errors?.length || 0;

    if (task.status === 'COMPLETED') {
      logger.info(JSON.stringify(newResults, null, 2));
      logger.error(JSON.stringify(newErrors, null, 2));

      logger.info('Search ingest completed');
      break;
    }

    if (task.status === 'ERRORED') {
      logger.error(JSON.stringify(newErrors, null, 2));
      break;
    }

    if (task.status === 'IN_PROGRESS') {
      if (!newResults?.length) {
        logger.info('No new results');
      } else {
        logger.info(JSON.stringify(newResults, null, 2));
      }

      if (!newErrors?.length) {
        logger.error('No new errors');
      } else {
        logger.error(JSON.stringify(newErrors, null, 2));
      }

      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
})()
  .then(() => process.exit(0))
  .catch(e => process.exit(1));
