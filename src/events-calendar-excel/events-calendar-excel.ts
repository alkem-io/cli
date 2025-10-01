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
import { DateTime } from 'luxon';
import { CalendarEventExcelRow } from './model/calendar-event-excel-row';

const INPUT_FILE_LOCATIONS = [
  './events-calendar-input.xlsx',
  './src/events-calendar-excel/events-calendar-input.xlsx',
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
  const rows: CalendarEventExcelRow[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
    defval: '',
  });

  // Find the first row that is not empty (i.e., has a CALENDAR_ID and at least one other field)
  const firstDataRowIndex = rows.findIndex(rowObj => {
    const row = rowObj;
    return row['CALENDAR_ID'] && String(row['CALENDAR_ID']).trim() !== '';
  });

  if (firstDataRowIndex === -1) {
    logger.error('No valid data rows found in the Excel file.');
    return;
  }
  const eventsToCreate: CalendarEventExcelInput[] = [];

  for (let i = firstDataRowIndex; i < rows.length; i++) {
    const row = rows[i];
    try {
      // Map Excel columns (UPPER_SNAKE_CASE) to eventData fields (camelCase)
      const eventData: CalendarEventExcelInput = {
        calendarID: row['CALENDAR_ID'] as string,
        timezone: row['TIMEZONE'] as string,
        durationDays: row['DURATION_DAYS']
          ? parseFloat(String(row['DURATION_DAYS']))
          : undefined,
        multipleDays:
          row['MULTIPLE_DAYS'] === 'true' || row['MULTIPLE_DAYS'] === true,
        nameID: row['NAME_ID'] ? String(row['NAME_ID']) : undefined,
        profileTags: row['TAGS']
          ? String(row['TAGS'])
              .split(',')
              .map(t => t.trim())
          : [],
        profileDisplayName: row['TITLE'] as string,
        profileDescription: row['DESCRIPTION'] as string,
        startDate: row['START_DATE'] as string,
        startTime: row['START_TIME'] ? String(row['START_TIME']) : undefined,
        endDate: row['END_DATE'] ? String(row['END_DATE']) : undefined,
        endTime: row['END_TIME'] ? String(row['END_TIME']) : undefined,
        type: row['TYPE'] as string,
        visibleOnParentCalendar:
          row['VISIBLE_ON_PARENT_CALENDAR'] === 'true' ||
          row['VISIBLE_ON_PARENT_CALENDAR'] === true,
        wholeDay: row['WHOLE_DAY'] === 'true' || row['WHOLE_DAY'] === true,
        location: row['LOCATION'] ? String(row['LOCATION']) : undefined,
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
    // Matches "+H", "+HH", "-H", "-HH" or "0"
    const timezoneRegex = /^(?:[+-]\d{1,2}|0)$/;
    if (!eventData.timezone || !timezoneRegex.test(eventData.timezone)) {
      logger.error(
        'Invalid or missing timezone, skipping event.'
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
    let parsedEndDate: Date | undefined = undefined;
    if (eventData.wholeDay) {
      // For whole day, end date is start date + 1 day
      parsedEndDate = new Date(parsedStartDate.getTime());
      parsedEndDate.setDate(parsedEndDate.getDate() + 1);
    } else {
      // parse the end date and time
      parsedEndDate = parseDateWithFormat(
        eventData.endDate ?? '',
        EXPECTED_DATE_FORMAT
      );
      if (!parsedEndDate) {
        logger.warn(
          `Invalid endDate (must be a valid date in ${EXPECTED_DATE_FORMAT} format): ${eventData.endDate}, skipping event.`
        );
        continue;
      }
      // parse the start Time
      const parsedStartTime = parseTimeWithFormat(
        eventData.startTime ?? '',
        EXPECTED_TIME_FORMAT
      );
      if (!parsedStartTime) {
        logger.warn(
          `Invalid startTime (must be in ${EXPECTED_TIME_FORMAT} format): ${eventData.startTime}, skipping event.`
        );
        continue;
      }
      // Combine parsedStartDate and startTime into a new Date object
      // Set hours and minutes as UTC to avoid local time zone offset
      // todo: consider the time given in the local (user) timezone - current might not work
      parsedStartDate.setHours(parsedStartTime.hours, parsedStartTime.minutes, 0, 0);
      // parse the end Time
      const parsedEndTime = parseTimeWithFormat(
        eventData.endTime ?? '',
        EXPECTED_TIME_FORMAT
      );
      if (!parsedEndTime) {
        logger.warn(
          `Invalid endTime (must be in ${EXPECTED_TIME_FORMAT} format): ${eventData.endTime}, skipping event.`
        );
        continue;
      }
      parsedEndDate.setHours(parsedEndTime.hours, parsedEndTime.minutes, 0, 0);
    }

    let durationMinutes: number | undefined = undefined;
    if (eventData.wholeDay) {
      durationMinutes = 1440; // 24 hours
    } else if (parsedStartDate && parsedEndDate) {
      durationMinutes = calculateDurationInMinutes(parsedStartDate, parsedEndDate);
      if (durationMinutes <= 0) {
        logger.warn(
          `Calculated durationMinutes is not positive: ${durationMinutes}, skipping event.`
        );
        continue;
      }
    }

    // Calculate durationDays if not provided
    let durationDays = eventData.durationDays;
    if (durationDays === undefined && parsedStartDate && parsedEndDate) {
      // Calculate the difference in days (inclusive of start, exclusive of end)
      const msPerDay = 24 * 60 * 60 * 1000;
      durationDays = Math.round((parsedEndDate.getTime() - parsedStartDate.getTime()) / msPerDay);
    }
    const inputForSubmission: CalendarEventExcelForSubmission = {
      calendarID: eventData.calendarID as UUID,
      timezone: eventData.timezone,
      durationDays: durationDays,
      durationMinutes: durationMinutes!,
      multipleDays: eventData.multipleDays,
      nameID: eventData.nameID,
      profileTags: eventData.profileTags,
      profileDisplayName: eventData.profileDisplayName,
      profileDescription: eventData.profileDescription,
      startDate: parsedStartDate,
      type: eventType,
      visibleOnParentCalendar: eventData.visibleOnParentCalendar,
      wholeDay: eventData.wholeDay,
      location: eventData.location,
    };
    inputsForSubmission.push(inputForSubmission);
  }

  // Validate all the data

  // Have the events, now log how many there are and convert the data
  logger.info(`Total events to create: ${eventsToCreate.length}`);
  for (const eventDataToSubmit of inputsForSubmission) {
    // get the proper date, having in mind that the date in the sheet is from a different timezone than where the script is run
    const timeZonedDate = setTimezoneToDate(eventDataToSubmit.startDate, eventDataToSubmit.timezone);

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
        location: eventDataToSubmit.location ? { city: eventDataToSubmit.location } : undefined,
      },
      startDate: timeZonedDate,
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

const calculateDurationInMinutes = (start: Date, end: Date): number => {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const durationInMillis = endTime - startTime;
  return Math.floor(durationInMillis / (1000 * 60)); // Convert milliseconds to minutes
}

const setTimezoneToDate = (date: Date, timezone: string): Date => {
  // Always interpret the date/time as local wall time in the offset zone, not as a JS Date in local system time
  // Convert '+2' to 'UTC+02:00', '-5' to 'UTC-05:00', '0' to 'UTC+00:00'
  const luxonZone =
     timezone === '0'
       ? 'UTC'
         : (timezone.length === 2
           ? `UTC${timezone}0:00`          // "+2" -> "UTC+20:00" ❌
             : `UTC${timezone.padStart(3, '0')}:00`); // "+2" -> "+02:00"
  // Extract wall time components from the original startDate
  const wallYear = date.getFullYear();
  const wallMonth = date.getMonth() + 1;
  const wallDay = date.getDate();
  const wallHour = date.getHours();
  const wallMinute = date.getMinutes();
  const wallSecond = date.getSeconds();
  // Construct the DateTime as wall time in the offset zone
  const dt = DateTime.fromObject({
    year: wallYear,
    month: wallMonth,
    day: wallDay,
    hour: wallHour,
    minute: wallMinute,
    second: wallSecond
  }, { zone: luxonZone });
  return dt.toUTC().toJSDate();
}
