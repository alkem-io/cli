import { AlkemioClientConfig } from '@alkemio/client-lib/dist/config/alkemio-client-config';
import dotenv from 'dotenv';

export const createConfigUsingEnvVars = (): AlkemioClientConfig => {
  dotenv.config();

  const server =
    process.env.API_ENDPOINT_PRIVATE_GRAPHQL ||
    'http://localhost:3000/api/private/non-interactive/graphql';

  return {
    apiEndpointPrivateGraphql: server,
    authInfo: {
      credentials: {
        email: process.env.AUTH_ADMIN_EMAIL ?? 'admin@alkem.io',
        password: process.env.AUTH_ADMIN_PASSWORD ?? 'test',
      },
    },
  };
};
