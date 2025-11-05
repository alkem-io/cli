import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';
import { WhiteboardMetaInfo } from './model/whiteboardMetaInfo';
import XLSX from 'xlsx';

const worksheetName = 'WHITEBOARDS';

const main = async () => {
  await whiteboardsInfoAsExcel();
};

export const whiteboardsInfoAsExcel = async () => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();
  await alkemioCliClient.validateConnection();

  logger.info('Fetching whiteboards data from platform...');
  const whiteboardsQueryResult =
    await alkemioCliClient.sdkClient.whiteboardsInfo();

  const spaces = whiteboardsQueryResult.data.spaces || [];
  const accounts = whiteboardsQueryResult.data.accounts || [];
  const whiteboardsMetaInfos: WhiteboardMetaInfo[] = [];

  let spaceL0Count = 0;
  let spaceL1Count = 0;
  let spaceL2Count = 0;
  let templateCount = 0;

  // Process Spaces (L0, L1, L2)
  for (const space of spaces) {
    const accountProvider = space.account.host?.profile.displayName || 'unknown';

    // Process L0 Space callouts
    if (space.collaboration?.calloutsSet?.callouts) {
      for (const callout of space.collaboration.calloutsSet.callouts) {
        if (callout.framing?.whiteboard) {
          const whiteboardInfo = new WhiteboardMetaInfo();
          whiteboardInfo.LocationType = 'Space';
          whiteboardInfo.SpaceTemplateName = space.about.profile.displayName;
          whiteboardInfo.SpaceTemplateID = space.id;
          whiteboardInfo.SpaceLevel = 'L0';
          whiteboardInfo.CalloutName = callout.framing.profile?.displayName || callout.nameID;
          whiteboardInfo.CalloutID = callout.id;
          whiteboardInfo.WhiteboardName = callout.framing.whiteboard.profile?.displayName || callout.framing.whiteboard.nameID;
          whiteboardInfo.WhiteboardID = callout.framing.whiteboard.id;
          whiteboardInfo.WhiteboardURL = callout.framing.profile?.url || '';
          whiteboardInfo.AccountProvider = accountProvider;
          whiteboardsMetaInfos.push(whiteboardInfo);
          spaceL0Count++;
        }
      }
    }

    // Process L1 Subspaces
    if (space.subspaces) {
      for (const subspace of space.subspaces) {
        const subspaceAccountProvider = subspace.account.host?.profile.displayName || accountProvider;

        if (subspace.collaboration?.calloutsSet?.callouts) {
          for (const callout of subspace.collaboration.calloutsSet.callouts) {
            if (callout.framing?.whiteboard) {
              const whiteboardInfo = new WhiteboardMetaInfo();
              whiteboardInfo.LocationType = 'Space';
              whiteboardInfo.SpaceTemplateName = subspace.about.profile.displayName;
              whiteboardInfo.SpaceTemplateID = subspace.id;
              whiteboardInfo.SpaceLevel = 'L1';
              whiteboardInfo.CalloutName = callout.framing.profile?.displayName || callout.nameID;
              whiteboardInfo.CalloutID = callout.id;
              whiteboardInfo.WhiteboardName = callout.framing.whiteboard.profile?.displayName || callout.framing.whiteboard.nameID;
              whiteboardInfo.WhiteboardID = callout.framing.whiteboard.id;
              whiteboardInfo.WhiteboardURL = callout.framing.profile?.url || '';
              whiteboardInfo.AccountProvider = subspaceAccountProvider;
              whiteboardsMetaInfos.push(whiteboardInfo);
              spaceL1Count++;
            }
          }
        }

        // Process L2 Subspaces of Subspaces
        if (subspace.subspaces) {
          for (const subsubspace of subspace.subspaces) {
            const subsubspaceAccountProvider = subsubspace.account.host?.profile.displayName || subspaceAccountProvider;

            if (subsubspace.collaboration?.calloutsSet?.callouts) {
              for (const callout of subsubspace.collaboration.calloutsSet.callouts) {
                if (callout.framing?.whiteboard) {
                  const whiteboardInfo = new WhiteboardMetaInfo();
                  whiteboardInfo.LocationType = 'Space';
                  whiteboardInfo.SpaceTemplateName = subsubspace.about.profile.displayName;
                  whiteboardInfo.SpaceTemplateID = subsubspace.id;
                  whiteboardInfo.SpaceLevel = 'L2';
                  whiteboardInfo.CalloutName = callout.framing.profile?.displayName || callout.nameID;
                  whiteboardInfo.CalloutID = callout.id;
                  whiteboardInfo.WhiteboardName = callout.framing.whiteboard.profile?.displayName || callout.framing.whiteboard.nameID;
                  whiteboardInfo.WhiteboardID = callout.framing.whiteboard.id;
                  whiteboardInfo.WhiteboardURL = callout.framing.profile?.url || '';
                  whiteboardInfo.AccountProvider = subsubspaceAccountProvider;
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

  // Process Innovation Packs (Templates)
  for (const account of accounts) {
    if (account.innovationPacks) {
      for (const innovationPack of account.innovationPacks) {
        const accountProvider = innovationPack.provider?.profile.displayName ||
                               account.host?.profile.displayName ||
                               'unknown';

        if (innovationPack.templatesSet?.templates) {
          for (const template of innovationPack.templatesSet.templates) {
            if (template.callout?.framing?.whiteboard) {
              const whiteboardInfo = new WhiteboardMetaInfo();
              whiteboardInfo.LocationType = 'Template';
              whiteboardInfo.SpaceTemplateName = innovationPack.profile.displayName;
              whiteboardInfo.SpaceTemplateID = innovationPack.id;
              whiteboardInfo.SpaceLevel = 'Template';
              whiteboardInfo.CalloutName = template.callout.framing.profile?.displayName || template.callout.nameID;
              whiteboardInfo.CalloutID = template.callout.id;
              whiteboardInfo.WhiteboardName = template.callout.framing.whiteboard.profile?.displayName || template.callout.framing.whiteboard.nameID;
              whiteboardInfo.WhiteboardID = template.callout.framing.whiteboard.id;
              whiteboardInfo.WhiteboardURL = template.callout.framing.profile?.url || '';
              whiteboardInfo.AccountProvider = accountProvider;
              whiteboardsMetaInfos.push(whiteboardInfo);
              templateCount++;
            }
          }
        }

        logger.info(
          `Processed Innovation Pack '${innovationPack.profile.displayName}' (${innovationPack.nameID})`
        );
      }
    }
  }

  logger.info(
    '\n=== Summary ===\n' +
      `Total whiteboards found: ${whiteboardsMetaInfos.length}\n` +
      `  - L0 Spaces: ${spaceL0Count}\n` +
      `  - L1 Subspaces: ${spaceL1Count}\n` +
      `  - L2 Subsubspaces: ${spaceL2Count}\n` +
      `  - Templates: ${templateCount}`
  );

  // Generate Excel file
  const date = new Date();
  const dateStr = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const workbookName = `./whiteboards-info-${dateStr}.xlsx`;

  const workbook = XLSX.utils.book_new();
  const whiteboardsSheet = XLSX.utils.json_to_sheet(whiteboardsMetaInfos);
  XLSX.utils.book_append_sheet(workbook, whiteboardsSheet, worksheetName);

  XLSX.writeFile(workbook, workbookName);
  logger.info(`Excel file created: ${workbookName}`);
};

main().catch(error => {
  console.error(error);
});
