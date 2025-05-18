// Model for a calendar event loaded from the Excel file
export interface CalendarEventExcelInput {
  calendarID: string;
  durationDays?: number;
  durationMinutes: number;
  multipleDays: boolean;
  nameID?: string;
  profileTags: string[];
  profileDisplayName: string;
  profileDescription: string;
  startDate: string;
  type: string;
  visibleOnParentCalendar: boolean;
  wholeDay: boolean;
}
