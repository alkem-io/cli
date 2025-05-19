import { UUID } from 'crypto';
import { CalendarEventType } from '../../generated/alkemio-schema';

// Model for a calendar event loaded from the Excel file
export interface CalendarEventExcelForSubmission{
  calendarID: UUID;
  timezone: string; // ensures proper date conversion
  durationDays?: number;
  durationMinutes: number;
  multipleDays: boolean;
  nameID?: string;
  profileTags: string[];
  profileDisplayName: string;
  profileDescription: string;
  startDate: Date;
  type: CalendarEventType;
  visibleOnParentCalendar: boolean;
  wholeDay: boolean;
  location?: string;
}
