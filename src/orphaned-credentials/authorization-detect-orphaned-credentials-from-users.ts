import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';
import {
  AuthorizationCredential,
  RevokeAuthorizationCredentialInput,
} from '@alkemio/client-lib';

const main = async () => {
  await detectAndRemoveOrphanedCredentials(false, ['wouter-heijnen-3442']);
};

export const detectAndRemoveOrphanedCredentials = async (
  removeCredentials = false,
  userIDs: string[]
) => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();

  await alkemioCliClient.validateConnection();

  const usersResult = await alkemioCliClient.sdkClient.usersWithCredentials();
  const users = usersResult.data.users;
  logger.info(`Users count: ${users?.length}`);

  // get all the hubs + all the challenges
  const challengesMap = new Map();
  const opportunitiesMap = new Map();
  const hubsMap = new Map();
  const hubsResults =
    await alkemioCliClient.sdkClient.hubsChallengesOpportunitiesIds();
  const hubs = hubsResults.data.hubs;
  if (hubs) {
    for (const hub of hubs) {
      hubsMap.set(hub.id, hub);
      const challenges = hub.challenges;
      if (challenges) {
        for (const challenge of challenges) {
          challengesMap.set(challenge.id, challenge);
          const opportunities = challenge.opportunities;
          if (opportunities) {
            for (const opportunity of opportunities) {
              opportunitiesMap.set(opportunity.id, opportunity);
            }
          }
        }
      }
    }
  }
  const credentialsToRemove: {
    id: string;
    type: any;
    resourceID: string;
  }[] = [];
  if (users) {
    let count = 0;
    for (const user of users) {
      count++;
      logger.info(`[${count}] - processing user (${user.nameID})`);
      const userCredentialsToRemove: {
        id: string;
        type: any;
        resourceID: string;
      }[] = [];
      // get the credentials
      const credentials = user.agent?.credentials;
      if (credentials) {
        for (const credential of credentials) {
          switch (credential.type) {
            case AuthorizationCredential.HubMember:
            case AuthorizationCredential.HubAdmin:
            case AuthorizationCredential.HubHost:
              if (!hubsMap.has(credential.resourceID)) {
                logger.warn(
                  `[${credential.id}] - [Hub] Identified credential '${credential.type}' for not existing hub: ${credential.resourceID}`
                );
                userCredentialsToRemove.push(credential);
              }
              break;

            case AuthorizationCredential.ChallengeAdmin:
            case AuthorizationCredential.ChallengeLead:
            case AuthorizationCredential.ChallengeMember:
              if (!challengesMap.has(credential.resourceID)) {
                logger.warn(
                  `[${credential.id}] - [Challenge] Identified credential '${credential.type}' for not existing hub: ${credential.resourceID}`
                );
                userCredentialsToRemove.push(credential);
              }
              break;
            case AuthorizationCredential.OpportunityAdmin:
            case AuthorizationCredential.OpportunityLead:
            case AuthorizationCredential.OpportunityMember:
              if (!opportunitiesMap.has(credential.resourceID)) {
                logger.warn(
                  `[${credential.id}] - [Opportunity] Identified credential '${credential.type}' for not existing hub: ${credential.resourceID}`
                );
                userCredentialsToRemove.push(credential);
              }
              break;
          }
        }
      }
      if (userCredentialsToRemove.length > 0) {
        logger.warn(
          `===> User ${user.nameID} has ${userCredentialsToRemove.length} orphaned credentials`
        );
      }
      if (removeCredentials && userIDs.includes(user.nameID)) {
        logger.warn(
          `===> removing orphaned credentials for user ${user.nameID}`
        );
        for (const cred of userCredentialsToRemove) {
          const inputData: RevokeAuthorizationCredentialInput = {
            resourceID: cred.resourceID,
            type: cred.type,
            userID: user.nameID,
          };
          const result =
            await alkemioCliClient.sdkClient.revokeCredentialFromUser({
              revokeCredentialData: inputData,
            });
          logger.warn(
            `===> removed credential on user ${user.nameID}: ${result.data.revokeCredentialFromUser.id}`
          );
        }
      } else {
        for (const cred of userCredentialsToRemove) {
          credentialsToRemove.push(cred);
        }
      }
      //await alkemioCliClient.authorizationResetUser({ userID: user.id });
    }
    logger.warn(
      `===> Identified ${credentialsToRemove.length} orphaned credentials`
    );
  }
};

main().catch(error => {
  console.error(error);
});
