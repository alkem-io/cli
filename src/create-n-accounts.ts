// import { createConfigUsingEnvVars } from './util/create-config-using-envvars';
// import { AlkemioCliClient } from './client/AlkemioCliClient';
// import { createLogger } from './util/create-logger';
// import { CreateAccountInput } from '@alkemio/client-lib';

const main = async () => {
  await createMultipleAccounts();
};

// commented because of codegen mismatch
export const createMultipleAccounts = async () => {
  // const logger = createLogger();
  // const config = createConfigUsingEnvVars();
  // const alkemioCliClient = new AlkemioCliClient(config, logger);
  // await alkemioCliClient.initialise();
  // await alkemioCliClient.validateConnection();
  // const accountsToCreate = 10;
  // let accountsCreated = 0;
  // while (accountsCreated < accountsToCreate) {
  //   const spaceName = `space-${accountsCreated}`;
  //   const accountData: CreateAccountInput = {
  //     hostID: 'Eco1Host',
  //     spaceData: {
  //       nameID: `${spaceName}`,
  //       profileData: {
  //         displayName: `${spaceName}`,
  //       },
  //     },
  //   };
  //   await alkemioCliClient.sdkClient.createAccount({
  //     accountData: accountData,
  //   });
  //   accountsCreated++;
  // }
};

main().catch(error => {
  console.error(error);
});
