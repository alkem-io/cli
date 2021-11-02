import * as dotenv from 'dotenv';
import { AlkemioClient } from '@alkemio/client-lib';

export const alkemioClientFactory = async () => {
  dotenv.config();

  const server = process.env.ALKEMIO_SERVER || 'http://localhost:3000/graphql';
  const ctClient = new AlkemioClient({
    graphqlEndpoint: server,
    authInfo: {
      credentials: {
        email: process.env.AUTH_ADMIN_EMAIL ?? 'admin@alkem.io',
        password: process.env.AUTH_ADMIN_PASSWORD ?? '!Rn5Ez5FuuyUNc!',
      },
    },
  });

  await ctClient.enableAuthentication();
  return ctClient;
};
