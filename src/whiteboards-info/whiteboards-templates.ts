import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';
import { WhiteboardTemplateInfo } from './model/whiteboardTemplateInfo';
import XLSX from 'xlsx';

const worksheetName = 'WHITEBOARDS_TEMPLATES';

const main = async () => {
  await whiteboardsTemplatesAsExcel();
};

export const whiteboardsTemplatesAsExcel = async () => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();

  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();
  await alkemioCliClient.validateConnection();

  logger.info('Fetching templates whiteboards data from platform...');
  const whiteboardsQueryResult =
    await alkemioCliClient.sdkClient.whiteboardsTemplates();

  const innovationPacks =
    whiteboardsQueryResult.data.platformAdmin?.innovationPacks || [];

  const whiteboardsMetaInfos: WhiteboardTemplateInfo[] = [];
  let templateCount = 0;
  let templateContentSpaceCount = 0;

  logger.info('\n=== Processing Templates Whiteboards ===');

  // Process Innovation Packs (Templates)
  for (const innovationPack of innovationPacks) {
    const accountProvider = innovationPack.provider?.profile.displayName || '';

    if (innovationPack.templatesSet?.templates) {
      for (const template of innovationPack.templatesSet.templates) {
        // Process template callout whiteboard
        if (template.callout?.framing?.whiteboard && template.callout.framing.type === 'WHITEBOARD') {
          const whiteboardInfo = new WhiteboardTemplateInfo();
          whiteboardInfo.TemplateNameID = innovationPack.nameID;
          whiteboardInfo.TemplateID = innovationPack.id;
          whiteboardInfo.TemplateLevel = 'Template';
          whiteboardInfo.CalloutName = template.callout.nameID;
          whiteboardInfo.CalloutID = template.callout.id;
          whiteboardInfo.WhiteboardName =
            template.callout.framing.whiteboard.nameID;
          whiteboardInfo.WhiteboardID = template.callout.framing.whiteboard.id;
          whiteboardInfo.WhiteboardURL =
            template.callout.framing.whiteboard.profile?.url || '';
          whiteboardInfo.AccountProvider = accountProvider;
          whiteboardsMetaInfos.push(whiteboardInfo);
          templateCount++;
        }

        // Process contentSpace callouts
        if (template.contentSpace?.collaboration?.calloutsSet?.callouts) {
          for (const callout of template.contentSpace.collaboration.calloutsSet
            .callouts) {
            if (callout.framing?.whiteboard && callout.framing.type === 'WHITEBOARD') {
              const whiteboardInfo = new WhiteboardTemplateInfo();
              whiteboardInfo.TemplateNameID = innovationPack.nameID;
              whiteboardInfo.TemplateID = template.contentSpace.id;
              whiteboardInfo.TemplateLevel = 'Template-L0';
              whiteboardInfo.CalloutName = callout.nameID;
              whiteboardInfo.CalloutID = callout.id;
              whiteboardInfo.WhiteboardName = callout.framing.whiteboard.nameID;
              whiteboardInfo.WhiteboardID = callout.framing.whiteboard.id;
              whiteboardInfo.WhiteboardURL =
                callout.framing.whiteboard.profile?.url || '';
              whiteboardInfo.AccountProvider = accountProvider;
              whiteboardsMetaInfos.push(whiteboardInfo);
              templateContentSpaceCount++;
            }
          }

          // Process contentSpace L1 subspaces
          if (template.contentSpace.subspaces) {
            for (const subspace of template.contentSpace.subspaces) {
              if (subspace.collaboration?.calloutsSet?.callouts) {
                for (const callout of subspace.collaboration.calloutsSet
                  .callouts) {
                  if (callout.framing?.whiteboard && callout.framing.type === 'WHITEBOARD') {
                    const whiteboardInfo = new WhiteboardTemplateInfo();
                    whiteboardInfo.TemplateNameID = innovationPack.nameID;
                    whiteboardInfo.TemplateID = subspace.id;
                    whiteboardInfo.TemplateLevel = 'Template-L1';
                    whiteboardInfo.CalloutName = callout.nameID;
                    whiteboardInfo.CalloutID = callout.id;
                    whiteboardInfo.WhiteboardName =
                      callout.framing.whiteboard.nameID;
                    whiteboardInfo.WhiteboardID = callout.framing.whiteboard.id;
                    whiteboardInfo.WhiteboardURL =
                      callout.framing.whiteboard.profile?.url || '';
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
                    for (const callout of subsubspace.collaboration.calloutsSet
                      .callouts) {
                      if (callout.framing?.whiteboard && callout.framing.type === 'WHITEBOARD') {
                        const whiteboardInfo = new WhiteboardTemplateInfo();
                        whiteboardInfo.TemplateNameID = innovationPack.nameID;
                        whiteboardInfo.TemplateID = subsubspace.id;
                        whiteboardInfo.TemplateLevel = 'Template-L2';
                        whiteboardInfo.CalloutName = callout.nameID;
                        whiteboardInfo.CalloutID = callout.id;
                        whiteboardInfo.WhiteboardName =
                          callout.framing.whiteboard.nameID;
                        whiteboardInfo.WhiteboardID =
                          callout.framing.whiteboard.id;
                        whiteboardInfo.WhiteboardURL =
                          callout.framing.whiteboard.profile?.url || '';
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

    logger.info(`Processed Innovation Pack '${innovationPack.nameID}'`);
  }

  logger.info(
    '\n=== Templates Summary ===\n' +
      `Total whiteboards found: ${whiteboardsMetaInfos.length}\n` +
      `  - Template Callouts: ${templateCount}\n` +
      `  - Template ContentSpace: ${templateContentSpaceCount}`
  );

  // Generate Excel file for templates
  const date = new Date();
  const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const workbookName = `./whiteboards-templates-${dateStr}.xlsx`;

  const workbook = XLSX.utils.book_new();
  const whiteboardsSheet = XLSX.utils.json_to_sheet(whiteboardsMetaInfos);
  XLSX.utils.book_append_sheet(workbook, whiteboardsSheet, worksheetName);

  XLSX.writeFile(workbook, workbookName);
  logger.info(`Templates Excel file created: ${workbookName}`);
};

main().catch(error => {
  console.error(error);
});
