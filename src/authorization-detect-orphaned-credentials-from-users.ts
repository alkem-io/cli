import { createConfigUsingEnvVars } from './util/create-config-using-envvars';
import { AlkemioCliClient } from './client/AlkemioCliClient';
import { createLogger } from './util/create-logger';
import { AuthorizationCredential } from '@alkemio/client-lib';

const main = async () => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();

  await alkemioCliClient.validateConnection();

  const users = await alkemioCliClient.alkemioLibClient.users();
  logger.info(`Users count: ${users?.length}`);

  // get all the hubs + all the challenges
  const challengesMap = new Map();
  const userGroupsMap = new Map();
  const opportunitiesMap = new Map();
  const hubsMap = new Map();
  const hubs = (await alkemioCliClient.alkemioLibClient.privateClient.hubs())
    .data?.hubs;
  if (hubs) {
    for (const hub of hubs) {
      hubsMap.set(hub.id, hub);
      const challenges = await alkemioCliClient.alkemioLibClient.challenges(
        hub.nameID
      );
      if (challenges) {
        for (const challenge of challenges) {
          challengesMap.set(challenge.id, challenge);
        }
      }
      const userGroups = await alkemioCliClient.alkemioLibClient.groups(
        hub.nameID
      );
      if (userGroups) {
        for (const userGroup of userGroups) {
          userGroupsMap.set(userGroup.id, userGroup);
        }
      }
      const opportunities =
        await alkemioCliClient.alkemioLibClient.opportunities(hub.nameID);
      if (opportunities) {
        for (const opportunity of opportunities) {
          opportunitiesMap.set(opportunity.id, opportunity);
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
          if (credential.type === AuthorizationCredential.HubMember) {
            if (!hubsMap.has(credential.resourceID)) {
              logger.warn(
                `[Hub] Identified HubMember credential for not existing hub: ${credential.resourceID}`
              );
            }
          } else if (credential.type === AuthorizationCredential.HubAdmin) {
            if (!hubsMap.has(credential.resourceID)) {
              logger.warn(
                `[Hub] Identified HubAdmin credential for not existing hub: ${credential.resourceID}`
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
          } else if (
            credential.type === AuthorizationCredential.OpportunityMember
          ) {
            if (!opportunitiesMap.has(credential.resourceID)) {
              logger.warn(
                `[Opportunity] Identified member credential for not existing Opportunity: ${credential.resourceID}`
              );
            }
          } else if (
            credential.type === AuthorizationCredential.OpportunityAdmin
          ) {
            if (!opportunitiesMap.has(credential.resourceID)) {
              logger.warn(
                `[Opportunity] Identified admin credential for not existing Opportunity: ${credential.resourceID}`
              );
            }
          } else if (
            credential.type === AuthorizationCredential.UserGroupMember
          ) {
            if (!userGroupsMap.has(credential.resourceID)) {
              logger.warn(
                `[UserGroup] Identified group member credential for not existing userGroup: ${credential.resourceID}`
              );
            }
          }
        }
      }
      await alkemioCliClient.authorizationResetUser({ userID: user.id });
    }
  }
};

main().catch(error => {
  console.error(error);
});
