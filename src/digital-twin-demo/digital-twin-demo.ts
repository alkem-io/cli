import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';

const main = async () => {
  await digitalTwinDemo();
};

export const digitalTwinDemo = async () => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();
  await alkemioCliClient.validateConnection();

  const spacesQueryResult = await alkemioCliClient.sdkClient.digitalTwinDemo({
    spaceNameID: 'digileefomgeving',
  });

  const space = spacesQueryResult.data.space;

  const subspaces = space.subspaces || [];

  logger.info(`...total number of subspaces: ${subspaces.length}`);
  logger.info(`...${JSON.stringify(space)}`);
};

main().catch(error => {
  console.error(error);
});
