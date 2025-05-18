// This script reads an Excel file with event data and creates events on the Alkemio calendar using the GraphQL API.
import { createConfigUsingEnvVars } from '../util/create-config-using-envvars';
import { AlkemioCliClient } from '../client/AlkemioCliClient';
import { createLogger } from '../util/create-logger';
import XLSX from 'xlsx';
import { CalendarEventExcelInput } from './model/calendarEventExcelInput';
import {
  CreateCalendarEventOnCalendarInput,
  CalendarEventType,
} from '@alkemio/client-lib';
import { CalendarEventExcelForSubmission } from './model/calendarEventExcelForSubmission';
import { UUID } from 'crypto';

const INPUT_FILE = './src/events-calendar-excel/events-calendar-input.xlsx';

const main = async () => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();
  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();
  await alkemioCliClient.validateConnection();

  logger.info(`Reading input Excel file: ${INPUT_FILE}`);
  const workbook = XLSX.readFile(INPUT_FILE);
  const sheetName = workbook.SheetNames[0];
  const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
    defval: '',
  });

  // Find the first row that is not empty (i.e., has a CALENDER_ID and at least one other field)
  const firstDataRowIndex = rows.findIndex(rowObj => {
    const row = rowObj as { [key: string]: string | number | boolean };
    return row['CALENDER_ID'] && String(row['CALENDER_ID']).trim() !== '';
  });

  if (firstDataRowIndex === -1) {
    logger.error('No valid data rows found in the Excel file.');
    return;
  }
  const eventsToCreate: CalendarEventExcelInput[] = [];

  for (let i = firstDataRowIndex; i < rows.length; i++) {
    const row = rows[i] as { [key: string]: string | number | boolean };
    try {
      // Map Excel columns (UPPER_SNAKE_CASE) to eventData fields (camelCase)
      const eventData: CalendarEventExcelInput = {
        calendarID: row['CALENDER_ID'] as string,
        durationDays: row['DURATION_DAYS']
          ? parseFloat(String(row['DURATION_DAYS']))
          : undefined,
        durationMinutes: parseFloat(String(row['DURATION_MINUTES'])),
        multipleDays:
          row['MULTIPLE_DAYS'] === 'true' || row['MULTIPLE_DAYS'] === true,
        nameID: row['NAME_ID'] ? String(row['NAME_ID']) : undefined,
        profileTags: row['TAGS']
          ? String(row['TAGS'])
              .split(',')
              .map(t => t.trim())
          : [],
        profileDisplayName: row['DISPLAY_NAME'] as string,
        profileDescription: row['DESCRIPTION'] as string,
        startDate: row['START_DATE'] as string,
        type: row['TYPE'] as string,
        visibleOnParentCalendar:
          row['VISIBLE_ON_PARENT_CALENDAR'] === 'true' ||
          row['VISIBLE_ON_PARENT_CALENDAR'] === true,
        wholeDay: row['WHOLE_DAY'] === 'true' || row['WHOLE_DAY'] === true,
      };
      logger.info(`Adding event to create: ${eventData.profileDisplayName}`);
      eventsToCreate.push(eventData);
    } catch (error) {
      logger.error(
        `Failed to create event for row: ${JSON.stringify(row)}. Error: ${error}`
      );
    }
  }

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const inputsForSubmission: CalendarEventExcelForSubmission[] = [];
  for (const eventData of eventsToCreate) {
    // Validate calendarID is a UUID
    if (!uuidRegex.test(String(eventData.calendarID))) {
      logger.error(
        `Invalid calendarID (not a UUID): ${eventData.calendarID}, skipping event.`
      );
      continue;
    }
    // Validate nameID (if present) only allows lowercase letters, numbers, and '-'
    if (eventData.nameID && !/^[a-z0-9-]+$/.test(eventData.nameID)) {
      logger.warn(
        `Invalid nameID (must be lowercase letters, numbers, and '-'): ${eventData.nameID}, skipping event.`
      );
      continue;
    }

    // Prepare input DTO for mutation with correct type casting
    let eventType: CalendarEventType | undefined = undefined;
    if (
      Object.values(CalendarEventType).includes(
        eventData.type as CalendarEventType
      )
    ) {
      eventType = eventData.type as CalendarEventType;
    } else {
      logger.warn(`Unknown event type: ${eventData.type}, skipping event.`);
      continue;
    }

    // map over the
    const inputForSubmission: CalendarEventExcelForSubmission = {
      calendarID: eventData.calendarID as UUID,
      durationDays: eventData.durationDays,
      durationMinutes: eventData.durationMinutes,
      multipleDays: eventData.multipleDays,
      nameID: eventData.nameID,
      profileTags: eventData.profileTags,
      profileDisplayName: eventData.profileDisplayName,
      profileDescription: eventData.profileDescription,
      startDate: new Date(eventData.startDate),
      type: eventType,
      visibleOnParentCalendar: eventData.visibleOnParentCalendar,
      wholeDay: eventData.wholeDay,
    };
    inputsForSubmission.push(inputForSubmission);
  }

  // Validate all the data

  // Have the events, now log how many there are and convert the data
  logger.info(`Total events to create: ${eventsToCreate.length}`);
  for (const eventDataToSubmit of inputsForSubmission) {
    const inputDto: CreateCalendarEventOnCalendarInput = {
      calendarID: String(eventDataToSubmit.calendarID),
      durationDays:
        eventDataToSubmit.durationDays !== undefined
          ? Number(eventDataToSubmit.durationDays)
          : undefined,
      durationMinutes: Number(eventDataToSubmit.durationMinutes),
      multipleDays: Boolean(eventDataToSubmit.multipleDays),
      nameID:
        eventDataToSubmit.nameID !== undefined ? String(eventDataToSubmit.nameID) : undefined,
      profileData: {
        displayName: String(eventDataToSubmit.profileDisplayName),
        description: String(eventDataToSubmit.profileDescription),
      },
      // Ensure startDate is a Date object for DateTime
      startDate: eventDataToSubmit.startDate,
      tags: Array.isArray(eventDataToSubmit.profileTags)
        ? eventDataToSubmit.profileTags.map((t: unknown) => String(t))
        : [],
      visibleOnParentCalendar: Boolean(eventDataToSubmit.visibleOnParentCalendar),
      type: eventDataToSubmit.type,
      wholeDay: Boolean(eventDataToSubmit.wholeDay),
    };
    logger.info(`Prepared input DTO: ${JSON.stringify(inputDto)}`);
    const result = await alkemioCliClient.sdkClient.createEventOnCalendar({
      eventData: inputDto,
    });
    logger.info(`Event created with id: ${result.data.createEventOnCalendar.id}`);
  }
};

main().catch(error => {
  console.error('Fatal error:', error);
});
