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

  const spaces = whiteboardsQueryResult.data.platformAdmin?.spaces || [];
  const innovationPacks =
    whiteboardsQueryResult.data.platformAdmin?.innovationPacks || [];
  const whiteboardsMetaInfos: WhiteboardMetaInfo[] = [];

  let spaceL0Count = 0;
  let spaceL1Count = 0;
  let spaceL2Count = 0;
  let templateCount = 0;
  let templateContentSpaceCount = 0;

  // Process Spaces (L0, L1, L2)
  for (const space of spaces) {

    // Process L0 Space callouts
    if (space.collaboration?.calloutsSet?.callouts) {
      for (const callout of space.collaboration.calloutsSet.callouts) {
        if (callout.framing?.whiteboard) {
          const whiteboardInfo = new WhiteboardMetaInfo();
          whiteboardInfo.LocationType = 'Space';
          whiteboardInfo.SpaceTemplateName = space.about.profile.displayName;
          whiteboardInfo.SpaceTemplateID = space.id;
          whiteboardInfo.SpaceLevel = 'L0';
          whiteboardInfo.SpaceVisibility = space.visibility || '';
          whiteboardInfo.CalloutName = callout.nameID;
          whiteboardInfo.CalloutID = callout.id;
          whiteboardInfo.WhiteboardName = callout.framing.whiteboard.profile?.displayName || callout.framing.whiteboard.nameID;
          whiteboardInfo.WhiteboardID = callout.framing.whiteboard.id;
          whiteboardInfo.WhiteboardURL = callout.framing.whiteboard.profile?.url || '';
          whiteboardInfo.AccountProvider = '';
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
            if (callout.framing?.whiteboard) {
              const whiteboardInfo = new WhiteboardMetaInfo();
              whiteboardInfo.LocationType = 'Space';
              whiteboardInfo.SpaceTemplateName = subspace.nameID;
              whiteboardInfo.SpaceTemplateID = subspace.id;
              whiteboardInfo.SpaceLevel = 'L1';
              whiteboardInfo.SpaceVisibility = space.visibility || '';
              whiteboardInfo.CalloutName = callout.id;
              whiteboardInfo.CalloutID = callout.id;
              whiteboardInfo.WhiteboardName = callout.framing.whiteboard.id;
              whiteboardInfo.WhiteboardID = callout.framing.whiteboard.id;
              whiteboardInfo.WhiteboardURL = callout.framing.whiteboard.profile?.url || '';
              whiteboardInfo.AccountProvider = '';
              whiteboardsMetaInfos.push(whiteboardInfo);
              spaceL1Count++;
            }
          }
        }

        // Process L2 Subspaces of Subspaces
        if (subspace.subspaces) {
          for (const subsubspace of subspace.subspaces) {
            if (subsubspace.collaboration?.calloutsSet?.callouts) {
              for (const callout of subsubspace.collaboration.calloutsSet.callouts) {
                if (callout.framing?.whiteboard) {
                  const whiteboardInfo = new WhiteboardMetaInfo();
                  whiteboardInfo.LocationType = 'Space';
                  whiteboardInfo.SpaceTemplateName = subsubspace.nameID;
                  whiteboardInfo.SpaceTemplateID = subsubspace.id;
                  whiteboardInfo.SpaceLevel = 'L2';
                  whiteboardInfo.SpaceVisibility = space.visibility || '';
                  whiteboardInfo.CalloutName = callout.id;
                  whiteboardInfo.CalloutID = callout.id;
                  whiteboardInfo.WhiteboardName = callout.framing.whiteboard.id;
                  whiteboardInfo.WhiteboardID = callout.framing.whiteboard.id;
                  whiteboardInfo.WhiteboardURL = callout.framing.whiteboard.profile?.url || '';
                  whiteboardInfo.AccountProvider = '';
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
  for (const innovationPack of innovationPacks) {
    const accountProvider = innovationPack.provider?.profile.displayName || '';

    if (innovationPack.templatesSet?.templates) {
      for (const template of innovationPack.templatesSet.templates) {
        // Process template callout whiteboard
        if (template.callout?.framing?.whiteboard) {
          const whiteboardInfo = new WhiteboardMetaInfo();
          whiteboardInfo.LocationType = 'Template';
          whiteboardInfo.SpaceTemplateName = innovationPack.nameID;
          whiteboardInfo.SpaceTemplateID = innovationPack.id;
          whiteboardInfo.SpaceLevel = 'Template';
          whiteboardInfo.SpaceVisibility = '';
          whiteboardInfo.CalloutName = template.callout.nameID;
          whiteboardInfo.CalloutID = template.callout.id;
          whiteboardInfo.WhiteboardName = template.callout.framing.whiteboard.nameID;
          whiteboardInfo.WhiteboardID = template.callout.framing.whiteboard.id;
          whiteboardInfo.WhiteboardURL = template.callout.framing.whiteboard.profile?.url || '';
          whiteboardInfo.AccountProvider = accountProvider;
          whiteboardsMetaInfos.push(whiteboardInfo);
          templateCount++;
        }

        // Process contentSpace callouts
        if (template.contentSpace?.collaboration?.calloutsSet?.callouts) {
          for (const callout of template.contentSpace.collaboration.calloutsSet.callouts) {
            if (callout.framing?.whiteboard) {
              const whiteboardInfo = new WhiteboardMetaInfo();
              whiteboardInfo.LocationType = 'Template';
              whiteboardInfo.SpaceTemplateName = `${innovationPack.nameID} (contentSpace)`;
              whiteboardInfo.SpaceTemplateID = template.contentSpace.id;
              whiteboardInfo.SpaceLevel = 'Template-L0';
              whiteboardInfo.SpaceVisibility = '';
              whiteboardInfo.CalloutName = callout.nameID;
              whiteboardInfo.CalloutID = callout.id;
              whiteboardInfo.WhiteboardName = callout.framing.whiteboard.nameID;
              whiteboardInfo.WhiteboardID = callout.framing.whiteboard.id;
              whiteboardInfo.WhiteboardURL = callout.framing.whiteboard.profile?.url || '';
              whiteboardInfo.AccountProvider = accountProvider;
              whiteboardsMetaInfos.push(whiteboardInfo);
              templateContentSpaceCount++;
            }
          }

          // Process contentSpace L1 subspaces
          if (template.contentSpace.subspaces) {
            for (const subspace of template.contentSpace.subspaces) {
              if (subspace.collaboration?.calloutsSet?.callouts) {
                for (const callout of subspace.collaboration.calloutsSet.callouts) {
                  if (callout.framing?.whiteboard) {
                    const whiteboardInfo = new WhiteboardMetaInfo();
                    whiteboardInfo.LocationType = 'Template';
                    whiteboardInfo.SpaceTemplateName = `${innovationPack.nameID} (contentSpace-L1)`;
                    whiteboardInfo.SpaceTemplateID = subspace.id;
                    whiteboardInfo.SpaceLevel = 'Template-L1';
                    whiteboardInfo.SpaceVisibility = '';
                    whiteboardInfo.CalloutName = callout.nameID;
                    whiteboardInfo.CalloutID = callout.id;
                    whiteboardInfo.WhiteboardName = callout.framing.whiteboard.nameID;
                    whiteboardInfo.WhiteboardID = callout.framing.whiteboard.id;
                    whiteboardInfo.WhiteboardURL = callout.framing.whiteboard.profile?.url || '';
                    whiteboardInfo.AccountProvider = accountProvider;
                    whiteboardsMetaInfos.push(whiteboardInfo);
                    templateContentSpaceCount++;
                  }
                }
              }

              // Process contentSpace L2 subspaces
              if (subspace.subspaces) {
                for (const subsubspace of subspace.subspaces) {
                  if (subsubspace.collaboration?.calloutsSet?.callouts) {
                    for (const callout of subsubspace.collaboration.calloutsSet.callouts) {
                      if (callout.framing?.whiteboard) {
                        const whiteboardInfo = new WhiteboardMetaInfo();
                        whiteboardInfo.LocationType = 'Template';
                        whiteboardInfo.SpaceTemplateName = `${innovationPack.nameID} (contentSpace-L2)`;
                        whiteboardInfo.SpaceTemplateID = subsubspace.id;
                        whiteboardInfo.SpaceLevel = 'Template-L2';
                        whiteboardInfo.CalloutName = callout.nameID;
                        whiteboardInfo.SpaceVisibility = '';
                    whiteboardInfo.CalloutID = callout.id;
                        whiteboardInfo.WhiteboardName = callout.framing.whiteboard.nameID;
                        whiteboardInfo.WhiteboardID = callout.framing.whiteboard.id;
                        whiteboardInfo.WhiteboardURL = callout.framing.whiteboard.profile?.url || '';
                        whiteboardInfo.AccountProvider = accountProvider;
                        whiteboardsMetaInfos.push(whiteboardInfo);
                        templateContentSpaceCount++;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    logger.info(
      `Processed Innovation Pack '${innovationPack.nameID}'`
    );
  }

  logger.info(
    '\n=== Summary ===\n' +
      `Total whiteboards found: ${whiteboardsMetaInfos.length}\n` +
      `  - L0 Spaces: ${spaceL0Count}\n` +
      `  - L1 Subspaces: ${spaceL1Count}\n` +
      `  - L2 Subsubspaces: ${spaceL2Count}\n` +
      `  - Template Callouts: ${templateCount}\n` +
      `  - Template ContentSpace: ${templateContentSpaceCount}`
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
