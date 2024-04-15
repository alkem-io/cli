import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';
import {
  AuthorizationCredential,
  RevokeAuthorizationCredentialInput,
} from '@alkemio/client-lib';

const main = async () => {
  await detectAndRemoveOrphanedCredentials(false, ['myrthe-zondag-2013']);
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

  // get all the spaces + all the challenges
  const subspacesMap = new Map();
  const subsubspacesMap = new Map();
  const spacesMap = new Map();
  const spacesResults =
    await alkemioCliClient.sdkClient.spacesChallengesOpportunitiesIds();
  const spaces = spacesResults.data.spaces;
  if (spaces) {
    for (const space of spaces) {
      spacesMap.set(space.id, space);
      const subspaces = space.subspaces;
      if (subspaces) {
        for (const subspace of subspaces) {
          subspacesMap.set(subspace.id, subspace);
          const subsubspaces = subspace.subspaces;
          if (subsubspaces) {
            for (const subsubspace of subsubspaces) {
              subsubspacesMap.set(subsubspace.id, subsubspace);
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
  const usersOrphanedCreds: string[] = [];
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
            case AuthorizationCredential.SpaceMember:
            case AuthorizationCredential.SpaceAdmin:
              if (!spacesMap.has(credential.resourceID)) {
                logger.warn(
                  `[${credential.id}] - [Space] Identified credential '${credential.type}' for not existing space: ${credential.resourceID}`
                );
                userCredentialsToRemove.push(credential);
              }
              break;

            case AuthorizationCredential.SubspaceAdmin:
            case AuthorizationCredential.SubspaceLead:
            case AuthorizationCredential.SubspaceMember:
              if (
                !subspacesMap.has(credential.resourceID) &&
                !subsubspacesMap.has(credential.resourceID)
              ) {
                logger.warn(
                  `[${credential.id}] - [Subspace] Identified credential '${credential.type}' for not existing subspace: ${credential.resourceID}`
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
        usersOrphanedCreds.push(user.nameID);
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
    logger.warn(
      `===> Users with orphaned credentials: ${JSON.stringify(
        usersOrphanedCreds
      )}`
    );
  }
};

main().catch(error => {
  console.error(error);
});
