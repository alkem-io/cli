export type CalendarEventExcelRow = {
  CALENDAR_ID: string;
  TIMEZONE: string;
  DURATION_DAYS?: string | number;
  MULTIPLE_DAYS?: string | boolean;
  NAME_ID?: string;
  TAGS?: string;
  TITLE: string;
  DESCRIPTION: string;
  START_DATE: string;
  START_TIME?: string;
  END_DATE?: string;
  END_TIME?: string;
  TYPE: string;
  VISIBLE_ON_PARENT_CALENDAR?: string | boolean;
  WHOLE_DAY?: string | boolean;
  LOCATION?: string;
}
