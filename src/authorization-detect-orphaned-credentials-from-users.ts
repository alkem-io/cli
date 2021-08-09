import { createLogger } from './utils/create-logger';
import * as dotenv from 'dotenv';
import { createClientUsingEnvVars } from './utils/create-client-using-envvars';
import { AuthorizationCredential } from '@alkemio/client-lib';

const main = async () => {
  dotenv.config();
  const logger = createLogger();

  const alClient = await createClientUsingEnvVars();
  logger.info(`Alkemio server: ${alClient.config.graphqlEndpoint}`);
  await alClient.validateConnection();

  const users = await alClient.users();
  logger.info(`Users count: ${users?.length}`);

  // get all the ecoverses + all the challenges
  const challengesMap = new Map();
  const ecoversesMap = new Map();
  const ecoverses = (await alClient.client.ecoverses()).data?.ecoverses;
  if (ecoverses) {
    for (const ecoverse of ecoverses) {
      ecoversesMap.set(ecoverse.id, ecoverse);
      const challenges = await alClient.challenges(ecoverse.nameID);
      if (challenges) {
        for (const challenge of challenges) {
          challengesMap.set(challenge.id, challenge);
        }
      }
    }
  }
  if (users) {
    let count = 0;
    for (const user of users) {
      count++;
      logger.info(`[${count}] - processing user (${user.displayName})`);
      // get the credentials
      const credentials = user.agent?.credentials;
      if (credentials) {
        for (const credential of credentials) {
          if (credential.type === AuthorizationCredential.EcoverseMember) {
            if (!ecoversesMap.has(credential.resourceID)) {
              logger.warn(
                `[Ecoverse] Identified EcoverseMember credential for not existing ecoverse: ${credential.resourceID}`
              );
            }
          } else if (
            credential.type === AuthorizationCredential.EcoverseAdmin
          ) {
            if (!ecoversesMap.has(credential.resourceID)) {
              logger.warn(
                `[Ecoverse] Identified EcoverseAdmin credential for not existing ecoverse: ${credential.resourceID}`
              );
            }
          } else if (
            credential.type === AuthorizationCredential.ChallengeMember
          ) {
            if (!challengesMap.has(credential.resourceID)) {
              logger.warn(
                `[Challenge] Identified ChallengeMember credential for not existing challenge: ${credential.resourceID}`
              );
            }
          } else if (
            credential.type === AuthorizationCredential.ChallengeAdmin
          ) {
            if (!challengesMap.has(credential.resourceID)) {
              logger.warn(
                `[Challenge] Identified ChallengeAdmin credential for not existing challenge: ${credential.resourceID}`
              );
            }
          }
        }
      }
      await alClient.authorizationResetUser({ userID: user.id });
    }
  }
};

main().catch(error => {
  console.error(error);
});
