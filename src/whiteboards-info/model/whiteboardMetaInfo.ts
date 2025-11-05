export class WhiteboardMetaInfo {
  LocationType = ''; // "Space" or "Template"
  SpaceTemplateName = ''; // Display name of space or template
  SpaceTemplateID = ''; // UUID
  SpaceLevel = ''; // "L0", "L1", "L2", or "Template"
  SpaceVisibility = ''; // "DEMO", "ACTIVE", "ARCHIVED" (for spaces only)
  CalloutName = ''; // Name of the callout
  CalloutID = ''; // UUID
  WhiteboardName = ''; // Display name of the whiteboard
  WhiteboardID = ''; // UUID
  WhiteboardURL = ''; // The profile.url from callout framing
  AccountProvider = ''; // Name of the hosting account (for spaces)
}
