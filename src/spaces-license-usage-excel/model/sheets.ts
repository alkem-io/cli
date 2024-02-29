export enum Sheets {
  EPICS = 'EPICS',
}

export interface EpicsSheet {
  TITLE: string;
  ASSIGNEES: string;
  STATUS: string;
  LABELS: string;
  TYPE: string;
  SPRINT: string;
  SPRINT_POINTS: string;
  RELEASE: string;
  PERIOD: string;
  PARTNER: string;
  EPIC_POINTS: string;
  EPIC_POINTS_DONE: string;
  EPIC_POINTS_REMAINING: string;
}
