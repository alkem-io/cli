import { createConfigUsingEnvVars } from './util/create-config-using-envvars';
import { AlkemioCliClient } from './client/AlkemioCliClient';
import { createLogger } from './util/create-logger';

const main = async () => {
  const orgID = process.argv[2];
  await deleteOrganization(orgID);
};

export const deleteOrganization = async (orgID: string) => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();

  await alkemioCliClient.validateConnection();

  await alkemioCliClient.alkemioLibClient.deleteOrganization(orgID);
};

main().catch(error => {
  console.error(error);
});
