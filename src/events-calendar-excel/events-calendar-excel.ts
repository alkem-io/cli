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

const INPUT_FILE_LOCATIONS = [
  './events-calendar-input.xlsx', './src/events-calendar-excel/events-calendar-input.xlsx',
];
const EXPECTED_DATE_FORMAT = 'dd/MM/yyyy'; // Spreadsheet date format
const EXPECTED_TIME_FORMAT = 'HH:mm'; // Spreadsheet time format

function parseDateWithFormat(
  dateStr: string | number,
  format: string
): Date | undefined {
  // Handle Excel serial date numbers
  if (
    typeof dateStr === 'number' ||
    (!isNaN(Number(dateStr)) && dateStr !== '')
  ) {
    // Excel's epoch starts at 1899-12-30
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const days = Number(dateStr);
    if (!isNaN(days)) {
      const ms = days * 24 * 60 * 60 * 1000;
      return new Date(excelEpoch.getTime() + ms);
    }
  }
  // Only supports dd/MM/yyyy for now
  if (!dateStr || typeof dateStr !== 'string') return undefined;
  const parts = dateStr.split('/');
  if (format === 'dd/MM/yyyy' && parts.length === 3) {
    const [day, month, year] = parts;
    if (
      day.length === 2 &&
      month.length === 2 &&
      year.length === 4 &&
      !isNaN(Number(day)) &&
      !isNaN(Number(month)) &&
      !isNaN(Number(year))
    ) {
      // JS Date: yyyy-mm-dd
      return new Date(
        `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      );
    }
  }
  return undefined;
}

function parseTimeWithFormat(
  timeStr: string | number,
  format: string
): { hours: number; minutes: number } | undefined {
  // Handle Excel serial time numbers (fraction of a day)
  if (
    typeof timeStr === 'number' ||
    (!isNaN(Number(timeStr)) && timeStr !== '')
  ) {
    const fraction = Number(timeStr);
    if (fraction >= 0 && fraction < 1) {
      const totalMinutes = Math.round(fraction * 24 * 60);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return { hours, minutes };
    }
  }
  // Only supports HH:mm for now
  if (!timeStr || typeof timeStr !== 'string') return undefined;
  const parts = timeStr.split(':');
  if (format === 'HH:mm' && parts.length === 2) {
    const [hours, minutes] = parts.map(Number);
    if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
      return { hours, minutes };
    }
  }
  return undefined;
}

const main = async () => {
  const logger = createLogger();
  const config = createConfigUsingEnvVars();
  const alkemioCliClient = new AlkemioCliClient(config, logger);
  await alkemioCliClient.initialise();
  await alkemioCliClient.logUser();
  await alkemioCliClient.validateConnection();

  let workbook: XLSX.WorkBook | undefined = undefined;
  for (const location of INPUT_FILE_LOCATIONS) {
    try {
      logger.info(`Reading input Excel file: ${location}`);
      workbook = XLSX.readFile(location);
      logger.info(`...file found at location: ${location}`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: unknown) {
      logger.info(`...file not found at location: ${location}`);
      // ignore
    }
  }
  if (!workbook) {
    console.error(
      `Unable to load excel file from one of the locations: ${INPUT_FILE_LOCATIONS}`
    );
    process.exit(1);
  }
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
        startTime: row['START_TIME'] ? String(row['START_TIME']) : undefined,
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
    const validEventTypes = Object.values(CalendarEventType) as string[];
    if (validEventTypes.includes(eventData.type)) {
      eventType = eventData.type as CalendarEventType;
    } else {
      logger.warn(`Unknown event type: ${eventData.type}, skipping event.`);
      continue;
    }

    // Check durationMinutes is specified and > 0
    if (
      eventData.durationMinutes === undefined ||
      isNaN(Number(eventData.durationMinutes)) ||
      Number(eventData.durationMinutes) <= 0
    ) {
      logger.warn(
        `Invalid durationMinutes (must be specified and > 0): ${eventData.durationMinutes}, skipping event.`
      );
      continue;
    }

    // Check startDate and startTime are valid and combine them
    const parsedStartDate: Date | undefined = parseDateWithFormat(
      eventData.startDate,
      EXPECTED_DATE_FORMAT
    );
    // If not a valid date, log a warning and skip the event
    if (!parsedStartDate) {
      logger.warn(
        `Invalid startDate/startTime (must be a valid date/time in ${EXPECTED_DATE_FORMAT} format): ${eventData.startDate}, skipping event.`
      );
      continue;
    }
    if (!eventData.wholeDay) {
      // parse the start Time
      const parsedTime = parseTimeWithFormat(
        eventData.startTime ?? '',
        EXPECTED_TIME_FORMAT
      );
      if (!parsedTime) {
        logger.warn(
          `Invalid startTime (must be in ${EXPECTED_TIME_FORMAT} format): ${eventData.startTime}, skipping event.`
        );
        continue;
      }
      // Combine parsedStartDate and startTime into a new Date object
      // Set hours and minutes as UTC to avoid local time zone offset
      parsedStartDate.setUTCHours(parsedTime.hours, parsedTime.minutes, 0, 0);
      logger.verbose(
        `Parsed start date and time (UTC): ${parsedStartDate.toUTCString()} | (ISO): ${parsedStartDate.toISOString()}`
      );
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
      startDate: parsedStartDate,
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
        eventDataToSubmit.nameID !== undefined
          ? String(eventDataToSubmit.nameID)
          : undefined,
      profileData: {
        displayName: String(eventDataToSubmit.profileDisplayName),
        description: String(eventDataToSubmit.profileDescription),
      },
      // Ensure startDate is a Date object for DateTime
      startDate: eventDataToSubmit.startDate,
      tags: Array.isArray(eventDataToSubmit.profileTags)
        ? eventDataToSubmit.profileTags.map((t: unknown) => String(t))
        : [],
      visibleOnParentCalendar: Boolean(
        eventDataToSubmit.visibleOnParentCalendar
      ),
      type: eventDataToSubmit.type,
      wholeDay: Boolean(eventDataToSubmit.wholeDay),
    };
    logger.info(`Prepared input DTO: ${JSON.stringify(inputDto)}`);
    try {
      const result = await alkemioCliClient.sdkClient.createEventOnCalendar({
        eventData: inputDto,
      });
      logger.info(
        `Event created with id: ${result.data.createEventOnCalendar.id}`
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      logger.error(
        `Failed to create event for row: ${eventDataToSubmit.profileDisplayName}. Error: ${error.message}`
      );
    }
  }
};

main().catch(error => {
  console.error('Fatal error:', error);
});
