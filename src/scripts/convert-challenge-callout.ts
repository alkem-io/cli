import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';
import {
  CalloutState,
  CalloutType,
  CreatePostOnCalloutInput,
  CreateCalloutOnCollaborationInput,
  UpdateCalloutInput,
  UpdateVisualInput,
} from '@alkemio/client-lib';

const main = async () => {
  const spaceID = 'digileefomgeving';
  const challengeIDs = [
    'infrastructuur',
    'klimaatadaptatie',
    'landbouwinnovatie',
    'mobiliteit',
    'crowdmanagement',
    'woningbouw',
  ];
  const baseURL = 'https://alkem.io';
  await convertChallengeToCallout(spaceID, challengeIDs, baseURL);
};

export const convertChallengeToCallout = async (
  spaceID: string,
  challengeIDs: string[],
  baseURL: string
) => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();
  await alkemioCliClient.validateConnection();

  for (const challengeID of challengeIDs) {
    const challengeDetails =
      await alkemioCliClient.sdkClient.spaceChallengeOpportunities({
        spaceId: spaceID,
        challengeId: challengeID,
      });

    const spaceCollaborationID = challengeDetails.data.space.collaboration?.id;
    if (!spaceCollaborationID) {
      logger.error('unable to find collaboration ID');
      break;
    }

    // Create the callout
    const challenge = challengeDetails.data.space.challenge;
    const calloutInput: CreateCalloutOnCollaborationInput = {
      ...defaultCallout,
      collaborationID: spaceCollaborationID,
      profile: {
        displayName: challenge.profile.displayName,
        description: challenge.profile.description,
      },
    };
    const calloutResponse =
      await alkemioCliClient.sdkClient.createCalloutOnCollaboration({
        data: calloutInput,
      });
    const calloutID = calloutResponse.data.createCalloutOnCollaboration.id;
    logger.info(
      `[${challengeID}] ...adding Callout on Space: ${calloutInput.profile.displayName} with id '${calloutID}'`
    );

    // Create a card for each opportunity
    const opportunities = challengeDetails.data.space.challenge.opportunities;
    logger.info(`Opportunities count: ${opportunities?.length}`);
    if (opportunities) {
      let count = 0;
      for (const opportunity of opportunities) {
        count++;
        logger.info(
          `[${count}] - processing opportunity (${opportunity.profile.displayName})`
        );
        const visualBannerNarrow = opportunity.profile?.visuals?.find(
          v => v.name === 'bannerNarrow'
        );

        let description = opportunity.profile.description;
        const leadingOrgs = opportunity.community?.leadOrganizations || [];
        for (const leadingOrg of leadingOrgs) {
          description = `${description}\n\n<b>Leading Organization</b>: <a href='${baseURL}/organization/${leadingOrg.nameID}'>${leadingOrg.profile.displayName}</a>`;
        }

        const memberOrgs = opportunity.community?.memberOrganizations || [];
        for (const memberOrg of memberOrgs) {
          description = `${description}\n\nMember Organization: <a href='${baseURL}/organization/${memberOrg.nameID}'>${memberOrg.profile.displayName}</a>`;
        }

        const inputArgs: CreatePostOnCalloutInput = {
          calloutID: calloutID,
          nameID: opportunity.nameID,
          visualUri: visualBannerNarrow?.uri,
          type: 'Project',
          profileData: {
            description,
            displayName: opportunity.profile.displayName,
            referencesData: opportunity.profile.references,
          },
        };
        const cardResponse =
          await alkemioCliClient.sdkClient.createCardOnCallout({
            data: inputArgs,
          });
        logger.info(
          `[${count}] - created new card (${cardResponse.data.createPostOnCallout.nameID}`
        );

        //
        const visualBanner = opportunity.profile.visuals?.find(
          v => v.name === 'banner'
        );
        if (!visualBanner) {
          logger.error('unable to find banner visual');
          break;
        }
        const updateVisualInput: UpdateVisualInput = {
          visualID: visualBanner.id,
          uri: visualBanner.uri,
        };
        const updatedBannerVisual =
          await alkemioCliClient.sdkClient.updateVisual({
            data: updateVisualInput,
          });

        logger.info(
          `[${count}] - updated banner visual (${updatedBannerVisual.data.updateVisual.id}`
        );
      }
    }

    // Finally close the callout for new cards
    const calloutUpdateInput: UpdateCalloutInput = {
      ID: calloutID,
      state: CalloutState.Closed,
    };
    await alkemioCliClient.sdkClient.updateCallout({
      data: calloutUpdateInput,
    });
  }
};

main().catch(error => {
  console.error(error);
});

const defaultCallout: CreateCalloutOnCollaborationInput = {
  collaborationID: '',
  type: CalloutType.Card,
  profile: {
    displayName: 'sxxxWelcome, please introduce yourself to the community!',
    description:
      'Please share a few words about yourself to help the community get to know each other. What brings you to this Space and motivates you to work on these Challenges?',
  },
  state: CalloutState.Open,
  sortOrder: 1,
  cardTemplate: {
    defaultDescription: '',
    type: 'Project',
    tags: ['asdf'],
    profile: {
      description: 'asdf',
      displayName: '',
    },
  },
};
