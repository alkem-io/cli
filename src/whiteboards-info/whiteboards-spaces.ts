import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';
import { WhiteboardSpaceInfo } from './model/whiteboardSpaceInfo';
import XLSX from 'xlsx';

const worksheetName = 'WHITEBOARDS_SPACES';

const main = async () => {
  await whiteboardsSpacesAsExcel();
};

export const whiteboardsSpacesAsExcel = async () => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();
  await alkemioCliClient.validateConnection();

  logger.info('Fetching spaces whiteboards data from platform...');
  const whiteboardsQueryResult =
    await alkemioCliClient.sdkClient.whiteboardsSpaces();

  const spaces = whiteboardsQueryResult.data.platformAdmin?.spaces || [];

  const whiteboardsMetaInfos: WhiteboardSpaceInfo[] = [];
  let spaceL0Count = 0;
  let spaceL1Count = 0;
  let spaceL2Count = 0;

  logger.info('=== Processing Spaces Whiteboards ===');

  // Process Spaces (L0, L1, L2)
  for (const space of spaces) {
    // Process L0 Space callouts
    if (space.collaboration?.calloutsSet?.callouts) {
      for (const callout of space.collaboration.calloutsSet.callouts) {
        if (callout.framing?.whiteboard && callout.framing.type === 'WHITEBOARD') {
          const whiteboardInfo = new WhiteboardSpaceInfo();
          whiteboardInfo.TopLevelSpaceNameID = space.nameID;
          whiteboardInfo.spaceNameID = space.nameID;
          whiteboardInfo.spaceID = space.id;
          whiteboardInfo.SpaceLevel = 'L0';
          whiteboardInfo.SpaceVisibility = space.visibility || '';
          whiteboardInfo.CalloutName = callout.nameID;
          whiteboardInfo.CalloutID = callout.id;
          whiteboardInfo.WhiteboardName =
            callout.framing.whiteboard.profile?.displayName ||
            callout.framing.whiteboard.nameID;
          whiteboardInfo.WhiteboardID = callout.framing.whiteboard.id;
          whiteboardInfo.WhiteboardURL =
            callout.framing.whiteboard.profile?.url || '';
          whiteboardsMetaInfos.push(whiteboardInfo);
          spaceL0Count++;
        }
      }
    }

    // Process L1 Subspaces
    if (space.subspaces) {
      for (const subspace of space.subspaces) {
        if (subspace.collaboration?.calloutsSet?.callouts) {
          for (const callout of subspace.collaboration.calloutsSet.callouts) {
            if (callout.framing?.whiteboard && callout.framing.type === 'WHITEBOARD') {
              const whiteboardInfo = new WhiteboardSpaceInfo();
              whiteboardInfo.TopLevelSpaceNameID = space.nameID;
              whiteboardInfo.spaceNameID = subspace.nameID;
              whiteboardInfo.spaceID = subspace.id;
              whiteboardInfo.SpaceLevel = 'L1';
              whiteboardInfo.SpaceVisibility = space.visibility || '';
              whiteboardInfo.CalloutName = callout.nameID;
              whiteboardInfo.CalloutID = callout.id;
              whiteboardInfo.WhiteboardName = callout.framing.whiteboard.nameID;
              whiteboardInfo.WhiteboardID = callout.framing.whiteboard.id;
              whiteboardInfo.WhiteboardURL =
                callout.framing.whiteboard.profile?.url || '';
              whiteboardsMetaInfos.push(whiteboardInfo);
              spaceL1Count++;
            }
          }
        }

        // Process L2 Subspaces of Subspaces
        if (subspace.subspaces) {
          for (const subsubspace of subspace.subspaces) {
            if (subsubspace.collaboration?.calloutsSet?.callouts) {
              for (const callout of subsubspace.collaboration.calloutsSet
                .callouts) {
                if (callout.framing?.whiteboard && callout.framing.type === 'WHITEBOARD') {
                  const whiteboardInfo = new WhiteboardSpaceInfo();
                  whiteboardInfo.TopLevelSpaceNameID = space.nameID;
                  whiteboardInfo.spaceNameID = subsubspace.nameID;
                  whiteboardInfo.spaceID = subsubspace.id;
                  whiteboardInfo.SpaceLevel = 'L2';
                  whiteboardInfo.SpaceVisibility = space.visibility || '';
                  whiteboardInfo.CalloutName = callout.nameID;
                  whiteboardInfo.CalloutID = callout.id;
                  whiteboardInfo.WhiteboardName = callout.framing.whiteboard.nameID;
                  whiteboardInfo.WhiteboardID = callout.framing.whiteboard.id;
                  whiteboardInfo.WhiteboardURL =
                    callout.framing.whiteboard.profile?.url || '';
                  whiteboardsMetaInfos.push(whiteboardInfo);
                  spaceL2Count++;
                }
              }
            }
          }
        }
      }
    }

    logger.info(
      `Processed Space '${space.about.profile.displayName}' (${space.nameID})`
    );
  }

  logger.info(
    '\n=== Spaces Summary ===\n' +
      `Total whiteboards found: ${whiteboardsMetaInfos.length}\n` +
      `  - L0 Spaces: ${spaceL0Count}\n` +
      `  - L1 Subspaces: ${spaceL1Count}\n` +
      `  - L2 Subsubspaces: ${spaceL2Count}`
  );

  // Generate Excel file for spaces
  const date = new Date();
  const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const workbookName = `./whiteboards-spaces-${dateStr}.xlsx`;

  const workbook = XLSX.utils.book_new();
  const whiteboardsSheet = XLSX.utils.json_to_sheet(whiteboardsMetaInfos);
  XLSX.utils.book_append_sheet(workbook, whiteboardsSheet, worksheetName);

  XLSX.writeFile(workbook, workbookName);
  logger.info(`Spaces Excel file created: ${workbookName}`);
};

main().catch(error => {
  console.error(error);
});
