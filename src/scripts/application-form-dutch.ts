import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';
import { challengeCommunityApplicationForm } from './application-form-questions-challenge-nl';
import { spaceCommunityApplicationForm } from './application-form-questions-space-nl';
import { UpdateCommunityApplicationFormInput } from '../generated/graphql';

const main = async () => {
  const spaceID = 'gebruiker-centraal';

  await applicationFormUpdate(spaceID);
};

export const applicationFormUpdate = async (spaceID: string) => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();
  await alkemioCliClient.validateConnection();

  const communityDetails =
    await alkemioCliClient.sdkClient.spaceSubspacesCommunities({
      spaceId: spaceID,
    });
  const space = communityDetails.data.space;
  if (!space) {
    logger.error(`unable to find space: ${JSON.stringify(communityDetails)}`);
    return;
  }

  const spaceQuestionsInput: UpdateCommunityApplicationFormInput = {
    communityID: space.community?.id || '',
    formData: spaceCommunityApplicationForm,
  };
  await alkemioCliClient.sdkClient.updateCommunityApplicationForm({
    applicationFormData: spaceQuestionsInput,
  });

  const challenges = space.subspaces || [];
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
