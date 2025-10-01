// Model for a calendar event loaded from the Excel file
export interface CalendarEventExcelInput {
  calendarID: string;
  timezone: string; // ensures proper date conversion
  durationDays?: number;
  multipleDays: boolean;
  nameID?: string;
  profileTags: string[];
  profileDisplayName: string;
  profileDescription: string;
  startDate: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  type: string;
  visibleOnParentCalendar: boolean;
  wholeDay: boolean;
  location?: string;
}
