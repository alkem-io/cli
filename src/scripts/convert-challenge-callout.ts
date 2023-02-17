import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';
import {
  CalloutState,
  CalloutType,
  CreateAspectOnCalloutInput,
  CreateCalloutOnCollaborationInput,
  UpdateCalloutInput,
  UpdateVisualInput,
} from '@alkemio/client-lib';

const main = async () => {
  const hubID = 'digileefomgeving';
  const challengeIDs = [
    'infrastructuur',
    'klimaatadaptatie',
    'landbouwinnovatie',
    'mobiliteit',
    'crowdmanagement',
    'woningbouw',
  ];
  const baseURL = 'https://alkem.io';
  await convertChallengeToCallout(hubID, challengeIDs, baseURL);
};

export const convertChallengeToCallout = async (
  hubID: string,
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
      await alkemioCliClient.sdkClient.hubChallengeOpportunities({
        hubId: hubID,
        challengeId: challengeID,
      });

    const hubCollaborationID = challengeDetails.data.hub.collaboration?.id;
    if (!hubCollaborationID) {
      logger.error('unable to find collaboration ID');
      break;
    }

    // Create the callout
    const challenge = challengeDetails.data.hub.challenge;
    const calloutInput: CreateCalloutOnCollaborationInput = {
      ...defaultCallout,
      collaborationID: hubCollaborationID,
      displayName: challenge.displayName,
      description: challenge.context?.background,
    };
    const calloutResponse =
      await alkemioCliClient.sdkClient.createCalloutOnCollaboration({
        data: calloutInput,
      });
    const calloutID = calloutResponse.data.createCalloutOnCollaboration.id;
    logger.info(
      `[${challengeID}] ...adding Callout on Hub: ${calloutInput.displayName} with id '${calloutID}'`
    );

    // Create a card for each opportunity
    const opportunities = challengeDetails.data.hub.challenge.opportunities;
    logger.info(`Opportunities count: ${opportunities?.length}`);
    if (opportunities) {
      let count = 0;
      for (const opportunity of opportunities) {
        count++;
        logger.info(
          `[${count}] - processing opportunity (${opportunity.displayName})`
        );
        const visualBannerNarrow = opportunity.context?.visuals?.find(
          v => v.name === 'bannerNarrow'
        );

        let description = opportunity.context?.background;
        const leadingOrgs = opportunity.community?.leadOrganizations || [];
        for (const leadingOrg of leadingOrgs) {
          description = `${description}\n\n<b>Leading Organization</b>: <a href='${baseURL}/organization/${leadingOrg.nameID}'>${leadingOrg.displayName}</a>`;
        }

        const memberOrgs = opportunity.community?.memberOrganizations || [];
        for (const memberOrg of memberOrgs) {
          description = `${description}\n\nMember Organization: <a href='${baseURL}/organization/${memberOrg.nameID}'>${memberOrg.displayName}</a>`;
        }

        const inputArgs: CreateAspectOnCalloutInput = {
          calloutID: calloutID,
          nameID: opportunity.nameID,
          displayName: opportunity.displayName,
          visualUri: visualBannerNarrow?.uri,
          type: 'Project',
          profileData: {
            description,
            tags: opportunity.tagset?.tags,
            referencesData: opportunity.context?.references,
          },
        };
        const cardResponse =
          await alkemioCliClient.sdkClient.createCardOnCallout({
            data: inputArgs,
          });
        logger.info(
          `[${count}] - created new card (${cardResponse.data.createAspectOnCallout.nameID}`
        );

        //
        const visualBanner = opportunity.context?.visuals?.find(
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
  displayName: 'sxxxWelcome, please introduce yourself to the community!',
  description:
    'Please share a few words about yourself to help the community get to know each other. What brings you to this Hub and motivates you to work on these Challenges?',

  state: CalloutState.Open,
  sortOrder: 1,
  cardTemplate: {
    defaultDescription: '',
    type: 'Project',
    info: {
      description: 'asdf',
      tags: ['asdf'],
      title: '',
      visualUri: '',
    },
  },
};