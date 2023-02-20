import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';
import { challengeCommunityApplicationForm } from './application-form-questions-challenge-nl';
import { hubCommunityApplicationForm } from './application-form-questions-hub-nl';
import { UpdateCommunityApplicationFormInput } from '../generated/graphql';

const main = async () => {
  const hubID = 'gebruiker-centraal';

  await applicationFormUpdate(hubID);
};

export const applicationFormUpdate = async (hubID: string) => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();
  await alkemioCliClient.validateConnection();

  const communityDetails =
    await alkemioCliClient.sdkClient.hubChallengesCommunities({
      hubId: hubID,
    });
  const hub = communityDetails.data.hub;
  if (!hub) {
    logger.error(`unable to find hub: ${JSON.stringify(communityDetails)}`);
    return;
  }

  const hubQuestionsInput: UpdateCommunityApplicationFormInput = {
    communityID: hub.community?.id || '',
    formData: hubCommunityApplicationForm,
  };
  await alkemioCliClient.sdkClient.updateCommunityApplicationForm({
    applicationFormData: hubQuestionsInput,
  });

  const challenges = hub.challenges || [];
  for (const challenge of challenges) {
    const challengeQuestionsInput: UpdateCommunityApplicationFormInput = {
      communityID: challenge.community?.id || '',
      formData: challengeCommunityApplicationForm,
    };
    await alkemioCliClient.sdkClient.updateCommunityApplicationForm({
      applicationFormData: challengeQuestionsInput,
    });
    logger.info(`Updated application form on challenge: ${challenge.nameID}`);
  }
};

main().catch(error => {
  console.error(error);
});
