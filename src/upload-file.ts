import { createWriteStream, PathLike } from 'fs';
import FormData from 'form-data';
import { createLogger } from './util';
import { createConfigUsingEnvVars } from './util/create-config-using-envvars';
import { AlkemioCliClient } from './client/AlkemioCliClient';

const main = async () => {

};

main().catch(console.error);

export const uploadFile = async (path: PathLike) => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();
  await alkemioCliClient.validateConnection();

  // await alkemioCliClient.alkemioLibClient.upload

  const file = createWriteStream(path);

  const form = new FormData();
  form.append('title', 'title');
  form.append('file', file);
};
