import { AlkemioClient } from '@alkemio/client-lib';
import { createConfigUsingEnvVars } from './create-config-using-envvars';

export const alkemioClientFactory = async () => {
  const config = createConfigUsingEnvVars();

  const alkemioClient = new AlkemioClient(config);

  await alkemioClient.enableAuthentication();
  return alkemioClient;
};
