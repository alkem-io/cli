import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';
import { AuthorizationCredential } from '@alkemio/client-lib';

const main = async () => {
  await detectOrphanedCredentials();
};

export const detectOrphanedCredentials = async () => {
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
              }
              credentialsToRemove.push(credential);
              break;

            case AuthorizationCredential.ChallengeAdmin:
            case AuthorizationCredential.ChallengeLead:
            case AuthorizationCredential.ChallengeMember:
              if (!challengesMap.has(credential.resourceID)) {
                logger.warn(
                  `[${credential.id}] - [Challenge] Identified credential '${credential.type}' for not existing hub: ${credential.resourceID}`
                );
              }
              credentialsToRemove.push(credential);
              break;
            case AuthorizationCredential.OpportunityAdmin:
            case AuthorizationCredential.OpportunityLead:
            case AuthorizationCredential.OpportunityMember:
              if (!opportunitiesMap.has(credential.resourceID)) {
                logger.warn(
                  `[${credential.id}] - [Opportunity] Identified credential '${credential.type}' for not existing hub: ${credential.resourceID}`
                );
              }
              credentialsToRemove.push(credential);
              break;
          }
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
