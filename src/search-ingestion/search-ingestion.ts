import { createLogger } from '../util';
import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';

(async () => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();

  await alkemioCliClient.validateConnection();

  const result =
    await alkemioCliClient.sdkClient.adminSearchIngestFromScratch();

  logger.info(JSON.stringify(result, null, 2));
})();
