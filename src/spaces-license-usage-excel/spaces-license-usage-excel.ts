import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';

const main = async () => {
  await spacesLicenseUsageAsExcel();
};

export const spacesLicenseUsageAsExcel = async () => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();
  await alkemioCliClient.validateConnection();

  const spacesQueryResult =
    await alkemioCliClient.sdkClient.spacesLicenseUsageExcel();

  const spaces = spacesQueryResult.data.spaces || [];
  for (const space of spaces) {
    logger.info(`Space '${space.nameID}`);
  }
};

main().catch(error => {
  console.error(error);
});
