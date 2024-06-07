/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  CID: any;
  DID: string;
  DateTime: Date;
  Emoji: any;
  JSON: string;
  LifecycleDefinition: any;
  Markdown: any;
  MessageID: any;
  NameID: string;
  UUID: string;
  UUID_NAMEID: string;
  UUID_NAMEID_EMAIL: string;
  Upload: import('graphql-upload').FileUpload;
  WhiteboardContent: any;
};

export type Apm = {
  /** Endpoint where events are sent. */
  endpoint: Scalars['String'];
  /** Flag indicating if real user monitoring is enabled. */
  rumEnabled: Scalars['Boolean'];
};

export type Account = {
  /** The "highest" subscription active for this Account. */
  activeSubscription?: Maybe<AccountSubscription>;
  /** The Agent representing this Account. */
  agent: Agent;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The defaults in use by this Account */
  defaults?: Maybe<SpaceDefaults>;
  /** The Account host. */
  host?: Maybe<Contributor>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The Library in use by this Account */
  library?: Maybe<TemplatesSet>;
  /** The License governing platform functionality in use by this Account */
  license: License;
  /** The ID for the root space for the Account . */
  spaceID: Scalars['String'];
  /** The subscriptions active for this Account. */
  subscriptions: Array<AccountSubscription>;
  /** The virtual contributors for this Account. */
  virtualContributors: Array<VirtualContributor>;
};

export type AccountAuthorizationResetInput = {
  /** The identifier of the Account whose Authorization Policy should be reset. */
  accountID: Scalars['UUID_NAMEID'];
};

export type AccountSubscription = {
  /** The expiry date of this subscription, null if it does never expire. */
  expires?: Maybe<Scalars['DateTime']>;
  /** The name of the Subscription. */
  name: LicenseCredential;
};

export type ActivityCreatedSubscriptionInput = {
  /** The collaboration on which to subscribe for new activity */
  collaborationID: Scalars['UUID'];
  /** Include activities happened on child Collaborations. */
  includeChild?: InputMaybe<Scalars['Boolean']>;
  /** Which activity types to include in the results. Returns all by default. */
  types?: InputMaybe<Array<ActivityEventType>>;
};

export type ActivityCreatedSubscriptionResult = {
  /** The newly created activity */
  activity: ActivityLogEntry;
};

export enum ActivityEventType {
  CalendarEventCreated = 'CALENDAR_EVENT_CREATED',
  CalloutLinkCreated = 'CALLOUT_LINK_CREATED',
  CalloutPostComment = 'CALLOUT_POST_COMMENT',
  CalloutPostCreated = 'CALLOUT_POST_CREATED',
  CalloutPublished = 'CALLOUT_PUBLISHED',
  CalloutWhiteboardContentModified = 'CALLOUT_WHITEBOARD_CONTENT_MODIFIED',
  CalloutWhiteboardCreated = 'CALLOUT_WHITEBOARD_CREATED',
  ChallengeCreated = 'CHALLENGE_CREATED',
  DiscussionComment = 'DISCUSSION_COMMENT',
  MemberJoined = 'MEMBER_JOINED',
  OpportunityCreated = 'OPPORTUNITY_CREATED',
  UpdateSent = 'UPDATE_SENT',
}

export type ActivityFeed = {
  activityFeed: Array<ActivityLogEntry>;
  pageInfo: PageInfo;
  total: Scalars['Float'];
};

export type ActivityFeedGroupedQueryArgs = {
  /** What events to exclude. */
  excludeTypes?: InputMaybe<Array<ActivityEventType>>;
  /** Number of activities to return. */
  limit?: InputMaybe<Scalars['Float']>;
  /** Returns only events that the current user triggered; Includes all by default. */
  myActivity?: InputMaybe<Scalars['Boolean']>;
  /** Activity from which Spaces to include; Includes all by default. */
  roles?: InputMaybe<Array<ActivityFeedRoles>>;
  /** Activity from which Spaces to include; Includes all by default. */
  spaceIds?: InputMaybe<Array<Scalars['UUID']>>;
  /** What events to include; Includes all by default. */
  types?: InputMaybe<Array<ActivityEventType>>;
};

export type ActivityFeedQueryArgs = {
  /** What events to exclude. */
  excludeTypes?: InputMaybe<Array<ActivityEventType>>;
  /** Returns only events that the current user triggered; Includes all by default. */
  myActivity?: InputMaybe<Scalars['Boolean']>;
  /** Activity from which Spaces to include; Includes all by default. */
  roles?: InputMaybe<Array<ActivityFeedRoles>>;
  /** Activity from which Spaces to include; Includes all by default. */
  spaceIds?: InputMaybe<Array<Scalars['UUID']>>;
  /** What events to include; Includes all by default. */
  types?: InputMaybe<Array<ActivityEventType>>;
};

export enum ActivityFeedRoles {
  Admin = 'ADMIN',
  Lead = 'LEAD',
  Member = 'MEMBER',
}

export type ActivityLogEntry = {
  /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
  child: Scalars['Boolean'];
  /** The id of the Collaboration entity within which the Activity was generated. */
  collaborationID: Scalars['UUID'];
  /** The timestamp for the Activity. */
  createdDate: Scalars['DateTime'];
  /** The text details for this Activity. */
  description: Scalars['String'];
  id: Scalars['UUID'];
  /** The display name of the parent */
  parentDisplayName: Scalars['String'];
  /** The nameID of the parent */
  parentNameID: Scalars['NameID'];
  /** The Space where the activity happened */
  space?: Maybe<Space>;
  /** The user that triggered this Activity. */
  triggeredBy: User;
  /** The event type for this Activity. */
  type: ActivityEventType;
};

export type ActivityLogEntryCalendarEventCreated = ActivityLogEntry & {
  /** The Calendar in which the CalendarEvent was created. */
  calendar: Calendar;
  /** The CalendarEvent that was created. */
  calendarEvent: CalendarEvent;
  /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
  child: Scalars['Boolean'];
  /** The id of the Collaboration entity within which the Activity was generated. */
  collaborationID: Scalars['UUID'];
  /** The timestamp for the Activity. */
  createdDate: Scalars['DateTime'];
  /** The text details for this Activity. */
  description: Scalars['String'];
  id: Scalars['UUID'];
  /** The display name of the parent */
  parentDisplayName: Scalars['String'];
  /** The nameID of the parent */
  parentNameID: Scalars['NameID'];
  /** The Space where the activity happened */
  space?: Maybe<Space>;
  /** The user that triggered this Activity. */
  triggeredBy: User;
  /** The event type for this Activity. */
  type: ActivityEventType;
};

export type ActivityLogEntryCalloutDiscussionComment = ActivityLogEntry & {
  /** The Callout in which the comment was added. */
  callout: Callout;
  /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
  child: Scalars['Boolean'];
  /** The id of the Collaboration entity within which the Activity was generated. */
  collaborationID: Scalars['UUID'];
  /** The timestamp for the Activity. */
  createdDate: Scalars['DateTime'];
  /** The text details for this Activity. */
  description: Scalars['String'];
  id: Scalars['UUID'];
  /** The display name of the parent */
  parentDisplayName: Scalars['String'];
  /** The nameID of the parent */
  parentNameID: Scalars['NameID'];
  /** The Space where the activity happened */
  space?: Maybe<Space>;
  /** The user that triggered this Activity. */
  triggeredBy: User;
  /** The event type for this Activity. */
  type: ActivityEventType;
};

export type ActivityLogEntryCalloutLinkCreated = ActivityLogEntry & {
  /** The Callout in which the Link was created. */
  callout: Callout;
  /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
  child: Scalars['Boolean'];
  /** The id of the Collaboration entity within which the Activity was generated. */
  collaborationID: Scalars['UUID'];
  /** The timestamp for the Activity. */
  createdDate: Scalars['DateTime'];
  /** The text details for this Activity. */
  description: Scalars['String'];
  id: Scalars['UUID'];
  /** The Link that was created. */
  link: Link;
  /** The display name of the parent */
  parentDisplayName: Scalars['String'];
  /** The nameID of the parent */
  parentNameID: Scalars['NameID'];
  /** The Space where the activity happened */
  space?: Maybe<Space>;
  /** The user that triggered this Activity. */
  triggeredBy: User;
  /** The event type for this Activity. */
  type: ActivityEventType;
};

export type ActivityLogEntryCalloutPostComment = ActivityLogEntry & {
  /** The Callout in which the Post was commented. */
  callout: Callout;
  /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
  child: Scalars['Boolean'];
  /** The id of the Collaboration entity within which the Activity was generated. */
  collaborationID: Scalars['UUID'];
  /** The timestamp for the Activity. */
  createdDate: Scalars['DateTime'];
  /** The text details for this Activity. */
  description: Scalars['String'];
  id: Scalars['UUID'];
  /** The display name of the parent */
  parentDisplayName: Scalars['String'];
  /** The nameID of the parent */
  parentNameID: Scalars['NameID'];
  /** The Post that was commented on. */
  post: Post;
  /** The Space where the activity happened */
  space?: Maybe<Space>;
  /** The user that triggered this Activity. */
  triggeredBy: User;
  /** The event type for this Activity. */
  type: ActivityEventType;
};

export type ActivityLogEntryCalloutPostCreated = ActivityLogEntry & {
  /** The Callout in which the Post was created. */
  callout: Callout;
  /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
  child: Scalars['Boolean'];
  /** The id of the Collaboration entity within which the Activity was generated. */
  collaborationID: Scalars['UUID'];
  /** The timestamp for the Activity. */
  createdDate: Scalars['DateTime'];
  /** The text details for this Activity. */
  description: Scalars['String'];
  id: Scalars['UUID'];
  /** The display name of the parent */
  parentDisplayName: Scalars['String'];
  /** The nameID of the parent */
  parentNameID: Scalars['NameID'];
  /** The Post that was created. */
  post: Post;
  /** The Space where the activity happened */
  space?: Maybe<Space>;
  /** The user that triggered this Activity. */
  triggeredBy: User;
  /** The event type for this Activity. */
  type: ActivityEventType;
};

export type ActivityLogEntryCalloutPublished = ActivityLogEntry & {
  /** The Callout that was published. */
  callout: Callout;
  /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
  child: Scalars['Boolean'];
  /** The id of the Collaboration entity within which the Activity was generated. */
  collaborationID: Scalars['UUID'];
  /** The timestamp for the Activity. */
  createdDate: Scalars['DateTime'];
  /** The text details for this Activity. */
  description: Scalars['String'];
  id: Scalars['UUID'];
  /** The display name of the parent */
  parentDisplayName: Scalars['String'];
  /** The nameID of the parent */
  parentNameID: Scalars['NameID'];
  /** The Space where the activity happened */
  space?: Maybe<Space>;
  /** The user that triggered this Activity. */
  triggeredBy: User;
  /** The event type for this Activity. */
  type: ActivityEventType;
};

export type ActivityLogEntryCalloutWhiteboardContentModified =
  ActivityLogEntry & {
    /** The Callout in which the Whiteboard was updated. */
    callout: Callout;
    /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
    child: Scalars['Boolean'];
    /** The id of the Collaboration entity within which the Activity was generated. */
    collaborationID: Scalars['UUID'];
    /** The timestamp for the Activity. */
    createdDate: Scalars['DateTime'];
    /** The text details for this Activity. */
    description: Scalars['String'];
    id: Scalars['UUID'];
    /** The display name of the parent */
    parentDisplayName: Scalars['String'];
    /** The nameID of the parent */
    parentNameID: Scalars['NameID'];
    /** The Space where the activity happened */
    space?: Maybe<Space>;
    /** The user that triggered this Activity. */
    triggeredBy: User;
    /** The event type for this Activity. */
    type: ActivityEventType;
    /** The Whiteboard that was updated. */
    whiteboard: Whiteboard;
  };

export type ActivityLogEntryCalloutWhiteboardCreated = ActivityLogEntry & {
  /** The Callout in which the Whiteboard was created. */
  callout: Callout;
  /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
  child: Scalars['Boolean'];
  /** The id of the Collaboration entity within which the Activity was generated. */
  collaborationID: Scalars['UUID'];
  /** The timestamp for the Activity. */
  createdDate: Scalars['DateTime'];
  /** The text details for this Activity. */
  description: Scalars['String'];
  id: Scalars['UUID'];
  /** The display name of the parent */
  parentDisplayName: Scalars['String'];
  /** The nameID of the parent */
  parentNameID: Scalars['NameID'];
  /** The Space where the activity happened */
  space?: Maybe<Space>;
  /** The user that triggered this Activity. */
  triggeredBy: User;
  /** The event type for this Activity. */
  type: ActivityEventType;
  /** The Whiteboard that was created. */
  whiteboard: Whiteboard;
};

export type ActivityLogEntryChallengeCreated = ActivityLogEntry & {
  /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
  child: Scalars['Boolean'];
  /** The id of the Collaboration entity within which the Activity was generated. */
  collaborationID: Scalars['UUID'];
  /** The timestamp for the Activity. */
  createdDate: Scalars['DateTime'];
  /** The text details for this Activity. */
  description: Scalars['String'];
  id: Scalars['UUID'];
  /** The display name of the parent */
  parentDisplayName: Scalars['String'];
  /** The nameID of the parent */
  parentNameID: Scalars['NameID'];
  /** The Space where the activity happened */
  space?: Maybe<Space>;
  /** The Subspace that was created. */
  subspace: Space;
  /** The user that triggered this Activity. */
  triggeredBy: User;
  /** The event type for this Activity. */
  type: ActivityEventType;
};

export type ActivityLogEntryMemberJoined = ActivityLogEntry & {
  /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
  child: Scalars['Boolean'];
  /** The id of the Collaboration entity within which the Activity was generated. */
  collaborationID: Scalars['UUID'];
  /** The community that was joined. */
  community: Community;
  /** The type of the the Community. */
  communityType: Scalars['String'];
  /** The timestamp for the Activity. */
  createdDate: Scalars['DateTime'];
  /** The text details for this Activity. */
  description: Scalars['String'];
  id: Scalars['UUID'];
  /** The display name of the parent */
  parentDisplayName: Scalars['String'];
  /** The nameID of the parent */
  parentNameID: Scalars['NameID'];
  /** The Space where the activity happened */
  space?: Maybe<Space>;
  /** The user that triggered this Activity. */
  triggeredBy: User;
  /** The event type for this Activity. */
  type: ActivityEventType;
  /** The User that joined the Community. */
  user: User;
};

export type ActivityLogEntryOpportunityCreated = ActivityLogEntry & {
  /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
  child: Scalars['Boolean'];
  /** The id of the Collaboration entity within which the Activity was generated. */
  collaborationID: Scalars['UUID'];
  /** The timestamp for the Activity. */
  createdDate: Scalars['DateTime'];
  /** The text details for this Activity. */
  description: Scalars['String'];
  id: Scalars['UUID'];
  /** The display name of the parent */
  parentDisplayName: Scalars['String'];
  /** The nameID of the parent */
  parentNameID: Scalars['NameID'];
  /** The Space where the activity happened */
  space?: Maybe<Space>;
  /** The Subsubspace that was created. */
  subsubspace: Space;
  /** The user that triggered this Activity. */
  triggeredBy: User;
  /** The event type for this Activity. */
  type: ActivityEventType;
};

export type ActivityLogEntryUpdateSent = ActivityLogEntry & {
  /** Indicates if this Activity happened on a child Collaboration. Child results can be included via the "includeChild" parameter. */
  child: Scalars['Boolean'];
  /** The id of the Collaboration entity within which the Activity was generated. */
  collaborationID: Scalars['UUID'];
  /** The timestamp for the Activity. */
  createdDate: Scalars['DateTime'];
  /** The text details for this Activity. */
  description: Scalars['String'];
  id: Scalars['UUID'];
  /** The url to the Journey. */
  journeyUrl: Scalars['String'];
  /** The Message that been sent to this Community. */
  message: Scalars['String'];
  /** The display name of the parent */
  parentDisplayName: Scalars['String'];
  /** The nameID of the parent */
  parentNameID: Scalars['NameID'];
  /** The Space where the activity happened */
  space?: Maybe<Space>;
  /** The user that triggered this Activity. */
  triggeredBy: User;
  /** The event type for this Activity. */
  type: ActivityEventType;
  /** The Updates for this Community. */
  updates: Room;
};

export type ActivityLogInput = {
  /** Display the activityLog results for the specified Collaboration. */
  collaborationID: Scalars['UUID'];
  /** Include entries happened on child Collaborations. */
  includeChild?: InputMaybe<Scalars['Boolean']>;
  /** The number of ActivityLog entries to return; if omitted return all. */
  limit?: InputMaybe<Scalars['Float']>;
  /** Which activity types to include in the results. Returns all by default. */
  types?: InputMaybe<Array<ActivityEventType>>;
};

export type Actor = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** A description of this actor */
  description?: Maybe<Scalars['String']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The change / effort required of this actor */
  impact?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  /** A value derived by this actor */
  value?: Maybe<Scalars['String']>;
};

export type ActorGroup = {
  /** The set of actors in this actor group */
  actors?: Maybe<Array<Actor>>;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** A description of this group of actors */
  description?: Maybe<Scalars['String']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  name: Scalars['String'];
};

export type Agent = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The Credentials held by this Agent. */
  credentials?: Maybe<Array<Credential>>;
  /** The Decentralized Identifier (DID) for this Agent. */
  did?: Maybe<Scalars['DID']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The Verfied Credentials for this Agent. */
  verifiedCredentials?: Maybe<Array<VerifiedCredential>>;
};

export type AgentBeginVerifiedCredentialOfferOutput = {
  /** The token containing the information about issuer, callback endpoint and the credentials offered */
  jwt: Scalars['String'];
  /** The QR Code Image to be offered on the client for scanning by a mobile wallet */
  qrCodeImg: Scalars['String'];
};

export type AgentBeginVerifiedCredentialRequestOutput = {
  /** The token containing the information about issuer, callback endpoint and the credentials offered */
  jwt: Scalars['String'];
  /** The QR Code Image to be offered on the client for scanning by a mobile wallet */
  qrCodeImg: Scalars['String'];
};

export type AnyInvitation = Invitation | InvitationExternal;

export type Application = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  lifecycle: Lifecycle;
  /** The Questions for this application. */
  questions: Array<Question>;
  updatedDate: Scalars['DateTime'];
  /** The User for this Application. */
  user: User;
};

export type ApplicationEventInput = {
  applicationID: Scalars['UUID'];
  eventName: Scalars['String'];
};

export type ApplicationForRoleResult = {
  /** ID for the community */
  communityID: Scalars['UUID'];
  /** Date of creation */
  createdDate: Scalars['DateTime'];
  /** Display name of the community */
  displayName: Scalars['String'];
  /** ID for the application */
  id: Scalars['UUID'];
  /** ID for the ultimate containing Space */
  spaceID: Scalars['UUID'];
  /** Nesting level of the Space */
  spaceLevel: Scalars['Float'];
  /** The current state of the application. */
  state: Scalars['String'];
  /** Date of last update */
  updatedDate: Scalars['DateTime'];
};

export type AssignCommunityRoleToOrganizationInput = {
  communityID: Scalars['UUID'];
  organizationID: Scalars['UUID_NAMEID'];
  role: CommunityRole;
};

export type AssignCommunityRoleToUserInput = {
  communityID: Scalars['UUID'];
  role: CommunityRole;
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type AssignCommunityRoleToVirtualInput = {
  communityID: Scalars['UUID'];
  role: CommunityRole;
  virtualContributorID: Scalars['UUID_NAMEID'];
};

export type AssignLicensePlanToAccount = {
  /** The ID of the Account to assign the LicensePlan to. */
  accountID: Scalars['UUID'];
  /** The ID of the LicensePlan to assign. */
  licensePlanID: Scalars['UUID'];
  /** The ID of the Licensing to use. */
  licensingID?: InputMaybe<Scalars['UUID']>;
};

export type AssignOrganizationRoleToUserInput = {
  organizationID: Scalars['UUID_NAMEID'];
  role: OrganizationRole;
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type AssignPlatformRoleToUserInput = {
  role: PlatformRole;
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type AssignUserGroupMemberInput = {
  groupID: Scalars['UUID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type AuthenticationConfig = {
  /** Alkemio Authentication Providers Config. */
  providers: Array<AuthenticationProviderConfig>;
};

export type AuthenticationProviderConfig = {
  /** Configuration of the authenticaiton provider */
  config: AuthenticationProviderConfigUnion;
  /** Is the authentication provider enabled? */
  enabled: Scalars['Boolean'];
  /** CDN location of an icon of the authentication provider login button. */
  icon: Scalars['String'];
  /** Label of the authentication provider. */
  label: Scalars['String'];
  /** Name of the authentication provider. */
  name: Scalars['String'];
};

export type AuthenticationProviderConfigUnion = OryConfig;

export type Authorization = {
  anonymousReadAccess: Scalars['Boolean'];
  /** The set of credential rules that are contained by this Authorization Policy. */
  credentialRules?: Maybe<Array<AuthorizationPolicyRuleCredential>>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The privileges granted to the current user based on this Authorization Policy. */
  myPrivileges?: Maybe<Array<AuthorizationPrivilege>>;
  /** The set of privilege rules that are contained by this Authorization Policy. */
  privilegeRules?: Maybe<Array<AuthorizationPolicyRulePrivilege>>;
  /** The set of verified credential rules that are contained by this Authorization Policy. */
  verifiedCredentialRules?: Maybe<
    Array<AuthorizationPolicyRuleVerifiedCredential>
  >;
};

export enum AuthorizationCredential {
  AccountHost = 'ACCOUNT_HOST',
  BetaTester = 'BETA_TESTER',
  GlobalAdmin = 'GLOBAL_ADMIN',
  GlobalCommunityRead = 'GLOBAL_COMMUNITY_READ',
  GlobalLicenseManager = 'GLOBAL_LICENSE_MANAGER',
  GlobalRegistered = 'GLOBAL_REGISTERED',
  GlobalSpacesReader = 'GLOBAL_SPACES_READER',
  GlobalSupport = 'GLOBAL_SUPPORT',
  InnovationPackProvider = 'INNOVATION_PACK_PROVIDER',
  OrganizationAdmin = 'ORGANIZATION_ADMIN',
  OrganizationAssociate = 'ORGANIZATION_ASSOCIATE',
  OrganizationOwner = 'ORGANIZATION_OWNER',
  SpaceAdmin = 'SPACE_ADMIN',
  SpaceLead = 'SPACE_LEAD',
  SpaceMember = 'SPACE_MEMBER',
  SpaceSubspaceAdmin = 'SPACE_SUBSPACE_ADMIN',
  UserGroupMember = 'USER_GROUP_MEMBER',
  UserSelfManagement = 'USER_SELF_MANAGEMENT',
}

export type AuthorizationPolicyRuleCredential = {
  cascade: Scalars['Boolean'];
  criterias: Array<CredentialDefinition>;
  grantedPrivileges: Array<AuthorizationPrivilege>;
  name?: Maybe<Scalars['String']>;
};

export type AuthorizationPolicyRulePrivilege = {
  grantedPrivileges: Array<AuthorizationPrivilege>;
  name?: Maybe<Scalars['String']>;
  sourcePrivilege: AuthorizationPrivilege;
};

export type AuthorizationPolicyRuleVerifiedCredential = {
  claimRule: Scalars['String'];
  credentialName: Scalars['String'];
  grantedPrivileges: Array<AuthorizationPrivilege>;
};

export enum AuthorizationPrivilege {
  AccessDashboardRefresh = 'ACCESS_DASHBOARD_REFRESH',
  AccessInteractiveGuidance = 'ACCESS_INTERACTIVE_GUIDANCE',
  AccessVirtualContributor = 'ACCESS_VIRTUAL_CONTRIBUTOR',
  AuthorizationReset = 'AUTHORIZATION_RESET',
  CommunityAddMember = 'COMMUNITY_ADD_MEMBER',
  CommunityApply = 'COMMUNITY_APPLY',
  CommunityInvite = 'COMMUNITY_INVITE',
  CommunityInviteAccept = 'COMMUNITY_INVITE_ACCEPT',
  CommunityJoin = 'COMMUNITY_JOIN',
  Contribute = 'CONTRIBUTE',
  Create = 'CREATE',
  CreateCallout = 'CREATE_CALLOUT',
  CreateDiscussion = 'CREATE_DISCUSSION',
  CreateMessage = 'CREATE_MESSAGE',
  CreateMessageReaction = 'CREATE_MESSAGE_REACTION',
  CreateMessageReply = 'CREATE_MESSAGE_REPLY',
  CreateOrganization = 'CREATE_ORGANIZATION',
  CreatePost = 'CREATE_POST',
  CreateSpace = 'CREATE_SPACE',
  CreateSubspace = 'CREATE_SUBSPACE',
  CreateVirtualContributor = 'CREATE_VIRTUAL_CONTRIBUTOR',
  CreateWhiteboard = 'CREATE_WHITEBOARD',
  CreateWhiteboardRt = 'CREATE_WHITEBOARD_RT',
  Delete = 'DELETE',
  FileDelete = 'FILE_DELETE',
  FileUpload = 'FILE_UPLOAD',
  Grant = 'GRANT',
  GrantGlobalAdmins = 'GRANT_GLOBAL_ADMINS',
  MoveContribution = 'MOVE_CONTRIBUTION',
  MovePost = 'MOVE_POST',
  PlatformAdmin = 'PLATFORM_ADMIN',
  Read = 'READ',
  ReadUsers = 'READ_USERS',
  ReadUserPii = 'READ_USER_PII',
  ReadUserSettings = 'READ_USER_SETTINGS',
  SaveAsTemplate = 'SAVE_AS_TEMPLATE',
  Update = 'UPDATE',
  UpdateCalloutPublisher = 'UPDATE_CALLOUT_PUBLISHER',
  UpdateContent = 'UPDATE_CONTENT',
  UpdateInnovationFlow = 'UPDATE_INNOVATION_FLOW',
  UpdateWhiteboard = 'UPDATE_WHITEBOARD',
}

export enum BodyOfKnowledgeType {
  Other = 'OTHER',
  Space = 'SPACE',
}

export type Calendar = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** A single CalendarEvent */
  event?: Maybe<CalendarEvent>;
  /** The list of CalendarEvents for this Calendar. */
  events?: Maybe<Array<CalendarEvent>>;
  /** The ID of the entity */
  id: Scalars['UUID'];
};

export type CalendarEventArgs = {
  ID: Scalars['UUID_NAMEID'];
};

export type CalendarEventsArgs = {
  IDs?: InputMaybe<Array<Scalars['UUID_NAMEID']>>;
  limit?: InputMaybe<Scalars['Float']>;
};

export type CalendarEvent = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The comments for this CalendarEvent */
  comments: Room;
  /** The user that created this CalendarEvent */
  createdBy?: Maybe<User>;
  createdDate: Scalars['DateTime'];
  /** The length of the event in days. */
  durationDays?: Maybe<Scalars['Float']>;
  /** The length of the event in minutes. */
  durationMinutes: Scalars['Float'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Flag to indicate if this event is for multiple days. */
  multipleDays: Scalars['Boolean'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The Profile for this Post. */
  profile: Profile;
  /** The start time for this CalendarEvent. */
  startDate?: Maybe<Scalars['DateTime']>;
  /** The event type, e.g. webinar, meetup etc. */
  type: CalendarEventType;
  /** Flag to indicate if this event is for a whole day. */
  wholeDay: Scalars['Boolean'];
};

export enum CalendarEventType {
  Event = 'EVENT',
  Milestone = 'MILESTONE',
  Other = 'OTHER',
  Training = 'TRAINING',
}

export type Callout = {
  /** The activity for this Callout. */
  activity: Scalars['Float'];
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The comments for this Callout. */
  comments?: Maybe<Room>;
  /** The Contribution Defaults for this Callout. */
  contributionDefaults: CalloutContributionDefaults;
  /** The ContributionPolicy for this Callout. */
  contributionPolicy: CalloutContributionPolicy;
  /** The Contributions that have been made to this Callout. */
  contributions: Array<CalloutContribution>;
  /** The user that created this Callout */
  createdBy?: Maybe<User>;
  /** The Callout Framing associated with this Callout. */
  framing: CalloutFraming;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The Posts associated with this Callout. */
  posts?: Maybe<Array<Post>>;
  /** The user that published this Callout */
  publishedBy?: Maybe<User>;
  /** The timestamp for the publishing of this Callout. */
  publishedDate?: Maybe<Scalars['Float']>;
  /** The sorting order for this Callout. */
  sortOrder: Scalars['Float'];
  /** The Callout type, e.g. Post, Whiteboard, Discussion */
  type: CalloutType;
  /** Visibility of the Callout. */
  visibility: CalloutVisibility;
};

export type CalloutContributionsArgs = {
  IDs?: InputMaybe<Array<Scalars['UUID_NAMEID']>>;
  filter?: InputMaybe<CalloutContributionFilterArgs>;
  limit?: InputMaybe<Scalars['Float']>;
  shuffle?: InputMaybe<Scalars['Boolean']>;
};

export type CalloutContribution = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The user that created this Document */
  createdBy?: Maybe<User>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The Link that was contributed. */
  link?: Maybe<Link>;
  /** The Post that was contributed. */
  post?: Maybe<Post>;
  /** The Whiteboard that was contributed. */
  whiteboard?: Maybe<Whiteboard>;
};

export type CalloutContributionDefaults = {
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The default description to use for new contributions. */
  postDescription?: Maybe<Scalars['Markdown']>;
  /** The default whiteboard content for whiteboard responses. */
  whiteboardContent?: Maybe<Scalars['WhiteboardContent']>;
};

export type CalloutContributionFilterArgs = {
  /** Include Contributions with Link ids of contributions to include. */
  linkIDs?: InputMaybe<Array<Scalars['UUID']>>;
  /** Include Contributions with Post ids/nameIds. */
  postIDs?: InputMaybe<Array<Scalars['UUID_NAMEID']>>;
  /** Include Contributions with Whiteboard ids/nameIds. */
  whiteboardIDs?: InputMaybe<Array<Scalars['UUID_NAMEID']>>;
};

export type CalloutContributionPolicy = {
  /** The allowed contribution types for this callout. */
  allowedContributionTypes: Array<CalloutContributionType>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** State of the Callout. */
  state: CalloutState;
};

export enum CalloutContributionType {
  Link = 'LINK',
  Post = 'POST',
  Whiteboard = 'WHITEBOARD',
}

export type CalloutFraming = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The Profile for framing the associated Callout. */
  profile: Profile;
  /** The Whiteboard for framing the associated Callout. */
  whiteboard?: Maybe<Whiteboard>;
};

export type CalloutGroup = {
  /** The explation text to clarify the Group. */
  description: Scalars['Markdown'];
  /** The display name for the Group */
  displayName: CalloutGroupName;
};

export enum CalloutGroupName {
  Community = 'COMMUNITY',
  Contribute = 'CONTRIBUTE',
  Home = 'HOME',
  Knowledge = 'KNOWLEDGE',
  Subspaces = 'SUBSPACES',
}

export type CalloutPostCreated = {
  /** The identifier for the Callout on which the post was created. */
  calloutID: Scalars['String'];
  /** The post that has been created. */
  post: Post;
};

export enum CalloutState {
  Archived = 'ARCHIVED',
  Closed = 'CLOSED',
  Open = 'OPEN',
}

export type CalloutTemplate = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The defaults to use for Callouts created from this template.   */
  contributionDefaults: CalloutContributionDefaults;
  /** The response policy to use for Callouts created from this template.   */
  contributionPolicy: CalloutContributionPolicy;
  /** The framing for callouts created from this template. */
  framing: CalloutFraming;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The Profile for this template. */
  profile: Profile;
  /** The Callout type, e.g. Post, Whiteboard, Discussion */
  type: CalloutType;
};

export enum CalloutType {
  LinkCollection = 'LINK_COLLECTION',
  Post = 'POST',
  PostCollection = 'POST_COLLECTION',
  Whiteboard = 'WHITEBOARD',
  WhiteboardCollection = 'WHITEBOARD_COLLECTION',
}

export enum CalloutVisibility {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
}

export type ChatGuidanceAnswerRelevanceInput = {
  /** The answer id. */
  id: Scalars['UUID'];
  /** Is the answer relevant or not. */
  relevant: Scalars['Boolean'];
};

export type ChatGuidanceInput = {
  /** The language of the answer. */
  language?: InputMaybe<Scalars['String']>;
  /** The question that is being asked. */
  question: Scalars['String'];
};

export type ChatGuidanceResult = {
  /** The answer to the question */
  answer: Scalars['String'];
  /** The id of the answer; null if an error was returned */
  id?: Maybe<Scalars['String']>;
  /** The original question */
  question: Scalars['String'];
  /** The sources used to answer the question */
  sources?: Maybe<Array<Source>>;
};

export type Collaboration = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The list of Callouts for this Collaboration object. */
  callouts: Array<Callout>;
  /** The set of CalloutGroups in use in this Collaboration. */
  groups: Array<CalloutGroup>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The InnovationFlow for the Collaboration. */
  innovationFlow: InnovationFlow;
  /** List of relations */
  relations?: Maybe<Array<Relation>>;
  /** The tagset templates on this Collaboration. */
  tagsetTemplates?: Maybe<Array<TagsetTemplate>>;
  /** The timeline with events in use by this Space */
  timeline: Timeline;
};

export type CollaborationCalloutsArgs = {
  IDs?: InputMaybe<Array<Scalars['UUID_NAMEID']>>;
  groups?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Float']>;
  shuffle?: InputMaybe<Scalars['Boolean']>;
  sortByActivity?: InputMaybe<Scalars['Boolean']>;
  tagsets?: InputMaybe<Array<TagsetArgs>>;
};

export type Communication = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** A particular Discussions active in this Communication. */
  discussion?: Maybe<Discussion>;
  discussionCategories: Array<DiscussionCategory>;
  /** The Discussions active in this Communication. */
  discussions?: Maybe<Array<Discussion>>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The updates on this Communication. */
  updates: Room;
};

export type CommunicationDiscussionArgs = {
  ID: Scalars['String'];
};

export type CommunicationDiscussionsArgs = {
  queryData?: InputMaybe<DiscussionsInput>;
};

export type CommunicationAdminEnsureAccessInput = {
  communityID: Scalars['UUID'];
};

export type CommunicationAdminMembershipInput = {
  communityID: Scalars['UUID'];
};

export type CommunicationAdminMembershipResult = {
  /** Display name of the result */
  displayName: Scalars['String'];
  /** A unique identifier for this comunication room membership result. */
  id: Scalars['String'];
  /** Rooms in this Communication */
  rooms: Array<CommunicationAdminRoomMembershipResult>;
};

export type CommunicationAdminOrphanedUsageResult = {
  /** Rooms in the Communication platform that are not used */
  rooms: Array<CommunicationAdminRoomResult>;
};

export type CommunicationAdminRemoveOrphanedRoomInput = {
  roomID: Scalars['String'];
};

export type CommunicationAdminRoomMembershipResult = {
  /** Display name of the entity */
  displayName: Scalars['String'];
  /** Members of the room that are not members of the Community. */
  extraMembers: Array<Scalars['String']>;
  /** A unique identifier for this membership result. */
  id: Scalars['String'];
  /** The access mode for the room. */
  joinRule: Scalars['String'];
  /** Name of the room */
  members: Array<Scalars['String']>;
  /** Members of the community that are missing from the room */
  missingMembers: Array<Scalars['String']>;
  /** The matrix room ID */
  roomID: Scalars['String'];
};

export type CommunicationAdminRoomResult = {
  /** Display name of the result */
  displayName: Scalars['String'];
  /** The identifier for the orphaned room. */
  id: Scalars['String'];
  /** The members of the orphaned room */
  members: Array<Scalars['String']>;
};

export type CommunicationAdminUpdateRoomsJoinRuleInput = {
  isPublic: Scalars['Boolean'];
};

export type CommunicationCreateDiscussionInput = {
  /** The category for the Discussion */
  category: DiscussionCategory;
  /** The identifier for the Communication entity the Discussion is being created on. */
  communicationID: Scalars['UUID'];
  profile: CreateProfileInput;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type CommunicationRoom = {
  /** The display name of the room */
  displayName: Scalars['String'];
  /** The identifier of the room */
  id: Scalars['String'];
  /** The messages that have been sent to the Room. */
  messages: Array<Message>;
};

export type CommunicationSendMessageToCommunityLeadsInput = {
  /** The Community the message is being sent to */
  communityId: Scalars['UUID'];
  /** The message being sent */
  message: Scalars['String'];
};

export type CommunicationSendMessageToOrganizationInput = {
  /** The message being sent */
  message: Scalars['String'];
  /** The Organization the message is being sent to */
  organizationId: Scalars['UUID'];
};

export type CommunicationSendMessageToUserInput = {
  /** The message being sent */
  message: Scalars['String'];
  /** All Users the message is being sent to */
  receiverIds: Array<Scalars['UUID']>;
};

export type Community = Groupable & {
  /** The Form used for Applications to this community. */
  applicationForm: Form;
  /** Applications available for this community. */
  applications: Array<Application>;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** All member users excluding the current lead users in this Community. */
  availableLeadUsers: PaginatedUsers;
  /** All available users that are potential Community members. */
  availableMemberUsers: PaginatedUsers;
  /** The Communications for this Community. */
  communication: Communication;
  /** The user group with the specified id anywhere in the space */
  group: UserGroup;
  /** Groups of users related to a Community. */
  groups: Array<UserGroup>;
  /** The guidelines for members of this Community. */
  guidelines: CommunityGuidelines;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Invitations for this community. */
  invitations: Array<Invitation>;
  /** Invitations to join this Community for users not yet on the Alkemio platform. */
  invitationsExternal: Array<InvitationExternal>;
  /** All users that are contributing to this Community. */
  memberUsers: Array<User>;
  /** The membership status of the currently logged in user. */
  myMembershipStatus?: Maybe<CommunityMembershipStatus>;
  /** The roles on this community for the currently logged in user. */
  myRoles: Array<CommunityRole>;
  /** The implicit roles on this community for the currently logged in user. */
  myRolesImplicit: Array<CommunityRoleImplicit>;
  /** All Organizations that have the specified Role in this Community. */
  organizationsInRole: Array<Organization>;
  /** The policy that defines the roles for this Community. */
  policy: CommunityPolicy;
  /** All users that have the specified Role in this Community. */
  usersInRole: Array<User>;
  /** All virtuals that have the specified Role in this Community. */
  virtualContributorsInRole: Array<VirtualContributor>;
};

export type CommunityAvailableLeadUsersArgs = {
  after?: InputMaybe<Scalars['UUID']>;
  before?: InputMaybe<Scalars['UUID']>;
  filter?: InputMaybe<UserFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type CommunityAvailableMemberUsersArgs = {
  after?: InputMaybe<Scalars['UUID']>;
  before?: InputMaybe<Scalars['UUID']>;
  filter?: InputMaybe<UserFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type CommunityGroupArgs = {
  ID: Scalars['UUID'];
};

export type CommunityMemberUsersArgs = {
  limit?: InputMaybe<Scalars['Float']>;
};

export type CommunityOrganizationsInRoleArgs = {
  role: CommunityRole;
};

export type CommunityUsersInRoleArgs = {
  role: CommunityRole;
};

export type CommunityVirtualContributorsInRoleArgs = {
  role: CommunityRole;
};

export type CommunityApplyInput = {
  communityID: Scalars['UUID'];
  questions: Array<CreateNvpInput>;
};

export type CommunityGuidelines = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The details of the guidelilnes */
  profile: Profile;
};

export type CommunityGuidelinesTemplate = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The community guidelines. */
  guidelines: CommunityGuidelines;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The Profile for this template. */
  profile: Profile;
};

export type CommunityJoinInput = {
  communityID: Scalars['UUID'];
};

export enum CommunityMembershipPolicy {
  Applications = 'APPLICATIONS',
  Invitations = 'INVITATIONS',
  Open = 'OPEN',
}

export enum CommunityMembershipStatus {
  ApplicationPending = 'APPLICATION_PENDING',
  InvitationPending = 'INVITATION_PENDING',
  Member = 'MEMBER',
  NotMember = 'NOT_MEMBER',
}

export type CommunityPolicy = {
  /** The role policy that defines the Admins for this Community. */
  admin: CommunityRolePolicy;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The role policy that defines the leads for this Community. */
  lead: CommunityRolePolicy;
  /** The role policy that defines the members for this Community. */
  member: CommunityRolePolicy;
};

export enum CommunityRole {
  Admin = 'ADMIN',
  Lead = 'LEAD',
  Member = 'MEMBER',
}

export enum CommunityRoleImplicit {
  SubspaceAdmin = 'SUBSPACE_ADMIN',
}

export type CommunityRolePolicy = {
  /** The CredentialDefinition that is associated with this role */
  credential: CredentialDefinition;
  /** Is this role enabled for this Community */
  enabled: Scalars['Boolean'];
  /** Maximum number of Organizations in this role */
  maxOrg: Scalars['Float'];
  /** Maximum number of Users in this role */
  maxUser: Scalars['Float'];
  /** Minimun number of Organizations in this role */
  minOrg: Scalars['Float'];
  /** Minimum number of Users in this role */
  minUser: Scalars['Float'];
  /** The CredentialDefinitions associated with this role in parent communities */
  parentCredentials: Array<CredentialDefinition>;
};

export type Config = {
  /** Elastic APM (RUM & performance monitoring) related configuration. */
  apm: Apm;
  /** Authentication configuration. */
  authentication: AuthenticationConfig;
  /** The feature flags for the platform */
  featureFlags: Array<PlatformFeatureFlag>;
  /** Integration with a 3rd party Geo information service */
  geo: Geo;
  /** Platform related locations. */
  locations: PlatformLocations;
  /** Sentry (client monitoring) related configuration. */
  sentry: Sentry;
  /** Configuration for storage providers, e.g. file */
  storage: StorageConfig;
};

export enum ContentUpdatePolicy {
  Admins = 'ADMINS',
  Contributors = 'CONTRIBUTORS',
  Owner = 'OWNER',
}

export type Context = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** What is the potential impact? */
  impact?: Maybe<Scalars['Markdown']>;
  /** The goal that is being pursued */
  vision?: Maybe<Scalars['Markdown']>;
  /** Who should get involved in this challenge */
  who?: Maybe<Scalars['Markdown']>;
};

export type Contributor = {
  /** The Agent for the Contributor. */
  agent: Agent;
  /** The authorization rules for the Contributor */
  authorization?: Maybe<Authorization>;
  /** The ID of the Contributor */
  id: Scalars['UUID'];
  /** A name identifier of the Contributor, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The profile for the Contributor. */
  profile: Profile;
};

export type ContributorFilterInput = {
  /** Return contributors with credentials in the provided list */
  credentials?: InputMaybe<Array<AuthorizationCredential>>;
};

export type ContributorRoles = {
  /** The applications for the specified user; only accessible for platform admins */
  applications: Array<ApplicationForRoleResult>;
  id: Scalars['UUID'];
  /** The invitations for the specified user; only accessible for platform admins */
  invitations: Array<InvitationForRoleResult>;
  /** Details of the roles the contributor has in Organizations */
  organizations: Array<RolesResultOrganization>;
  /** Details of Spaces the User or Organization is a member of, with child memberships - if Space is accessible for the current user. */
  spaces: Array<RolesResultSpace>;
};

export type ContributorRolesApplicationsArgs = {
  states?: InputMaybe<Array<Scalars['String']>>;
};

export type ContributorRolesInvitationsArgs = {
  states?: InputMaybe<Array<Scalars['String']>>;
};

export type ConvertSubspaceToSpaceInput = {
  /** The subspace to be promoted to be a new Space. Note: the original Subspace will no longer exist after the conversion.  */
  subspaceID: Scalars['UUID_NAMEID'];
};

export type ConvertSubsubspaceToSubspaceInput = {
  /** The subsubspace to be promoted. Note: the original Opportunity will no longer exist after the conversion.  */
  subsubspaceID: Scalars['UUID_NAMEID'];
};

export type CreateAccountInput = {
  /** The host Organization or User for the account */
  hostID: Scalars['UUID_NAMEID'];
  /** The license plan selected for the account */
  licensePlanID?: InputMaybe<Scalars['UUID']>;
  /** The root Space to be created. */
  spaceData: CreateSpaceInput;
};

export type CreateActorGroupInput = {
  description?: InputMaybe<Scalars['String']>;
  ecosystemModelID: Scalars['UUID'];
  name: Scalars['String'];
};

export type CreateActorInput = {
  actorGroupID: Scalars['UUID'];
  description?: InputMaybe<Scalars['String']>;
  impact?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type CreateCalendarEventOnCalendarInput = {
  calendarID: Scalars['UUID'];
  /** The length of the event in days. */
  durationDays?: InputMaybe<Scalars['Float']>;
  /** The length of the event in minutes. */
  durationMinutes: Scalars['Float'];
  /** Flag to indicate if this event is for multiple days. */
  multipleDays: Scalars['Boolean'];
  /** A readable identifier, unique within the containing scope. */
  nameID?: InputMaybe<Scalars['NameID']>;
  profileData: CreateProfileInput;
  /** The start date for the event. */
  startDate: Scalars['DateTime'];
  tags?: InputMaybe<Array<Scalars['String']>>;
  type: CalendarEventType;
  /** Flag to indicate if this event is for a whole day. */
  wholeDay: Scalars['Boolean'];
};

export type CreateCalloutContributionDefaultsInput = {
  /** The default description to use for new Post contributions. */
  postDescription?: InputMaybe<Scalars['Markdown']>;
  whiteboardContent?: InputMaybe<Scalars['WhiteboardContent']>;
};

export type CreateCalloutContributionPolicyInput = {
  /** State of the callout. */
  state?: InputMaybe<CalloutState>;
};

export type CreateCalloutFramingInput = {
  profile: CreateProfileInput;
  tags?: InputMaybe<Array<Scalars['String']>>;
  whiteboard?: InputMaybe<CreateWhiteboardInput>;
};

export type CreateCalloutOnCollaborationInput = {
  collaborationID: Scalars['UUID'];
  contributionDefaults?: InputMaybe<CreateCalloutContributionDefaultsInput>;
  contributionPolicy?: InputMaybe<CreateCalloutContributionPolicyInput>;
  framing: CreateCalloutFramingInput;
  /** Set Callout Group for this Callout. */
  groupName?: InputMaybe<Scalars['String']>;
  /** A readable identifier, unique within the containing scope. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** Send notification if this flag is true and visibility is PUBLISHED. Defaults to false. */
  sendNotification?: InputMaybe<Scalars['Boolean']>;
  /** The sort order to assign to this Callout. */
  sortOrder?: InputMaybe<Scalars['Float']>;
  /** Callout type. */
  type: CalloutType;
  /** Visibility of the Callout. Defaults to DRAFT. */
  visibility?: InputMaybe<CalloutVisibility>;
};

export type CreateCalloutTemplateOnTemplatesSetInput = {
  contributionDefaults: CreateCalloutContributionDefaultsInput;
  contributionPolicy: CreateCalloutContributionPolicyInput;
  framing: CreateCalloutFramingInput;
  /** The profile of the template. */
  profile: CreateProfileInput;
  tags?: InputMaybe<Array<Scalars['String']>>;
  templatesSetID: Scalars['UUID'];
  /** Callout type. */
  type: CalloutType;
  visualUri?: InputMaybe<Scalars['String']>;
};

export type CreateCollaborationInput = {
  /** Add default callouts to the Collaboration; defaults to true. */
  addDefaultCallouts?: InputMaybe<Scalars['Boolean']>;
  /** The ID of the Collaboration to use for setting up the collaboration of the Collaboration. */
  collaborationTemplateID?: InputMaybe<Scalars['UUID']>;
  /** The Innovation Flow template to use for the Collaboration. */
  innovationFlowTemplateID?: InputMaybe<Scalars['UUID']>;
};

export type CreateCommunityGuidelinesInput = {
  profile: CreateProfileInput;
};

export type CreateCommunityGuidelinesTemplateOnTemplatesSetInput = {
  /** The Community guidelines to associate with this template. */
  communityGuidelines?: InputMaybe<CreateCommunityGuidelinesInput>;
  /** The ID of the Community guidelines to associate with this template. */
  communityGuidelinesID?: InputMaybe<Scalars['String']>;
  /** The profile of the template. */
  profile: CreateProfileInput;
  tags?: InputMaybe<Array<Scalars['String']>>;
  templatesSetID: Scalars['UUID'];
  visualUri?: InputMaybe<Scalars['String']>;
};

export type CreateContextInput = {
  impact?: InputMaybe<Scalars['Markdown']>;
  vision?: InputMaybe<Scalars['Markdown']>;
  who?: InputMaybe<Scalars['Markdown']>;
};

export type CreateContributionOnCalloutInput = {
  calloutID: Scalars['UUID'];
  link?: InputMaybe<CreateLinkInput>;
  post?: InputMaybe<CreatePostInput>;
  whiteboard?: InputMaybe<CreateWhiteboardInput>;
};

export type CreateInnovationFlowTemplateOnTemplatesSetInput = {
  /** The profile of the template. */
  profile: CreateProfileInput;
  states?: InputMaybe<Array<UpdateInnovationFlowStateInput>>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  templatesSetID: Scalars['UUID'];
  visualUri?: InputMaybe<Scalars['String']>;
};

export type CreateInnovationHubInput = {
  /** Account ID, associated with the Innovation Hub. */
  accountID?: InputMaybe<Scalars['UUID']>;
  /** A readable identifier, unique within the containing scope. */
  nameID?: InputMaybe<Scalars['NameID']>;
  profileData: CreateProfileInput;
  /** A list of Spaces to include in this Innovation Hub. Only valid when type 'list' is used. */
  spaceListFilter?: InputMaybe<Array<Scalars['UUID']>>;
  /** Spaces with which visibility this Innovation Hub will display. Only valid when type 'visibility' is used. */
  spaceVisibilityFilter?: InputMaybe<SpaceVisibility>;
  /** The subdomain to associate the Innovation Hub with. */
  subdomain: Scalars['String'];
  /** The type of Innovation Hub. */
  type: InnovationHubType;
};

export type CreateInnovationPackOnLibraryInput = {
  /** A readable identifier, unique within the containing scope. */
  nameID: Scalars['NameID'];
  profileData: CreateProfileInput;
  /** The provider Organization for the InnovationPack */
  providerID: Scalars['UUID_NAMEID'];
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateInvitationForUsersOnCommunityInput = {
  communityID: Scalars['UUID'];
  /** The identifiers for the users being invited. */
  invitedUsers: Array<Scalars['UUID']>;
  welcomeMessage?: InputMaybe<Scalars['String']>;
};

export type CreateInvitationUserByEmailOnCommunityInput = {
  communityID: Scalars['UUID'];
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  welcomeMessage?: InputMaybe<Scalars['String']>;
};

export type CreateLicensePlanOnLicensingInput = {
  licensingID: Scalars['UUID'];
  /** The name of the License Plan */
  name: Scalars['String'];
};

export type CreateLinkInput = {
  profile: CreateProfileInput;
  uri?: InputMaybe<Scalars['String']>;
};

export type CreateLocationInput = {
  addressLine1?: InputMaybe<Scalars['String']>;
  addressLine2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
  stateOrProvince?: InputMaybe<Scalars['String']>;
};

export type CreateNvpInput = {
  name: Scalars['String'];
  sortOrder: Scalars['Float'];
  value: Scalars['String'];
};

export type CreateOrganizationInput = {
  contactEmail?: InputMaybe<Scalars['String']>;
  domain?: InputMaybe<Scalars['String']>;
  legalEntityName?: InputMaybe<Scalars['String']>;
  /** A readable identifier, unique within the containing scope. */
  nameID?: InputMaybe<Scalars['NameID']>;
  profileData: CreateProfileInput;
  website?: InputMaybe<Scalars['String']>;
};

export type CreatePostInput = {
  /** A readable identifier, unique within the containing scope. */
  nameID?: InputMaybe<Scalars['NameID']>;
  profileData: CreateProfileInput;
  tags?: InputMaybe<Array<Scalars['String']>>;
  type: Scalars['String'];
  visualUri?: InputMaybe<Scalars['String']>;
};

export type CreatePostTemplateOnTemplatesSetInput = {
  /** The default description to be pre-filled when users create Posts based on this template. */
  defaultDescription?: InputMaybe<Scalars['Markdown']>;
  /** The profile of the template. */
  profile: CreateProfileInput;
  tags?: InputMaybe<Array<Scalars['String']>>;
  templatesSetID: Scalars['UUID'];
  /** The type of Posts created from this Template. */
  type: Scalars['String'];
  visualUri?: InputMaybe<Scalars['String']>;
};

export type CreateProfileInput = {
  /** The URL of the avatar of the user */
  avatarURL?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['Markdown']>;
  /** The display name for the entity. */
  displayName: Scalars['String'];
  location?: InputMaybe<CreateLocationInput>;
  referencesData?: InputMaybe<Array<CreateReferenceInput>>;
  /** A memorable short description for this entity. */
  tagline?: InputMaybe<Scalars['String']>;
  tagsets?: InputMaybe<Array<CreateTagsetInput>>;
};

export type CreateReferenceInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  uri?: InputMaybe<Scalars['String']>;
};

export type CreateReferenceOnProfileInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  profileID: Scalars['UUID'];
  uri?: InputMaybe<Scalars['String']>;
};

export type CreateRelationOnCollaborationInput = {
  actorName: Scalars['String'];
  actorRole?: InputMaybe<Scalars['String']>;
  actorType?: InputMaybe<Scalars['String']>;
  collaborationID: Scalars['UUID'];
  description?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
};

export type CreateSpaceInput = {
  collaborationData?: InputMaybe<CreateCollaborationInput>;
  context?: InputMaybe<CreateContextInput>;
  /** A readable identifier, unique within the containing Account. */
  nameID?: InputMaybe<Scalars['NameID']>;
  profileData: CreateProfileInput;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateSubspaceInput = {
  collaborationData?: InputMaybe<CreateCollaborationInput>;
  context?: InputMaybe<CreateContextInput>;
  /** A readable identifier, unique within the containing Account. */
  nameID?: InputMaybe<Scalars['NameID']>;
  profileData: CreateProfileInput;
  spaceID: Scalars['UUID_NAMEID'];
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateTagsetInput = {
  name: Scalars['String'];
  tags?: InputMaybe<Array<Scalars['String']>>;
  type?: InputMaybe<TagsetType>;
};

export type CreateTagsetOnProfileInput = {
  name: Scalars['String'];
  profileID?: InputMaybe<Scalars['UUID']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  type?: InputMaybe<TagsetType>;
};

export type CreateUserGroupInput = {
  parentID: Scalars['UUID'];
  profile: CreateProfileInput;
};

export type CreateUserInput = {
  accountUpn?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  /** A readable identifier, unique within the containing scope. */
  nameID?: InputMaybe<Scalars['NameID']>;
  phone?: InputMaybe<Scalars['String']>;
  profileData: CreateProfileInput;
};

export type CreateVirtualContributorOnAccountInput = {
  accountID: Scalars['UUID'];
  bodyOfKnowledgeID?: InputMaybe<Scalars['UUID']>;
  bodyOfKnowledgeType?: InputMaybe<BodyOfKnowledgeType>;
  /** A readable identifier, unique within the containing scope. */
  nameID?: InputMaybe<Scalars['NameID']>;
  profileData: CreateProfileInput;
  virtualPersonaID?: InputMaybe<Scalars['UUID']>;
};

export type CreateVirtualPersonaInput = {
  engine: VirtualContributorEngine;
  /** A readable identifier, unique within the containing scope. */
  nameID: Scalars['NameID'];
  profileData: CreateProfileInput;
  prompt?: InputMaybe<Scalars['JSON']>;
};

export type CreateWhiteboardInput = {
  content?: InputMaybe<Scalars['WhiteboardContent']>;
  /** A readable identifier, unique within the containing scope. If not provided it will be generated based on the displayName. */
  nameID?: InputMaybe<Scalars['NameID']>;
  profileData: CreateProfileInput;
};

export type CreateWhiteboardTemplateOnTemplatesSetInput = {
  content?: InputMaybe<Scalars['WhiteboardContent']>;
  /** The profile of the template. */
  profile: CreateProfileInput;
  tags?: InputMaybe<Array<Scalars['String']>>;
  templatesSetID: Scalars['UUID'];
  visualUri?: InputMaybe<Scalars['String']>;
  /** Use the specified Whiteboard as the initial value for this WhiteboardTemplate */
  whiteboardID?: InputMaybe<Scalars['UUID']>;
};

export type Credential = {
  /** The timestamp for the expiry of this credential. */
  expires?: Maybe<Scalars['Float']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The User issuing the credential */
  issuer?: Maybe<Scalars['UUID']>;
  resourceID: Scalars['String'];
  type: CredentialType;
};

export type CredentialDefinition = {
  /** The resourceID for this CredentialDefinition */
  resourceID: Scalars['String'];
  /** The type for this CredentialDefinition */
  type: Scalars['String'];
};

export type CredentialMetadataOutput = {
  /** A json description of what the claim contains and schema validation definition */
  context: Scalars['String'];
  /** The purpose of the credential */
  description: Scalars['String'];
  /** The display name of the credential */
  name: Scalars['String'];
  /** The schema that the credential will be validated against */
  schema: Scalars['String'];
  /** The credential types that are associated with this credential */
  types: Array<Scalars['String']>;
  /** System recognized unique type for the credential */
  uniqueType: Scalars['String'];
};

export enum CredentialType {
  AccountHost = 'ACCOUNT_HOST',
  BetaTester = 'BETA_TESTER',
  GlobalAdmin = 'GLOBAL_ADMIN',
  GlobalCommunityRead = 'GLOBAL_COMMUNITY_READ',
  GlobalLicenseManager = 'GLOBAL_LICENSE_MANAGER',
  GlobalRegistered = 'GLOBAL_REGISTERED',
  GlobalSpacesReader = 'GLOBAL_SPACES_READER',
  GlobalSupport = 'GLOBAL_SUPPORT',
  InnovationPackProvider = 'INNOVATION_PACK_PROVIDER',
  LicenseSpaceEnterprise = 'LICENSE_SPACE_ENTERPRISE',
  LicenseSpaceFree = 'LICENSE_SPACE_FREE',
  LicenseSpacePlus = 'LICENSE_SPACE_PLUS',
  LicenseSpacePremium = 'LICENSE_SPACE_PREMIUM',
  OrganizationAdmin = 'ORGANIZATION_ADMIN',
  OrganizationAssociate = 'ORGANIZATION_ASSOCIATE',
  OrganizationOwner = 'ORGANIZATION_OWNER',
  SpaceAdmin = 'SPACE_ADMIN',
  SpaceLead = 'SPACE_LEAD',
  SpaceMember = 'SPACE_MEMBER',
  SpaceSubspaceAdmin = 'SPACE_SUBSPACE_ADMIN',
  UserGroupMember = 'USER_GROUP_MEMBER',
  UserSelfManagement = 'USER_SELF_MANAGEMENT',
}

export type DeleteActorGroupInput = {
  ID: Scalars['UUID'];
};

export type DeleteActorInput = {
  ID: Scalars['UUID'];
};

export type DeleteApplicationInput = {
  ID: Scalars['UUID'];
};

export type DeleteCalendarEventInput = {
  ID: Scalars['UUID'];
};

export type DeleteCalloutInput = {
  ID: Scalars['UUID'];
};

export type DeleteCalloutTemplateInput = {
  ID: Scalars['UUID'];
};

export type DeleteCollaborationInput = {
  ID: Scalars['UUID'];
};

export type DeleteCommunityGuidelinesTemplateInput = {
  ID: Scalars['UUID'];
};

export type DeleteDiscussionInput = {
  ID: Scalars['UUID'];
};

export type DeleteDocumentInput = {
  ID: Scalars['UUID'];
};

export type DeleteInnovationFlowTemplateInput = {
  ID: Scalars['UUID'];
};

export type DeleteInnovationHubInput = {
  ID: Scalars['UUID'];
};

export type DeleteInnovationPackInput = {
  ID: Scalars['UUID_NAMEID'];
};

export type DeleteInvitationExternalInput = {
  ID: Scalars['UUID'];
};

export type DeleteInvitationInput = {
  ID: Scalars['UUID'];
};

export type DeleteLicensePlanInput = {
  ID: Scalars['UUID'];
};

export type DeleteLinkInput = {
  ID: Scalars['UUID'];
};

export type DeleteOrganizationInput = {
  ID: Scalars['UUID_NAMEID'];
};

export type DeletePostInput = {
  ID: Scalars['UUID'];
};

export type DeletePostTemplateInput = {
  ID: Scalars['UUID'];
};

export type DeleteReferenceInput = {
  ID: Scalars['UUID'];
};

export type DeleteRelationInput = {
  ID: Scalars['String'];
};

export type DeleteSpaceInput = {
  ID: Scalars['UUID_NAMEID'];
};

export type DeleteStorageBuckeetInput = {
  ID: Scalars['UUID'];
};

export type DeleteUserGroupInput = {
  ID: Scalars['UUID'];
};

export type DeleteUserInput = {
  ID: Scalars['UUID_NAMEID_EMAIL'];
};

export type DeleteVirtualContributorInput = {
  ID: Scalars['UUID_NAMEID'];
};

export type DeleteVirtualPersonaInput = {
  ID: Scalars['UUID_NAMEID'];
};

export type DeleteWhiteboardInput = {
  ID: Scalars['UUID'];
};

export type DeleteWhiteboardTemplateInput = {
  ID: Scalars['UUID'];
};

export type DirectRoom = {
  /** The display name of the room */
  displayName: Scalars['String'];
  /** The identifier of the direct room */
  id: Scalars['String'];
  /** The messages that have been sent to the Direct Room. */
  messages: Array<Message>;
  /** The recepient userID */
  receiverID?: Maybe<Scalars['String']>;
};

export type Discussion = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The category assigned to this Discussion. */
  category: DiscussionCategory;
  /** The comments for this Discussion. */
  comments: Room;
  /** The id of the user that created this discussion */
  createdBy?: Maybe<Scalars['UUID']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The Profile for this Discussion. */
  profile: Profile;
  /** The timestamp for the creation of this Discussion. */
  timestamp?: Maybe<Scalars['Float']>;
};

export enum DiscussionCategory {
  ChallengeCentric = 'CHALLENGE_CENTRIC',
  CommunityBuilding = 'COMMUNITY_BUILDING',
  General = 'GENERAL',
  Help = 'HELP',
  Ideas = 'IDEAS',
  Other = 'OTHER',
  PlatformFunctionalities = 'PLATFORM_FUNCTIONALITIES',
  Questions = 'QUESTIONS',
  Releases = 'RELEASES',
  Sharing = 'SHARING',
}

export type DiscussionsInput = {
  /** The number of Discussion entries to return; if omitted return all Discussions. */
  limit?: InputMaybe<Scalars['Float']>;
  /** The sort order of the Discussions to return. */
  orderBy?: InputMaybe<DiscussionsOrderBy>;
};

export enum DiscussionsOrderBy {
  DiscussionsCreatedateAsc = 'DISCUSSIONS_CREATEDATE_ASC',
  DiscussionsCreatedateDesc = 'DISCUSSIONS_CREATEDATE_DESC',
}

export type Document = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The user that created this Document */
  createdBy?: Maybe<User>;
  /** The display name. */
  displayName: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Mime type for this Document. */
  mimeType: MimeType;
  /** Size of the Document. */
  size: Scalars['Float'];
  /** The tagset in use on this Document. */
  tagset: Tagset;
  /** The uploaded date of this Document */
  uploadedDate: Scalars['DateTime'];
  /** The URL to be used to retrieve the Document */
  url: Scalars['String'];
};

export type EcosystemModel = {
  /** A list of ActorGroups */
  actorGroups?: Maybe<Array<ActorGroup>>;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** Overview of this ecosystem model. */
  description?: Maybe<Scalars['String']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
};

export type FileStorageConfig = {
  /** Max file size, in bytes. */
  maxFileSize: Scalars['Float'];
  /** Allowed mime types for file upload, separated by a coma. */
  mimeTypes: Array<Scalars['String']>;
};

export type Form = {
  /** A description of the purpose of this Form. */
  description?: Maybe<Scalars['Markdown']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The set of Questions in this Form. */
  questions: Array<FormQuestion>;
};

export type FormQuestion = {
  /** The explation text to clarify the question. */
  explanation: Scalars['String'];
  /** The maxiumum length of the answer, in characters, up to a limit of 512. */
  maxLength: Scalars['Float'];
  /** The question to be answered */
  question: Scalars['String'];
  /** Whether this Question requires an answer or not. */
  required: Scalars['Boolean'];
  /** The sort order of this question in a wider set of questions. */
  sortOrder: Scalars['Float'];
};

export type Geo = {
  /** Endpoint where geo information is consumed from. */
  endpoint: Scalars['String'];
};

export type GrantAuthorizationCredentialInput = {
  /** The resource to which this credential is tied. */
  resourceID?: InputMaybe<Scalars['UUID']>;
  type: AuthorizationCredential;
  /** The user to whom the credential is being granted. */
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type GrantOrganizationAuthorizationCredentialInput = {
  /** The Organization to whom the credential is being granted. */
  organizationID: Scalars['UUID'];
  /** The resource to which this credential is tied. */
  resourceID?: InputMaybe<Scalars['UUID']>;
  type: AuthorizationCredential;
};

export type Groupable = {
  /** The groups contained by this entity. */
  groups?: Maybe<Array<UserGroup>>;
};

export type ISearchResults = {
  /** The search results for Callouts. */
  calloutResults: Array<SearchResult>;
  /** The total number of results for Callouts. */
  calloutResultsCount: Scalars['Float'];
  /** The search results for contributions (Posts, Whiteboards etc). */
  contributionResults: Array<SearchResult>;
  /** The total number of search results for contributions (Posts, Whiteboards etc). */
  contributionResultsCount: Scalars['Float'];
  /** The search results for contributors (Users, Organizations). */
  contributorResults: Array<SearchResult>;
  /** The total number of search results for contributors (Users, Organizations). */
  contributorResultsCount: Scalars['Float'];
  /** The search results for Groups. */
  groupResults: Array<SearchResult>;
  /** The search results for Spaces / Subspaces. */
  journeyResults: Array<SearchResult>;
  /** The total number of results for Spaces / Subspaces. */
  journeyResultsCount: Scalars['Float'];
};

export type IngestBatchResult = {
  /** A message to describe the result of the operation. */
  message?: Maybe<Scalars['String']>;
  /** Whether the operation was successful. */
  success: Scalars['Boolean'];
};

export type IngestResult = {
  /** The result of the operation. */
  batches: Array<IngestBatchResult>;
  /** The index that the documents were ingested into. */
  index: Scalars['String'];
  /** Amount of documents indexed. */
  total?: Maybe<Scalars['Float']>;
};

export type IngestSpaceInput = {
  /** The identifier for the Space to be ingested. */
  spaceID: Scalars['UUID'];
};

export type InnovationFlow = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The currently selected state for this Flow. */
  currentState: InnovationFlowState;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The Profile for this InnovationFlow. */
  profile: Profile;
  /** The set of States in use in this Flow. */
  states: Array<InnovationFlowState>;
};

export type InnovationFlowState = {
  /** The explation text to clarify the state. */
  description: Scalars['Markdown'];
  /** The display name for the State */
  displayName: Scalars['String'];
};

export type InnovationFlowTemplate = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The Profile for this template. */
  profile: Profile;
  /** The set of States in use in this Flow. */
  states: Array<InnovationFlowState>;
};

export type InnovationHub = {
  /** The Innovation Hub account. */
  account: Account;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The Innovation Hub profile. */
  profile: Profile;
  spaceListFilter?: Maybe<Array<Space>>;
  /** If defined, what type of visibility to filter the Spaces on. You can have only one type of filter active at any given time. */
  spaceVisibilityFilter?: Maybe<SpaceVisibility>;
  /** The subdomain associated with this Innovation Hub. */
  subdomain: Scalars['String'];
  /** Type of Innovation Hub */
  type: InnovationHubType;
};

export enum InnovationHubType {
  List = 'LIST',
  Visibility = 'VISIBILITY',
}

export type InnovationPack = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The Profile for this InnovationPack. */
  profile: Profile;
  /** The InnovationPack provider. */
  provider?: Maybe<Organization>;
  /** The templates in use by this InnovationPack */
  templates?: Maybe<TemplatesSet>;
};

export type InnovationPacksInput = {
  /** The number of Discussion entries to return; if omitted return all InnovationPacks. */
  limit?: InputMaybe<Scalars['Float']>;
  /** The sort order of the InnovationPacks to return. Defaults to number of templates Descending. */
  orderBy?: InputMaybe<InnovationPacksOrderBy>;
};

export enum InnovationPacksOrderBy {
  NumberOfTemplatesAsc = 'NUMBER_OF_TEMPLATES_ASC',
  NumberOfTemplatesDesc = 'NUMBER_OF_TEMPLATES_DESC',
  Random = 'RANDOM',
}

export type Invitation = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The User who triggered the invitation. */
  createdBy: User;
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Whether to also add the invited user to the parent community. */
  invitedToParent: Scalars['Boolean'];
  lifecycle: Lifecycle;
  updatedDate: Scalars['DateTime'];
  /** The User who is invited. */
  user: User;
  welcomeMessage?: Maybe<Scalars['String']>;
};

export type InvitationEventInput = {
  eventName: Scalars['String'];
  invitationID: Scalars['UUID'];
};

export type InvitationExternal = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The User who triggered the invitationExternal. */
  createdBy: User;
  createdDate: Scalars['DateTime'];
  /** The email address of the external user being invited */
  email: Scalars['String'];
  firstName: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Whether to also add the invited user to the parent community. */
  invitedToParent: Scalars['Boolean'];
  lastName: Scalars['String'];
  /** Whether a new user profile has been created. */
  profileCreated: Scalars['Boolean'];
  welcomeMessage?: Maybe<Scalars['String']>;
};

export type InvitationForRoleResult = {
  /** ID for the community */
  communityID: Scalars['UUID'];
  /** ID for the user that created the invitation. */
  createdBy: Scalars['UUID'];
  /** Date of creation */
  createdDate: Scalars['DateTime'];
  /** Display name of the community */
  displayName: Scalars['String'];
  /** ID for the application */
  id: Scalars['UUID'];
  /** ID for the ultimate containing Space */
  spaceID: Scalars['UUID'];
  /** Nesting level of the Space */
  spaceLevel: Scalars['Float'];
  /** The current state of the invitation. */
  state: Scalars['String'];
  /** Date of last update */
  updatedDate: Scalars['DateTime'];
  /** The welcome message of the invitation */
  welcomeMessage?: Maybe<Scalars['UUID']>;
};

export type LatestReleaseDiscussion = {
  /** Id of the latest release discussion. */
  id: Scalars['String'];
  /** NameID of the latest release discussion. */
  nameID: Scalars['String'];
};

export type Library = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** A single Innovation Pack */
  innovationPack?: Maybe<InnovationPack>;
  /** The Innovation Packs in the platform Innovation Library. */
  innovationPacks: Array<InnovationPack>;
  /** The StorageAggregator for storage used by this Library */
  storageAggregator?: Maybe<StorageAggregator>;
};

export type LibraryInnovationPackArgs = {
  ID: Scalars['UUID_NAMEID'];
};

export type LibraryInnovationPacksArgs = {
  queryData?: InputMaybe<InnovationPacksInput>;
};

export type License = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The FeatureFlags for the license */
  featureFlags: Array<LicenseFeatureFlag>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The privileges granted based on this License. */
  privileges?: Maybe<Array<LicensePrivilege>>;
  /** Visibility of the Space. */
  visibility: SpaceVisibility;
};

export enum LicenseCredential {
  LicenseSpaceEnterprise = 'LICENSE_SPACE_ENTERPRISE',
  LicenseSpaceFree = 'LICENSE_SPACE_FREE',
  LicenseSpacePlus = 'LICENSE_SPACE_PLUS',
  LicenseSpacePremium = 'LICENSE_SPACE_PREMIUM',
}

export type LicenseFeatureFlag = {
  /** Is this feature flag enabled? */
  enabled: Scalars['Boolean'];
  /** The name of the feature flag */
  name: LicenseFeatureFlagName;
};

export enum LicenseFeatureFlagName {
  CalloutToCalloutTemplate = 'CALLOUT_TO_CALLOUT_TEMPLATE',
  VirtualContributors = 'VIRTUAL_CONTRIBUTORS',
  WhiteboardMultiUser = 'WHITEBOARD_MULTI_USER',
}

export type LicensePlan = {
  /** Is this plan enabled? */
  enabled: Scalars['Boolean'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Is this plan free? */
  isFree: Scalars['Boolean'];
  /** The credential to represent this plan */
  licenseCredential: LicenseCredential;
  /** The name of the License Plan */
  name: Scalars['String'];
  /** The price per month of this plan. */
  pricePerMonth?: Maybe<Scalars['Float']>;
  /** Does this plan require contact support */
  requiresContactSupport: Scalars['Boolean'];
  /** Does this plan require a payment method? */
  requiresPaymentMethod: Scalars['Boolean'];
  /** The sorting order for this Plan. */
  sortOrder: Scalars['Float'];
  /** Is there a trial period enabled */
  trialEnabled: Scalars['Boolean'];
};

export type LicensePolicy = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The set of credential rules that are contained by this License Policy. */
  featureFlagRules?: Maybe<Array<LicensePolicyRuleFeatureFlag>>;
  /** The ID of the entity */
  id: Scalars['UUID'];
};

export type LicensePolicyRuleFeatureFlag = {
  featureFlagName: LicenseFeatureFlagName;
  grantedPrivileges: Array<LicensePrivilege>;
  name?: Maybe<Scalars['String']>;
};

export enum LicensePrivilege {
  CalloutSaveAsTemplate = 'CALLOUT_SAVE_AS_TEMPLATE',
  VirtualContributorAccess = 'VIRTUAL_CONTRIBUTOR_ACCESS',
  WhiteboardMultiUser = 'WHITEBOARD_MULTI_USER',
}

export type Licensing = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The base License Plan assigned to all Accounts in use on the platform. */
  basePlan: LicensePlan;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The License Plans in use on the platform. */
  plans: Array<LicensePlan>;
  /** The LicensePolicy in use by the Licensing setup. */
  policy: LicensePolicy;
};

export type Lifecycle = {
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The machine definition, describing the states, transitions etc for this Lifeycle. */
  machineDef: Scalars['LifecycleDefinition'];
  /** The next events of this Lifecycle. */
  nextEvents?: Maybe<Array<Scalars['String']>>;
  /** The current state of this Lifecycle. */
  state?: Maybe<Scalars['String']>;
  /** Is this lifecycle in a final state (done). */
  stateIsFinal: Scalars['Boolean'];
  /** The Lifecycle template name. */
  templateName?: Maybe<Scalars['String']>;
};

export type Link = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The Profile for framing the associated Link Contribution. */
  profile: Profile;
  /** URI of the Link */
  uri: Scalars['String'];
};

export type Location = {
  addressLine1: Scalars['String'];
  addressLine2: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  postalCode: Scalars['String'];
  stateOrProvince: Scalars['String'];
};

export type LookupQueryResults = {
  /** Lookup the specified Application */
  application?: Maybe<Application>;
  /** Lookup the specified Authorization Policy */
  authorizationPolicy?: Maybe<Authorization>;
  /** The privileges granted to the specified user based on this Authorization Policy. */
  authorizationPrivilegesForUser?: Maybe<Array<AuthorizationPrivilege>>;
  /** Lookup the specified Calendar */
  calendar?: Maybe<Calendar>;
  /** Lookup the specified CalendarEvent */
  calendarEvent?: Maybe<CalendarEvent>;
  /** Lookup the specified Callout */
  callout?: Maybe<Callout>;
  /** Lookup the specified Callout Template */
  calloutTemplate?: Maybe<CalloutTemplate>;
  /** Lookup the specified Collaboration */
  collaboration?: Maybe<Collaboration>;
  /** Lookup the specified Community */
  community?: Maybe<Community>;
  /** Lookup the specified Community guidelines */
  communityGuidelines?: Maybe<CommunityGuidelines>;
  /** Lookup the specified InnovationFlow Template */
  communityGuidelinesTemplate?: Maybe<CommunityGuidelinesTemplate>;
  /** Lookup the specified Context */
  context?: Maybe<Context>;
  /** Lookup the specified Document */
  document?: Maybe<Document>;
  /** Lookup the specified InnovationFlow */
  innovationFlow?: Maybe<InnovationFlow>;
  /** Lookup the specified InnovationFlow Template */
  innovationFlowTemplate?: Maybe<InnovationFlowTemplate>;
  /** Lookup the specified Invitation */
  invitation?: Maybe<Invitation>;
  /** Lookup the specified Post */
  post?: Maybe<Post>;
  /** Lookup the specified Profile */
  profile?: Maybe<Profile>;
  /** Lookup the specified Room */
  room?: Maybe<Room>;
  /** Lookup the specified Space */
  space?: Maybe<Space>;
  /** Lookup the specified StorageAggregator */
  storageAggregator?: Maybe<StorageAggregator>;
  /** Lookup the specified Whiteboard */
  whiteboard?: Maybe<Whiteboard>;
  /** Lookup the specified Whiteboard Template */
  whiteboardTemplate?: Maybe<WhiteboardTemplate>;
};

export type LookupQueryResultsApplicationArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsAuthorizationPolicyArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsAuthorizationPrivilegesForUserArgs = {
  authorizationID: Scalars['UUID'];
  userID: Scalars['UUID'];
};

export type LookupQueryResultsCalendarArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsCalendarEventArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsCalloutArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsCalloutTemplateArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsCollaborationArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsCommunityArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsCommunityGuidelinesArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsCommunityGuidelinesTemplateArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsContextArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsDocumentArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsInnovationFlowArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsInnovationFlowTemplateArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsInvitationArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsPostArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsProfileArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsRoomArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsSpaceArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsStorageAggregatorArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsWhiteboardArgs = {
  ID: Scalars['UUID'];
};

export type LookupQueryResultsWhiteboardTemplateArgs = {
  ID: Scalars['UUID'];
};

export type MeQueryResults = {
  /** The applications of the current authenticated user */
  applications: Array<ApplicationForRoleResult>;
  /** Can I create a free space? */
  canCreateFreeSpace: Scalars['Boolean'];
  /** The query id */
  id: Scalars['String'];
  /** The invitations of the current authenticated user */
  invitations: Array<InvitationForRoleResult>;
  /** The Spaces I am contributing to */
  mySpaces: Array<MySpaceResults>;
  /** The applications of the current authenticated user */
  spaceMemberships: Array<Space>;
  /** The current authenticated User;  null if not yet registered on the platform */
  user?: Maybe<User>;
};

export type MeQueryResultsApplicationsArgs = {
  states?: InputMaybe<Array<Scalars['String']>>;
};

export type MeQueryResultsInvitationsArgs = {
  states?: InputMaybe<Array<Scalars['String']>>;
};

export type MeQueryResultsMySpacesArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  showOnlyMyCreatedSpaces?: InputMaybe<Scalars['Boolean']>;
};

export type MeQueryResultsSpaceMembershipsArgs = {
  visibilities?: InputMaybe<Array<SpaceVisibility>>;
};

/** A message that was sent either as an Update or as part of a Discussion. */
export type Message = {
  /** The id for the message event. */
  id: Scalars['MessageID'];
  /** The message being sent */
  message: Scalars['Markdown'];
  /** Reactions on this message */
  reactions: Array<Reaction>;
  /** The User or Virtual Contributor that created this Message */
  sender?: Maybe<Contributor>;
  /** The message being replied to */
  threadID?: Maybe<Scalars['String']>;
  /** The server timestamp in UTC */
  timestamp: Scalars['Float'];
};

export type Metadata = {
  /** Collection of metadata about Alkemio services. */
  services: Array<ServiceMetadata>;
};

export enum MimeType {
  Avif = 'AVIF',
  Bmp = 'BMP',
  Gif = 'GIF',
  Jpeg = 'JPEG',
  Jpg = 'JPG',
  Pdf = 'PDF',
  Png = 'PNG',
  Svg = 'SVG',
  Webp = 'WEBP',
  Xpng = 'XPNG',
}

export type MoveCalloutContributionInput = {
  /** ID of the Callout to move the Contribution to. */
  calloutID: Scalars['UUID'];
  /** ID of the Contribution to move. */
  contributionID: Scalars['UUID'];
};

export type Mutation = {
  /** Add a reaction to a message from the specified Room. */
  addReactionToMessageInRoom: Reaction;
  /** Ensure all community members are registered for communications. */
  adminCommunicationEnsureAccessToCommunications: Scalars['Boolean'];
  /** Remove an orphaned room from messaging platform. */
  adminCommunicationRemoveOrphanedRoom: Scalars['Boolean'];
  /** Allow updating the rule for joining rooms: public or invite. */
  adminCommunicationUpdateRoomsJoinRule: Scalars['Boolean'];
  /** Ingests new data into Elasticsearch from scratch. This will delete all existing data and ingest new data from the source. This is an admin only operation. */
  adminSearchIngestFromScratch: Scalars['String'];
  /** Apply to join the specified Community as a member. */
  applyForCommunityMembership: Application;
  /** Assigns an Organization a Role in the specified Community. */
  assignCommunityRoleToOrganization: Organization;
  /** Assigns a User to a role in the specified Community. */
  assignCommunityRoleToUser: User;
  /** Assigns a Virtual Contributor to a role in the specified Community. */
  assignCommunityRoleToVirtual: VirtualContributor;
  /** Assign the specified LicensePlan to an Account. */
  assignLicensePlanToAccount: Account;
  /** Assigns an Organization Role to user. */
  assignOrganizationRoleToUser: User;
  /** Assigns a platform role to a User. */
  assignPlatformRoleToUser: User;
  /** Assigns a User as a member of the specified User Group. */
  assignUserToGroup: UserGroup;
  /** Reset the Authorization Policy on all entities */
  authorizationPolicyResetAll: Scalars['String'];
  /** Reset the Authorization Policy on the specified Account. */
  authorizationPolicyResetOnAccount: Account;
  /** Reset the Authorization Policy on the specified Organization. */
  authorizationPolicyResetOnOrganization: Organization;
  /** Reset the Authorization Policy on the specified Platform. */
  authorizationPolicyResetOnPlatform: Platform;
  /** Reset the Authorization policy on the specified User. */
  authorizationPolicyResetOnUser: User;
  /** Reset the specified Authorization Policy to global admin privileges */
  authorizationPolicyResetToGlobalAdminsAccess: Authorization;
  /** Generate Alkemio user credential offer */
  beginAlkemioUserVerifiedCredentialOfferInteraction: AgentBeginVerifiedCredentialOfferOutput;
  /** Generate community member credential offer */
  beginCommunityMemberVerifiedCredentialOfferInteraction: AgentBeginVerifiedCredentialOfferOutput;
  /** Generate verified credential share request */
  beginVerifiedCredentialRequestInteraction: AgentBeginVerifiedCredentialRequestOutput;
  /** Creates a new Space by converting an existing Challenge. */
  convertChallengeToSpace: Space;
  /** Creates a new Challenge by converting an existing Opportunity. */
  convertOpportunityToChallenge: Space;
  /** Creates a new Account with a single root Space. */
  createAccount: Account;
  /** Creates a new Actor in the specified ActorGroup. */
  createActor: Actor;
  /** Create a new Actor Group on the EcosystemModel. */
  createActorGroup: ActorGroup;
  /** Create a new Callout on the Collaboration. */
  createCalloutOnCollaboration: Callout;
  /** Creates a new CalloutTemplate on the specified TemplatesSet. */
  createCalloutTemplate: CalloutTemplate;
  /** Creates a new CommunityGuidelinesTemplate on the specified TemplatesSet. */
  createCommunityGuidelinesTemplate: CommunityGuidelinesTemplate;
  /** Create a new Contribution on the Callout. */
  createContributionOnCallout: CalloutContribution;
  /** Creates a new Discussion as part of this Communication. */
  createDiscussion: Discussion;
  /** Create a new CalendarEvent on the Calendar. */
  createEventOnCalendar: CalendarEvent;
  /** Creates a new User Group in the specified Community. */
  createGroupOnCommunity: UserGroup;
  /** Creates a new User Group for the specified Organization. */
  createGroupOnOrganization: UserGroup;
  /** Creates a new InnovationFlowTemplate on the specified TemplatesSet. */
  createInnovationFlowTemplate: InnovationFlowTemplate;
  /** Create Innovation Hub. */
  createInnovationHub: InnovationHub;
  /** Create a new InnovatonPack on the Library. */
  createInnovationPackOnLibrary: InnovationPack;
  /** Create a new LicensePlan on the Licensing. */
  createLicensePlan: LicensePlan;
  /** Creates a new Organization on the platform. */
  createOrganization: Organization;
  /** Creates a new PostTemplate on the specified TemplatesSet. */
  createPostTemplate: PostTemplate;
  /** Creates a new Reference on the specified Profile. */
  createReferenceOnProfile: Reference;
  /** Create a new Relation on the Collaboration. */
  createRelationOnCollaboration: Relation;
  /** Creates a new Subspace within the specified Space. */
  createSubspace: Space;
  /** Creates a new Tagset on the specified Profile */
  createTagsetOnProfile: Tagset;
  /** Creates a new User on the platform. */
  createUser: User;
  /** Creates a new User profile on the platform for a user that has a valid Authentication session. */
  createUserNewRegistration: User;
  /** Creates a new VirtualContributor on an Account. */
  createVirtualContributor: VirtualContributor;
  /** Creates a new VirtualPersona on the platform. */
  createVirtualPersona: VirtualPersona;
  /** Creates a new WhiteboardTemplate on the specified TemplatesSet. */
  createWhiteboardTemplate: WhiteboardTemplate;
  /** Deletes the specified Actor. */
  deleteActor: Actor;
  /** Deletes the specified Actor Group, including contained Actors. */
  deleteActorGroup: ActorGroup;
  /** Deletes the specified CalendarEvent. */
  deleteCalendarEvent: CalendarEvent;
  /** Delete a Callout. */
  deleteCallout: Callout;
  /** Deletes the specified CalloutTemplate. */
  deleteCalloutTemplate: CalloutTemplate;
  /** Delete Collaboration. */
  deleteCollaboration: Collaboration;
  /** Deletes the specified CommunityGuidelines Template. */
  deleteCommunityGuidelinesTemplate: CommunityGuidelinesTemplate;
  /** Deletes the specified Discussion. */
  deleteDiscussion: Discussion;
  /** Deletes the specified Document. */
  deleteDocument: Document;
  /** Deletes the specified InnovationFlowTemplate. */
  deleteInnovationFlowTemplate: InnovationFlowTemplate;
  /** Delete Innovation Hub. */
  deleteInnovationHub: InnovationHub;
  /** Deletes the specified InnovationPack. */
  deleteInnovationPack: InnovationPack;
  /** Removes the specified User invitation. */
  deleteInvitation: Invitation;
  /** Removes the specified User invitationExternal. */
  deleteInvitationExternal: InvitationExternal;
  /** Deletes the specified LicensePlan. */
  deleteLicensePlan: LicensePlan;
  /** Deletes the specified Link. */
  deleteLink: Link;
  /** Deletes the specified Organization. */
  deleteOrganization: Organization;
  /** Deletes the specified Post. */
  deletePost: Post;
  /** Deletes the specified PostTemplate. */
  deletePostTemplate: PostTemplate;
  /** Deletes the specified Reference. */
  deleteReference: Reference;
  /** Deletes the specified Relation. */
  deleteRelation: Relation;
  /** Deletes the specified Space. */
  deleteSpace: Space;
  /** Deletes a Storage Bucket */
  deleteStorageBucket: StorageBucket;
  /** Deletes the specified User. */
  deleteUser: User;
  /** Removes the specified User Application. */
  deleteUserApplication: Application;
  /** Deletes the specified User Group. */
  deleteUserGroup: UserGroup;
  /** Deletes the specified VirtualContributor. */
  deleteVirtualContributor: VirtualContributor;
  /** Deletes the specified VirtualPersona. */
  deleteVirtualPersona: VirtualPersona;
  /** Deletes the specified Whiteboard. */
  deleteWhiteboard: Whiteboard;
  /** Deletes the specified WhiteboardTemplate. */
  deleteWhiteboardTemplate: WhiteboardTemplate;
  /** Trigger an event on the Application. */
  eventOnApplication: Application;
  /** Trigger an event on the Invitation. */
  eventOnCommunityInvitation: Invitation;
  /** Trigger an event on the Organization Verification. */
  eventOnOrganizationVerification: OrganizationVerification;
  /** Grants an authorization credential to an Organization. */
  grantCredentialToOrganization: Organization;
  /** Grants an authorization credential to a User. */
  grantCredentialToUser: User;
  /** Resets the interaction with the chat engine. */
  ingest: Scalars['Boolean'];
  /** Triggers space ingestion. */
  ingestSpace: Space;
  /** Invite an existing User to join the specified Community as a member. */
  inviteExistingUserForCommunityMembership: Array<Invitation>;
  /** Invite an external User to join the specified Community as a member. */
  inviteForCommunityMembershipByEmail: AnyInvitation;
  /** Join the specified Community as a member, without going through an approval process. */
  joinCommunity: Community;
  /** Sends a message on the specified User`s behalf and returns the room id */
  messageUser: Scalars['String'];
  /** Moves the specified Contribution to another Callout. */
  moveContributionToCallout: CalloutContribution;
  /** Removes an Organization from a Role in the specified Community. */
  removeCommunityRoleFromOrganization: Organization;
  /** Removes a User from a Role in the specified Community. */
  removeCommunityRoleFromUser: User;
  /** Removes a Virtual from a Role in the specified Community. */
  removeCommunityRoleFromVirtual: VirtualContributor;
  /** Removes a message. */
  removeMessageOnRoom: Scalars['MessageID'];
  /** Removes Organization Role from user. */
  removeOrganizationRoleFromUser: User;
  /** Removes a User from a platform role. */
  removePlatformRoleFromUser: User;
  /** Remove a reaction on a message from the specified Room. */
  removeReactionToMessageInRoom: Scalars['Boolean'];
  /** Removes the specified User from specified user group */
  removeUserFromGroup: UserGroup;
  /** Resets the interaction with the chat engine. */
  resetChatGuidance: Scalars['Boolean'];
  /** Removes an authorization credential from an Organization. */
  revokeCredentialFromOrganization: Organization;
  /** Removes an authorization credential from a User. */
  revokeCredentialFromUser: User;
  /** Revokes the specified LicensePlan on an Account. */
  revokeLicensePlanFromAccount: Account;
  /** Sends a reply to a message from the specified Room. */
  sendMessageReplyToRoom: Message;
  /** Send message to Community Leads. */
  sendMessageToCommunityLeads: Scalars['Boolean'];
  /** Send message to an Organization. */
  sendMessageToOrganization: Scalars['Boolean'];
  /** Sends an comment message. Returns the id of the new Update message. */
  sendMessageToRoom: Message;
  /** Send message to a User. */
  sendMessageToUser: Scalars['Boolean'];
  /** Update the platform settings, such as license, of the specified Account. */
  updateAccountPlatformSettings: Account;
  /** Updates the specified Actor. */
  updateActor: Actor;
  /** User vote if a specific answer is relevant. */
  updateAnswerRelevance: Scalars['Boolean'];
  /** Updates the specified CalendarEvent. */
  updateCalendarEvent: CalendarEvent;
  /** Update a Callout. */
  updateCallout: Callout;
  /** Update the information describing the publishing of the specified Callout. */
  updateCalloutPublishInfo: Callout;
  /** Updates the specified CalloutTemplate. */
  updateCalloutTemplate: CalloutTemplate;
  /** Update the visibility of the specified Callout. */
  updateCalloutVisibility: Callout;
  /** Update the sortOrder field of the supplied Callouts to increase as per the order that they are provided in. */
  updateCalloutsSortOrder: Array<Callout>;
  /** Update the Application Form used by this Community. */
  updateCommunityApplicationForm: Community;
  /** Updates the CommunityGuidelines. */
  updateCommunityGuidelines: CommunityGuidelines;
  /** Updates the specified CommunityGuidelinesTemplate. */
  updateCommunityGuidelinesTemplate: CommunityGuidelinesTemplate;
  /** Updates the specified Discussion. */
  updateDiscussion: Discussion;
  /** Updates the specified Document. */
  updateDocument: Document;
  /** Updates the specified EcosystemModel. */
  updateEcosystemModel: EcosystemModel;
  /** Updates the InnovationFlow. */
  updateInnovationFlow: InnovationFlow;
  /** Updates the InnovationFlow. */
  updateInnovationFlowSelectedState: InnovationFlow;
  /** Updates the specified InnovationFlowState. */
  updateInnovationFlowSingleState: InnovationFlow;
  /** Updates the InnovationFlow states from the specified template. */
  updateInnovationFlowStatesFromTemplate: InnovationFlow;
  /** Updates the specified InnovationFlowTemplate. */
  updateInnovationFlowTemplate: InnovationFlowTemplate;
  /** Update Innovation Hub. */
  updateInnovationHub: InnovationHub;
  /** Update Innovation Hub Settings. */
  updateInnovationHubPlatformSettings: InnovationHub;
  /** Updates the InnovationPack. */
  updateInnovationPack: InnovationPack;
  /** Updates the LicensePlan. */
  updateLicensePlan: LicensePlan;
  /** Updates the specified Link. */
  updateLink: Link;
  /** Updates the specified Organization. */
  updateOrganization: Organization;
  /** Updates the specified Post. */
  updatePost: Post;
  /** Updates the specified PostTemplate. */
  updatePostTemplate: PostTemplate;
  /** Updates one of the Preferences on an Organization */
  updatePreferenceOnOrganization: Preference;
  /** Updates one of the Preferences on a Space */
  updatePreferenceOnUser: Preference;
  /** Updates the specified Profile. */
  updateProfile: Profile;
  /** Updates the specified Reference. */
  updateReference: Reference;
  /** Updates the Space. */
  updateSpace: Space;
  /** Updates the specified SpaceDefaults. */
  updateSpaceDefaults: SpaceDefaults;
  /** Update the platform settings, such as nameID, of the specified Space. */
  updateSpacePlatformSettings: Space;
  /** Updates one of the Setting on a Space */
  updateSpaceSettings: Space;
  /** Updates the specified Tagset. */
  updateTagset: Tagset;
  /** Updates the User. */
  updateUser: User;
  /** Updates the specified User Group. */
  updateUserGroup: UserGroup;
  /** Update the platform settings, such as nameID, email, for the specified User. */
  updateUserPlatformSettings: User;
  /** Updates the specified VirtualContributor. */
  updateVirtualContributor: VirtualContributor;
  /** Update VirtualContributor Platform Settings. */
  updateVirtualContributorPlatformSettings: VirtualContributor;
  /** Updates the specified VirtualPersona. */
  updateVirtualPersona: VirtualPersona;
  /** Updates the image URI for the specified Visual. */
  updateVisual: Visual;
  /** Updates the specified Whiteboard. */
  updateWhiteboard: Whiteboard;
  /** Updates the specified Whiteboard content. */
  updateWhiteboardContent: Whiteboard;
  /** Updates the specified WhiteboardTemplate. */
  updateWhiteboardTemplate: WhiteboardTemplate;
  /** Create a new Document on the Storage and return the value as part of the returned Link. */
  uploadFileOnLink: Link;
  /** Create a new Document on the Storage and return the value as part of the returned Reference. */
  uploadFileOnReference: Reference;
  /** Create a new Document on the Storage and return the public Url. */
  uploadFileOnStorageBucket: Scalars['String'];
  /** Uploads and sets an image for the specified Visual. */
  uploadImageOnVisual: Visual;
};

export type MutationAddReactionToMessageInRoomArgs = {
  reactionData: RoomAddReactionToMessageInput;
};

export type MutationAdminCommunicationEnsureAccessToCommunicationsArgs = {
  communicationData: CommunicationAdminEnsureAccessInput;
};

export type MutationAdminCommunicationRemoveOrphanedRoomArgs = {
  orphanedRoomData: CommunicationAdminRemoveOrphanedRoomInput;
};

export type MutationAdminCommunicationUpdateRoomsJoinRuleArgs = {
  changeRoomAccessData: CommunicationAdminUpdateRoomsJoinRuleInput;
};

export type MutationApplyForCommunityMembershipArgs = {
  applicationData: CommunityApplyInput;
};

export type MutationAssignCommunityRoleToOrganizationArgs = {
  roleData: AssignCommunityRoleToOrganizationInput;
};

export type MutationAssignCommunityRoleToUserArgs = {
  roleData: AssignCommunityRoleToUserInput;
};

export type MutationAssignCommunityRoleToVirtualArgs = {
  roleData: AssignCommunityRoleToVirtualInput;
};

export type MutationAssignLicensePlanToAccountArgs = {
  planData: AssignLicensePlanToAccount;
};

export type MutationAssignOrganizationRoleToUserArgs = {
  membershipData: AssignOrganizationRoleToUserInput;
};

export type MutationAssignPlatformRoleToUserArgs = {
  membershipData: AssignPlatformRoleToUserInput;
};

export type MutationAssignUserToGroupArgs = {
  membershipData: AssignUserGroupMemberInput;
};

export type MutationAuthorizationPolicyResetOnAccountArgs = {
  authorizationResetData: AccountAuthorizationResetInput;
};

export type MutationAuthorizationPolicyResetOnOrganizationArgs = {
  authorizationResetData: OrganizationAuthorizationResetInput;
};

export type MutationAuthorizationPolicyResetOnUserArgs = {
  authorizationResetData: UserAuthorizationResetInput;
};

export type MutationAuthorizationPolicyResetToGlobalAdminsAccessArgs = {
  authorizationID: Scalars['String'];
};

export type MutationBeginCommunityMemberVerifiedCredentialOfferInteractionArgs =
  {
    communityID: Scalars['String'];
  };

export type MutationBeginVerifiedCredentialRequestInteractionArgs = {
  types: Array<Scalars['String']>;
};

export type MutationConvertChallengeToSpaceArgs = {
  convertData: ConvertSubspaceToSpaceInput;
};

export type MutationConvertOpportunityToChallengeArgs = {
  convertData: ConvertSubsubspaceToSubspaceInput;
};

export type MutationCreateAccountArgs = {
  accountData: CreateAccountInput;
};

export type MutationCreateActorArgs = {
  actorData: CreateActorInput;
};

export type MutationCreateActorGroupArgs = {
  actorGroupData: CreateActorGroupInput;
};

export type MutationCreateCalloutOnCollaborationArgs = {
  calloutData: CreateCalloutOnCollaborationInput;
};

export type MutationCreateCalloutTemplateArgs = {
  calloutTemplateInput: CreateCalloutTemplateOnTemplatesSetInput;
};

export type MutationCreateCommunityGuidelinesTemplateArgs = {
  communityGuidelinesTemplateInput: CreateCommunityGuidelinesTemplateOnTemplatesSetInput;
};

export type MutationCreateContributionOnCalloutArgs = {
  contributionData: CreateContributionOnCalloutInput;
};

export type MutationCreateDiscussionArgs = {
  createData: CommunicationCreateDiscussionInput;
};

export type MutationCreateEventOnCalendarArgs = {
  eventData: CreateCalendarEventOnCalendarInput;
};

export type MutationCreateGroupOnCommunityArgs = {
  groupData: CreateUserGroupInput;
};

export type MutationCreateGroupOnOrganizationArgs = {
  groupData: CreateUserGroupInput;
};

export type MutationCreateInnovationFlowTemplateArgs = {
  innovationFlowTemplateInput: CreateInnovationFlowTemplateOnTemplatesSetInput;
};

export type MutationCreateInnovationHubArgs = {
  createData: CreateInnovationHubInput;
};

export type MutationCreateInnovationPackOnLibraryArgs = {
  packData: CreateInnovationPackOnLibraryInput;
};

export type MutationCreateLicensePlanArgs = {
  planData: CreateLicensePlanOnLicensingInput;
};

export type MutationCreateOrganizationArgs = {
  organizationData: CreateOrganizationInput;
};

export type MutationCreatePostTemplateArgs = {
  postTemplateInput: CreatePostTemplateOnTemplatesSetInput;
};

export type MutationCreateReferenceOnProfileArgs = {
  referenceInput: CreateReferenceOnProfileInput;
};

export type MutationCreateRelationOnCollaborationArgs = {
  relationData: CreateRelationOnCollaborationInput;
};

export type MutationCreateSubspaceArgs = {
  subspaceData: CreateSubspaceInput;
};

export type MutationCreateTagsetOnProfileArgs = {
  tagsetData: CreateTagsetOnProfileInput;
};

export type MutationCreateUserArgs = {
  userData: CreateUserInput;
};

export type MutationCreateVirtualContributorArgs = {
  virtualContributorData: CreateVirtualContributorOnAccountInput;
};

export type MutationCreateVirtualPersonaArgs = {
  virtualPersonaData: CreateVirtualPersonaInput;
};

export type MutationCreateWhiteboardTemplateArgs = {
  whiteboardTemplateInput: CreateWhiteboardTemplateOnTemplatesSetInput;
};

export type MutationDeleteActorArgs = {
  deleteData: DeleteActorInput;
};

export type MutationDeleteActorGroupArgs = {
  deleteData: DeleteActorGroupInput;
};

export type MutationDeleteCalendarEventArgs = {
  deleteData: DeleteCalendarEventInput;
};

export type MutationDeleteCalloutArgs = {
  deleteData: DeleteCalloutInput;
};

export type MutationDeleteCalloutTemplateArgs = {
  deleteData: DeleteCalloutTemplateInput;
};

export type MutationDeleteCollaborationArgs = {
  deleteData: DeleteCollaborationInput;
};

export type MutationDeleteCommunityGuidelinesTemplateArgs = {
  deleteData: DeleteCommunityGuidelinesTemplateInput;
};

export type MutationDeleteDiscussionArgs = {
  deleteData: DeleteDiscussionInput;
};

export type MutationDeleteDocumentArgs = {
  deleteData: DeleteDocumentInput;
};

export type MutationDeleteInnovationFlowTemplateArgs = {
  deleteData: DeleteInnovationFlowTemplateInput;
};

export type MutationDeleteInnovationHubArgs = {
  deleteData: DeleteInnovationHubInput;
};

export type MutationDeleteInnovationPackArgs = {
  deleteData: DeleteInnovationPackInput;
};

export type MutationDeleteInvitationArgs = {
  deleteData: DeleteInvitationInput;
};

export type MutationDeleteInvitationExternalArgs = {
  deleteData: DeleteInvitationExternalInput;
};

export type MutationDeleteLicensePlanArgs = {
  deleteData: DeleteLicensePlanInput;
};

export type MutationDeleteLinkArgs = {
  deleteData: DeleteLinkInput;
};

export type MutationDeleteOrganizationArgs = {
  deleteData: DeleteOrganizationInput;
};

export type MutationDeletePostArgs = {
  deleteData: DeletePostInput;
};

export type MutationDeletePostTemplateArgs = {
  deleteData: DeletePostTemplateInput;
};

export type MutationDeleteReferenceArgs = {
  deleteData: DeleteReferenceInput;
};

export type MutationDeleteRelationArgs = {
  deleteData: DeleteRelationInput;
};

export type MutationDeleteSpaceArgs = {
  deleteData: DeleteSpaceInput;
};

export type MutationDeleteStorageBucketArgs = {
  deleteData: DeleteStorageBuckeetInput;
};

export type MutationDeleteUserArgs = {
  deleteData: DeleteUserInput;
};

export type MutationDeleteUserApplicationArgs = {
  deleteData: DeleteApplicationInput;
};

export type MutationDeleteUserGroupArgs = {
  deleteData: DeleteUserGroupInput;
};

export type MutationDeleteVirtualContributorArgs = {
  deleteData: DeleteVirtualContributorInput;
};

export type MutationDeleteVirtualPersonaArgs = {
  deleteData: DeleteVirtualPersonaInput;
};

export type MutationDeleteWhiteboardArgs = {
  whiteboardData: DeleteWhiteboardInput;
};

export type MutationDeleteWhiteboardTemplateArgs = {
  deleteData: DeleteWhiteboardTemplateInput;
};

export type MutationEventOnApplicationArgs = {
  applicationEventData: ApplicationEventInput;
};

export type MutationEventOnCommunityInvitationArgs = {
  invitationEventData: InvitationEventInput;
};

export type MutationEventOnOrganizationVerificationArgs = {
  organizationVerificationEventData: OrganizationVerificationEventInput;
};

export type MutationGrantCredentialToOrganizationArgs = {
  grantCredentialData: GrantOrganizationAuthorizationCredentialInput;
};

export type MutationGrantCredentialToUserArgs = {
  grantCredentialData: GrantAuthorizationCredentialInput;
};

export type MutationIngestSpaceArgs = {
  ingestSpaceData: IngestSpaceInput;
};

export type MutationInviteExistingUserForCommunityMembershipArgs = {
  invitationData: CreateInvitationForUsersOnCommunityInput;
};

export type MutationInviteForCommunityMembershipByEmailArgs = {
  invitationData: CreateInvitationUserByEmailOnCommunityInput;
};

export type MutationJoinCommunityArgs = {
  joinCommunityData: CommunityJoinInput;
};

export type MutationMessageUserArgs = {
  messageData: UserSendMessageInput;
};

export type MutationMoveContributionToCalloutArgs = {
  moveContributionData: MoveCalloutContributionInput;
};

export type MutationRemoveCommunityRoleFromOrganizationArgs = {
  roleData: RemoveCommunityRoleFromOrganizationInput;
};

export type MutationRemoveCommunityRoleFromUserArgs = {
  roleData: RemoveCommunityRoleFromUserInput;
};

export type MutationRemoveCommunityRoleFromVirtualArgs = {
  roleData: RemoveCommunityRoleFromVirtualInput;
};

export type MutationRemoveMessageOnRoomArgs = {
  messageData: RoomRemoveMessageInput;
};

export type MutationRemoveOrganizationRoleFromUserArgs = {
  membershipData: RemoveOrganizationRoleFromUserInput;
};

export type MutationRemovePlatformRoleFromUserArgs = {
  membershipData: RemovePlatformRoleFromUserInput;
};

export type MutationRemoveReactionToMessageInRoomArgs = {
  reactionData: RoomRemoveReactionToMessageInput;
};

export type MutationRemoveUserFromGroupArgs = {
  membershipData: RemoveUserGroupMemberInput;
};

export type MutationRevokeCredentialFromOrganizationArgs = {
  revokeCredentialData: RevokeOrganizationAuthorizationCredentialInput;
};

export type MutationRevokeCredentialFromUserArgs = {
  revokeCredentialData: RevokeAuthorizationCredentialInput;
};

export type MutationRevokeLicensePlanFromAccountArgs = {
  planData: RevokeLicensePlanFromAccount;
};

export type MutationSendMessageReplyToRoomArgs = {
  messageData: RoomSendMessageReplyInput;
};

export type MutationSendMessageToCommunityLeadsArgs = {
  messageData: CommunicationSendMessageToCommunityLeadsInput;
};

export type MutationSendMessageToOrganizationArgs = {
  messageData: CommunicationSendMessageToOrganizationInput;
};

export type MutationSendMessageToRoomArgs = {
  messageData: RoomSendMessageInput;
};

export type MutationSendMessageToUserArgs = {
  messageData: CommunicationSendMessageToUserInput;
};

export type MutationUpdateAccountPlatformSettingsArgs = {
  updateData: UpdateAccountPlatformSettingsInput;
};

export type MutationUpdateActorArgs = {
  actorData: UpdateActorInput;
};

export type MutationUpdateAnswerRelevanceArgs = {
  input: ChatGuidanceAnswerRelevanceInput;
};

export type MutationUpdateCalendarEventArgs = {
  eventData: UpdateCalendarEventInput;
};

export type MutationUpdateCalloutArgs = {
  calloutData: UpdateCalloutInput;
};

export type MutationUpdateCalloutPublishInfoArgs = {
  calloutData: UpdateCalloutPublishInfoInput;
};

export type MutationUpdateCalloutTemplateArgs = {
  calloutTemplateInput: UpdateCalloutTemplateInput;
};

export type MutationUpdateCalloutVisibilityArgs = {
  calloutData: UpdateCalloutVisibilityInput;
};

export type MutationUpdateCalloutsSortOrderArgs = {
  sortOrderData: UpdateCollaborationCalloutsSortOrderInput;
};

export type MutationUpdateCommunityApplicationFormArgs = {
  applicationFormData: UpdateCommunityApplicationFormInput;
};

export type MutationUpdateCommunityGuidelinesArgs = {
  communityGuidelinesData: UpdateCommunityGuidelinesInput;
};

export type MutationUpdateCommunityGuidelinesTemplateArgs = {
  communityGuidelinesTemplateInput: UpdateCommunityGuidelinesTemplateInput;
};

export type MutationUpdateDiscussionArgs = {
  updateData: UpdateDiscussionInput;
};

export type MutationUpdateDocumentArgs = {
  documentData: UpdateDocumentInput;
};

export type MutationUpdateEcosystemModelArgs = {
  ecosystemModelData: UpdateEcosystemModelInput;
};

export type MutationUpdateInnovationFlowArgs = {
  innovationFlowData: UpdateInnovationFlowInput;
};

export type MutationUpdateInnovationFlowSelectedStateArgs = {
  innovationFlowStateData: UpdateInnovationFlowSelectedStateInput;
};

export type MutationUpdateInnovationFlowSingleStateArgs = {
  innovationFlowStateData: UpdateInnovationFlowSingleStateInput;
};

export type MutationUpdateInnovationFlowStatesFromTemplateArgs = {
  innovationFlowData: UpdateInnovationFlowFromTemplateInput;
};

export type MutationUpdateInnovationFlowTemplateArgs = {
  innovationFlowTemplateInput: UpdateInnovationFlowTemplateInput;
};

export type MutationUpdateInnovationHubArgs = {
  updateData: UpdateInnovationHubInput;
};

export type MutationUpdateInnovationHubPlatformSettingsArgs = {
  updateData: UpdateInnovationHubPlatformSettingsInput;
};

export type MutationUpdateInnovationPackArgs = {
  innovationPackData: UpdateInnovationPackInput;
};

export type MutationUpdateLicensePlanArgs = {
  updateData: UpdateLicensePlanInput;
};

export type MutationUpdateLinkArgs = {
  linkData: UpdateLinkInput;
};

export type MutationUpdateOrganizationArgs = {
  organizationData: UpdateOrganizationInput;
};

export type MutationUpdatePostArgs = {
  postData: UpdatePostInput;
};

export type MutationUpdatePostTemplateArgs = {
  postTemplateInput: UpdatePostTemplateInput;
};

export type MutationUpdatePreferenceOnOrganizationArgs = {
  preferenceData: UpdateOrganizationPreferenceInput;
};

export type MutationUpdatePreferenceOnUserArgs = {
  preferenceData: UpdateUserPreferenceInput;
};

export type MutationUpdateProfileArgs = {
  profileData: UpdateProfileDirectInput;
};

export type MutationUpdateReferenceArgs = {
  referenceData: UpdateReferenceInput;
};

export type MutationUpdateSpaceArgs = {
  spaceData: UpdateSpaceInput;
};

export type MutationUpdateSpaceDefaultsArgs = {
  spaceDefaultsData: UpdateSpaceDefaultsInput;
};

export type MutationUpdateSpacePlatformSettingsArgs = {
  updateData: UpdateSpacePlatformSettingsInput;
};

export type MutationUpdateSpaceSettingsArgs = {
  settingsData: UpdateSpaceSettingsInput;
};

export type MutationUpdateTagsetArgs = {
  updateData: UpdateTagsetInput;
};

export type MutationUpdateUserArgs = {
  userData: UpdateUserInput;
};

export type MutationUpdateUserGroupArgs = {
  userGroupData: UpdateUserGroupInput;
};

export type MutationUpdateUserPlatformSettingsArgs = {
  updateData: UpdateUserPlatformSettingsInput;
};

export type MutationUpdateVirtualContributorArgs = {
  virtualContributorData: UpdateVirtualContributorInput;
};

export type MutationUpdateVirtualContributorPlatformSettingsArgs = {
  updateData: UpdateVirtualContributorPlatformSettingsInput;
};

export type MutationUpdateVirtualPersonaArgs = {
  virtualPersonaData: UpdateVirtualPersonaInput;
};

export type MutationUpdateVisualArgs = {
  updateData: UpdateVisualInput;
};

export type MutationUpdateWhiteboardArgs = {
  whiteboardData: UpdateWhiteboardInput;
};

export type MutationUpdateWhiteboardContentArgs = {
  whiteboardData: UpdateWhiteboardContentInput;
};

export type MutationUpdateWhiteboardTemplateArgs = {
  whiteboardTemplateInput: UpdateWhiteboardTemplateInput;
};

export type MutationUploadFileOnLinkArgs = {
  file: Scalars['Upload'];
  uploadData: StorageBucketUploadFileOnLinkInput;
};

export type MutationUploadFileOnReferenceArgs = {
  file: Scalars['Upload'];
  uploadData: StorageBucketUploadFileOnReferenceInput;
};

export type MutationUploadFileOnStorageBucketArgs = {
  file: Scalars['Upload'];
  uploadData: StorageBucketUploadFileInput;
};

export type MutationUploadImageOnVisualArgs = {
  file: Scalars['Upload'];
  uploadData: VisualUploadImageInput;
};

export enum MutationType {
  Create = 'CREATE',
  Delete = 'DELETE',
  Update = 'UPDATE',
}

export type MySpaceResults = {
  latestActivity?: Maybe<ActivityLogEntry>;
  space: Space;
};

export type Nvp = {
  /** The ID of the entity */
  id: Scalars['UUID'];
  name: Scalars['String'];
  value: Scalars['String'];
};

export type Organization = Contributor &
  Groupable & {
    /** All Users that are admins of this Organization. */
    admins?: Maybe<Array<User>>;
    /** The Agent representing this User. */
    agent: Agent;
    /** All Users that are associated with this Organization. */
    associates?: Maybe<Array<User>>;
    /** The authorization rules for the Contributor */
    authorization?: Maybe<Authorization>;
    /** Organization contact email */
    contactEmail?: Maybe<Scalars['String']>;
    /** Domain name; what is verified, eg. alkem.io */
    domain?: Maybe<Scalars['String']>;
    /** Group defined on this organization. */
    group?: Maybe<UserGroup>;
    /** Groups defined on this organization. */
    groups?: Maybe<Array<UserGroup>>;
    /** The ID of the Contributor */
    id: Scalars['UUID'];
    /** Legal name - required if hosting an Space */
    legalEntityName?: Maybe<Scalars['String']>;
    /** Metrics about the activity within this Organization. */
    metrics?: Maybe<Array<Nvp>>;
    /** The roles on this Organization for the currently logged in user. */
    myRoles?: Maybe<Array<OrganizationRole>>;
    /** A name identifier of the Contributor, unique within a given scope. */
    nameID: Scalars['NameID'];
    /** All Users that are owners of this Organization. */
    owners?: Maybe<Array<User>>;
    /** The preferences for this Organization */
    preferences: Array<Preference>;
    /** The profile for this Organization. */
    profile: Profile;
    /** The StorageAggregator for managing storage buckets in use by this Organization */
    storageAggregator?: Maybe<StorageAggregator>;
    verification: OrganizationVerification;
    /** Organization website */
    website?: Maybe<Scalars['String']>;
  };

export type OrganizationGroupArgs = {
  ID: Scalars['UUID'];
};

export type OrganizationAuthorizationResetInput = {
  /** The identifier of the Organization whose Authorization Policy should be reset. */
  organizationID: Scalars['UUID_NAMEID_EMAIL'];
};

export type OrganizationFilterInput = {
  contactEmail?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  domain?: InputMaybe<Scalars['String']>;
  nameID?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

export enum OrganizationPreferenceType {
  AuthorizationOrganizationMatchDomain = 'AUTHORIZATION_ORGANIZATION_MATCH_DOMAIN',
}

export enum OrganizationRole {
  Admin = 'ADMIN',
  Associate = 'ASSOCIATE',
  Owner = 'OWNER',
}

export type OrganizationVerification = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  lifecycle: Lifecycle;
  /** Organization verification type */
  status: OrganizationVerificationEnum;
};

export enum OrganizationVerificationEnum {
  NotVerified = 'NOT_VERIFIED',
  VerifiedManualAttestation = 'VERIFIED_MANUAL_ATTESTATION',
}

export type OrganizationVerificationEventInput = {
  eventName: Scalars['String'];
  organizationVerificationID: Scalars['UUID'];
};

export type OryConfig = {
  /** Ory Issuer. */
  issuer: Scalars['String'];
  /** Ory Kratos Public Base URL. Used by all Kratos Public Clients. */
  kratosPublicBaseURL: Scalars['String'];
};

export type PageInfo = {
  /** The last cursor of the page result */
  endCursor?: Maybe<Scalars['String']>;
  /** Indicate whether more items exist after the returned ones */
  hasNextPage: Scalars['Boolean'];
  /** Indicate whether more items exist before the returned ones */
  hasPreviousPage: Scalars['Boolean'];
  /** The first cursor of the page result */
  startCursor?: Maybe<Scalars['String']>;
};

export type PaginatedOrganization = {
  organization: Array<Organization>;
  pageInfo: PageInfo;
  total: Scalars['Float'];
};

export type PaginatedSpaces = {
  pageInfo: PageInfo;
  spaces: Array<Space>;
  total: Scalars['Float'];
};

export type PaginatedUsers = {
  pageInfo: PageInfo;
  total: Scalars['Float'];
  users: Array<User>;
};

export type Platform = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The Communications for the platform */
  communication: Communication;
  /** Alkemio configuration. Provides configuration to external services in the Alkemio ecosystem. */
  configuration: Config;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Details about an Innovation Hubs on the platform. If the arguments are omitted, the current Innovation Hub you are in will be returned. */
  innovationHub?: Maybe<InnovationHub>;
  /** List of Innovation Hubs on the platform */
  innovationHubs: Array<InnovationHub>;
  /** The latest release discussion. */
  latestReleaseDiscussion?: Maybe<LatestReleaseDiscussion>;
  /** The Innovation Library for the platform */
  library: Library;
  /** The Licensing in use by the platform. */
  licensing: Licensing;
  /** Alkemio Services Metadata. */
  metadata: Metadata;
  /** The StorageAggregator with documents in use by Users + Organizations on the Platform. */
  storageAggregator: StorageAggregator;
};

export type PlatformInnovationHubArgs = {
  id?: InputMaybe<Scalars['UUID_NAMEID']>;
  subdomain?: InputMaybe<Scalars['String']>;
};

export type PlatformFeatureFlag = {
  /** Is this feature flag enabled? */
  enabled: Scalars['Boolean'];
  /** The name of the feature flag */
  name: PlatformFeatureFlagName;
};

export enum PlatformFeatureFlagName {
  Communications = 'COMMUNICATIONS',
  CommunicationsDiscussions = 'COMMUNICATIONS_DISCUSSIONS',
  GuidenceEngine = 'GUIDENCE_ENGINE',
  LandingPage = 'LANDING_PAGE',
  Notifications = 'NOTIFICATIONS',
  Ssi = 'SSI',
  Subscriptions = 'SUBSCRIPTIONS',
  Whiteboards = 'WHITEBOARDS',
}

export type PlatformLocations = {
  /** URL to a page about the platform */
  about: Scalars['String'];
  /** URL where users can get tips and tricks */
  aup: Scalars['String'];
  /** URL to the blog of the platform */
  blog: Scalars['String'];
  /** URL where users can see the community forum */
  community: Scalars['String'];
  /** URL for the link Contact in the HomePage and to create a new space with Enterprise plan */
  contactsupport: Scalars['String'];
  /** Main domain of the environment */
  domain: Scalars['String'];
  /** Name of the environment */
  environment: Scalars['String'];
  /** URL to a form for providing feedback */
  feedback: Scalars['String'];
  /** URL to latest forum release discussion where users can get information about the latest release */
  forumreleases: Scalars['String'];
  /** URL for the link Foundation in the HomePage of the application */
  foundation: Scalars['String'];
  /** URL where users can get help */
  help: Scalars['String'];
  /** URL for the link Impact in the HomePage of the application */
  impact: Scalars['String'];
  /** URL to a page about the innovation library */
  innovationLibrary: Scalars['String'];
  /** URL to a page about the collaboration tools */
  inspiration: Scalars['String'];
  /** URL to the landing page of the platform */
  landing: Scalars['String'];
  /** URL where new users can get onboarding help */
  newuser: Scalars['String'];
  /** URL for the link Opensource in the HomePage of the application */
  opensource: Scalars['String'];
  /** URL to the privacy policy for the platform */
  privacy: Scalars['String'];
  /** URL where users can get information about previous releases */
  releases: Scalars['String'];
  /** URL to the security policy for the platform */
  security: Scalars['String'];
  /** URL where users can get support for the platform */
  support: Scalars['String'];
  /** URL for the link Contact in the HomePage to switch between plans */
  switchplan: Scalars['String'];
  /** URL to the terms of usage for the platform */
  terms: Scalars['String'];
  /** URL where users can get tips and tricks */
  tips: Scalars['String'];
};

export enum PlatformRole {
  BetaTester = 'BETA_TESTER',
  CommunityReader = 'COMMUNITY_READER',
  GlobalAdmin = 'GLOBAL_ADMIN',
  LicenseManager = 'LICENSE_MANAGER',
  SpacesReader = 'SPACES_READER',
  Support = 'SUPPORT',
}

export type Post = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The comments on this Post. */
  comments: Room;
  /** The user that created this Post */
  createdBy?: Maybe<User>;
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The Profile for this Post. */
  profile: Profile;
  /** The Post type, e.g. knowledge, idea, stakeholder persona etc. */
  type: Scalars['String'];
};

export type PostTemplate = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The default description to show to users filling our a new instance. */
  defaultDescription: Scalars['Markdown'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The Profile for this template. */
  profile: Profile;
  /** The type for this Post. */
  type: Scalars['String'];
};

export type Preference = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The definition for the Preference */
  definition: PreferenceDefinition;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Value of the preference */
  value: Scalars['String'];
};

export type PreferenceDefinition = {
  /** Preference description */
  description: Scalars['String'];
  /** The name */
  displayName: Scalars['String'];
  /** The group for the preference within the containing entity type. */
  group: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The type of the Preference, specific to the Entity it is on. */
  type: PreferenceType;
  /** Preference value type */
  valueType: PreferenceValueType;
};

export enum PreferenceType {
  AuthorizationOrganizationMatchDomain = 'AUTHORIZATION_ORGANIZATION_MATCH_DOMAIN',
  NotificationApplicationReceived = 'NOTIFICATION_APPLICATION_RECEIVED',
  NotificationApplicationSubmitted = 'NOTIFICATION_APPLICATION_SUBMITTED',
  NotificationCalloutPublished = 'NOTIFICATION_CALLOUT_PUBLISHED',
  NotificationCommentReply = 'NOTIFICATION_COMMENT_REPLY',
  NotificationCommunicationDiscussionCreated = 'NOTIFICATION_COMMUNICATION_DISCUSSION_CREATED',
  NotificationCommunicationDiscussionCreatedAdmin = 'NOTIFICATION_COMMUNICATION_DISCUSSION_CREATED_ADMIN',
  NotificationCommunicationMention = 'NOTIFICATION_COMMUNICATION_MENTION',
  NotificationCommunicationMessage = 'NOTIFICATION_COMMUNICATION_MESSAGE',
  NotificationCommunicationUpdates = 'NOTIFICATION_COMMUNICATION_UPDATES',
  NotificationCommunicationUpdateSentAdmin = 'NOTIFICATION_COMMUNICATION_UPDATE_SENT_ADMIN',
  NotificationCommunityCollaborationInterestAdmin = 'NOTIFICATION_COMMUNITY_COLLABORATION_INTEREST_ADMIN',
  NotificationCommunityCollaborationInterestUser = 'NOTIFICATION_COMMUNITY_COLLABORATION_INTEREST_USER',
  NotificationCommunityInvitationUser = 'NOTIFICATION_COMMUNITY_INVITATION_USER',
  NotificationCommunityNewMember = 'NOTIFICATION_COMMUNITY_NEW_MEMBER',
  NotificationCommunityNewMemberAdmin = 'NOTIFICATION_COMMUNITY_NEW_MEMBER_ADMIN',
  NotificationCommunityReviewSubmitted = 'NOTIFICATION_COMMUNITY_REVIEW_SUBMITTED',
  NotificationCommunityReviewSubmittedAdmin = 'NOTIFICATION_COMMUNITY_REVIEW_SUBMITTED_ADMIN',
  NotificationDiscussionCommentCreated = 'NOTIFICATION_DISCUSSION_COMMENT_CREATED',
  NotificationForumDiscussionComment = 'NOTIFICATION_FORUM_DISCUSSION_COMMENT',
  NotificationForumDiscussionCreated = 'NOTIFICATION_FORUM_DISCUSSION_CREATED',
  NotificationOrganizationMention = 'NOTIFICATION_ORGANIZATION_MENTION',
  NotificationOrganizationMessage = 'NOTIFICATION_ORGANIZATION_MESSAGE',
  NotificationPostCommentCreated = 'NOTIFICATION_POST_COMMENT_CREATED',
  NotificationPostCreated = 'NOTIFICATION_POST_CREATED',
  NotificationPostCreatedAdmin = 'NOTIFICATION_POST_CREATED_ADMIN',
  NotificationUserRemoved = 'NOTIFICATION_USER_REMOVED',
  NotificationUserSignUp = 'NOTIFICATION_USER_SIGN_UP',
  NotificationWhiteboardCreated = 'NOTIFICATION_WHITEBOARD_CREATED',
}

export enum PreferenceValueType {
  Boolean = 'BOOLEAN',
  Float = 'FLOAT',
  Int = 'INT',
  String = 'STRING',
}

export type Profile = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** A description of the entity associated with this profile. */
  description?: Maybe<Scalars['Markdown']>;
  /** The display name. */
  displayName: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The location for this Profile. */
  location?: Maybe<Location>;
  /** A list of URLs to relevant information. */
  references?: Maybe<Array<Reference>>;
  /** The storage bucket for this Profile. */
  storageBucket: StorageBucket;
  /** The taglie for this entity. */
  tagline: Scalars['String'];
  /** The default or named tagset. */
  tagset?: Maybe<Tagset>;
  /** A list of named tagsets, each of which has a list of tags. */
  tagsets?: Maybe<Array<Tagset>>;
  /** A type of entity that this Profile is being used with. */
  type?: Maybe<ProfileType>;
  /** The URL at which this profile can be viewed. */
  url: Scalars['String'];
  /** A particular type of visual for this Profile. */
  visual?: Maybe<Visual>;
  /** A list of visuals for this Profile. */
  visuals: Array<Visual>;
};

export type ProfileTagsetArgs = {
  tagsetName?: InputMaybe<TagsetReservedName>;
};

export type ProfileVisualArgs = {
  type: VisualType;
};

export type ProfileCredentialVerified = {
  /** The email */
  userEmail: Scalars['String'];
  /** The vc. */
  vc: Scalars['String'];
};

export enum ProfileType {
  CalendarEvent = 'CALENDAR_EVENT',
  CalloutFraming = 'CALLOUT_FRAMING',
  CalloutTemplate = 'CALLOUT_TEMPLATE',
  Challenge = 'CHALLENGE',
  CommunityGuidelines = 'COMMUNITY_GUIDELINES',
  CommunityGuidelinesTemplate = 'COMMUNITY_GUIDELINES_TEMPLATE',
  ContributionLink = 'CONTRIBUTION_LINK',
  Discussion = 'DISCUSSION',
  InnovationFlow = 'INNOVATION_FLOW',
  InnovationFlowTemplate = 'INNOVATION_FLOW_TEMPLATE',
  InnovationHub = 'INNOVATION_HUB',
  InnovationPack = 'INNOVATION_PACK',
  Opportunity = 'OPPORTUNITY',
  Organization = 'ORGANIZATION',
  Post = 'POST',
  PostTemplate = 'POST_TEMPLATE',
  Space = 'SPACE',
  User = 'USER',
  UserGroup = 'USER_GROUP',
  VirtualContributor = 'VIRTUAL_CONTRIBUTOR',
  VirtualPersona = 'VIRTUAL_PERSONA',
  Whiteboard = 'WHITEBOARD',
  WhiteboardTemplate = 'WHITEBOARD_TEMPLATE',
}

export type Query = {
  /** An account. If no ID is specified then the first Account is returned. */
  account: Account;
  /** The Accounts on this platform; If accessed through an Innovation Hub will return ONLY the Accounts defined in it. */
  accounts: Array<Account>;
  /** Activity events related to the current user. */
  activityFeed: ActivityFeed;
  /** Activity events related to the current user grouped by Activity type and resource. */
  activityFeedGrouped: Array<ActivityLogEntry>;
  /** Retrieve the ActivityLog for the specified Collaboration */
  activityLogOnCollaboration: Array<ActivityLogEntry>;
  /** All Users that are members of a given room */
  adminCommunicationMembership: CommunicationAdminMembershipResult;
  /** Usage of the messaging platform that are not tied to the domain model. */
  adminCommunicationOrphanedUsage: CommunicationAdminOrphanedUsageResult;
  /** Ask the chat engine for guidance. */
  askChatGuidanceQuestion: ChatGuidanceResult;
  /** Ask the virtual persona engine for guidance. */
  askVirtualPersonaQuestion: VirtualPersonaResult;
  /** Get supported credential metadata */
  getSupportedVerifiedCredentialMetadata: Array<CredentialMetadataOutput>;
  /** Allow direct lookup of entities from the domain model */
  lookup: LookupQueryResults;
  /** Information about the current authenticated user */
  me: MeQueryResults;
  /** A particular Organization */
  organization: Organization;
  /** The Organizations on this platform */
  organizations: Array<Organization>;
  /** The Organizations on this platform in paginated format */
  organizationsPaginated: PaginatedOrganization;
  /** Alkemio Platform */
  platform: Platform;
  /** The roles that the specified Organization has. */
  rolesOrganization: ContributorRoles;
  /** The roles that that the specified User has. */
  rolesUser: ContributorRoles;
  /** Search the platform for terms supplied */
  search: ISearchResults;
  /** Look up a top level Space (i.e. a Space that does not have a parent Space) by the UUID or NameID. */
  space: Space;
  /** The Spaces on this platform; If accessed through an Innovation Hub will return ONLY the Spaces defined in it. */
  spaces: Array<Space>;
  /** The Spaces on this platform */
  spacesPaginated: PaginatedSpaces;
  /** Information about a specific task */
  task: Task;
  /** All tasks with filtering applied */
  tasks: Array<Task>;
  /** A particular user, identified by the ID or by email */
  user: User;
  /** Privileges assigned to a User (based on held credentials) given an Authorization defnition. */
  userAuthorizationPrivileges: Array<AuthorizationPrivilege>;
  /** The users who have profiles on this platform */
  users: Array<User>;
  /** The users who have profiles on this platform */
  usersPaginated: PaginatedUsers;
  /** All Users that hold credentials matching the supplied criteria. */
  usersWithAuthorizationCredential: Array<User>;
  /** A particular VirtualContributor */
  virtualContributor: VirtualContributor;
  /** The VirtualContributors on this platform */
  virtualContributors: Array<VirtualContributor>;
  /** A particular VirtualPersona */
  virtualPersona: VirtualPersona;
  /** The VirtualPersonas on this platform */
  virtualPersonas: Array<VirtualPersona>;
};

export type QueryAccountArgs = {
  ID: Scalars['UUID_NAMEID'];
};

export type QueryActivityFeedArgs = {
  after?: InputMaybe<Scalars['UUID']>;
  args?: InputMaybe<ActivityFeedQueryArgs>;
  before?: InputMaybe<Scalars['UUID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryActivityFeedGroupedArgs = {
  args?: InputMaybe<ActivityFeedGroupedQueryArgs>;
};

export type QueryActivityLogOnCollaborationArgs = {
  queryData: ActivityLogInput;
};

export type QueryAdminCommunicationMembershipArgs = {
  communicationData: CommunicationAdminMembershipInput;
};

export type QueryAskChatGuidanceQuestionArgs = {
  chatData: ChatGuidanceInput;
};

export type QueryAskVirtualPersonaQuestionArgs = {
  chatData: VirtualPersonaQuestionInput;
};

export type QueryOrganizationArgs = {
  ID: Scalars['UUID_NAMEID'];
};

export type QueryOrganizationsArgs = {
  filter?: InputMaybe<ContributorFilterInput>;
  limit?: InputMaybe<Scalars['Float']>;
  shuffle?: InputMaybe<Scalars['Boolean']>;
};

export type QueryOrganizationsPaginatedArgs = {
  after?: InputMaybe<Scalars['UUID']>;
  before?: InputMaybe<Scalars['UUID']>;
  filter?: InputMaybe<OrganizationFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryRolesOrganizationArgs = {
  rolesData: RolesOrganizationInput;
};

export type QueryRolesUserArgs = {
  rolesData: RolesUserInput;
};

export type QuerySearchArgs = {
  searchData: SearchInput;
};

export type QuerySpaceArgs = {
  ID: Scalars['UUID_NAMEID'];
};

export type QuerySpacesArgs = {
  IDs?: InputMaybe<Array<Scalars['UUID']>>;
  filter?: InputMaybe<SpaceFilterInput>;
};

export type QuerySpacesPaginatedArgs = {
  after?: InputMaybe<Scalars['UUID']>;
  before?: InputMaybe<Scalars['UUID']>;
  filter?: InputMaybe<SpaceFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryTaskArgs = {
  id: Scalars['UUID'];
};

export type QueryTasksArgs = {
  status?: InputMaybe<TaskStatus>;
};

export type QueryUserArgs = {
  ID: Scalars['UUID_NAMEID_EMAIL'];
};

export type QueryUserAuthorizationPrivilegesArgs = {
  userAuthorizationPrivilegesData: UserAuthorizationPrivilegesInput;
};

export type QueryUsersArgs = {
  IDs?: InputMaybe<Array<Scalars['UUID']>>;
  filter?: InputMaybe<ContributorFilterInput>;
  limit?: InputMaybe<Scalars['Float']>;
  shuffle?: InputMaybe<Scalars['Boolean']>;
};

export type QueryUsersPaginatedArgs = {
  after?: InputMaybe<Scalars['UUID']>;
  before?: InputMaybe<Scalars['UUID']>;
  filter?: InputMaybe<UserFilterInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryUsersWithAuthorizationCredentialArgs = {
  credentialsCriteriaData: UsersWithAuthorizationCredentialInput;
};

export type QueryVirtualContributorArgs = {
  ID: Scalars['UUID_NAMEID'];
};

export type QueryVirtualContributorsArgs = {
  filter?: InputMaybe<ContributorFilterInput>;
  limit?: InputMaybe<Scalars['Float']>;
  shuffle?: InputMaybe<Scalars['Boolean']>;
};

export type QueryVirtualPersonaArgs = {
  ID: Scalars['UUID'];
};

export type Question = {
  /** The ID of the entity */
  id: Scalars['UUID'];
  name: Scalars['String'];
  value: Scalars['String'];
};

/** A reaction to a message. */
export type Reaction = {
  /** The reaction Emoji */
  emoji: Scalars['Emoji'];
  /** The id for the reaction. */
  id: Scalars['MessageID'];
  /** The user that reacted */
  sender?: Maybe<User>;
  /** The server timestamp in UTC */
  timestamp: Scalars['Float'];
};

export type Reference = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** Description of this reference */
  description?: Maybe<Scalars['String']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Name of the reference, e.g. Linkedin, Twitter etc. */
  name: Scalars['String'];
  /** URI of the reference */
  uri: Scalars['String'];
};

export type Relation = {
  actorName: Scalars['String'];
  actorRole: Scalars['String'];
  actorType: Scalars['String'];
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  description: Scalars['String'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  type: Scalars['String'];
};

export type RelayPaginatedSpace = {
  /** The Account that this Space is part of. */
  account: Account;
  /** The Agent representing this Space. */
  agent: Agent;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The collaboration for the Space. */
  collaboration: Collaboration;
  /** Get the Community for the Space.  */
  community: Community;
  /** The context for the space. */
  context: Context;
  /** The date for the creation of this Space. */
  createdDate?: Maybe<Scalars['DateTime']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The level of this Space, representing the number of Spaces above this one. */
  level: Scalars['Float'];
  /** Metrics about activity within this Space. */
  metrics?: Maybe<Array<Nvp>>;
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The Profile for the Space. */
  profile: Profile;
  /** The settings for this Space. */
  settings: SpaceSettings;
  /** The StorageAggregator in use by this Space */
  storageAggregator: StorageAggregator;
  /** A particular subspace, either by its ID or nameID */
  subspace: Space;
  /** The subspaces for the space. */
  subspaces: Array<Space>;
  /** The Type of the Space e.g. space/challenge/opportunity. */
  type: SpaceType;
};

export type RelayPaginatedSpaceSubspaceArgs = {
  ID: Scalars['UUID_NAMEID'];
};

export type RelayPaginatedSpaceSubspacesArgs = {
  IDs?: InputMaybe<Array<Scalars['UUID']>>;
  limit?: InputMaybe<Scalars['Float']>;
  shuffle?: InputMaybe<Scalars['Boolean']>;
};

export type RelayPaginatedSpaceEdge = {
  node: RelayPaginatedSpace;
};

export type RelayPaginatedSpacePageInfo = {
  /** The last cursor of the page result */
  endCursor?: Maybe<Scalars['String']>;
  /** Indicate whether more items exist after the returned ones */
  hasNextPage: Scalars['Boolean'];
  /** Indicate whether more items exist before the returned ones */
  hasPreviousPage: Scalars['Boolean'];
  /** The first cursor of the page result */
  startCursor?: Maybe<Scalars['String']>;
};

export type RemoveCommunityRoleFromOrganizationInput = {
  communityID: Scalars['UUID'];
  organizationID: Scalars['UUID_NAMEID'];
  role: CommunityRole;
};

export type RemoveCommunityRoleFromUserInput = {
  communityID: Scalars['UUID'];
  role: CommunityRole;
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type RemoveCommunityRoleFromVirtualInput = {
  communityID: Scalars['UUID'];
  role: CommunityRole;
  virtualContributorID: Scalars['UUID_NAMEID'];
};

export type RemoveOrganizationRoleFromUserInput = {
  organizationID: Scalars['UUID_NAMEID'];
  role: OrganizationRole;
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type RemovePlatformRoleFromUserInput = {
  role: PlatformRole;
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type RemoveUserGroupMemberInput = {
  groupID: Scalars['UUID'];
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type RevokeAuthorizationCredentialInput = {
  /** The resource to which access is being removed. */
  resourceID: Scalars['String'];
  type: AuthorizationCredential;
  /** The user from whom the credential is being removed. */
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type RevokeLicensePlanFromAccount = {
  /** The ID of the Account to assign the LicensePlan to. */
  accountID: Scalars['UUID'];
  /** The ID of the LicensePlan to assign. */
  licensePlanID: Scalars['UUID'];
  /** The ID of the Licensing to use. */
  licensingID?: InputMaybe<Scalars['UUID']>;
};

export type RevokeOrganizationAuthorizationCredentialInput = {
  /** The Organization from whom the credential is being removed. */
  organizationID: Scalars['UUID'];
  /** The resource to which access is being removed. */
  resourceID?: InputMaybe<Scalars['UUID']>;
  type: AuthorizationCredential;
};

export type RolesOrganizationInput = {
  /** Return membership in Spaces matching the provided filter. */
  filter?: InputMaybe<SpaceFilterInput>;
  /** The ID of the organization to retrieve the roles of. */
  organizationID: Scalars['UUID_NAMEID'];
};

export type RolesResult = {
  /** Display name of the entity */
  displayName: Scalars['String'];
  /** A unique identifier for this membership result. */
  id: Scalars['String'];
  /** Name Identifier of the entity */
  nameID: Scalars['NameID'];
  /** The roles held by the contributor */
  roles: Array<Scalars['String']>;
};

export type RolesResultCommunity = {
  /** Display name of the entity */
  displayName: Scalars['String'];
  /** A unique identifier for this membership result. */
  id: Scalars['String'];
  /** Name Identifier of the entity */
  nameID: Scalars['NameID'];
  /** The roles held by the contributor */
  roles: Array<Scalars['String']>;
  /** The Type of the Space e.g. space/challenge/opportunity. */
  type: SpaceType;
};

export type RolesResultOrganization = {
  /** Display name of the entity */
  displayName: Scalars['String'];
  /** A unique identifier for this membership result. */
  id: Scalars['String'];
  /** Name Identifier of the entity */
  nameID: Scalars['NameID'];
  /** The Organization ID. */
  organizationID: Scalars['String'];
  /** The roles held by the contributor */
  roles: Array<Scalars['String']>;
  /** Details of the Groups in the Organizations the user is a member of */
  userGroups: Array<RolesResult>;
};

export type RolesResultSpace = {
  /** Display name of the entity */
  displayName: Scalars['String'];
  /** A unique identifier for this membership result. */
  id: Scalars['String'];
  /** Name Identifier of the entity */
  nameID: Scalars['NameID'];
  /** The roles held by the contributor */
  roles: Array<Scalars['String']>;
  /** The Space ID */
  spaceID: Scalars['String'];
  /** Details of the Subspace the user is a member of */
  subspaces: Array<RolesResultCommunity>;
  /** The Type of the Space e.g. space/challenge/opportunity. */
  type: SpaceType;
  /** Visibility of the Space. */
  visibility: SpaceVisibility;
};

export type RolesUserInput = {
  /** Return membership in Spaces matching the provided filter. */
  filter?: InputMaybe<SpaceFilterInput>;
  /** The ID of the user to retrieve the roles of. */
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type Room = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Messages in this Room. */
  messages: Array<Message>;
  /** The number of messages in the Room. */
  messagesCount: Scalars['Float'];
};

export type RoomAddReactionToMessageInput = {
  /** The reaction to the message. */
  emoji: Scalars['Emoji'];
  /** The message id that is being reacted to */
  messageID: Scalars['MessageID'];
  /** The Room to remove a message from. */
  roomID: Scalars['UUID'];
};

/** The event happened in the subscribed room */
export type RoomEventSubscriptionResult = {
  /** A message related event. */
  message?: Maybe<RoomMessageEventSubscriptionResult>;
  /** A message reaction related event. */
  reaction?: Maybe<RoomMessageReactionEventSubscriptionResult>;
  /** The identifier for the Room on which the event happened. */
  roomID: Scalars['String'];
};

/** A message event happened in the subscribed room */
export type RoomMessageEventSubscriptionResult = {
  /** A message related event. */
  data: Message;
  /** The type of event. */
  type: MutationType;
};

/** A message reaction event happened in the subscribed room */
export type RoomMessageReactionEventSubscriptionResult = {
  /** A message related event. */
  data: Reaction;
  /** The message on which the reaction event happened. */
  messageID?: Maybe<Scalars['String']>;
  /** The type of event. */
  type: MutationType;
};

export type RoomRemoveMessageInput = {
  /** The message id that should be removed */
  messageID: Scalars['MessageID'];
  /** The Room to remove a message from. */
  roomID: Scalars['UUID'];
};

export type RoomRemoveReactionToMessageInput = {
  /** The reaction that is being removed */
  reactionID: Scalars['MessageID'];
  /** The Room to remove a message from. */
  roomID: Scalars['UUID'];
};

export type RoomSendMessageInput = {
  /** The message being sent */
  message: Scalars['String'];
  /** The Room the message is being sent to */
  roomID: Scalars['UUID'];
};

export type RoomSendMessageReplyInput = {
  /** The message being sent */
  message: Scalars['String'];
  /** The Room the message is being sent to */
  roomID: Scalars['UUID'];
  /** The message starting the thread being replied to */
  threadID: Scalars['MessageID'];
};

export type SearchInput = {
  /** Restrict the search to only the specified Space. Default is all Spaces. */
  searchInSpaceFilter?: InputMaybe<Scalars['UUID_NAMEID']>;
  /** Expand the search to includes Tagsets with the provided names. Max 2. */
  tagsetNames?: InputMaybe<Array<Scalars['String']>>;
  /** The terms to be searched for within this Space. Max 5. */
  terms: Array<Scalars['String']>;
  /** Restrict the search to only the specified entity types. Values allowed: space, subspace, user, group, organization, callout. Default is all. */
  typesFilter?: InputMaybe<Array<Scalars['String']>>;
};

export type SearchResult = {
  id: Scalars['UUID'];
  /** The score for this search result; more matches means a higher score. */
  score: Scalars['Float'];
  /** The terms that were matched for this result */
  terms: Array<Scalars['String']>;
  /** The type of returned result for this search. */
  type: SearchResultType;
};

export type SearchResultCallout = SearchResult & {
  /** The Callout that was found. */
  callout: Callout;
  id: Scalars['UUID'];
  /** The score for this search result; more matches means a higher score. */
  score: Scalars['Float'];
  /** The parent Space of the Callout. */
  space: Space;
  /** The terms that were matched for this result */
  terms: Array<Scalars['String']>;
  /** The type of returned result for this search. */
  type: SearchResultType;
};

export type SearchResultOrganization = SearchResult & {
  id: Scalars['UUID'];
  /** The Organization that was found. */
  organization: Organization;
  /** The score for this search result; more matches means a higher score. */
  score: Scalars['Float'];
  /** The terms that were matched for this result */
  terms: Array<Scalars['String']>;
  /** The type of returned result for this search. */
  type: SearchResultType;
};

export type SearchResultPost = SearchResult & {
  /** The Callout of the Post. */
  callout: Callout;
  id: Scalars['UUID'];
  /** The Post that was found. */
  post: Post;
  /** The score for this search result; more matches means a higher score. */
  score: Scalars['Float'];
  /** The Space of the Post. */
  space: Space;
  /** The terms that were matched for this result */
  terms: Array<Scalars['String']>;
  /** The type of returned result for this search. */
  type: SearchResultType;
};

export type SearchResultSpace = SearchResult & {
  id: Scalars['UUID'];
  /** The parent of this Space, if any. */
  parentSpace?: Maybe<Space>;
  /** The score for this search result; more matches means a higher score. */
  score: Scalars['Float'];
  /** The Space that was found. */
  space: Space;
  /** The terms that were matched for this result */
  terms: Array<Scalars['String']>;
  /** The type of returned result for this search. */
  type: SearchResultType;
};

export enum SearchResultType {
  Callout = 'CALLOUT',
  Challenge = 'CHALLENGE',
  Opportunity = 'OPPORTUNITY',
  Organization = 'ORGANIZATION',
  Post = 'POST',
  Space = 'SPACE',
  User = 'USER',
  Usergroup = 'USERGROUP',
}

export type SearchResultUser = SearchResult & {
  id: Scalars['UUID'];
  /** The score for this search result; more matches means a higher score. */
  score: Scalars['Float'];
  /** The terms that were matched for this result */
  terms: Array<Scalars['String']>;
  /** The type of returned result for this search. */
  type: SearchResultType;
  /** The User that was found. */
  user: User;
};

export type SearchResultUserGroup = SearchResult & {
  id: Scalars['UUID'];
  /** The score for this search result; more matches means a higher score. */
  score: Scalars['Float'];
  /** The terms that were matched for this result */
  terms: Array<Scalars['String']>;
  /** The type of returned result for this search. */
  type: SearchResultType;
  /** The User Group that was found. */
  userGroup: UserGroup;
};

export type Sentry = {
  /** Flag indicating if the client should use Sentry for monitoring. */
  enabled: Scalars['Boolean'];
  /** URL to the Sentry endpoint. */
  endpoint: Scalars['String'];
  /** Flag indicating if PII should be submitted on Sentry events. */
  submitPII: Scalars['Boolean'];
};

export type ServiceMetadata = {
  /** Service name e.g. CT Server */
  name?: Maybe<Scalars['String']>;
  /** Version in the format {major.minor.patch} - using SemVer. */
  version?: Maybe<Scalars['String']>;
};

export type Source = {
  /** The title of the source */
  title?: Maybe<Scalars['String']>;
  /** The URI of the source */
  uri?: Maybe<Scalars['String']>;
};

export type Space = {
  /** The Account that this Space is part of. */
  account: Account;
  /** The Agent representing this Space. */
  agent: Agent;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The collaboration for the Space. */
  collaboration: Collaboration;
  /** Get the Community for the Space.  */
  community: Community;
  /** The context for the space. */
  context: Context;
  /** The date for the creation of this Space. */
  createdDate?: Maybe<Scalars['DateTime']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The level of this Space, representing the number of Spaces above this one. */
  level: Scalars['Float'];
  /** Metrics about activity within this Space. */
  metrics?: Maybe<Array<Nvp>>;
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The Profile for the Space. */
  profile: Profile;
  /** The settings for this Space. */
  settings: SpaceSettings;
  /** The StorageAggregator in use by this Space */
  storageAggregator: StorageAggregator;
  /** A particular subspace, either by its ID or nameID */
  subspace: Space;
  /** The subspaces for the space. */
  subspaces: Array<Space>;
  /** The Type of the Space e.g. space/challenge/opportunity. */
  type: SpaceType;
};

export type SpaceSubspaceArgs = {
  ID: Scalars['UUID_NAMEID'];
};

export type SpaceSubspacesArgs = {
  IDs?: InputMaybe<Array<Scalars['UUID']>>;
  limit?: InputMaybe<Scalars['Float']>;
  shuffle?: InputMaybe<Scalars['Boolean']>;
};

export type SpaceDefaults = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The innovation flow template to use for new Challenges / Opportunities. */
  innovationFlowTemplate?: Maybe<InnovationFlowTemplate>;
};

export type SpaceFilterInput = {
  /** Return Spaces with a Visibility matching one of the provided types. */
  visibilities?: InputMaybe<Array<SpaceVisibility>>;
};

export enum SpacePrivacyMode {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

export type SpaceSettings = {
  /** The collaboration settings for this Space. */
  collaboration: SpaceSettingsCollaboration;
  /** The membership settings for this Space. */
  membership: SpaceSettingsMembership;
  /** The privacy settings for this Space */
  privacy: SpaceSettingsPrivacy;
};

export type SpaceSettingsCollaboration = {
  /** Flag to control if members can create callouts. */
  allowMembersToCreateCallouts: Scalars['Boolean'];
  /** Flag to control if members can create subspaces. */
  allowMembersToCreateSubspaces: Scalars['Boolean'];
  /** Flag to control if ability to contribute is inherited from parent Space. */
  inheritMembershipRights: Scalars['Boolean'];
};

export type SpaceSettingsMembership = {
  /** Allow subspace admins to invite to this Space. */
  allowSubspaceAdminsToInviteMembers: Scalars['Boolean'];
  /** The membership policy in usage for this Space */
  policy: CommunityMembershipPolicy;
  /** The organizations that are trusted to Join as members for this Space */
  trustedOrganizations: Array<Scalars['UUID']>;
};

export type SpaceSettingsPrivacy = {
  /** Flag to control if Platform Support has admin rights. */
  allowPlatformSupportAsAdmin: Scalars['Boolean'];
  /** The privacy mode for this Space */
  mode: SpacePrivacyMode;
};

export enum SpaceType {
  Challenge = 'CHALLENGE',
  Opportunity = 'OPPORTUNITY',
  Space = 'SPACE',
}

export enum SpaceVisibility {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Demo = 'DEMO',
}

export type StorageAggregator = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The Storage Bucket for files directly on this Storage Aggregator (legacy). */
  directStorageBucket: StorageBucket;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The key information about the entity using this StorageAggregator, if any. */
  parentEntity?: Maybe<StorageAggregatorParent>;
  /** The aggregate size of all StorageBuckets for this StorageAggregator. */
  size: Scalars['Float'];
  /** The list of child storageAggregators for this StorageAggregator. */
  storageAggregators: Array<StorageAggregator>;
  /** The Storage Buckets that are being managed via this StorageAggregators. */
  storageBuckets: Array<StorageBucket>;
};

export type StorageAggregatorParent = {
  /** The display name. */
  displayName: Scalars['String'];
  /** The UUID of the parent entity. */
  id: Scalars['UUID'];
  /** The Type of the parent Entity. */
  type: SpaceType;
  /** The URL that can be used to access the parent entity. */
  url: Scalars['String'];
};

export type StorageBucket = {
  /** Mime types allowed to be stored on this StorageBucket. */
  allowedMimeTypes: Array<Scalars['String']>;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** A single Document */
  document?: Maybe<Document>;
  /** The list of Documents for this StorageBucket. */
  documents: Array<Document>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Maximum allowed file size on this StorageBucket. */
  maxFileSize: Scalars['Float'];
  /** The key information about the entity using this StorageBucket, if any. */
  parentEntity?: Maybe<StorageBucketParent>;
  /** The aggregate size of all Documents for this StorageBucket. */
  size: Scalars['Float'];
};

export type StorageBucketDocumentArgs = {
  ID: Scalars['UUID_NAMEID'];
};

export type StorageBucketDocumentsArgs = {
  IDs?: InputMaybe<Array<Scalars['UUID_NAMEID']>>;
  limit?: InputMaybe<Scalars['Float']>;
};

export type StorageBucketParent = {
  /** The display name. */
  displayName: Scalars['String'];
  /** The UUID of the parent entity. */
  id: Scalars['UUID'];
  /** The type of entity that this StorageBucket is being used with. */
  type: ProfileType;
  /** The URL that can be used to access the parent entity. */
  url: Scalars['String'];
};

export type StorageBucketUploadFileInput = {
  storageBucketId: Scalars['String'];
};

export type StorageBucketUploadFileOnLinkInput = {
  linkID: Scalars['String'];
};

export type StorageBucketUploadFileOnReferenceInput = {
  referenceID: Scalars['String'];
};

export type StorageConfig = {
  /** Config for uploading files to Alkemio. */
  file: FileStorageConfig;
};

export type Subscription = {
  activityCreated: ActivityCreatedSubscriptionResult;
  /** Receive new Update messages on Communities the currently authenticated User is a member of. */
  calloutPostCreated: CalloutPostCreated;
  /** Receive updates on Discussions */
  communicationDiscussionUpdated: Discussion;
  /** Received on verified credentials change */
  profileVerifiedCredential: ProfileCredentialVerified;
  /** Receive Room event */
  roomEvents: RoomEventSubscriptionResult;
  /** Receive new Subspaces created on the Space. */
  subspaceCreated: SubspaceCreated;
};

export type SubscriptionActivityCreatedArgs = {
  input: ActivityCreatedSubscriptionInput;
};

export type SubscriptionCalloutPostCreatedArgs = {
  calloutID: Scalars['UUID'];
};

export type SubscriptionCommunicationDiscussionUpdatedArgs = {
  communicationID: Scalars['UUID'];
};

export type SubscriptionRoomEventsArgs = {
  roomID: Scalars['UUID'];
};

export type SubscriptionSubspaceCreatedArgs = {
  spaceID: Scalars['UUID'];
};

export type SubspaceCreated = {
  /** The identifier for the Space on which the subspace was created. */
  spaceID: Scalars['UUID'];
  /** The subspace that has been created. */
  subspace: Space;
};

export type Tagset = {
  /** The allowed values for this Tagset. */
  allowedValues: Array<Scalars['String']>;
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  name: Scalars['String'];
  tags: Array<Scalars['String']>;
  type: TagsetType;
};

export type TagsetArgs = {
  /** Return only Callouts that match one of the tagsets and any of the tags in them. */
  name: Scalars['String'];
  /** A list of tags to include. */
  tags: Array<Scalars['String']>;
};

export enum TagsetReservedName {
  CalloutGroup = 'CALLOUT_GROUP',
  Capabilities = 'CAPABILITIES',
  Default = 'DEFAULT',
  FlowState = 'FLOW_STATE',
  Keywords = 'KEYWORDS',
  Skills = 'SKILLS',
}

export type TagsetTemplate = {
  allowedValues: Array<Scalars['String']>;
  /** For Tagsets of type SELECT_ONE, the default selected value. */
  defaultSelectedValue?: Maybe<Scalars['String']>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  name: Scalars['String'];
  type: TagsetType;
};

export enum TagsetType {
  Freeform = 'FREEFORM',
  SelectMany = 'SELECT_MANY',
  SelectOne = 'SELECT_ONE',
}

export type Task = {
  /** The timestamp when the task was created */
  created: Scalars['Float'];
  /** the timestamp when the task was completed */
  end?: Maybe<Scalars['Float']>;
  /** info about the errors of the task */
  errors?: Maybe<Array<Scalars['String']>>;
  /** The UUID of the task */
  id: Scalars['UUID'];
  /** Amount of items that need to be processed */
  itemsCount?: Maybe<Scalars['Float']>;
  /** Amount of items that are already processed */
  itemsDone?: Maybe<Scalars['Float']>;
  /** The progress  of the task if the total item count is defined */
  progress?: Maybe<Scalars['Float']>;
  /** info about the completed part of the task */
  results?: Maybe<Array<Scalars['String']>>;
  /** The timestamp when the task was started */
  start: Scalars['Float'];
  /** The current status of the task */
  status: TaskStatus;
  /** TBD */
  type?: Maybe<Scalars['String']>;
};

/** The current status of the task */
export enum TaskStatus {
  Completed = 'COMPLETED',
  Errored = 'ERRORED',
  InProgress = 'IN_PROGRESS',
}

export type TemplatesSet = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The CalloutTemplates in this TemplatesSet. */
  calloutTemplates: Array<CalloutTemplate>;
  /** The total number of CalloutTemplates in this TemplatesSet. */
  calloutTemplatesCount: Scalars['Float'];
  /** A single CommunityGuidelinesTemplate */
  communityGuidelinesTemplate?: Maybe<CommunityGuidelinesTemplate>;
  /** The CommunityGuidelines in this TemplatesSet. */
  communityGuidelinesTemplates: Array<CommunityGuidelinesTemplate>;
  /** The total number of CommunityGuidelinesTemplates in this TemplatesSet. */
  communityGuidelinesTemplatesCount: Scalars['Float'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** A single InnovationFlowTemplate */
  innovationFlowTemplate?: Maybe<InnovationFlowTemplate>;
  /** The InnovationFlowTemplates in this TemplatesSet. */
  innovationFlowTemplates: Array<InnovationFlowTemplate>;
  /** The total number of InnovationFlowTemplates in this TemplatesSet. */
  innovationFlowTemplatesCount: Scalars['Float'];
  /** A single PostTemplate */
  postTemplate?: Maybe<PostTemplate>;
  /** The PostTemplates in this TemplatesSet. */
  postTemplates: Array<PostTemplate>;
  /** The total number of PostTemplates in this TemplatesSet. */
  postTemplatesCount: Scalars['Float'];
  /** A single WhiteboardTemplate */
  whiteboardTemplate?: Maybe<WhiteboardTemplate>;
  /** The WhiteboardTemplates in this TemplatesSet. */
  whiteboardTemplates: Array<WhiteboardTemplate>;
  /** The total number of WhiteboardTemplates in this TemplatesSet. */
  whiteboardTemplatesCount: Scalars['Float'];
};

export type TemplatesSetCommunityGuidelinesTemplateArgs = {
  ID: Scalars['UUID'];
};

export type TemplatesSetInnovationFlowTemplateArgs = {
  ID: Scalars['UUID'];
};

export type TemplatesSetPostTemplateArgs = {
  ID: Scalars['UUID'];
};

export type TemplatesSetWhiteboardTemplateArgs = {
  ID: Scalars['UUID'];
};

export type Timeline = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The Innovation Library for the timeline */
  calendar: Calendar;
  /** The ID of the entity */
  id: Scalars['UUID'];
};

export type UpdateAccountPlatformSettingsInput = {
  /** The identifier for the Account whose license etc is to be updated. */
  accountID: Scalars['UUID'];
  /** Update the host Organization or User for the Account. */
  hostID?: InputMaybe<Scalars['UUID_NAMEID']>;
  /** Update the license settings for the Account. */
  license?: InputMaybe<UpdateLicenseInput>;
};

export type UpdateActorInput = {
  ID: Scalars['UUID'];
  description?: InputMaybe<Scalars['String']>;
  impact?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type UpdateCalendarEventInput = {
  ID: Scalars['UUID'];
  /** The length of the event in days. */
  durationDays?: InputMaybe<Scalars['Float']>;
  /** The length of the event in minutes. */
  durationMinutes: Scalars['Float'];
  /** Flag to indicate if this event is for multiple days. */
  multipleDays: Scalars['Boolean'];
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The Profile of this entity. */
  profileData?: InputMaybe<UpdateProfileInput>;
  /** The state date for the event. */
  startDate: Scalars['DateTime'];
  type?: InputMaybe<CalendarEventType>;
  /** Flag to indicate if this event is for a whole day. */
  wholeDay: Scalars['Boolean'];
};

export type UpdateCalloutContributionDefaultsInput = {
  /** The default description to use for new Post contributions. */
  postDescription?: InputMaybe<Scalars['Markdown']>;
  /** The default description to use for new Whiteboard contributions. */
  whiteboardContent?: InputMaybe<Scalars['WhiteboardContent']>;
};

export type UpdateCalloutContributionPolicyInput = {
  /** State of the callout. */
  state?: InputMaybe<CalloutState>;
};

export type UpdateCalloutFramingInput = {
  /** The Profile of the Template. */
  profile?: InputMaybe<UpdateProfileInput>;
  whiteboard?: InputMaybe<UpdateWhiteboardInput>;
  whiteboardContent?: InputMaybe<UpdateWhiteboardContentInput>;
};

export type UpdateCalloutInput = {
  ID: Scalars['UUID'];
  contributionDefaults?: InputMaybe<UpdateCalloutContributionDefaultsInput>;
  contributionPolicy?: InputMaybe<UpdateCalloutContributionPolicyInput>;
  framing?: InputMaybe<UpdateCalloutFramingInput>;
  /** Set Group for this Callout. */
  groupName?: InputMaybe<Scalars['String']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The sort order to assign to this Callout. */
  sortOrder?: InputMaybe<Scalars['Float']>;
};

export type UpdateCalloutPublishInfoInput = {
  /** The identifier for the Callout whose publisher is to be updated. */
  calloutID: Scalars['String'];
  /** The timestamp to set for the publishing of the Callout. */
  publishDate?: InputMaybe<Scalars['Float']>;
  /** The identifier of the publisher of the Callout. */
  publisherID?: InputMaybe<Scalars['UUID_NAMEID_EMAIL']>;
};

export type UpdateCalloutTemplateInput = {
  ID: Scalars['UUID'];
  contributionDefaults?: InputMaybe<UpdateCalloutContributionDefaultsInput>;
  contributionPolicy?: InputMaybe<UpdateCalloutContributionPolicyInput>;
  framing?: InputMaybe<UpdateCalloutFramingInput>;
  /** The Profile of the Template. */
  profile?: InputMaybe<UpdateProfileInput>;
};

export type UpdateCalloutVisibilityInput = {
  /** The identifier for the Callout whose visibility is to be updated. */
  calloutID: Scalars['String'];
  /** Send a notification on publishing. */
  sendNotification?: InputMaybe<Scalars['Boolean']>;
  /** Visibility of the Callout. */
  visibility: CalloutVisibility;
};

export type UpdateCollaborationCalloutsSortOrderInput = {
  /** The IDs of the callouts to update the sort order on */
  calloutIDs: Array<Scalars['UUID_NAMEID']>;
  collaborationID: Scalars['UUID'];
};

export type UpdateCommunityApplicationFormInput = {
  communityID: Scalars['UUID'];
  formData: UpdateFormInput;
};

export type UpdateCommunityGuidelinesInput = {
  /** ID of the CommunityGuidelines */
  communityGuidelinesID: Scalars['UUID'];
  /** The Profile for this community guidelines. */
  profile: UpdateProfileInput;
};

export type UpdateCommunityGuidelinesOfTemplateInput = {
  /** The Profile for this community guidelines. */
  profile: UpdateProfileInput;
};

export type UpdateCommunityGuidelinesTemplateInput = {
  ID: Scalars['UUID'];
  /** The Community guidelines to associate with this template. */
  communityGuidelines?: InputMaybe<UpdateCommunityGuidelinesOfTemplateInput>;
  /** The Profile of the Template. */
  profile?: InputMaybe<UpdateProfileInput>;
};

export type UpdateContextInput = {
  impact?: InputMaybe<Scalars['Markdown']>;
  vision?: InputMaybe<Scalars['Markdown']>;
  who?: InputMaybe<Scalars['Markdown']>;
};

export type UpdateDiscussionInput = {
  ID: Scalars['UUID'];
  /** The category for the Discussion */
  category?: InputMaybe<DiscussionCategory>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The Profile of this entity. */
  profileData?: InputMaybe<UpdateProfileInput>;
};

export type UpdateDocumentInput = {
  ID: Scalars['UUID'];
  /** The display name for the Document. */
  displayName: Scalars['String'];
  tagset?: InputMaybe<UpdateTagsetInput>;
};

export type UpdateEcosystemModelInput = {
  ID: Scalars['UUID'];
  description?: InputMaybe<Scalars['String']>;
};

export type UpdateFeatureFlagInput = {
  /** Is this feature flag enabled? */
  enabled: Scalars['Boolean'];
  /** The name of the feature flag */
  name: Scalars['String'];
};

export type UpdateFormInput = {
  description: Scalars['Markdown'];
  questions: Array<UpdateFormQuestionInput>;
};

export type UpdateFormQuestionInput = {
  /** The explation text to clarify the question. */
  explanation: Scalars['String'];
  /** The maxiumum length of the answer, in characters, up to a limit of 512. */
  maxLength: Scalars['Float'];
  /** The question to be answered */
  question: Scalars['String'];
  /** Whether an answer is required for this Question. */
  required: Scalars['Boolean'];
  /** The sort order of this question in a wider set of questions. */
  sortOrder: Scalars['Float'];
};

export type UpdateInnovationFlowFromTemplateInput = {
  /** ID of the Innovation Flow */
  innovationFlowID: Scalars['UUID'];
  /** The InnovationFlow template whose State definition will be used for the Innovation Flow */
  innovationFlowTemplateID: Scalars['UUID'];
};

export type UpdateInnovationFlowInput = {
  /** ID of the Innovation Flow */
  innovationFlowID: Scalars['UUID'];
  /** The Profile of this entity. */
  profileData?: InputMaybe<UpdateProfileInput>;
  states?: InputMaybe<Array<UpdateInnovationFlowStateInput>>;
};

export type UpdateInnovationFlowSelectedStateInput = {
  /** ID of the Innovation Flow */
  innovationFlowID: Scalars['UUID'];
  /** The State that the Innovation Flow is in */
  selectedState: Scalars['String'];
};

export type UpdateInnovationFlowSingleStateInput = {
  /** ID of the Innovation Flow */
  innovationFlowID: Scalars['UUID'];
  /** The name of the Innovation Flow State to be updated */
  stateDisplayName: Scalars['String'];
  stateUpdatedData: UpdateInnovationFlowStateInput;
};

export type UpdateInnovationFlowStateInput = {
  /** The explation text to clarify the State. */
  description?: InputMaybe<Scalars['Markdown']>;
  /** The display name for the State */
  displayName: Scalars['String'];
};

export type UpdateInnovationFlowTemplateInput = {
  ID: Scalars['UUID'];
  /** The Profile of the Template. */
  profile?: InputMaybe<UpdateProfileInput>;
  states?: InputMaybe<Array<UpdateInnovationFlowStateInput>>;
};

export type UpdateInnovationHubInput = {
  ID: Scalars['UUID'];
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The Profile of this entity. */
  profileData?: InputMaybe<UpdateProfileInput>;
  /** A list of Spaces to include in this Innovation Hub. Only valid when type 'list' is used. */
  spaceListFilter?: InputMaybe<Array<Scalars['UUID_NAMEID']>>;
  /** Spaces with which visibility this Innovation Hub will display. Only valid when type 'visibility' is used. */
  spaceVisibilityFilter?: InputMaybe<SpaceVisibility>;
};

export type UpdateInnovationHubPlatformSettingsInput = {
  ID: Scalars['UUID'];
  /** An Account ID associated with the InnovationHub */
  accountID: Scalars['UUID'];
};

export type UpdateInnovationPackInput = {
  /** The ID or NameID of the InnovationPack. */
  ID: Scalars['UUID_NAMEID'];
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The Profile of this entity. */
  profileData?: InputMaybe<UpdateProfileInput>;
  /** Update the provider Organization for the InnovationPack. */
  providerOrgID?: InputMaybe<Scalars['UUID_NAMEID']>;
};

export type UpdateLicenseInput = {
  /** Update the feature flags for the License. */
  featureFlags?: InputMaybe<Array<UpdateFeatureFlagInput>>;
  /** Visibility of the Space. */
  visibility?: InputMaybe<SpaceVisibility>;
};

export type UpdateLicensePlanInput = {
  ID: Scalars['UUID'];
};

export type UpdateLinkInput = {
  ID: Scalars['UUID'];
  /** The Profile of the Link. */
  profile?: InputMaybe<UpdateProfileInput>;
  uri?: InputMaybe<Scalars['String']>;
};

export type UpdateLocationInput = {
  addressLine1?: InputMaybe<Scalars['String']>;
  addressLine2?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
  stateOrProvince?: InputMaybe<Scalars['String']>;
};

export type UpdateOrganizationInput = {
  /** The ID or NameID of the Organization to update. */
  ID: Scalars['UUID_NAMEID'];
  contactEmail?: InputMaybe<Scalars['String']>;
  domain?: InputMaybe<Scalars['String']>;
  legalEntityName?: InputMaybe<Scalars['String']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The Profile of this entity. */
  profileData?: InputMaybe<UpdateProfileInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UpdateOrganizationPreferenceInput = {
  /** ID of the Organization */
  organizationID: Scalars['UUID_NAMEID'];
  /** Type of the organization preference */
  type: OrganizationPreferenceType;
  value: Scalars['String'];
};

export type UpdatePostInput = {
  ID: Scalars['UUID'];
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The Profile of this entity. */
  profileData?: InputMaybe<UpdateProfileInput>;
  type?: InputMaybe<Scalars['String']>;
};

export type UpdatePostTemplateInput = {
  ID: Scalars['UUID'];
  /** The default description to be pre-filled when users create Posts based on this template. */
  defaultDescription?: InputMaybe<Scalars['Markdown']>;
  /** The Profile of the Template. */
  profile?: InputMaybe<UpdateProfileInput>;
  /** The type of Posts created from this Template. */
  type?: InputMaybe<Scalars['String']>;
};

export type UpdateProfileDirectInput = {
  description?: InputMaybe<Scalars['Markdown']>;
  /** The display name for the entity. */
  displayName?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<UpdateLocationInput>;
  profileID: Scalars['UUID'];
  references?: InputMaybe<Array<UpdateReferenceInput>>;
  /** A memorable short description for this entity. */
  tagline?: InputMaybe<Scalars['String']>;
  tagsets?: InputMaybe<Array<UpdateTagsetInput>>;
};

export type UpdateProfileInput = {
  description?: InputMaybe<Scalars['Markdown']>;
  /** The display name for the entity. */
  displayName?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<UpdateLocationInput>;
  references?: InputMaybe<Array<UpdateReferenceInput>>;
  /** A memorable short description for this entity. */
  tagline?: InputMaybe<Scalars['String']>;
  tagsets?: InputMaybe<Array<UpdateTagsetInput>>;
};

export type UpdateReferenceInput = {
  ID: Scalars['UUID'];
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  uri?: InputMaybe<Scalars['String']>;
};

export type UpdateSpaceDefaultsInput = {
  /** The ID for the InnovationFlowtemplate to use for new Subspaces. */
  flowTemplateID: Scalars['UUID'];
  /** The identifier for the Space whose Defaaults are to be updated. */
  spaceID: Scalars['UUID'];
};

export type UpdateSpaceInput = {
  ID: Scalars['UUID'];
  /** Update the contained Context entity. */
  context?: InputMaybe<UpdateContextInput>;
  /** The Profile of the InnovationFlow of this entity. */
  innovationFlowData?: InputMaybe<UpdateInnovationFlowInput>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The Profile of this entity. */
  profileData?: InputMaybe<UpdateProfileInput>;
};

export type UpdateSpacePlatformSettingsInput = {
  /** Upate the URL path for the Space. */
  nameID: Scalars['NameID'];
  /** The identifier for the Space whose license etc is to be updated. */
  spaceID: Scalars['UUID'];
};

export type UpdateSpaceSettingsCollaborationInput = {
  /** Flag to control if members can create callouts. */
  allowMembersToCreateCallouts: Scalars['Boolean'];
  /** Flag to control if members can create subspaces. */
  allowMembersToCreateSubspaces: Scalars['Boolean'];
  /** Flag to control if ability to contribute is inherited from parent Space. */
  inheritMembershipRights: Scalars['Boolean'];
};

export type UpdateSpaceSettingsEntityInput = {
  collaboration?: InputMaybe<UpdateSpaceSettingsCollaborationInput>;
  membership?: InputMaybe<UpdateSpaceSettingsMembershipInput>;
  privacy?: InputMaybe<UpdateSpaceSettingsPrivacyInput>;
};

export type UpdateSpaceSettingsInput = {
  /** Update the settings for the Space. */
  settings: UpdateSpaceSettingsEntityInput;
  /** The identifier for the Space whose settings are to be updated. */
  spaceID: Scalars['String'];
};

export type UpdateSpaceSettingsMembershipInput = {
  /** Flag to control if Subspace admins can invite for this Space. */
  allowSubspaceAdminsToInviteMembers: Scalars['Boolean'];
  /** The membership policy in usage for this Space */
  policy: CommunityMembershipPolicy;
  /** The organizations that are trusted to Join as members for this Space */
  trustedOrganizations: Array<Scalars['UUID']>;
};

export type UpdateSpaceSettingsPrivacyInput = {
  /** Flag to control if Platform Support has admin rights. */
  allowPlatformSupportAsAdmin?: InputMaybe<Scalars['Boolean']>;
  mode?: InputMaybe<SpacePrivacyMode>;
};

export type UpdateTagsetInput = {
  ID: Scalars['UUID'];
  name?: InputMaybe<Scalars['String']>;
  tags: Array<Scalars['String']>;
};

export type UpdateUserGroupInput = {
  ID: Scalars['UUID'];
  name?: InputMaybe<Scalars['String']>;
  profileData?: InputMaybe<UpdateProfileInput>;
};

export type UpdateUserInput = {
  ID: Scalars['UUID_NAMEID_EMAIL'];
  accountUpn?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  phone?: InputMaybe<Scalars['String']>;
  /** The Profile of this entity. */
  profileData?: InputMaybe<UpdateProfileInput>;
  /** Set this user profile as being used as a service account or not. */
  serviceProfile?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateUserPlatformSettingsInput = {
  email?: InputMaybe<Scalars['String']>;
  /** Upate the URL path for the User. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The identifier for the User whose platform managed information is to be updated. */
  userID: Scalars['String'];
};

export type UpdateUserPreferenceInput = {
  /** Type of the user preference */
  type: UserPreferenceType;
  /** ID of the User */
  userID: Scalars['UUID_NAMEID_EMAIL'];
  value: Scalars['String'];
};

export type UpdateVirtualContributorInput = {
  /** The ID of the Virtual Contributor to update. */
  ID: Scalars['UUID'];
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The Profile of this entity. */
  profileData?: InputMaybe<UpdateProfileInput>;
};

export type UpdateVirtualContributorPlatformSettingsInput = {
  ID: Scalars['UUID'];
  /** An Account ID associated with the VirtualContributor */
  accountID: Scalars['UUID'];
};

export type UpdateVirtualPersonaInput = {
  ID: Scalars['UUID'];
  engine: VirtualContributorEngine;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The Profile of this entity. */
  profileData?: InputMaybe<UpdateProfileInput>;
  prompt?: InputMaybe<Scalars['JSON']>;
};

export type UpdateVisualInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  uri: Scalars['String'];
  visualID: Scalars['String'];
};

export type UpdateWhiteboardContentInput = {
  ID: Scalars['UUID'];
  content?: InputMaybe<Scalars['WhiteboardContent']>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The Profile of this entity. */
  profileData?: InputMaybe<UpdateProfileInput>;
};

export type UpdateWhiteboardInput = {
  ID: Scalars['UUID'];
  contentUpdatePolicy?: InputMaybe<ContentUpdatePolicy>;
  /** A display identifier, unique within the containing scope. Note: updating the nameID will affect URL on the client. */
  nameID?: InputMaybe<Scalars['NameID']>;
  /** The Profile of this entity. */
  profileData?: InputMaybe<UpdateProfileInput>;
};

export type UpdateWhiteboardTemplateInput = {
  ID: Scalars['UUID'];
  content?: InputMaybe<Scalars['WhiteboardContent']>;
  /** The Profile of the Template. */
  profile?: InputMaybe<UpdateProfileInput>;
};

export type User = Contributor & {
  /** The unique personal identifier (upn) for the account associated with this user profile */
  accountUpn: Scalars['String'];
  /** The Agent representing this User. */
  agent: Agent;
  /** The authorization rules for the Contributor */
  authorization?: Maybe<Authorization>;
  /** The Community rooms this user is a member of */
  communityRooms?: Maybe<Array<CommunicationRoom>>;
  /** The direct rooms this user is a member of */
  directRooms?: Maybe<Array<DirectRoom>>;
  /** The email address for this User. */
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  /** The ID of the Contributor */
  id: Scalars['UUID'];
  /** Can a message be sent to this User. */
  isContactable: Scalars['Boolean'];
  lastName: Scalars['String'];
  /** A name identifier of the Contributor, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The phone number for this User. */
  phone: Scalars['String'];
  /** The preferences for this user */
  preferences: Array<Preference>;
  /** The Profile for this User. */
  profile: Profile;
  /** The StorageAggregator for managing storage buckets in use by this User */
  storageAggregator?: Maybe<StorageAggregator>;
};

export type UserAuthorizationPrivilegesInput = {
  /** The authorization definition to evaluate the user credentials against. */
  authorizationID: Scalars['UUID'];
  /** The user to evaluate privileges granted based on held credentials. */
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type UserAuthorizationResetInput = {
  /** The identifier of the User whose Authorization Policy should be reset. */
  userID: Scalars['UUID_NAMEID_EMAIL'];
};

export type UserFilterInput = {
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type UserGroup = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The Users that are members of this User Group. */
  members?: Maybe<Array<User>>;
  /** Containing entity for this UserGroup. */
  parent?: Maybe<Groupable>;
  /** The profile for the user group */
  profile?: Maybe<Profile>;
};

export enum UserPreferenceType {
  NotificationApplicationReceived = 'NOTIFICATION_APPLICATION_RECEIVED',
  NotificationApplicationSubmitted = 'NOTIFICATION_APPLICATION_SUBMITTED',
  NotificationCalloutPublished = 'NOTIFICATION_CALLOUT_PUBLISHED',
  NotificationCommentReply = 'NOTIFICATION_COMMENT_REPLY',
  NotificationCommunicationDiscussionCreated = 'NOTIFICATION_COMMUNICATION_DISCUSSION_CREATED',
  NotificationCommunicationDiscussionCreatedAdmin = 'NOTIFICATION_COMMUNICATION_DISCUSSION_CREATED_ADMIN',
  NotificationCommunicationMention = 'NOTIFICATION_COMMUNICATION_MENTION',
  NotificationCommunicationMessage = 'NOTIFICATION_COMMUNICATION_MESSAGE',
  NotificationCommunicationUpdates = 'NOTIFICATION_COMMUNICATION_UPDATES',
  NotificationCommunicationUpdateSentAdmin = 'NOTIFICATION_COMMUNICATION_UPDATE_SENT_ADMIN',
  NotificationCommunityCollaborationInterestAdmin = 'NOTIFICATION_COMMUNITY_COLLABORATION_INTEREST_ADMIN',
  NotificationCommunityCollaborationInterestUser = 'NOTIFICATION_COMMUNITY_COLLABORATION_INTEREST_USER',
  NotificationCommunityInvitationUser = 'NOTIFICATION_COMMUNITY_INVITATION_USER',
  NotificationCommunityNewMember = 'NOTIFICATION_COMMUNITY_NEW_MEMBER',
  NotificationCommunityNewMemberAdmin = 'NOTIFICATION_COMMUNITY_NEW_MEMBER_ADMIN',
  NotificationCommunityReviewSubmitted = 'NOTIFICATION_COMMUNITY_REVIEW_SUBMITTED',
  NotificationCommunityReviewSubmittedAdmin = 'NOTIFICATION_COMMUNITY_REVIEW_SUBMITTED_ADMIN',
  NotificationDiscussionCommentCreated = 'NOTIFICATION_DISCUSSION_COMMENT_CREATED',
  NotificationForumDiscussionComment = 'NOTIFICATION_FORUM_DISCUSSION_COMMENT',
  NotificationForumDiscussionCreated = 'NOTIFICATION_FORUM_DISCUSSION_CREATED',
  NotificationOrganizationMention = 'NOTIFICATION_ORGANIZATION_MENTION',
  NotificationOrganizationMessage = 'NOTIFICATION_ORGANIZATION_MESSAGE',
  NotificationPostCommentCreated = 'NOTIFICATION_POST_COMMENT_CREATED',
  NotificationPostCreated = 'NOTIFICATION_POST_CREATED',
  NotificationPostCreatedAdmin = 'NOTIFICATION_POST_CREATED_ADMIN',
  NotificationUserRemoved = 'NOTIFICATION_USER_REMOVED',
  NotificationUserSignUp = 'NOTIFICATION_USER_SIGN_UP',
  NotificationWhiteboardCreated = 'NOTIFICATION_WHITEBOARD_CREATED',
}

export type UserSendMessageInput = {
  /** The message being sent */
  message: Scalars['String'];
  /** The user a message is being sent to */
  receivingUserID: Scalars['String'];
};

export type UsersWithAuthorizationCredentialInput = {
  /** The resource to which a credential needs to be bound. */
  resourceID?: InputMaybe<Scalars['UUID']>;
  /** The type of credential. */
  type: AuthorizationCredential;
};

export type VerifiedCredential = {
  /** The time at which the credential is no longer valid */
  claims: Array<VerifiedCredentialClaim>;
  /** JSON for the context in the credential */
  context: Scalars['JSON'];
  /** The time at which the credential is no longer valid */
  expires: Scalars['String'];
  /** The time at which the credential was issued */
  issued: Scalars['String'];
  /** The party issuing the VC */
  issuer: Scalars['String'];
  /** The name of the VC */
  name: Scalars['String'];
  /** The type of VC */
  type: Scalars['String'];
};

export type VerifiedCredentialClaim = {
  /** The name of the claim */
  name: Scalars['JSON'];
  /** The value for the claim */
  value: Scalars['JSON'];
};

export type VirtualContributor = Contributor & {
  /** The account under which the virtual contributor was created */
  account?: Maybe<Account>;
  /** The Agent representing this User. */
  agent: Agent;
  /** The authorization rules for the Contributor */
  authorization?: Maybe<Authorization>;
  /** The body of knowledge ID used for the Virtual Contributor */
  bodyOfKnowledgeID?: Maybe<Scalars['UUID']>;
  /** The body of knowledge type used for the Virtual Contributor */
  bodyOfKnowledgeType?: Maybe<BodyOfKnowledgeType>;
  /** The ID of the Contributor */
  id: Scalars['UUID'];
  /** A name identifier of the Contributor, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The profile for this Virtual. */
  profile: Profile;
  /** The StorageAggregator for managing storage buckets in use by this Virtual */
  storageAggregator?: Maybe<StorageAggregator>;
  /** The virtual persona being used by this virtual contributor */
  virtualPersona: VirtualPersona;
};

export enum VirtualContributorEngine {
  CommunityManager = 'COMMUNITY_MANAGER',
  Expert = 'EXPERT',
  Guidance = 'GUIDANCE',
}

export type VirtualPersona = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The required data access by the Virtual Persona */
  dataAccessMode: VirtualPersonaAccessMode;
  /** The Virtual Persona Engine being used by this virtual persona. */
  engine: VirtualContributorEngine;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The Profile for the VirtualPersona. */
  profile: Profile;
  /** The prompt used by this Virtual Persona */
  prompt: Scalars['String'];
};

export enum VirtualPersonaAccessMode {
  None = 'NONE',
  SpaceProfile = 'SPACE_PROFILE',
  SpaceProfileAndContents = 'SPACE_PROFILE_AND_CONTENTS',
}

export type VirtualPersonaQuestionInput = {
  /** The question that is being asked. */
  question: Scalars['String'];
  /** Virtual Persona Type. */
  virtualPersonaID: Scalars['UUID'];
};

export type VirtualPersonaResult = {
  /** The answer to the question */
  answer: Scalars['String'];
  /** The id of the answer; null if an error was returned */
  id?: Maybe<Scalars['String']>;
  /** The original question */
  question: Scalars['String'];
  /** The sources used to answer the question */
  sources?: Maybe<Array<Source>>;
};

export type Visual = {
  allowedTypes: Array<Scalars['String']>;
  alternativeText?: Maybe<Scalars['String']>;
  /** Post ratio width / height. */
  aspectRatio: Scalars['Float'];
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Maximum height resolution. */
  maxHeight: Scalars['Float'];
  /** Maximum width resolution. */
  maxWidth: Scalars['Float'];
  /** Minimum height resolution. */
  minHeight: Scalars['Float'];
  /** Minimum width resolution. */
  minWidth: Scalars['Float'];
  name: Scalars['String'];
  uri: Scalars['String'];
};

export enum VisualType {
  Avatar = 'AVATAR',
  Banner = 'BANNER',
  BannerWide = 'BANNER_WIDE',
  Card = 'CARD',
}

export type VisualUploadImageInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  visualID: Scalars['String'];
};

export type Whiteboard = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The visual content of the Whiteboard. */
  content: Scalars['WhiteboardContent'];
  /** The policy governing who can update the Whiteboard contet. */
  contentUpdatePolicy: ContentUpdatePolicy;
  /** The user that created this Whiteboard */
  createdBy?: Maybe<User>;
  /** The date at which the Whiteboard was created. */
  createdDate: Scalars['DateTime'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** Whether the Whiteboard is multi-user enabled on Space level. */
  isMultiUser: Scalars['Boolean'];
  /** A name identifier of the entity, unique within a given scope. */
  nameID: Scalars['NameID'];
  /** The Profile for this Whiteboard. */
  profile: Profile;
  /** The date at which the Whiteboard was last updated. */
  updatedDate?: Maybe<Scalars['DateTime']>;
};

export type WhiteboardTemplate = {
  /** The authorization rules for the entity */
  authorization?: Maybe<Authorization>;
  /** The visual content of the Whiteboard. */
  content: Scalars['WhiteboardContent'];
  /** The ID of the entity */
  id: Scalars['UUID'];
  /** The Profile for this template. */
  profile: Profile;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  APM: ResolverTypeWrapper<Apm>;
  Account: ResolverTypeWrapper<Account>;
  AccountAuthorizationResetInput: AccountAuthorizationResetInput;
  AccountSubscription: ResolverTypeWrapper<AccountSubscription>;
  ActivityCreatedSubscriptionInput: ActivityCreatedSubscriptionInput;
  ActivityCreatedSubscriptionResult: ResolverTypeWrapper<ActivityCreatedSubscriptionResult>;
  ActivityEventType: ActivityEventType;
  ActivityFeed: ResolverTypeWrapper<ActivityFeed>;
  ActivityFeedGroupedQueryArgs: ActivityFeedGroupedQueryArgs;
  ActivityFeedQueryArgs: ActivityFeedQueryArgs;
  ActivityFeedRoles: ActivityFeedRoles;
  ActivityLogEntry:
    | ResolversTypes['ActivityLogEntryCalendarEventCreated']
    | ResolversTypes['ActivityLogEntryCalloutDiscussionComment']
    | ResolversTypes['ActivityLogEntryCalloutLinkCreated']
    | ResolversTypes['ActivityLogEntryCalloutPostComment']
    | ResolversTypes['ActivityLogEntryCalloutPostCreated']
    | ResolversTypes['ActivityLogEntryCalloutPublished']
    | ResolversTypes['ActivityLogEntryCalloutWhiteboardContentModified']
    | ResolversTypes['ActivityLogEntryCalloutWhiteboardCreated']
    | ResolversTypes['ActivityLogEntryChallengeCreated']
    | ResolversTypes['ActivityLogEntryMemberJoined']
    | ResolversTypes['ActivityLogEntryOpportunityCreated']
    | ResolversTypes['ActivityLogEntryUpdateSent'];
  ActivityLogEntryCalendarEventCreated: ResolverTypeWrapper<ActivityLogEntryCalendarEventCreated>;
  ActivityLogEntryCalloutDiscussionComment: ResolverTypeWrapper<ActivityLogEntryCalloutDiscussionComment>;
  ActivityLogEntryCalloutLinkCreated: ResolverTypeWrapper<ActivityLogEntryCalloutLinkCreated>;
  ActivityLogEntryCalloutPostComment: ResolverTypeWrapper<ActivityLogEntryCalloutPostComment>;
  ActivityLogEntryCalloutPostCreated: ResolverTypeWrapper<ActivityLogEntryCalloutPostCreated>;
  ActivityLogEntryCalloutPublished: ResolverTypeWrapper<ActivityLogEntryCalloutPublished>;
  ActivityLogEntryCalloutWhiteboardContentModified: ResolverTypeWrapper<ActivityLogEntryCalloutWhiteboardContentModified>;
  ActivityLogEntryCalloutWhiteboardCreated: ResolverTypeWrapper<ActivityLogEntryCalloutWhiteboardCreated>;
  ActivityLogEntryChallengeCreated: ResolverTypeWrapper<ActivityLogEntryChallengeCreated>;
  ActivityLogEntryMemberJoined: ResolverTypeWrapper<ActivityLogEntryMemberJoined>;
  ActivityLogEntryOpportunityCreated: ResolverTypeWrapper<ActivityLogEntryOpportunityCreated>;
  ActivityLogEntryUpdateSent: ResolverTypeWrapper<ActivityLogEntryUpdateSent>;
  ActivityLogInput: ActivityLogInput;
  Actor: ResolverTypeWrapper<Actor>;
  ActorGroup: ResolverTypeWrapper<ActorGroup>;
  Agent: ResolverTypeWrapper<Agent>;
  AgentBeginVerifiedCredentialOfferOutput: ResolverTypeWrapper<AgentBeginVerifiedCredentialOfferOutput>;
  AgentBeginVerifiedCredentialRequestOutput: ResolverTypeWrapper<AgentBeginVerifiedCredentialRequestOutput>;
  AnyInvitation:
    | ResolversTypes['Invitation']
    | ResolversTypes['InvitationExternal'];
  Application: ResolverTypeWrapper<Application>;
  ApplicationEventInput: ApplicationEventInput;
  ApplicationForRoleResult: ResolverTypeWrapper<ApplicationForRoleResult>;
  AssignCommunityRoleToOrganizationInput: AssignCommunityRoleToOrganizationInput;
  AssignCommunityRoleToUserInput: AssignCommunityRoleToUserInput;
  AssignCommunityRoleToVirtualInput: AssignCommunityRoleToVirtualInput;
  AssignLicensePlanToAccount: AssignLicensePlanToAccount;
  AssignOrganizationRoleToUserInput: AssignOrganizationRoleToUserInput;
  AssignPlatformRoleToUserInput: AssignPlatformRoleToUserInput;
  AssignUserGroupMemberInput: AssignUserGroupMemberInput;
  AuthenticationConfig: ResolverTypeWrapper<AuthenticationConfig>;
  AuthenticationProviderConfig: ResolverTypeWrapper<
    Omit<AuthenticationProviderConfig, 'config'> & {
      config: ResolversTypes['AuthenticationProviderConfigUnion'];
    }
  >;
  AuthenticationProviderConfigUnion: ResolversTypes['OryConfig'];
  Authorization: ResolverTypeWrapper<Authorization>;
  AuthorizationCredential: AuthorizationCredential;
  AuthorizationPolicyRuleCredential: ResolverTypeWrapper<AuthorizationPolicyRuleCredential>;
  AuthorizationPolicyRulePrivilege: ResolverTypeWrapper<AuthorizationPolicyRulePrivilege>;
  AuthorizationPolicyRuleVerifiedCredential: ResolverTypeWrapper<AuthorizationPolicyRuleVerifiedCredential>;
  AuthorizationPrivilege: AuthorizationPrivilege;
  BodyOfKnowledgeType: BodyOfKnowledgeType;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CID: ResolverTypeWrapper<Scalars['CID']>;
  Calendar: ResolverTypeWrapper<Calendar>;
  CalendarEvent: ResolverTypeWrapper<CalendarEvent>;
  CalendarEventType: CalendarEventType;
  Callout: ResolverTypeWrapper<Callout>;
  CalloutContribution: ResolverTypeWrapper<CalloutContribution>;
  CalloutContributionDefaults: ResolverTypeWrapper<CalloutContributionDefaults>;
  CalloutContributionFilterArgs: CalloutContributionFilterArgs;
  CalloutContributionPolicy: ResolverTypeWrapper<CalloutContributionPolicy>;
  CalloutContributionType: CalloutContributionType;
  CalloutFraming: ResolverTypeWrapper<CalloutFraming>;
  CalloutGroup: ResolverTypeWrapper<CalloutGroup>;
  CalloutGroupName: CalloutGroupName;
  CalloutPostCreated: ResolverTypeWrapper<CalloutPostCreated>;
  CalloutState: CalloutState;
  CalloutTemplate: ResolverTypeWrapper<CalloutTemplate>;
  CalloutType: CalloutType;
  CalloutVisibility: CalloutVisibility;
  ChatGuidanceAnswerRelevanceInput: ChatGuidanceAnswerRelevanceInput;
  ChatGuidanceInput: ChatGuidanceInput;
  ChatGuidanceResult: ResolverTypeWrapper<ChatGuidanceResult>;
  Collaboration: ResolverTypeWrapper<Collaboration>;
  Communication: ResolverTypeWrapper<Communication>;
  CommunicationAdminEnsureAccessInput: CommunicationAdminEnsureAccessInput;
  CommunicationAdminMembershipInput: CommunicationAdminMembershipInput;
  CommunicationAdminMembershipResult: ResolverTypeWrapper<CommunicationAdminMembershipResult>;
  CommunicationAdminOrphanedUsageResult: ResolverTypeWrapper<CommunicationAdminOrphanedUsageResult>;
  CommunicationAdminRemoveOrphanedRoomInput: CommunicationAdminRemoveOrphanedRoomInput;
  CommunicationAdminRoomMembershipResult: ResolverTypeWrapper<CommunicationAdminRoomMembershipResult>;
  CommunicationAdminRoomResult: ResolverTypeWrapper<CommunicationAdminRoomResult>;
  CommunicationAdminUpdateRoomsJoinRuleInput: CommunicationAdminUpdateRoomsJoinRuleInput;
  CommunicationCreateDiscussionInput: CommunicationCreateDiscussionInput;
  CommunicationRoom: ResolverTypeWrapper<CommunicationRoom>;
  CommunicationSendMessageToCommunityLeadsInput: CommunicationSendMessageToCommunityLeadsInput;
  CommunicationSendMessageToOrganizationInput: CommunicationSendMessageToOrganizationInput;
  CommunicationSendMessageToUserInput: CommunicationSendMessageToUserInput;
  Community: ResolverTypeWrapper<Community>;
  CommunityApplyInput: CommunityApplyInput;
  CommunityGuidelines: ResolverTypeWrapper<CommunityGuidelines>;
  CommunityGuidelinesTemplate: ResolverTypeWrapper<CommunityGuidelinesTemplate>;
  CommunityJoinInput: CommunityJoinInput;
  CommunityMembershipPolicy: CommunityMembershipPolicy;
  CommunityMembershipStatus: CommunityMembershipStatus;
  CommunityPolicy: ResolverTypeWrapper<CommunityPolicy>;
  CommunityRole: CommunityRole;
  CommunityRoleImplicit: CommunityRoleImplicit;
  CommunityRolePolicy: ResolverTypeWrapper<CommunityRolePolicy>;
  Config: ResolverTypeWrapper<Config>;
  ContentUpdatePolicy: ContentUpdatePolicy;
  Context: ResolverTypeWrapper<Context>;
  Contributor:
    | ResolversTypes['Organization']
    | ResolversTypes['User']
    | ResolversTypes['VirtualContributor'];
  ContributorFilterInput: ContributorFilterInput;
  ContributorRoles: ResolverTypeWrapper<ContributorRoles>;
  ConvertSubspaceToSpaceInput: ConvertSubspaceToSpaceInput;
  ConvertSubsubspaceToSubspaceInput: ConvertSubsubspaceToSubspaceInput;
  CreateAccountInput: CreateAccountInput;
  CreateActorGroupInput: CreateActorGroupInput;
  CreateActorInput: CreateActorInput;
  CreateCalendarEventOnCalendarInput: CreateCalendarEventOnCalendarInput;
  CreateCalloutContributionDefaultsInput: CreateCalloutContributionDefaultsInput;
  CreateCalloutContributionPolicyInput: CreateCalloutContributionPolicyInput;
  CreateCalloutFramingInput: CreateCalloutFramingInput;
  CreateCalloutOnCollaborationInput: CreateCalloutOnCollaborationInput;
  CreateCalloutTemplateOnTemplatesSetInput: CreateCalloutTemplateOnTemplatesSetInput;
  CreateCollaborationInput: CreateCollaborationInput;
  CreateCommunityGuidelinesInput: CreateCommunityGuidelinesInput;
  CreateCommunityGuidelinesTemplateOnTemplatesSetInput: CreateCommunityGuidelinesTemplateOnTemplatesSetInput;
  CreateContextInput: CreateContextInput;
  CreateContributionOnCalloutInput: CreateContributionOnCalloutInput;
  CreateInnovationFlowTemplateOnTemplatesSetInput: CreateInnovationFlowTemplateOnTemplatesSetInput;
  CreateInnovationHubInput: CreateInnovationHubInput;
  CreateInnovationPackOnLibraryInput: CreateInnovationPackOnLibraryInput;
  CreateInvitationForUsersOnCommunityInput: CreateInvitationForUsersOnCommunityInput;
  CreateInvitationUserByEmailOnCommunityInput: CreateInvitationUserByEmailOnCommunityInput;
  CreateLicensePlanOnLicensingInput: CreateLicensePlanOnLicensingInput;
  CreateLinkInput: CreateLinkInput;
  CreateLocationInput: CreateLocationInput;
  CreateNVPInput: CreateNvpInput;
  CreateOrganizationInput: CreateOrganizationInput;
  CreatePostInput: CreatePostInput;
  CreatePostTemplateOnTemplatesSetInput: CreatePostTemplateOnTemplatesSetInput;
  CreateProfileInput: CreateProfileInput;
  CreateReferenceInput: CreateReferenceInput;
  CreateReferenceOnProfileInput: CreateReferenceOnProfileInput;
  CreateRelationOnCollaborationInput: CreateRelationOnCollaborationInput;
  CreateSpaceInput: CreateSpaceInput;
  CreateSubspaceInput: CreateSubspaceInput;
  CreateTagsetInput: CreateTagsetInput;
  CreateTagsetOnProfileInput: CreateTagsetOnProfileInput;
  CreateUserGroupInput: CreateUserGroupInput;
  CreateUserInput: CreateUserInput;
  CreateVirtualContributorOnAccountInput: CreateVirtualContributorOnAccountInput;
  CreateVirtualPersonaInput: CreateVirtualPersonaInput;
  CreateWhiteboardInput: CreateWhiteboardInput;
  CreateWhiteboardTemplateOnTemplatesSetInput: CreateWhiteboardTemplateOnTemplatesSetInput;
  Credential: ResolverTypeWrapper<Credential>;
  CredentialDefinition: ResolverTypeWrapper<CredentialDefinition>;
  CredentialMetadataOutput: ResolverTypeWrapper<CredentialMetadataOutput>;
  CredentialType: CredentialType;
  DID: ResolverTypeWrapper<Scalars['DID']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DeleteActorGroupInput: DeleteActorGroupInput;
  DeleteActorInput: DeleteActorInput;
  DeleteApplicationInput: DeleteApplicationInput;
  DeleteCalendarEventInput: DeleteCalendarEventInput;
  DeleteCalloutInput: DeleteCalloutInput;
  DeleteCalloutTemplateInput: DeleteCalloutTemplateInput;
  DeleteCollaborationInput: DeleteCollaborationInput;
  DeleteCommunityGuidelinesTemplateInput: DeleteCommunityGuidelinesTemplateInput;
  DeleteDiscussionInput: DeleteDiscussionInput;
  DeleteDocumentInput: DeleteDocumentInput;
  DeleteInnovationFlowTemplateInput: DeleteInnovationFlowTemplateInput;
  DeleteInnovationHubInput: DeleteInnovationHubInput;
  DeleteInnovationPackInput: DeleteInnovationPackInput;
  DeleteInvitationExternalInput: DeleteInvitationExternalInput;
  DeleteInvitationInput: DeleteInvitationInput;
  DeleteLicensePlanInput: DeleteLicensePlanInput;
  DeleteLinkInput: DeleteLinkInput;
  DeleteOrganizationInput: DeleteOrganizationInput;
  DeletePostInput: DeletePostInput;
  DeletePostTemplateInput: DeletePostTemplateInput;
  DeleteReferenceInput: DeleteReferenceInput;
  DeleteRelationInput: DeleteRelationInput;
  DeleteSpaceInput: DeleteSpaceInput;
  DeleteStorageBuckeetInput: DeleteStorageBuckeetInput;
  DeleteUserGroupInput: DeleteUserGroupInput;
  DeleteUserInput: DeleteUserInput;
  DeleteVirtualContributorInput: DeleteVirtualContributorInput;
  DeleteVirtualPersonaInput: DeleteVirtualPersonaInput;
  DeleteWhiteboardInput: DeleteWhiteboardInput;
  DeleteWhiteboardTemplateInput: DeleteWhiteboardTemplateInput;
  DirectRoom: ResolverTypeWrapper<DirectRoom>;
  Discussion: ResolverTypeWrapper<Discussion>;
  DiscussionCategory: DiscussionCategory;
  DiscussionsInput: DiscussionsInput;
  DiscussionsOrderBy: DiscussionsOrderBy;
  Document: ResolverTypeWrapper<Document>;
  EcosystemModel: ResolverTypeWrapper<EcosystemModel>;
  Emoji: ResolverTypeWrapper<Scalars['Emoji']>;
  FileStorageConfig: ResolverTypeWrapper<FileStorageConfig>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Form: ResolverTypeWrapper<Form>;
  FormQuestion: ResolverTypeWrapper<FormQuestion>;
  Geo: ResolverTypeWrapper<Geo>;
  GrantAuthorizationCredentialInput: GrantAuthorizationCredentialInput;
  GrantOrganizationAuthorizationCredentialInput: GrantOrganizationAuthorizationCredentialInput;
  Groupable: ResolversTypes['Community'] | ResolversTypes['Organization'];
  ISearchResults: ResolverTypeWrapper<ISearchResults>;
  IngestBatchResult: ResolverTypeWrapper<IngestBatchResult>;
  IngestResult: ResolverTypeWrapper<IngestResult>;
  IngestSpaceInput: IngestSpaceInput;
  InnovationFlow: ResolverTypeWrapper<InnovationFlow>;
  InnovationFlowState: ResolverTypeWrapper<InnovationFlowState>;
  InnovationFlowTemplate: ResolverTypeWrapper<InnovationFlowTemplate>;
  InnovationHub: ResolverTypeWrapper<InnovationHub>;
  InnovationHubType: InnovationHubType;
  InnovationPack: ResolverTypeWrapper<InnovationPack>;
  InnovationPacksInput: InnovationPacksInput;
  InnovationPacksOrderBy: InnovationPacksOrderBy;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Invitation: ResolverTypeWrapper<Invitation>;
  InvitationEventInput: InvitationEventInput;
  InvitationExternal: ResolverTypeWrapper<InvitationExternal>;
  InvitationForRoleResult: ResolverTypeWrapper<InvitationForRoleResult>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  LatestReleaseDiscussion: ResolverTypeWrapper<LatestReleaseDiscussion>;
  Library: ResolverTypeWrapper<Library>;
  License: ResolverTypeWrapper<License>;
  LicenseCredential: LicenseCredential;
  LicenseFeatureFlag: ResolverTypeWrapper<LicenseFeatureFlag>;
  LicenseFeatureFlagName: LicenseFeatureFlagName;
  LicensePlan: ResolverTypeWrapper<LicensePlan>;
  LicensePolicy: ResolverTypeWrapper<LicensePolicy>;
  LicensePolicyRuleFeatureFlag: ResolverTypeWrapper<LicensePolicyRuleFeatureFlag>;
  LicensePrivilege: LicensePrivilege;
  Licensing: ResolverTypeWrapper<Licensing>;
  Lifecycle: ResolverTypeWrapper<Lifecycle>;
  LifecycleDefinition: ResolverTypeWrapper<Scalars['LifecycleDefinition']>;
  Link: ResolverTypeWrapper<Link>;
  Location: ResolverTypeWrapper<Location>;
  LookupQueryResults: ResolverTypeWrapper<LookupQueryResults>;
  Markdown: ResolverTypeWrapper<Scalars['Markdown']>;
  MeQueryResults: ResolverTypeWrapper<MeQueryResults>;
  Message: ResolverTypeWrapper<Message>;
  MessageID: ResolverTypeWrapper<Scalars['MessageID']>;
  Metadata: ResolverTypeWrapper<Metadata>;
  MimeType: MimeType;
  MoveCalloutContributionInput: MoveCalloutContributionInput;
  Mutation: ResolverTypeWrapper<{}>;
  MutationType: MutationType;
  MySpaceResults: ResolverTypeWrapper<MySpaceResults>;
  NVP: ResolverTypeWrapper<Nvp>;
  NameID: ResolverTypeWrapper<Scalars['NameID']>;
  Organization: ResolverTypeWrapper<Organization>;
  OrganizationAuthorizationResetInput: OrganizationAuthorizationResetInput;
  OrganizationFilterInput: OrganizationFilterInput;
  OrganizationPreferenceType: OrganizationPreferenceType;
  OrganizationRole: OrganizationRole;
  OrganizationVerification: ResolverTypeWrapper<OrganizationVerification>;
  OrganizationVerificationEnum: OrganizationVerificationEnum;
  OrganizationVerificationEventInput: OrganizationVerificationEventInput;
  OryConfig: ResolverTypeWrapper<OryConfig>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PaginatedOrganization: ResolverTypeWrapper<PaginatedOrganization>;
  PaginatedSpaces: ResolverTypeWrapper<PaginatedSpaces>;
  PaginatedUsers: ResolverTypeWrapper<PaginatedUsers>;
  Platform: ResolverTypeWrapper<Platform>;
  PlatformFeatureFlag: ResolverTypeWrapper<PlatformFeatureFlag>;
  PlatformFeatureFlagName: PlatformFeatureFlagName;
  PlatformLocations: ResolverTypeWrapper<PlatformLocations>;
  PlatformRole: PlatformRole;
  Post: ResolverTypeWrapper<Post>;
  PostTemplate: ResolverTypeWrapper<PostTemplate>;
  Preference: ResolverTypeWrapper<Preference>;
  PreferenceDefinition: ResolverTypeWrapper<PreferenceDefinition>;
  PreferenceType: PreferenceType;
  PreferenceValueType: PreferenceValueType;
  Profile: ResolverTypeWrapper<Profile>;
  ProfileCredentialVerified: ResolverTypeWrapper<ProfileCredentialVerified>;
  ProfileType: ProfileType;
  Query: ResolverTypeWrapper<{}>;
  Question: ResolverTypeWrapper<Question>;
  Reaction: ResolverTypeWrapper<Reaction>;
  Reference: ResolverTypeWrapper<Reference>;
  Relation: ResolverTypeWrapper<Relation>;
  RelayPaginatedSpace: ResolverTypeWrapper<RelayPaginatedSpace>;
  RelayPaginatedSpaceEdge: ResolverTypeWrapper<RelayPaginatedSpaceEdge>;
  RelayPaginatedSpacePageInfo: ResolverTypeWrapper<RelayPaginatedSpacePageInfo>;
  RemoveCommunityRoleFromOrganizationInput: RemoveCommunityRoleFromOrganizationInput;
  RemoveCommunityRoleFromUserInput: RemoveCommunityRoleFromUserInput;
  RemoveCommunityRoleFromVirtualInput: RemoveCommunityRoleFromVirtualInput;
  RemoveOrganizationRoleFromUserInput: RemoveOrganizationRoleFromUserInput;
  RemovePlatformRoleFromUserInput: RemovePlatformRoleFromUserInput;
  RemoveUserGroupMemberInput: RemoveUserGroupMemberInput;
  RevokeAuthorizationCredentialInput: RevokeAuthorizationCredentialInput;
  RevokeLicensePlanFromAccount: RevokeLicensePlanFromAccount;
  RevokeOrganizationAuthorizationCredentialInput: RevokeOrganizationAuthorizationCredentialInput;
  RolesOrganizationInput: RolesOrganizationInput;
  RolesResult: ResolverTypeWrapper<RolesResult>;
  RolesResultCommunity: ResolverTypeWrapper<RolesResultCommunity>;
  RolesResultOrganization: ResolverTypeWrapper<RolesResultOrganization>;
  RolesResultSpace: ResolverTypeWrapper<RolesResultSpace>;
  RolesUserInput: RolesUserInput;
  Room: ResolverTypeWrapper<Room>;
  RoomAddReactionToMessageInput: RoomAddReactionToMessageInput;
  RoomEventSubscriptionResult: ResolverTypeWrapper<RoomEventSubscriptionResult>;
  RoomMessageEventSubscriptionResult: ResolverTypeWrapper<RoomMessageEventSubscriptionResult>;
  RoomMessageReactionEventSubscriptionResult: ResolverTypeWrapper<RoomMessageReactionEventSubscriptionResult>;
  RoomRemoveMessageInput: RoomRemoveMessageInput;
  RoomRemoveReactionToMessageInput: RoomRemoveReactionToMessageInput;
  RoomSendMessageInput: RoomSendMessageInput;
  RoomSendMessageReplyInput: RoomSendMessageReplyInput;
  SearchInput: SearchInput;
  SearchResult:
    | ResolversTypes['SearchResultCallout']
    | ResolversTypes['SearchResultOrganization']
    | ResolversTypes['SearchResultPost']
    | ResolversTypes['SearchResultSpace']
    | ResolversTypes['SearchResultUser']
    | ResolversTypes['SearchResultUserGroup'];
  SearchResultCallout: ResolverTypeWrapper<SearchResultCallout>;
  SearchResultOrganization: ResolverTypeWrapper<SearchResultOrganization>;
  SearchResultPost: ResolverTypeWrapper<SearchResultPost>;
  SearchResultSpace: ResolverTypeWrapper<SearchResultSpace>;
  SearchResultType: SearchResultType;
  SearchResultUser: ResolverTypeWrapper<SearchResultUser>;
  SearchResultUserGroup: ResolverTypeWrapper<SearchResultUserGroup>;
  Sentry: ResolverTypeWrapper<Sentry>;
  ServiceMetadata: ResolverTypeWrapper<ServiceMetadata>;
  Source: ResolverTypeWrapper<Source>;
  Space: ResolverTypeWrapper<Space>;
  SpaceDefaults: ResolverTypeWrapper<SpaceDefaults>;
  SpaceFilterInput: SpaceFilterInput;
  SpacePrivacyMode: SpacePrivacyMode;
  SpaceSettings: ResolverTypeWrapper<SpaceSettings>;
  SpaceSettingsCollaboration: ResolverTypeWrapper<SpaceSettingsCollaboration>;
  SpaceSettingsMembership: ResolverTypeWrapper<SpaceSettingsMembership>;
  SpaceSettingsPrivacy: ResolverTypeWrapper<SpaceSettingsPrivacy>;
  SpaceType: SpaceType;
  SpaceVisibility: SpaceVisibility;
  StorageAggregator: ResolverTypeWrapper<StorageAggregator>;
  StorageAggregatorParent: ResolverTypeWrapper<StorageAggregatorParent>;
  StorageBucket: ResolverTypeWrapper<StorageBucket>;
  StorageBucketParent: ResolverTypeWrapper<StorageBucketParent>;
  StorageBucketUploadFileInput: StorageBucketUploadFileInput;
  StorageBucketUploadFileOnLinkInput: StorageBucketUploadFileOnLinkInput;
  StorageBucketUploadFileOnReferenceInput: StorageBucketUploadFileOnReferenceInput;
  StorageConfig: ResolverTypeWrapper<StorageConfig>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  SubspaceCreated: ResolverTypeWrapper<SubspaceCreated>;
  Tagset: ResolverTypeWrapper<Tagset>;
  TagsetArgs: TagsetArgs;
  TagsetReservedName: TagsetReservedName;
  TagsetTemplate: ResolverTypeWrapper<TagsetTemplate>;
  TagsetType: TagsetType;
  Task: ResolverTypeWrapper<Task>;
  TaskStatus: TaskStatus;
  TemplatesSet: ResolverTypeWrapper<TemplatesSet>;
  Timeline: ResolverTypeWrapper<Timeline>;
  UUID: ResolverTypeWrapper<Scalars['UUID']>;
  UUID_NAMEID: ResolverTypeWrapper<Scalars['UUID_NAMEID']>;
  UUID_NAMEID_EMAIL: ResolverTypeWrapper<Scalars['UUID_NAMEID_EMAIL']>;
  UpdateAccountPlatformSettingsInput: UpdateAccountPlatformSettingsInput;
  UpdateActorInput: UpdateActorInput;
  UpdateCalendarEventInput: UpdateCalendarEventInput;
  UpdateCalloutContributionDefaultsInput: UpdateCalloutContributionDefaultsInput;
  UpdateCalloutContributionPolicyInput: UpdateCalloutContributionPolicyInput;
  UpdateCalloutFramingInput: UpdateCalloutFramingInput;
  UpdateCalloutInput: UpdateCalloutInput;
  UpdateCalloutPublishInfoInput: UpdateCalloutPublishInfoInput;
  UpdateCalloutTemplateInput: UpdateCalloutTemplateInput;
  UpdateCalloutVisibilityInput: UpdateCalloutVisibilityInput;
  UpdateCollaborationCalloutsSortOrderInput: UpdateCollaborationCalloutsSortOrderInput;
  UpdateCommunityApplicationFormInput: UpdateCommunityApplicationFormInput;
  UpdateCommunityGuidelinesInput: UpdateCommunityGuidelinesInput;
  UpdateCommunityGuidelinesOfTemplateInput: UpdateCommunityGuidelinesOfTemplateInput;
  UpdateCommunityGuidelinesTemplateInput: UpdateCommunityGuidelinesTemplateInput;
  UpdateContextInput: UpdateContextInput;
  UpdateDiscussionInput: UpdateDiscussionInput;
  UpdateDocumentInput: UpdateDocumentInput;
  UpdateEcosystemModelInput: UpdateEcosystemModelInput;
  UpdateFeatureFlagInput: UpdateFeatureFlagInput;
  UpdateFormInput: UpdateFormInput;
  UpdateFormQuestionInput: UpdateFormQuestionInput;
  UpdateInnovationFlowFromTemplateInput: UpdateInnovationFlowFromTemplateInput;
  UpdateInnovationFlowInput: UpdateInnovationFlowInput;
  UpdateInnovationFlowSelectedStateInput: UpdateInnovationFlowSelectedStateInput;
  UpdateInnovationFlowSingleStateInput: UpdateInnovationFlowSingleStateInput;
  UpdateInnovationFlowStateInput: UpdateInnovationFlowStateInput;
  UpdateInnovationFlowTemplateInput: UpdateInnovationFlowTemplateInput;
  UpdateInnovationHubInput: UpdateInnovationHubInput;
  UpdateInnovationHubPlatformSettingsInput: UpdateInnovationHubPlatformSettingsInput;
  UpdateInnovationPackInput: UpdateInnovationPackInput;
  UpdateLicenseInput: UpdateLicenseInput;
  UpdateLicensePlanInput: UpdateLicensePlanInput;
  UpdateLinkInput: UpdateLinkInput;
  UpdateLocationInput: UpdateLocationInput;
  UpdateOrganizationInput: UpdateOrganizationInput;
  UpdateOrganizationPreferenceInput: UpdateOrganizationPreferenceInput;
  UpdatePostInput: UpdatePostInput;
  UpdatePostTemplateInput: UpdatePostTemplateInput;
  UpdateProfileDirectInput: UpdateProfileDirectInput;
  UpdateProfileInput: UpdateProfileInput;
  UpdateReferenceInput: UpdateReferenceInput;
  UpdateSpaceDefaultsInput: UpdateSpaceDefaultsInput;
  UpdateSpaceInput: UpdateSpaceInput;
  UpdateSpacePlatformSettingsInput: UpdateSpacePlatformSettingsInput;
  UpdateSpaceSettingsCollaborationInput: UpdateSpaceSettingsCollaborationInput;
  UpdateSpaceSettingsEntityInput: UpdateSpaceSettingsEntityInput;
  UpdateSpaceSettingsInput: UpdateSpaceSettingsInput;
  UpdateSpaceSettingsMembershipInput: UpdateSpaceSettingsMembershipInput;
  UpdateSpaceSettingsPrivacyInput: UpdateSpaceSettingsPrivacyInput;
  UpdateTagsetInput: UpdateTagsetInput;
  UpdateUserGroupInput: UpdateUserGroupInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUserPlatformSettingsInput: UpdateUserPlatformSettingsInput;
  UpdateUserPreferenceInput: UpdateUserPreferenceInput;
  UpdateVirtualContributorInput: UpdateVirtualContributorInput;
  UpdateVirtualContributorPlatformSettingsInput: UpdateVirtualContributorPlatformSettingsInput;
  UpdateVirtualPersonaInput: UpdateVirtualPersonaInput;
  UpdateVisualInput: UpdateVisualInput;
  UpdateWhiteboardContentInput: UpdateWhiteboardContentInput;
  UpdateWhiteboardInput: UpdateWhiteboardInput;
  UpdateWhiteboardTemplateInput: UpdateWhiteboardTemplateInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  UserAuthorizationPrivilegesInput: UserAuthorizationPrivilegesInput;
  UserAuthorizationResetInput: UserAuthorizationResetInput;
  UserFilterInput: UserFilterInput;
  UserGroup: ResolverTypeWrapper<UserGroup>;
  UserPreferenceType: UserPreferenceType;
  UserSendMessageInput: UserSendMessageInput;
  UsersWithAuthorizationCredentialInput: UsersWithAuthorizationCredentialInput;
  VerifiedCredential: ResolverTypeWrapper<VerifiedCredential>;
  VerifiedCredentialClaim: ResolverTypeWrapper<VerifiedCredentialClaim>;
  VirtualContributor: ResolverTypeWrapper<VirtualContributor>;
  VirtualContributorEngine: VirtualContributorEngine;
  VirtualPersona: ResolverTypeWrapper<VirtualPersona>;
  VirtualPersonaAccessMode: VirtualPersonaAccessMode;
  VirtualPersonaQuestionInput: VirtualPersonaQuestionInput;
  VirtualPersonaResult: ResolverTypeWrapper<VirtualPersonaResult>;
  Visual: ResolverTypeWrapper<Visual>;
  VisualType: VisualType;
  VisualUploadImageInput: VisualUploadImageInput;
  Whiteboard: ResolverTypeWrapper<Whiteboard>;
  WhiteboardContent: ResolverTypeWrapper<Scalars['WhiteboardContent']>;
  WhiteboardTemplate: ResolverTypeWrapper<WhiteboardTemplate>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  APM: Apm;
  Account: Account;
  AccountAuthorizationResetInput: AccountAuthorizationResetInput;
  AccountSubscription: AccountSubscription;
  ActivityCreatedSubscriptionInput: ActivityCreatedSubscriptionInput;
  ActivityCreatedSubscriptionResult: ActivityCreatedSubscriptionResult;
  ActivityFeed: ActivityFeed;
  ActivityFeedGroupedQueryArgs: ActivityFeedGroupedQueryArgs;
  ActivityFeedQueryArgs: ActivityFeedQueryArgs;
  ActivityLogEntry:
    | ResolversParentTypes['ActivityLogEntryCalendarEventCreated']
    | ResolversParentTypes['ActivityLogEntryCalloutDiscussionComment']
    | ResolversParentTypes['ActivityLogEntryCalloutLinkCreated']
    | ResolversParentTypes['ActivityLogEntryCalloutPostComment']
    | ResolversParentTypes['ActivityLogEntryCalloutPostCreated']
    | ResolversParentTypes['ActivityLogEntryCalloutPublished']
    | ResolversParentTypes['ActivityLogEntryCalloutWhiteboardContentModified']
    | ResolversParentTypes['ActivityLogEntryCalloutWhiteboardCreated']
    | ResolversParentTypes['ActivityLogEntryChallengeCreated']
    | ResolversParentTypes['ActivityLogEntryMemberJoined']
    | ResolversParentTypes['ActivityLogEntryOpportunityCreated']
    | ResolversParentTypes['ActivityLogEntryUpdateSent'];
  ActivityLogEntryCalendarEventCreated: ActivityLogEntryCalendarEventCreated;
  ActivityLogEntryCalloutDiscussionComment: ActivityLogEntryCalloutDiscussionComment;
  ActivityLogEntryCalloutLinkCreated: ActivityLogEntryCalloutLinkCreated;
  ActivityLogEntryCalloutPostComment: ActivityLogEntryCalloutPostComment;
  ActivityLogEntryCalloutPostCreated: ActivityLogEntryCalloutPostCreated;
  ActivityLogEntryCalloutPublished: ActivityLogEntryCalloutPublished;
  ActivityLogEntryCalloutWhiteboardContentModified: ActivityLogEntryCalloutWhiteboardContentModified;
  ActivityLogEntryCalloutWhiteboardCreated: ActivityLogEntryCalloutWhiteboardCreated;
  ActivityLogEntryChallengeCreated: ActivityLogEntryChallengeCreated;
  ActivityLogEntryMemberJoined: ActivityLogEntryMemberJoined;
  ActivityLogEntryOpportunityCreated: ActivityLogEntryOpportunityCreated;
  ActivityLogEntryUpdateSent: ActivityLogEntryUpdateSent;
  ActivityLogInput: ActivityLogInput;
  Actor: Actor;
  ActorGroup: ActorGroup;
  Agent: Agent;
  AgentBeginVerifiedCredentialOfferOutput: AgentBeginVerifiedCredentialOfferOutput;
  AgentBeginVerifiedCredentialRequestOutput: AgentBeginVerifiedCredentialRequestOutput;
  AnyInvitation:
    | ResolversParentTypes['Invitation']
    | ResolversParentTypes['InvitationExternal'];
  Application: Application;
  ApplicationEventInput: ApplicationEventInput;
  ApplicationForRoleResult: ApplicationForRoleResult;
  AssignCommunityRoleToOrganizationInput: AssignCommunityRoleToOrganizationInput;
  AssignCommunityRoleToUserInput: AssignCommunityRoleToUserInput;
  AssignCommunityRoleToVirtualInput: AssignCommunityRoleToVirtualInput;
  AssignLicensePlanToAccount: AssignLicensePlanToAccount;
  AssignOrganizationRoleToUserInput: AssignOrganizationRoleToUserInput;
  AssignPlatformRoleToUserInput: AssignPlatformRoleToUserInput;
  AssignUserGroupMemberInput: AssignUserGroupMemberInput;
  AuthenticationConfig: AuthenticationConfig;
  AuthenticationProviderConfig: Omit<AuthenticationProviderConfig, 'config'> & {
    config: ResolversParentTypes['AuthenticationProviderConfigUnion'];
  };
  AuthenticationProviderConfigUnion: ResolversParentTypes['OryConfig'];
  Authorization: Authorization;
  AuthorizationPolicyRuleCredential: AuthorizationPolicyRuleCredential;
  AuthorizationPolicyRulePrivilege: AuthorizationPolicyRulePrivilege;
  AuthorizationPolicyRuleVerifiedCredential: AuthorizationPolicyRuleVerifiedCredential;
  Boolean: Scalars['Boolean'];
  CID: Scalars['CID'];
  Calendar: Calendar;
  CalendarEvent: CalendarEvent;
  Callout: Callout;
  CalloutContribution: CalloutContribution;
  CalloutContributionDefaults: CalloutContributionDefaults;
  CalloutContributionFilterArgs: CalloutContributionFilterArgs;
  CalloutContributionPolicy: CalloutContributionPolicy;
  CalloutFraming: CalloutFraming;
  CalloutGroup: CalloutGroup;
  CalloutPostCreated: CalloutPostCreated;
  CalloutTemplate: CalloutTemplate;
  ChatGuidanceAnswerRelevanceInput: ChatGuidanceAnswerRelevanceInput;
  ChatGuidanceInput: ChatGuidanceInput;
  ChatGuidanceResult: ChatGuidanceResult;
  Collaboration: Collaboration;
  Communication: Communication;
  CommunicationAdminEnsureAccessInput: CommunicationAdminEnsureAccessInput;
  CommunicationAdminMembershipInput: CommunicationAdminMembershipInput;
  CommunicationAdminMembershipResult: CommunicationAdminMembershipResult;
  CommunicationAdminOrphanedUsageResult: CommunicationAdminOrphanedUsageResult;
  CommunicationAdminRemoveOrphanedRoomInput: CommunicationAdminRemoveOrphanedRoomInput;
  CommunicationAdminRoomMembershipResult: CommunicationAdminRoomMembershipResult;
  CommunicationAdminRoomResult: CommunicationAdminRoomResult;
  CommunicationAdminUpdateRoomsJoinRuleInput: CommunicationAdminUpdateRoomsJoinRuleInput;
  CommunicationCreateDiscussionInput: CommunicationCreateDiscussionInput;
  CommunicationRoom: CommunicationRoom;
  CommunicationSendMessageToCommunityLeadsInput: CommunicationSendMessageToCommunityLeadsInput;
  CommunicationSendMessageToOrganizationInput: CommunicationSendMessageToOrganizationInput;
  CommunicationSendMessageToUserInput: CommunicationSendMessageToUserInput;
  Community: Community;
  CommunityApplyInput: CommunityApplyInput;
  CommunityGuidelines: CommunityGuidelines;
  CommunityGuidelinesTemplate: CommunityGuidelinesTemplate;
  CommunityJoinInput: CommunityJoinInput;
  CommunityPolicy: CommunityPolicy;
  CommunityRolePolicy: CommunityRolePolicy;
  Config: Config;
  Context: Context;
  Contributor:
    | ResolversParentTypes['Organization']
    | ResolversParentTypes['User']
    | ResolversParentTypes['VirtualContributor'];
  ContributorFilterInput: ContributorFilterInput;
  ContributorRoles: ContributorRoles;
  ConvertSubspaceToSpaceInput: ConvertSubspaceToSpaceInput;
  ConvertSubsubspaceToSubspaceInput: ConvertSubsubspaceToSubspaceInput;
  CreateAccountInput: CreateAccountInput;
  CreateActorGroupInput: CreateActorGroupInput;
  CreateActorInput: CreateActorInput;
  CreateCalendarEventOnCalendarInput: CreateCalendarEventOnCalendarInput;
  CreateCalloutContributionDefaultsInput: CreateCalloutContributionDefaultsInput;
  CreateCalloutContributionPolicyInput: CreateCalloutContributionPolicyInput;
  CreateCalloutFramingInput: CreateCalloutFramingInput;
  CreateCalloutOnCollaborationInput: CreateCalloutOnCollaborationInput;
  CreateCalloutTemplateOnTemplatesSetInput: CreateCalloutTemplateOnTemplatesSetInput;
  CreateCollaborationInput: CreateCollaborationInput;
  CreateCommunityGuidelinesInput: CreateCommunityGuidelinesInput;
  CreateCommunityGuidelinesTemplateOnTemplatesSetInput: CreateCommunityGuidelinesTemplateOnTemplatesSetInput;
  CreateContextInput: CreateContextInput;
  CreateContributionOnCalloutInput: CreateContributionOnCalloutInput;
  CreateInnovationFlowTemplateOnTemplatesSetInput: CreateInnovationFlowTemplateOnTemplatesSetInput;
  CreateInnovationHubInput: CreateInnovationHubInput;
  CreateInnovationPackOnLibraryInput: CreateInnovationPackOnLibraryInput;
  CreateInvitationForUsersOnCommunityInput: CreateInvitationForUsersOnCommunityInput;
  CreateInvitationUserByEmailOnCommunityInput: CreateInvitationUserByEmailOnCommunityInput;
  CreateLicensePlanOnLicensingInput: CreateLicensePlanOnLicensingInput;
  CreateLinkInput: CreateLinkInput;
  CreateLocationInput: CreateLocationInput;
  CreateNVPInput: CreateNvpInput;
  CreateOrganizationInput: CreateOrganizationInput;
  CreatePostInput: CreatePostInput;
  CreatePostTemplateOnTemplatesSetInput: CreatePostTemplateOnTemplatesSetInput;
  CreateProfileInput: CreateProfileInput;
  CreateReferenceInput: CreateReferenceInput;
  CreateReferenceOnProfileInput: CreateReferenceOnProfileInput;
  CreateRelationOnCollaborationInput: CreateRelationOnCollaborationInput;
  CreateSpaceInput: CreateSpaceInput;
  CreateSubspaceInput: CreateSubspaceInput;
  CreateTagsetInput: CreateTagsetInput;
  CreateTagsetOnProfileInput: CreateTagsetOnProfileInput;
  CreateUserGroupInput: CreateUserGroupInput;
  CreateUserInput: CreateUserInput;
  CreateVirtualContributorOnAccountInput: CreateVirtualContributorOnAccountInput;
  CreateVirtualPersonaInput: CreateVirtualPersonaInput;
  CreateWhiteboardInput: CreateWhiteboardInput;
  CreateWhiteboardTemplateOnTemplatesSetInput: CreateWhiteboardTemplateOnTemplatesSetInput;
  Credential: Credential;
  CredentialDefinition: CredentialDefinition;
  CredentialMetadataOutput: CredentialMetadataOutput;
  DID: Scalars['DID'];
  DateTime: Scalars['DateTime'];
  DeleteActorGroupInput: DeleteActorGroupInput;
  DeleteActorInput: DeleteActorInput;
  DeleteApplicationInput: DeleteApplicationInput;
  DeleteCalendarEventInput: DeleteCalendarEventInput;
  DeleteCalloutInput: DeleteCalloutInput;
  DeleteCalloutTemplateInput: DeleteCalloutTemplateInput;
  DeleteCollaborationInput: DeleteCollaborationInput;
  DeleteCommunityGuidelinesTemplateInput: DeleteCommunityGuidelinesTemplateInput;
  DeleteDiscussionInput: DeleteDiscussionInput;
  DeleteDocumentInput: DeleteDocumentInput;
  DeleteInnovationFlowTemplateInput: DeleteInnovationFlowTemplateInput;
  DeleteInnovationHubInput: DeleteInnovationHubInput;
  DeleteInnovationPackInput: DeleteInnovationPackInput;
  DeleteInvitationExternalInput: DeleteInvitationExternalInput;
  DeleteInvitationInput: DeleteInvitationInput;
  DeleteLicensePlanInput: DeleteLicensePlanInput;
  DeleteLinkInput: DeleteLinkInput;
  DeleteOrganizationInput: DeleteOrganizationInput;
  DeletePostInput: DeletePostInput;
  DeletePostTemplateInput: DeletePostTemplateInput;
  DeleteReferenceInput: DeleteReferenceInput;
  DeleteRelationInput: DeleteRelationInput;
  DeleteSpaceInput: DeleteSpaceInput;
  DeleteStorageBuckeetInput: DeleteStorageBuckeetInput;
  DeleteUserGroupInput: DeleteUserGroupInput;
  DeleteUserInput: DeleteUserInput;
  DeleteVirtualContributorInput: DeleteVirtualContributorInput;
  DeleteVirtualPersonaInput: DeleteVirtualPersonaInput;
  DeleteWhiteboardInput: DeleteWhiteboardInput;
  DeleteWhiteboardTemplateInput: DeleteWhiteboardTemplateInput;
  DirectRoom: DirectRoom;
  Discussion: Discussion;
  DiscussionsInput: DiscussionsInput;
  Document: Document;
  EcosystemModel: EcosystemModel;
  Emoji: Scalars['Emoji'];
  FileStorageConfig: FileStorageConfig;
  Float: Scalars['Float'];
  Form: Form;
  FormQuestion: FormQuestion;
  Geo: Geo;
  GrantAuthorizationCredentialInput: GrantAuthorizationCredentialInput;
  GrantOrganizationAuthorizationCredentialInput: GrantOrganizationAuthorizationCredentialInput;
  Groupable:
    | ResolversParentTypes['Community']
    | ResolversParentTypes['Organization'];
  ISearchResults: ISearchResults;
  IngestBatchResult: IngestBatchResult;
  IngestResult: IngestResult;
  IngestSpaceInput: IngestSpaceInput;
  InnovationFlow: InnovationFlow;
  InnovationFlowState: InnovationFlowState;
  InnovationFlowTemplate: InnovationFlowTemplate;
  InnovationHub: InnovationHub;
  InnovationPack: InnovationPack;
  InnovationPacksInput: InnovationPacksInput;
  Int: Scalars['Int'];
  Invitation: Invitation;
  InvitationEventInput: InvitationEventInput;
  InvitationExternal: InvitationExternal;
  InvitationForRoleResult: InvitationForRoleResult;
  JSON: Scalars['JSON'];
  LatestReleaseDiscussion: LatestReleaseDiscussion;
  Library: Library;
  License: License;
  LicenseFeatureFlag: LicenseFeatureFlag;
  LicensePlan: LicensePlan;
  LicensePolicy: LicensePolicy;
  LicensePolicyRuleFeatureFlag: LicensePolicyRuleFeatureFlag;
  Licensing: Licensing;
  Lifecycle: Lifecycle;
  LifecycleDefinition: Scalars['LifecycleDefinition'];
  Link: Link;
  Location: Location;
  LookupQueryResults: LookupQueryResults;
  Markdown: Scalars['Markdown'];
  MeQueryResults: MeQueryResults;
  Message: Message;
  MessageID: Scalars['MessageID'];
  Metadata: Metadata;
  MoveCalloutContributionInput: MoveCalloutContributionInput;
  Mutation: {};
  MySpaceResults: MySpaceResults;
  NVP: Nvp;
  NameID: Scalars['NameID'];
  Organization: Organization;
  OrganizationAuthorizationResetInput: OrganizationAuthorizationResetInput;
  OrganizationFilterInput: OrganizationFilterInput;
  OrganizationVerification: OrganizationVerification;
  OrganizationVerificationEventInput: OrganizationVerificationEventInput;
  OryConfig: OryConfig;
  PageInfo: PageInfo;
  PaginatedOrganization: PaginatedOrganization;
  PaginatedSpaces: PaginatedSpaces;
  PaginatedUsers: PaginatedUsers;
  Platform: Platform;
  PlatformFeatureFlag: PlatformFeatureFlag;
  PlatformLocations: PlatformLocations;
  Post: Post;
  PostTemplate: PostTemplate;
  Preference: Preference;
  PreferenceDefinition: PreferenceDefinition;
  Profile: Profile;
  ProfileCredentialVerified: ProfileCredentialVerified;
  Query: {};
  Question: Question;
  Reaction: Reaction;
  Reference: Reference;
  Relation: Relation;
  RelayPaginatedSpace: RelayPaginatedSpace;
  RelayPaginatedSpaceEdge: RelayPaginatedSpaceEdge;
  RelayPaginatedSpacePageInfo: RelayPaginatedSpacePageInfo;
  RemoveCommunityRoleFromOrganizationInput: RemoveCommunityRoleFromOrganizationInput;
  RemoveCommunityRoleFromUserInput: RemoveCommunityRoleFromUserInput;
  RemoveCommunityRoleFromVirtualInput: RemoveCommunityRoleFromVirtualInput;
  RemoveOrganizationRoleFromUserInput: RemoveOrganizationRoleFromUserInput;
  RemovePlatformRoleFromUserInput: RemovePlatformRoleFromUserInput;
  RemoveUserGroupMemberInput: RemoveUserGroupMemberInput;
  RevokeAuthorizationCredentialInput: RevokeAuthorizationCredentialInput;
  RevokeLicensePlanFromAccount: RevokeLicensePlanFromAccount;
  RevokeOrganizationAuthorizationCredentialInput: RevokeOrganizationAuthorizationCredentialInput;
  RolesOrganizationInput: RolesOrganizationInput;
  RolesResult: RolesResult;
  RolesResultCommunity: RolesResultCommunity;
  RolesResultOrganization: RolesResultOrganization;
  RolesResultSpace: RolesResultSpace;
  RolesUserInput: RolesUserInput;
  Room: Room;
  RoomAddReactionToMessageInput: RoomAddReactionToMessageInput;
  RoomEventSubscriptionResult: RoomEventSubscriptionResult;
  RoomMessageEventSubscriptionResult: RoomMessageEventSubscriptionResult;
  RoomMessageReactionEventSubscriptionResult: RoomMessageReactionEventSubscriptionResult;
  RoomRemoveMessageInput: RoomRemoveMessageInput;
  RoomRemoveReactionToMessageInput: RoomRemoveReactionToMessageInput;
  RoomSendMessageInput: RoomSendMessageInput;
  RoomSendMessageReplyInput: RoomSendMessageReplyInput;
  SearchInput: SearchInput;
  SearchResult:
    | ResolversParentTypes['SearchResultCallout']
    | ResolversParentTypes['SearchResultOrganization']
    | ResolversParentTypes['SearchResultPost']
    | ResolversParentTypes['SearchResultSpace']
    | ResolversParentTypes['SearchResultUser']
    | ResolversParentTypes['SearchResultUserGroup'];
  SearchResultCallout: SearchResultCallout;
  SearchResultOrganization: SearchResultOrganization;
  SearchResultPost: SearchResultPost;
  SearchResultSpace: SearchResultSpace;
  SearchResultUser: SearchResultUser;
  SearchResultUserGroup: SearchResultUserGroup;
  Sentry: Sentry;
  ServiceMetadata: ServiceMetadata;
  Source: Source;
  Space: Space;
  SpaceDefaults: SpaceDefaults;
  SpaceFilterInput: SpaceFilterInput;
  SpaceSettings: SpaceSettings;
  SpaceSettingsCollaboration: SpaceSettingsCollaboration;
  SpaceSettingsMembership: SpaceSettingsMembership;
  SpaceSettingsPrivacy: SpaceSettingsPrivacy;
  StorageAggregator: StorageAggregator;
  StorageAggregatorParent: StorageAggregatorParent;
  StorageBucket: StorageBucket;
  StorageBucketParent: StorageBucketParent;
  StorageBucketUploadFileInput: StorageBucketUploadFileInput;
  StorageBucketUploadFileOnLinkInput: StorageBucketUploadFileOnLinkInput;
  StorageBucketUploadFileOnReferenceInput: StorageBucketUploadFileOnReferenceInput;
  StorageConfig: StorageConfig;
  String: Scalars['String'];
  Subscription: {};
  SubspaceCreated: SubspaceCreated;
  Tagset: Tagset;
  TagsetArgs: TagsetArgs;
  TagsetTemplate: TagsetTemplate;
  Task: Task;
  TemplatesSet: TemplatesSet;
  Timeline: Timeline;
  UUID: Scalars['UUID'];
  UUID_NAMEID: Scalars['UUID_NAMEID'];
  UUID_NAMEID_EMAIL: Scalars['UUID_NAMEID_EMAIL'];
  UpdateAccountPlatformSettingsInput: UpdateAccountPlatformSettingsInput;
  UpdateActorInput: UpdateActorInput;
  UpdateCalendarEventInput: UpdateCalendarEventInput;
  UpdateCalloutContributionDefaultsInput: UpdateCalloutContributionDefaultsInput;
  UpdateCalloutContributionPolicyInput: UpdateCalloutContributionPolicyInput;
  UpdateCalloutFramingInput: UpdateCalloutFramingInput;
  UpdateCalloutInput: UpdateCalloutInput;
  UpdateCalloutPublishInfoInput: UpdateCalloutPublishInfoInput;
  UpdateCalloutTemplateInput: UpdateCalloutTemplateInput;
  UpdateCalloutVisibilityInput: UpdateCalloutVisibilityInput;
  UpdateCollaborationCalloutsSortOrderInput: UpdateCollaborationCalloutsSortOrderInput;
  UpdateCommunityApplicationFormInput: UpdateCommunityApplicationFormInput;
  UpdateCommunityGuidelinesInput: UpdateCommunityGuidelinesInput;
  UpdateCommunityGuidelinesOfTemplateInput: UpdateCommunityGuidelinesOfTemplateInput;
  UpdateCommunityGuidelinesTemplateInput: UpdateCommunityGuidelinesTemplateInput;
  UpdateContextInput: UpdateContextInput;
  UpdateDiscussionInput: UpdateDiscussionInput;
  UpdateDocumentInput: UpdateDocumentInput;
  UpdateEcosystemModelInput: UpdateEcosystemModelInput;
  UpdateFeatureFlagInput: UpdateFeatureFlagInput;
  UpdateFormInput: UpdateFormInput;
  UpdateFormQuestionInput: UpdateFormQuestionInput;
  UpdateInnovationFlowFromTemplateInput: UpdateInnovationFlowFromTemplateInput;
  UpdateInnovationFlowInput: UpdateInnovationFlowInput;
  UpdateInnovationFlowSelectedStateInput: UpdateInnovationFlowSelectedStateInput;
  UpdateInnovationFlowSingleStateInput: UpdateInnovationFlowSingleStateInput;
  UpdateInnovationFlowStateInput: UpdateInnovationFlowStateInput;
  UpdateInnovationFlowTemplateInput: UpdateInnovationFlowTemplateInput;
  UpdateInnovationHubInput: UpdateInnovationHubInput;
  UpdateInnovationHubPlatformSettingsInput: UpdateInnovationHubPlatformSettingsInput;
  UpdateInnovationPackInput: UpdateInnovationPackInput;
  UpdateLicenseInput: UpdateLicenseInput;
  UpdateLicensePlanInput: UpdateLicensePlanInput;
  UpdateLinkInput: UpdateLinkInput;
  UpdateLocationInput: UpdateLocationInput;
  UpdateOrganizationInput: UpdateOrganizationInput;
  UpdateOrganizationPreferenceInput: UpdateOrganizationPreferenceInput;
  UpdatePostInput: UpdatePostInput;
  UpdatePostTemplateInput: UpdatePostTemplateInput;
  UpdateProfileDirectInput: UpdateProfileDirectInput;
  UpdateProfileInput: UpdateProfileInput;
  UpdateReferenceInput: UpdateReferenceInput;
  UpdateSpaceDefaultsInput: UpdateSpaceDefaultsInput;
  UpdateSpaceInput: UpdateSpaceInput;
  UpdateSpacePlatformSettingsInput: UpdateSpacePlatformSettingsInput;
  UpdateSpaceSettingsCollaborationInput: UpdateSpaceSettingsCollaborationInput;
  UpdateSpaceSettingsEntityInput: UpdateSpaceSettingsEntityInput;
  UpdateSpaceSettingsInput: UpdateSpaceSettingsInput;
  UpdateSpaceSettingsMembershipInput: UpdateSpaceSettingsMembershipInput;
  UpdateSpaceSettingsPrivacyInput: UpdateSpaceSettingsPrivacyInput;
  UpdateTagsetInput: UpdateTagsetInput;
  UpdateUserGroupInput: UpdateUserGroupInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUserPlatformSettingsInput: UpdateUserPlatformSettingsInput;
  UpdateUserPreferenceInput: UpdateUserPreferenceInput;
  UpdateVirtualContributorInput: UpdateVirtualContributorInput;
  UpdateVirtualContributorPlatformSettingsInput: UpdateVirtualContributorPlatformSettingsInput;
  UpdateVirtualPersonaInput: UpdateVirtualPersonaInput;
  UpdateVisualInput: UpdateVisualInput;
  UpdateWhiteboardContentInput: UpdateWhiteboardContentInput;
  UpdateWhiteboardInput: UpdateWhiteboardInput;
  UpdateWhiteboardTemplateInput: UpdateWhiteboardTemplateInput;
  Upload: Scalars['Upload'];
  User: User;
  UserAuthorizationPrivilegesInput: UserAuthorizationPrivilegesInput;
  UserAuthorizationResetInput: UserAuthorizationResetInput;
  UserFilterInput: UserFilterInput;
  UserGroup: UserGroup;
  UserSendMessageInput: UserSendMessageInput;
  UsersWithAuthorizationCredentialInput: UsersWithAuthorizationCredentialInput;
  VerifiedCredential: VerifiedCredential;
  VerifiedCredentialClaim: VerifiedCredentialClaim;
  VirtualContributor: VirtualContributor;
  VirtualPersona: VirtualPersona;
  VirtualPersonaQuestionInput: VirtualPersonaQuestionInput;
  VirtualPersonaResult: VirtualPersonaResult;
  Visual: Visual;
  VisualUploadImageInput: VisualUploadImageInput;
  Whiteboard: Whiteboard;
  WhiteboardContent: Scalars['WhiteboardContent'];
  WhiteboardTemplate: WhiteboardTemplate;
};

export type ApmResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['APM'] = ResolversParentTypes['APM']
> = {
  endpoint?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rumEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccountResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']
> = {
  activeSubscription?: Resolver<
    Maybe<ResolversTypes['AccountSubscription']>,
    ParentType,
    ContextType
  >;
  agent?: Resolver<ResolversTypes['Agent'], ParentType, ContextType>;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  defaults?: Resolver<
    Maybe<ResolversTypes['SpaceDefaults']>,
    ParentType,
    ContextType
  >;
  host?: Resolver<
    Maybe<ResolversTypes['Contributor']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  library?: Resolver<
    Maybe<ResolversTypes['TemplatesSet']>,
    ParentType,
    ContextType
  >;
  license?: Resolver<ResolversTypes['License'], ParentType, ContextType>;
  spaceID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subscriptions?: Resolver<
    Array<ResolversTypes['AccountSubscription']>,
    ParentType,
    ContextType
  >;
  virtualContributors?: Resolver<
    Array<ResolversTypes['VirtualContributor']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccountSubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AccountSubscription'] = ResolversParentTypes['AccountSubscription']
> = {
  expires?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['LicenseCredential'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityCreatedSubscriptionResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityCreatedSubscriptionResult'] = ResolversParentTypes['ActivityCreatedSubscriptionResult']
> = {
  activity?: Resolver<
    ResolversTypes['ActivityLogEntry'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityFeedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityFeed'] = ResolversParentTypes['ActivityFeed']
> = {
  activityFeed?: Resolver<
    Array<ResolversTypes['ActivityLogEntry']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogEntryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntry'] = ResolversParentTypes['ActivityLogEntry']
> = {
  __resolveType: TypeResolveFn<
    | 'ActivityLogEntryCalendarEventCreated'
    | 'ActivityLogEntryCalloutDiscussionComment'
    | 'ActivityLogEntryCalloutLinkCreated'
    | 'ActivityLogEntryCalloutPostComment'
    | 'ActivityLogEntryCalloutPostCreated'
    | 'ActivityLogEntryCalloutPublished'
    | 'ActivityLogEntryCalloutWhiteboardContentModified'
    | 'ActivityLogEntryCalloutWhiteboardCreated'
    | 'ActivityLogEntryChallengeCreated'
    | 'ActivityLogEntryMemberJoined'
    | 'ActivityLogEntryOpportunityCreated'
    | 'ActivityLogEntryUpdateSent',
    ParentType,
    ContextType
  >;
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  parentNameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  space?: Resolver<Maybe<ResolversTypes['Space']>, ParentType, ContextType>;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
};

export type ActivityLogEntryCalendarEventCreatedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntryCalendarEventCreated'] = ResolversParentTypes['ActivityLogEntryCalendarEventCreated']
> = {
  calendar?: Resolver<ResolversTypes['Calendar'], ParentType, ContextType>;
  calendarEvent?: Resolver<
    ResolversTypes['CalendarEvent'],
    ParentType,
    ContextType
  >;
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  parentNameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  space?: Resolver<Maybe<ResolversTypes['Space']>, ParentType, ContextType>;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogEntryCalloutDiscussionCommentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntryCalloutDiscussionComment'] = ResolversParentTypes['ActivityLogEntryCalloutDiscussionComment']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  parentNameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  space?: Resolver<Maybe<ResolversTypes['Space']>, ParentType, ContextType>;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogEntryCalloutLinkCreatedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntryCalloutLinkCreated'] = ResolversParentTypes['ActivityLogEntryCalloutLinkCreated']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  link?: Resolver<ResolversTypes['Link'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  parentNameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  space?: Resolver<Maybe<ResolversTypes['Space']>, ParentType, ContextType>;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogEntryCalloutPostCommentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntryCalloutPostComment'] = ResolversParentTypes['ActivityLogEntryCalloutPostComment']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  parentNameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  space?: Resolver<Maybe<ResolversTypes['Space']>, ParentType, ContextType>;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogEntryCalloutPostCreatedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntryCalloutPostCreated'] = ResolversParentTypes['ActivityLogEntryCalloutPostCreated']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  parentNameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  space?: Resolver<Maybe<ResolversTypes['Space']>, ParentType, ContextType>;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogEntryCalloutPublishedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntryCalloutPublished'] = ResolversParentTypes['ActivityLogEntryCalloutPublished']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  parentNameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  space?: Resolver<Maybe<ResolversTypes['Space']>, ParentType, ContextType>;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogEntryCalloutWhiteboardContentModifiedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntryCalloutWhiteboardContentModified'] = ResolversParentTypes['ActivityLogEntryCalloutWhiteboardContentModified']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  parentNameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  space?: Resolver<Maybe<ResolversTypes['Space']>, ParentType, ContextType>;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
  whiteboard?: Resolver<ResolversTypes['Whiteboard'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogEntryCalloutWhiteboardCreatedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntryCalloutWhiteboardCreated'] = ResolversParentTypes['ActivityLogEntryCalloutWhiteboardCreated']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  parentNameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  space?: Resolver<Maybe<ResolversTypes['Space']>, ParentType, ContextType>;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
  whiteboard?: Resolver<ResolversTypes['Whiteboard'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogEntryChallengeCreatedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntryChallengeCreated'] = ResolversParentTypes['ActivityLogEntryChallengeCreated']
> = {
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  parentNameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  space?: Resolver<Maybe<ResolversTypes['Space']>, ParentType, ContextType>;
  subspace?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogEntryMemberJoinedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntryMemberJoined'] = ResolversParentTypes['ActivityLogEntryMemberJoined']
> = {
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  community?: Resolver<ResolversTypes['Community'], ParentType, ContextType>;
  communityType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  parentNameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  space?: Resolver<Maybe<ResolversTypes['Space']>, ParentType, ContextType>;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogEntryOpportunityCreatedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntryOpportunityCreated'] = ResolversParentTypes['ActivityLogEntryOpportunityCreated']
> = {
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  parentNameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  space?: Resolver<Maybe<ResolversTypes['Space']>, ParentType, ContextType>;
  subsubspace?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityLogEntryUpdateSentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActivityLogEntryUpdateSent'] = ResolversParentTypes['ActivityLogEntryUpdateSent']
> = {
  child?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  collaborationID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  journeyUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parentDisplayName?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  parentNameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  space?: Resolver<Maybe<ResolversTypes['Space']>, ParentType, ContextType>;
  triggeredBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ActivityEventType'], ParentType, ContextType>;
  updates?: Resolver<ResolversTypes['Room'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Actor'] = ResolversParentTypes['Actor']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  impact?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActorGroupResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActorGroup'] = ResolversParentTypes['ActorGroup']
> = {
  actors?: Resolver<
    Maybe<Array<ResolversTypes['Actor']>>,
    ParentType,
    ContextType
  >;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AgentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Agent'] = ResolversParentTypes['Agent']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  credentials?: Resolver<
    Maybe<Array<ResolversTypes['Credential']>>,
    ParentType,
    ContextType
  >;
  did?: Resolver<Maybe<ResolversTypes['DID']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  verifiedCredentials?: Resolver<
    Maybe<Array<ResolversTypes['VerifiedCredential']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AgentBeginVerifiedCredentialOfferOutputResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AgentBeginVerifiedCredentialOfferOutput'] = ResolversParentTypes['AgentBeginVerifiedCredentialOfferOutput']
> = {
  jwt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  qrCodeImg?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AgentBeginVerifiedCredentialRequestOutputResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AgentBeginVerifiedCredentialRequestOutput'] = ResolversParentTypes['AgentBeginVerifiedCredentialRequestOutput']
> = {
  jwt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  qrCodeImg?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnyInvitationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AnyInvitation'] = ResolversParentTypes['AnyInvitation']
> = {
  __resolveType: TypeResolveFn<
    'Invitation' | 'InvitationExternal',
    ParentType,
    ContextType
  >;
};

export type ApplicationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Application'] = ResolversParentTypes['Application']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  lifecycle?: Resolver<ResolversTypes['Lifecycle'], ParentType, ContextType>;
  questions?: Resolver<
    Array<ResolversTypes['Question']>,
    ParentType,
    ContextType
  >;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ApplicationForRoleResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ApplicationForRoleResult'] = ResolversParentTypes['ApplicationForRoleResult']
> = {
  communityID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  spaceID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  spaceLevel?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthenticationConfigResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthenticationConfig'] = ResolversParentTypes['AuthenticationConfig']
> = {
  providers?: Resolver<
    Array<ResolversTypes['AuthenticationProviderConfig']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthenticationProviderConfigResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthenticationProviderConfig'] = ResolversParentTypes['AuthenticationProviderConfig']
> = {
  config?: Resolver<
    ResolversTypes['AuthenticationProviderConfigUnion'],
    ParentType,
    ContextType
  >;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthenticationProviderConfigUnionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthenticationProviderConfigUnion'] = ResolversParentTypes['AuthenticationProviderConfigUnion']
> = {
  __resolveType: TypeResolveFn<'OryConfig', ParentType, ContextType>;
};

export type AuthorizationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Authorization'] = ResolversParentTypes['Authorization']
> = {
  anonymousReadAccess?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  credentialRules?: Resolver<
    Maybe<Array<ResolversTypes['AuthorizationPolicyRuleCredential']>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  myPrivileges?: Resolver<
    Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType
  >;
  privilegeRules?: Resolver<
    Maybe<Array<ResolversTypes['AuthorizationPolicyRulePrivilege']>>,
    ParentType,
    ContextType
  >;
  verifiedCredentialRules?: Resolver<
    Maybe<Array<ResolversTypes['AuthorizationPolicyRuleVerifiedCredential']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthorizationPolicyRuleCredentialResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthorizationPolicyRuleCredential'] = ResolversParentTypes['AuthorizationPolicyRuleCredential']
> = {
  cascade?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  criterias?: Resolver<
    Array<ResolversTypes['CredentialDefinition']>,
    ParentType,
    ContextType
  >;
  grantedPrivileges?: Resolver<
    Array<ResolversTypes['AuthorizationPrivilege']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthorizationPolicyRulePrivilegeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthorizationPolicyRulePrivilege'] = ResolversParentTypes['AuthorizationPolicyRulePrivilege']
> = {
  grantedPrivileges?: Resolver<
    Array<ResolversTypes['AuthorizationPrivilege']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourcePrivilege?: Resolver<
    ResolversTypes['AuthorizationPrivilege'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthorizationPolicyRuleVerifiedCredentialResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthorizationPolicyRuleVerifiedCredential'] = ResolversParentTypes['AuthorizationPolicyRuleVerifiedCredential']
> = {
  claimRule?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  credentialName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  grantedPrivileges?: Resolver<
    Array<ResolversTypes['AuthorizationPrivilege']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface CidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['CID'], any> {
  name: 'CID';
}

export type CalendarResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Calendar'] = ResolversParentTypes['Calendar']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  event?: Resolver<
    Maybe<ResolversTypes['CalendarEvent']>,
    ParentType,
    ContextType,
    RequireFields<CalendarEventArgs, 'ID'>
  >;
  events?: Resolver<
    Maybe<Array<ResolversTypes['CalendarEvent']>>,
    ParentType,
    ContextType,
    Partial<CalendarEventsArgs>
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalendarEventResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CalendarEvent'] = ResolversParentTypes['CalendarEvent']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  comments?: Resolver<ResolversTypes['Room'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  durationDays?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  durationMinutes?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  multipleDays?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  startDate?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['CalendarEventType'], ParentType, ContextType>;
  wholeDay?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Callout'] = ResolversParentTypes['Callout']
> = {
  activity?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  comments?: Resolver<Maybe<ResolversTypes['Room']>, ParentType, ContextType>;
  contributionDefaults?: Resolver<
    ResolversTypes['CalloutContributionDefaults'],
    ParentType,
    ContextType
  >;
  contributionPolicy?: Resolver<
    ResolversTypes['CalloutContributionPolicy'],
    ParentType,
    ContextType
  >;
  contributions?: Resolver<
    Array<ResolversTypes['CalloutContribution']>,
    ParentType,
    ContextType,
    Partial<CalloutContributionsArgs>
  >;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  framing?: Resolver<ResolversTypes['CalloutFraming'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  posts?: Resolver<
    Maybe<Array<ResolversTypes['Post']>>,
    ParentType,
    ContextType
  >;
  publishedBy?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType
  >;
  publishedDate?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  sortOrder?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['CalloutType'], ParentType, ContextType>;
  visibility?: Resolver<
    ResolversTypes['CalloutVisibility'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutContributionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CalloutContribution'] = ResolversParentTypes['CalloutContribution']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['Link']>, ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  whiteboard?: Resolver<
    Maybe<ResolversTypes['Whiteboard']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutContributionDefaultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CalloutContributionDefaults'] = ResolversParentTypes['CalloutContributionDefaults']
> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  postDescription?: Resolver<
    Maybe<ResolversTypes['Markdown']>,
    ParentType,
    ContextType
  >;
  whiteboardContent?: Resolver<
    Maybe<ResolversTypes['WhiteboardContent']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutContributionPolicyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CalloutContributionPolicy'] = ResolversParentTypes['CalloutContributionPolicy']
> = {
  allowedContributionTypes?: Resolver<
    Array<ResolversTypes['CalloutContributionType']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['CalloutState'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutFramingResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CalloutFraming'] = ResolversParentTypes['CalloutFraming']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  whiteboard?: Resolver<
    Maybe<ResolversTypes['Whiteboard']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutGroupResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CalloutGroup'] = ResolversParentTypes['CalloutGroup']
> = {
  description?: Resolver<ResolversTypes['Markdown'], ParentType, ContextType>;
  displayName?: Resolver<
    ResolversTypes['CalloutGroupName'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutPostCreatedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CalloutPostCreated'] = ResolversParentTypes['CalloutPostCreated']
> = {
  calloutID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CalloutTemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CalloutTemplate'] = ResolversParentTypes['CalloutTemplate']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  contributionDefaults?: Resolver<
    ResolversTypes['CalloutContributionDefaults'],
    ParentType,
    ContextType
  >;
  contributionPolicy?: Resolver<
    ResolversTypes['CalloutContributionPolicy'],
    ParentType,
    ContextType
  >;
  framing?: Resolver<ResolversTypes['CalloutFraming'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['CalloutType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatGuidanceResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ChatGuidanceResult'] = ResolversParentTypes['ChatGuidanceResult']
> = {
  answer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  question?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sources?: Resolver<
    Maybe<Array<ResolversTypes['Source']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollaborationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Collaboration'] = ResolversParentTypes['Collaboration']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  callouts?: Resolver<
    Array<ResolversTypes['Callout']>,
    ParentType,
    ContextType,
    Partial<CollaborationCalloutsArgs>
  >;
  groups?: Resolver<
    Array<ResolversTypes['CalloutGroup']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  innovationFlow?: Resolver<
    ResolversTypes['InnovationFlow'],
    ParentType,
    ContextType
  >;
  relations?: Resolver<
    Maybe<Array<ResolversTypes['Relation']>>,
    ParentType,
    ContextType
  >;
  tagsetTemplates?: Resolver<
    Maybe<Array<ResolversTypes['TagsetTemplate']>>,
    ParentType,
    ContextType
  >;
  timeline?: Resolver<ResolversTypes['Timeline'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunicationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Communication'] = ResolversParentTypes['Communication']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  discussion?: Resolver<
    Maybe<ResolversTypes['Discussion']>,
    ParentType,
    ContextType,
    RequireFields<CommunicationDiscussionArgs, 'ID'>
  >;
  discussionCategories?: Resolver<
    Array<ResolversTypes['DiscussionCategory']>,
    ParentType,
    ContextType
  >;
  discussions?: Resolver<
    Maybe<Array<ResolversTypes['Discussion']>>,
    ParentType,
    ContextType,
    Partial<CommunicationDiscussionsArgs>
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  updates?: Resolver<ResolversTypes['Room'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunicationAdminMembershipResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunicationAdminMembershipResult'] = ResolversParentTypes['CommunicationAdminMembershipResult']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rooms?: Resolver<
    Array<ResolversTypes['CommunicationAdminRoomMembershipResult']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunicationAdminOrphanedUsageResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunicationAdminOrphanedUsageResult'] = ResolversParentTypes['CommunicationAdminOrphanedUsageResult']
> = {
  rooms?: Resolver<
    Array<ResolversTypes['CommunicationAdminRoomResult']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunicationAdminRoomMembershipResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunicationAdminRoomMembershipResult'] = ResolversParentTypes['CommunicationAdminRoomMembershipResult']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  extraMembers?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  joinRule?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  missingMembers?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  roomID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunicationAdminRoomResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunicationAdminRoomResult'] = ResolversParentTypes['CommunicationAdminRoomResult']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunicationRoomResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunicationRoom'] = ResolversParentTypes['CommunicationRoom']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  messages?: Resolver<
    Array<ResolversTypes['Message']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunityResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Community'] = ResolversParentTypes['Community']
> = {
  applicationForm?: Resolver<ResolversTypes['Form'], ParentType, ContextType>;
  applications?: Resolver<
    Array<ResolversTypes['Application']>,
    ParentType,
    ContextType
  >;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  availableLeadUsers?: Resolver<
    ResolversTypes['PaginatedUsers'],
    ParentType,
    ContextType,
    Partial<CommunityAvailableLeadUsersArgs>
  >;
  availableMemberUsers?: Resolver<
    ResolversTypes['PaginatedUsers'],
    ParentType,
    ContextType,
    Partial<CommunityAvailableMemberUsersArgs>
  >;
  communication?: Resolver<
    ResolversTypes['Communication'],
    ParentType,
    ContextType
  >;
  group?: Resolver<
    ResolversTypes['UserGroup'],
    ParentType,
    ContextType,
    RequireFields<CommunityGroupArgs, 'ID'>
  >;
  groups?: Resolver<
    Array<ResolversTypes['UserGroup']>,
    ParentType,
    ContextType
  >;
  guidelines?: Resolver<
    ResolversTypes['CommunityGuidelines'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  invitations?: Resolver<
    Array<ResolversTypes['Invitation']>,
    ParentType,
    ContextType
  >;
  invitationsExternal?: Resolver<
    Array<ResolversTypes['InvitationExternal']>,
    ParentType,
    ContextType
  >;
  memberUsers?: Resolver<
    Array<ResolversTypes['User']>,
    ParentType,
    ContextType,
    Partial<CommunityMemberUsersArgs>
  >;
  myMembershipStatus?: Resolver<
    Maybe<ResolversTypes['CommunityMembershipStatus']>,
    ParentType,
    ContextType
  >;
  myRoles?: Resolver<
    Array<ResolversTypes['CommunityRole']>,
    ParentType,
    ContextType
  >;
  myRolesImplicit?: Resolver<
    Array<ResolversTypes['CommunityRoleImplicit']>,
    ParentType,
    ContextType
  >;
  organizationsInRole?: Resolver<
    Array<ResolversTypes['Organization']>,
    ParentType,
    ContextType,
    RequireFields<CommunityOrganizationsInRoleArgs, 'role'>
  >;
  policy?: Resolver<ResolversTypes['CommunityPolicy'], ParentType, ContextType>;
  usersInRole?: Resolver<
    Array<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<CommunityUsersInRoleArgs, 'role'>
  >;
  virtualContributorsInRole?: Resolver<
    Array<ResolversTypes['VirtualContributor']>,
    ParentType,
    ContextType,
    RequireFields<CommunityVirtualContributorsInRoleArgs, 'role'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunityGuidelinesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunityGuidelines'] = ResolversParentTypes['CommunityGuidelines']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunityGuidelinesTemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunityGuidelinesTemplate'] = ResolversParentTypes['CommunityGuidelinesTemplate']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  guidelines?: Resolver<
    ResolversTypes['CommunityGuidelines'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunityPolicyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunityPolicy'] = ResolversParentTypes['CommunityPolicy']
> = {
  admin?: Resolver<
    ResolversTypes['CommunityRolePolicy'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  lead?: Resolver<
    ResolversTypes['CommunityRolePolicy'],
    ParentType,
    ContextType
  >;
  member?: Resolver<
    ResolversTypes['CommunityRolePolicy'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunityRolePolicyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommunityRolePolicy'] = ResolversParentTypes['CommunityRolePolicy']
> = {
  credential?: Resolver<
    ResolversTypes['CredentialDefinition'],
    ParentType,
    ContextType
  >;
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  maxOrg?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  maxUser?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  minOrg?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  minUser?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  parentCredentials?: Resolver<
    Array<ResolversTypes['CredentialDefinition']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConfigResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Config'] = ResolversParentTypes['Config']
> = {
  apm?: Resolver<ResolversTypes['APM'], ParentType, ContextType>;
  authentication?: Resolver<
    ResolversTypes['AuthenticationConfig'],
    ParentType,
    ContextType
  >;
  featureFlags?: Resolver<
    Array<ResolversTypes['PlatformFeatureFlag']>,
    ParentType,
    ContextType
  >;
  geo?: Resolver<ResolversTypes['Geo'], ParentType, ContextType>;
  locations?: Resolver<
    ResolversTypes['PlatformLocations'],
    ParentType,
    ContextType
  >;
  sentry?: Resolver<ResolversTypes['Sentry'], ParentType, ContextType>;
  storage?: Resolver<ResolversTypes['StorageConfig'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContextResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Context'] = ResolversParentTypes['Context']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  impact?: Resolver<Maybe<ResolversTypes['Markdown']>, ParentType, ContextType>;
  vision?: Resolver<Maybe<ResolversTypes['Markdown']>, ParentType, ContextType>;
  who?: Resolver<Maybe<ResolversTypes['Markdown']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContributorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Contributor'] = ResolversParentTypes['Contributor']
> = {
  __resolveType: TypeResolveFn<
    'Organization' | 'User' | 'VirtualContributor',
    ParentType,
    ContextType
  >;
  agent?: Resolver<ResolversTypes['Agent'], ParentType, ContextType>;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
};

export type ContributorRolesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ContributorRoles'] = ResolversParentTypes['ContributorRoles']
> = {
  applications?: Resolver<
    Array<ResolversTypes['ApplicationForRoleResult']>,
    ParentType,
    ContextType,
    Partial<ContributorRolesApplicationsArgs>
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  invitations?: Resolver<
    Array<ResolversTypes['InvitationForRoleResult']>,
    ParentType,
    ContextType,
    Partial<ContributorRolesInvitationsArgs>
  >;
  organizations?: Resolver<
    Array<ResolversTypes['RolesResultOrganization']>,
    ParentType,
    ContextType
  >;
  spaces?: Resolver<
    Array<ResolversTypes['RolesResultSpace']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CredentialResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Credential'] = ResolversParentTypes['Credential']
> = {
  expires?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  issuer?: Resolver<Maybe<ResolversTypes['UUID']>, ParentType, ContextType>;
  resourceID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['CredentialType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CredentialDefinitionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CredentialDefinition'] = ResolversParentTypes['CredentialDefinition']
> = {
  resourceID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CredentialMetadataOutputResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CredentialMetadataOutput'] = ResolversParentTypes['CredentialMetadataOutput']
> = {
  context?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  schema?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  types?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  uniqueType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DID'], any> {
  name: 'DID';
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DirectRoomResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['DirectRoom'] = ResolversParentTypes['DirectRoom']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  messages?: Resolver<
    Array<ResolversTypes['Message']>,
    ParentType,
    ContextType
  >;
  receiverID?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscussionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Discussion'] = ResolversParentTypes['Discussion']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  category?: Resolver<
    ResolversTypes['DiscussionCategory'],
    ParentType,
    ContextType
  >;
  comments?: Resolver<ResolversTypes['Room'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['UUID']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DocumentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Document'] = ResolversParentTypes['Document']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  mimeType?: Resolver<ResolversTypes['MimeType'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  tagset?: Resolver<ResolversTypes['Tagset'], ParentType, ContextType>;
  uploadedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EcosystemModelResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EcosystemModel'] = ResolversParentTypes['EcosystemModel']
> = {
  actorGroups?: Resolver<
    Maybe<Array<ResolversTypes['ActorGroup']>>,
    ParentType,
    ContextType
  >;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface EmojiScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Emoji'], any> {
  name: 'Emoji';
}

export type FileStorageConfigResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FileStorageConfig'] = ResolversParentTypes['FileStorageConfig']
> = {
  maxFileSize?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  mimeTypes?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FormResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Form'] = ResolversParentTypes['Form']
> = {
  description?: Resolver<
    Maybe<ResolversTypes['Markdown']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  questions?: Resolver<
    Array<ResolversTypes['FormQuestion']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FormQuestionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FormQuestion'] = ResolversParentTypes['FormQuestion']
> = {
  explanation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  maxLength?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  question?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  required?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  sortOrder?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GeoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Geo'] = ResolversParentTypes['Geo']
> = {
  endpoint?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupableResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Groupable'] = ResolversParentTypes['Groupable']
> = {
  __resolveType: TypeResolveFn<
    'Community' | 'Organization',
    ParentType,
    ContextType
  >;
  groups?: Resolver<
    Maybe<Array<ResolversTypes['UserGroup']>>,
    ParentType,
    ContextType
  >;
};

export type ISearchResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ISearchResults'] = ResolversParentTypes['ISearchResults']
> = {
  calloutResults?: Resolver<
    Array<ResolversTypes['SearchResult']>,
    ParentType,
    ContextType
  >;
  calloutResultsCount?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  contributionResults?: Resolver<
    Array<ResolversTypes['SearchResult']>,
    ParentType,
    ContextType
  >;
  contributionResultsCount?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  contributorResults?: Resolver<
    Array<ResolversTypes['SearchResult']>,
    ParentType,
    ContextType
  >;
  contributorResultsCount?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  groupResults?: Resolver<
    Array<ResolversTypes['SearchResult']>,
    ParentType,
    ContextType
  >;
  journeyResults?: Resolver<
    Array<ResolversTypes['SearchResult']>,
    ParentType,
    ContextType
  >;
  journeyResultsCount?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IngestBatchResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['IngestBatchResult'] = ResolversParentTypes['IngestBatchResult']
> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IngestResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['IngestResult'] = ResolversParentTypes['IngestResult']
> = {
  batches?: Resolver<
    Array<ResolversTypes['IngestBatchResult']>,
    ParentType,
    ContextType
  >;
  index?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InnovationFlowResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InnovationFlow'] = ResolversParentTypes['InnovationFlow']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  currentState?: Resolver<
    ResolversTypes['InnovationFlowState'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  states?: Resolver<
    Array<ResolversTypes['InnovationFlowState']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InnovationFlowStateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InnovationFlowState'] = ResolversParentTypes['InnovationFlowState']
> = {
  description?: Resolver<ResolversTypes['Markdown'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InnovationFlowTemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InnovationFlowTemplate'] = ResolversParentTypes['InnovationFlowTemplate']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  states?: Resolver<
    Array<ResolversTypes['InnovationFlowState']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InnovationHubResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InnovationHub'] = ResolversParentTypes['InnovationHub']
> = {
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  spaceListFilter?: Resolver<
    Maybe<Array<ResolversTypes['Space']>>,
    ParentType,
    ContextType
  >;
  spaceVisibilityFilter?: Resolver<
    Maybe<ResolversTypes['SpaceVisibility']>,
    ParentType,
    ContextType
  >;
  subdomain?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['InnovationHubType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InnovationPackResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InnovationPack'] = ResolversParentTypes['InnovationPack']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  provider?: Resolver<
    Maybe<ResolversTypes['Organization']>,
    ParentType,
    ContextType
  >;
  templates?: Resolver<
    Maybe<ResolversTypes['TemplatesSet']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InvitationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Invitation'] = ResolversParentTypes['Invitation']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  invitedToParent?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  lifecycle?: Resolver<ResolversTypes['Lifecycle'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  welcomeMessage?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InvitationExternalResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InvitationExternal'] = ResolversParentTypes['InvitationExternal']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  invitedToParent?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profileCreated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  welcomeMessage?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InvitationForRoleResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InvitationForRoleResult'] = ResolversParentTypes['InvitationForRoleResult']
> = {
  communityID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  spaceID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  spaceLevel?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  welcomeMessage?: Resolver<
    Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LatestReleaseDiscussionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LatestReleaseDiscussion'] = ResolversParentTypes['LatestReleaseDiscussion']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LibraryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Library'] = ResolversParentTypes['Library']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  innovationPack?: Resolver<
    Maybe<ResolversTypes['InnovationPack']>,
    ParentType,
    ContextType,
    RequireFields<LibraryInnovationPackArgs, 'ID'>
  >;
  innovationPacks?: Resolver<
    Array<ResolversTypes['InnovationPack']>,
    ParentType,
    ContextType,
    Partial<LibraryInnovationPacksArgs>
  >;
  storageAggregator?: Resolver<
    Maybe<ResolversTypes['StorageAggregator']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LicenseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['License'] = ResolversParentTypes['License']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  featureFlags?: Resolver<
    Array<ResolversTypes['LicenseFeatureFlag']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  privileges?: Resolver<
    Maybe<Array<ResolversTypes['LicensePrivilege']>>,
    ParentType,
    ContextType
  >;
  visibility?: Resolver<
    ResolversTypes['SpaceVisibility'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LicenseFeatureFlagResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LicenseFeatureFlag'] = ResolversParentTypes['LicenseFeatureFlag']
> = {
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<
    ResolversTypes['LicenseFeatureFlagName'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LicensePlanResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LicensePlan'] = ResolversParentTypes['LicensePlan']
> = {
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  isFree?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  licenseCredential?: Resolver<
    ResolversTypes['LicenseCredential'],
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pricePerMonth?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  requiresContactSupport?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  requiresPaymentMethod?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  sortOrder?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  trialEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LicensePolicyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LicensePolicy'] = ResolversParentTypes['LicensePolicy']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  featureFlagRules?: Resolver<
    Maybe<Array<ResolversTypes['LicensePolicyRuleFeatureFlag']>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LicensePolicyRuleFeatureFlagResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LicensePolicyRuleFeatureFlag'] = ResolversParentTypes['LicensePolicyRuleFeatureFlag']
> = {
  featureFlagName?: Resolver<
    ResolversTypes['LicenseFeatureFlagName'],
    ParentType,
    ContextType
  >;
  grantedPrivileges?: Resolver<
    Array<ResolversTypes['LicensePrivilege']>,
    ParentType,
    ContextType
  >;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LicensingResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Licensing'] = ResolversParentTypes['Licensing']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  basePlan?: Resolver<ResolversTypes['LicensePlan'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  plans?: Resolver<
    Array<ResolversTypes['LicensePlan']>,
    ParentType,
    ContextType
  >;
  policy?: Resolver<ResolversTypes['LicensePolicy'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LifecycleResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Lifecycle'] = ResolversParentTypes['Lifecycle']
> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  machineDef?: Resolver<
    ResolversTypes['LifecycleDefinition'],
    ParentType,
    ContextType
  >;
  nextEvents?: Resolver<
    Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stateIsFinal?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  templateName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface LifecycleDefinitionScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['LifecycleDefinition'], any> {
  name: 'LifecycleDefinition';
}

export type LinkResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Link'] = ResolversParentTypes['Link']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']
> = {
  addressLine1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  addressLine2?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  postalCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stateOrProvince?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LookupQueryResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LookupQueryResults'] = ResolversParentTypes['LookupQueryResults']
> = {
  application?: Resolver<
    Maybe<ResolversTypes['Application']>,
    ParentType,
    ContextType,
    RequireFields<LookupQueryResultsApplicationArgs, 'ID'>
  >;
  authorizationPolicy?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType,
    RequireFields<LookupQueryResultsAuthorizationPolicyArgs, 'ID'>
  >;
  authorizationPrivilegesForUser?: Resolver<
    Maybe<Array<ResolversTypes['AuthorizationPrivilege']>>,
    ParentType,
    ContextType,
    RequireFields<
      LookupQueryResultsAuthorizationPrivilegesForUserArgs,
      'authorizationID' | 'userID'
    >
  >;
  calendar?: Resolver<
    Maybe<ResolversTypes['Calendar']>,
    ParentType,
    ContextType,
    RequireFields<LookupQueryResultsCalendarArgs, 'ID'>
  >;
  calendarEvent?: Resolver<
    Maybe<ResolversTypes['CalendarEvent']>,
    ParentType,
    ContextType,
    RequireFields<LookupQueryResultsCalendarEventArgs, 'ID'>
  >;
  callout?: Resolver<
    Maybe<ResolversTypes['Callout']>,
    ParentType,
    ContextType,
    RequireFields<LookupQueryResultsCalloutArgs, 'ID'>
  >;
  calloutTemplate?: Resolver<
    Maybe<ResolversTypes['CalloutTemplate']>,
    ParentType,
    ContextType,
    RequireFields<LookupQueryResultsCalloutTemplateArgs, 'ID'>
  >;
  collaboration?: Resolver<
    Maybe<ResolversTypes['Collaboration']>,
    ParentType,
    ContextType,
    RequireFields<LookupQueryResultsCollaborationArgs, 'ID'>
  >;
  community?: Resolver<
    Maybe<ResolversTypes['Community']>,
    ParentType,
    ContextType,
    RequireFields<LookupQueryResultsCommunityArgs, 'ID'>
  >;
  communityGuidelines?: Resolver<
    Maybe<ResolversTypes['CommunityGuidelines']>,
    ParentType,
    ContextType,
    RequireFields<LookupQueryResultsCommunityGuidelinesArgs, 'ID'>
  >;
  communityGuidelinesTemplate?: Resolver<
    Maybe<ResolversTypes['CommunityGuidelinesTemplate']>,
    ParentType,
    ContextType,
    RequireFields<LookupQueryResultsCommunityGuidelinesTemplateArgs, 'ID'>
  >;
  context?: Resolver<
    Maybe<ResolversTypes['Context']>,
    ParentType,
    ContextType,
    RequireFields<LookupQueryResultsContextArgs, 'ID'>
  >;
  document?: Resolver<
    Maybe<ResolversTypes['Document']>,
    ParentType,
    ContextType,
    RequireFields<LookupQueryResultsDocumentArgs, 'ID'>
  >;
  innovationFlow?: Resolver<
    Maybe<ResolversTypes['InnovationFlow']>,
    ParentType,
    ContextType,
    RequireFields<LookupQueryResultsInnovationFlowArgs, 'ID'>
  >;
  innovationFlowTemplate?: Resolver<
    Maybe<ResolversTypes['InnovationFlowTemplate']>,
    ParentType,
    ContextType,
    RequireFields<LookupQueryResultsInnovationFlowTemplateArgs, 'ID'>
  >;
  invitation?: Resolver<
    Maybe<ResolversTypes['Invitation']>,
    ParentType,
    ContextType,
    RequireFields<LookupQueryResultsInvitationArgs, 'ID'>
  >;
  post?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<LookupQueryResultsPostArgs, 'ID'>
  >;
  profile?: Resolver<
    Maybe<ResolversTypes['Profile']>,
    ParentType,
    ContextType,
    RequireFields<LookupQueryResultsProfileArgs, 'ID'>
  >;
  room?: Resolver<
    Maybe<ResolversTypes['Room']>,
    ParentType,
    ContextType,
    RequireFields<LookupQueryResultsRoomArgs, 'ID'>
  >;
  space?: Resolver<
    Maybe<ResolversTypes['Space']>,
    ParentType,
    ContextType,
    RequireFields<LookupQueryResultsSpaceArgs, 'ID'>
  >;
  storageAggregator?: Resolver<
    Maybe<ResolversTypes['StorageAggregator']>,
    ParentType,
    ContextType,
    RequireFields<LookupQueryResultsStorageAggregatorArgs, 'ID'>
  >;
  whiteboard?: Resolver<
    Maybe<ResolversTypes['Whiteboard']>,
    ParentType,
    ContextType,
    RequireFields<LookupQueryResultsWhiteboardArgs, 'ID'>
  >;
  whiteboardTemplate?: Resolver<
    Maybe<ResolversTypes['WhiteboardTemplate']>,
    ParentType,
    ContextType,
    RequireFields<LookupQueryResultsWhiteboardTemplateArgs, 'ID'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface MarkdownScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Markdown'], any> {
  name: 'Markdown';
}

export type MeQueryResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MeQueryResults'] = ResolversParentTypes['MeQueryResults']
> = {
  applications?: Resolver<
    Array<ResolversTypes['ApplicationForRoleResult']>,
    ParentType,
    ContextType,
    Partial<MeQueryResultsApplicationsArgs>
  >;
  canCreateFreeSpace?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  invitations?: Resolver<
    Array<ResolversTypes['InvitationForRoleResult']>,
    ParentType,
    ContextType,
    Partial<MeQueryResultsInvitationsArgs>
  >;
  mySpaces?: Resolver<
    Array<ResolversTypes['MySpaceResults']>,
    ParentType,
    ContextType,
    Partial<MeQueryResultsMySpacesArgs>
  >;
  spaceMemberships?: Resolver<
    Array<ResolversTypes['Space']>,
    ParentType,
    ContextType,
    Partial<MeQueryResultsSpaceMembershipsArgs>
  >;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']
> = {
  id?: Resolver<ResolversTypes['MessageID'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['Markdown'], ParentType, ContextType>;
  reactions?: Resolver<
    Array<ResolversTypes['Reaction']>,
    ParentType,
    ContextType
  >;
  sender?: Resolver<
    Maybe<ResolversTypes['Contributor']>,
    ParentType,
    ContextType
  >;
  threadID?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface MessageIdScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['MessageID'], any> {
  name: 'MessageID';
}

export type MetadataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Metadata'] = ResolversParentTypes['Metadata']
> = {
  services?: Resolver<
    Array<ResolversTypes['ServiceMetadata']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  addReactionToMessageInRoom?: Resolver<
    ResolversTypes['Reaction'],
    ParentType,
    ContextType,
    RequireFields<MutationAddReactionToMessageInRoomArgs, 'reactionData'>
  >;
  adminCommunicationEnsureAccessToCommunications?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<
      MutationAdminCommunicationEnsureAccessToCommunicationsArgs,
      'communicationData'
    >
  >;
  adminCommunicationRemoveOrphanedRoom?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<
      MutationAdminCommunicationRemoveOrphanedRoomArgs,
      'orphanedRoomData'
    >
  >;
  adminCommunicationUpdateRoomsJoinRule?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<
      MutationAdminCommunicationUpdateRoomsJoinRuleArgs,
      'changeRoomAccessData'
    >
  >;
  adminSearchIngestFromScratch?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  applyForCommunityMembership?: Resolver<
    ResolversTypes['Application'],
    ParentType,
    ContextType,
    RequireFields<MutationApplyForCommunityMembershipArgs, 'applicationData'>
  >;
  assignCommunityRoleToOrganization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<MutationAssignCommunityRoleToOrganizationArgs, 'roleData'>
  >;
  assignCommunityRoleToUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationAssignCommunityRoleToUserArgs, 'roleData'>
  >;
  assignCommunityRoleToVirtual?: Resolver<
    ResolversTypes['VirtualContributor'],
    ParentType,
    ContextType,
    RequireFields<MutationAssignCommunityRoleToVirtualArgs, 'roleData'>
  >;
  assignLicensePlanToAccount?: Resolver<
    ResolversTypes['Account'],
    ParentType,
    ContextType,
    RequireFields<MutationAssignLicensePlanToAccountArgs, 'planData'>
  >;
  assignOrganizationRoleToUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationAssignOrganizationRoleToUserArgs, 'membershipData'>
  >;
  assignPlatformRoleToUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationAssignPlatformRoleToUserArgs, 'membershipData'>
  >;
  assignUserToGroup?: Resolver<
    ResolversTypes['UserGroup'],
    ParentType,
    ContextType,
    RequireFields<MutationAssignUserToGroupArgs, 'membershipData'>
  >;
  authorizationPolicyResetAll?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  authorizationPolicyResetOnAccount?: Resolver<
    ResolversTypes['Account'],
    ParentType,
    ContextType,
    RequireFields<
      MutationAuthorizationPolicyResetOnAccountArgs,
      'authorizationResetData'
    >
  >;
  authorizationPolicyResetOnOrganization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<
      MutationAuthorizationPolicyResetOnOrganizationArgs,
      'authorizationResetData'
    >
  >;
  authorizationPolicyResetOnPlatform?: Resolver<
    ResolversTypes['Platform'],
    ParentType,
    ContextType
  >;
  authorizationPolicyResetOnUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<
      MutationAuthorizationPolicyResetOnUserArgs,
      'authorizationResetData'
    >
  >;
  authorizationPolicyResetToGlobalAdminsAccess?: Resolver<
    ResolversTypes['Authorization'],
    ParentType,
    ContextType,
    RequireFields<
      MutationAuthorizationPolicyResetToGlobalAdminsAccessArgs,
      'authorizationID'
    >
  >;
  beginAlkemioUserVerifiedCredentialOfferInteraction?: Resolver<
    ResolversTypes['AgentBeginVerifiedCredentialOfferOutput'],
    ParentType,
    ContextType
  >;
  beginCommunityMemberVerifiedCredentialOfferInteraction?: Resolver<
    ResolversTypes['AgentBeginVerifiedCredentialOfferOutput'],
    ParentType,
    ContextType,
    RequireFields<
      MutationBeginCommunityMemberVerifiedCredentialOfferInteractionArgs,
      'communityID'
    >
  >;
  beginVerifiedCredentialRequestInteraction?: Resolver<
    ResolversTypes['AgentBeginVerifiedCredentialRequestOutput'],
    ParentType,
    ContextType,
    RequireFields<
      MutationBeginVerifiedCredentialRequestInteractionArgs,
      'types'
    >
  >;
  convertChallengeToSpace?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<MutationConvertChallengeToSpaceArgs, 'convertData'>
  >;
  convertOpportunityToChallenge?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<MutationConvertOpportunityToChallengeArgs, 'convertData'>
  >;
  createAccount?: Resolver<
    ResolversTypes['Account'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateAccountArgs, 'accountData'>
  >;
  createActor?: Resolver<
    ResolversTypes['Actor'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateActorArgs, 'actorData'>
  >;
  createActorGroup?: Resolver<
    ResolversTypes['ActorGroup'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateActorGroupArgs, 'actorGroupData'>
  >;
  createCalloutOnCollaboration?: Resolver<
    ResolversTypes['Callout'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCalloutOnCollaborationArgs, 'calloutData'>
  >;
  createCalloutTemplate?: Resolver<
    ResolversTypes['CalloutTemplate'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCalloutTemplateArgs, 'calloutTemplateInput'>
  >;
  createCommunityGuidelinesTemplate?: Resolver<
    ResolversTypes['CommunityGuidelinesTemplate'],
    ParentType,
    ContextType,
    RequireFields<
      MutationCreateCommunityGuidelinesTemplateArgs,
      'communityGuidelinesTemplateInput'
    >
  >;
  createContributionOnCallout?: Resolver<
    ResolversTypes['CalloutContribution'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateContributionOnCalloutArgs, 'contributionData'>
  >;
  createDiscussion?: Resolver<
    ResolversTypes['Discussion'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateDiscussionArgs, 'createData'>
  >;
  createEventOnCalendar?: Resolver<
    ResolversTypes['CalendarEvent'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateEventOnCalendarArgs, 'eventData'>
  >;
  createGroupOnCommunity?: Resolver<
    ResolversTypes['UserGroup'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateGroupOnCommunityArgs, 'groupData'>
  >;
  createGroupOnOrganization?: Resolver<
    ResolversTypes['UserGroup'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateGroupOnOrganizationArgs, 'groupData'>
  >;
  createInnovationFlowTemplate?: Resolver<
    ResolversTypes['InnovationFlowTemplate'],
    ParentType,
    ContextType,
    RequireFields<
      MutationCreateInnovationFlowTemplateArgs,
      'innovationFlowTemplateInput'
    >
  >;
  createInnovationHub?: Resolver<
    ResolversTypes['InnovationHub'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateInnovationHubArgs, 'createData'>
  >;
  createInnovationPackOnLibrary?: Resolver<
    ResolversTypes['InnovationPack'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateInnovationPackOnLibraryArgs, 'packData'>
  >;
  createLicensePlan?: Resolver<
    ResolversTypes['LicensePlan'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateLicensePlanArgs, 'planData'>
  >;
  createOrganization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateOrganizationArgs, 'organizationData'>
  >;
  createPostTemplate?: Resolver<
    ResolversTypes['PostTemplate'],
    ParentType,
    ContextType,
    RequireFields<MutationCreatePostTemplateArgs, 'postTemplateInput'>
  >;
  createReferenceOnProfile?: Resolver<
    ResolversTypes['Reference'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateReferenceOnProfileArgs, 'referenceInput'>
  >;
  createRelationOnCollaboration?: Resolver<
    ResolversTypes['Relation'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateRelationOnCollaborationArgs, 'relationData'>
  >;
  createSubspace?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateSubspaceArgs, 'subspaceData'>
  >;
  createTagsetOnProfile?: Resolver<
    ResolversTypes['Tagset'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTagsetOnProfileArgs, 'tagsetData'>
  >;
  createUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, 'userData'>
  >;
  createUserNewRegistration?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType
  >;
  createVirtualContributor?: Resolver<
    ResolversTypes['VirtualContributor'],
    ParentType,
    ContextType,
    RequireFields<
      MutationCreateVirtualContributorArgs,
      'virtualContributorData'
    >
  >;
  createVirtualPersona?: Resolver<
    ResolversTypes['VirtualPersona'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateVirtualPersonaArgs, 'virtualPersonaData'>
  >;
  createWhiteboardTemplate?: Resolver<
    ResolversTypes['WhiteboardTemplate'],
    ParentType,
    ContextType,
    RequireFields<
      MutationCreateWhiteboardTemplateArgs,
      'whiteboardTemplateInput'
    >
  >;
  deleteActor?: Resolver<
    ResolversTypes['Actor'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteActorArgs, 'deleteData'>
  >;
  deleteActorGroup?: Resolver<
    ResolversTypes['ActorGroup'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteActorGroupArgs, 'deleteData'>
  >;
  deleteCalendarEvent?: Resolver<
    ResolversTypes['CalendarEvent'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCalendarEventArgs, 'deleteData'>
  >;
  deleteCallout?: Resolver<
    ResolversTypes['Callout'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCalloutArgs, 'deleteData'>
  >;
  deleteCalloutTemplate?: Resolver<
    ResolversTypes['CalloutTemplate'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCalloutTemplateArgs, 'deleteData'>
  >;
  deleteCollaboration?: Resolver<
    ResolversTypes['Collaboration'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCollaborationArgs, 'deleteData'>
  >;
  deleteCommunityGuidelinesTemplate?: Resolver<
    ResolversTypes['CommunityGuidelinesTemplate'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCommunityGuidelinesTemplateArgs, 'deleteData'>
  >;
  deleteDiscussion?: Resolver<
    ResolversTypes['Discussion'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteDiscussionArgs, 'deleteData'>
  >;
  deleteDocument?: Resolver<
    ResolversTypes['Document'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteDocumentArgs, 'deleteData'>
  >;
  deleteInnovationFlowTemplate?: Resolver<
    ResolversTypes['InnovationFlowTemplate'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteInnovationFlowTemplateArgs, 'deleteData'>
  >;
  deleteInnovationHub?: Resolver<
    ResolversTypes['InnovationHub'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteInnovationHubArgs, 'deleteData'>
  >;
  deleteInnovationPack?: Resolver<
    ResolversTypes['InnovationPack'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteInnovationPackArgs, 'deleteData'>
  >;
  deleteInvitation?: Resolver<
    ResolversTypes['Invitation'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteInvitationArgs, 'deleteData'>
  >;
  deleteInvitationExternal?: Resolver<
    ResolversTypes['InvitationExternal'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteInvitationExternalArgs, 'deleteData'>
  >;
  deleteLicensePlan?: Resolver<
    ResolversTypes['LicensePlan'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteLicensePlanArgs, 'deleteData'>
  >;
  deleteLink?: Resolver<
    ResolversTypes['Link'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteLinkArgs, 'deleteData'>
  >;
  deleteOrganization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteOrganizationArgs, 'deleteData'>
  >;
  deletePost?: Resolver<
    ResolversTypes['Post'],
    ParentType,
    ContextType,
    RequireFields<MutationDeletePostArgs, 'deleteData'>
  >;
  deletePostTemplate?: Resolver<
    ResolversTypes['PostTemplate'],
    ParentType,
    ContextType,
    RequireFields<MutationDeletePostTemplateArgs, 'deleteData'>
  >;
  deleteReference?: Resolver<
    ResolversTypes['Reference'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteReferenceArgs, 'deleteData'>
  >;
  deleteRelation?: Resolver<
    ResolversTypes['Relation'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteRelationArgs, 'deleteData'>
  >;
  deleteSpace?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteSpaceArgs, 'deleteData'>
  >;
  deleteStorageBucket?: Resolver<
    ResolversTypes['StorageBucket'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteStorageBucketArgs, 'deleteData'>
  >;
  deleteUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteUserArgs, 'deleteData'>
  >;
  deleteUserApplication?: Resolver<
    ResolversTypes['Application'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteUserApplicationArgs, 'deleteData'>
  >;
  deleteUserGroup?: Resolver<
    ResolversTypes['UserGroup'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteUserGroupArgs, 'deleteData'>
  >;
  deleteVirtualContributor?: Resolver<
    ResolversTypes['VirtualContributor'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteVirtualContributorArgs, 'deleteData'>
  >;
  deleteVirtualPersona?: Resolver<
    ResolversTypes['VirtualPersona'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteVirtualPersonaArgs, 'deleteData'>
  >;
  deleteWhiteboard?: Resolver<
    ResolversTypes['Whiteboard'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteWhiteboardArgs, 'whiteboardData'>
  >;
  deleteWhiteboardTemplate?: Resolver<
    ResolversTypes['WhiteboardTemplate'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteWhiteboardTemplateArgs, 'deleteData'>
  >;
  eventOnApplication?: Resolver<
    ResolversTypes['Application'],
    ParentType,
    ContextType,
    RequireFields<MutationEventOnApplicationArgs, 'applicationEventData'>
  >;
  eventOnCommunityInvitation?: Resolver<
    ResolversTypes['Invitation'],
    ParentType,
    ContextType,
    RequireFields<MutationEventOnCommunityInvitationArgs, 'invitationEventData'>
  >;
  eventOnOrganizationVerification?: Resolver<
    ResolversTypes['OrganizationVerification'],
    ParentType,
    ContextType,
    RequireFields<
      MutationEventOnOrganizationVerificationArgs,
      'organizationVerificationEventData'
    >
  >;
  grantCredentialToOrganization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<
      MutationGrantCredentialToOrganizationArgs,
      'grantCredentialData'
    >
  >;
  grantCredentialToUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationGrantCredentialToUserArgs, 'grantCredentialData'>
  >;
  ingest?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  ingestSpace?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<MutationIngestSpaceArgs, 'ingestSpaceData'>
  >;
  inviteExistingUserForCommunityMembership?: Resolver<
    Array<ResolversTypes['Invitation']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationInviteExistingUserForCommunityMembershipArgs,
      'invitationData'
    >
  >;
  inviteForCommunityMembershipByEmail?: Resolver<
    ResolversTypes['AnyInvitation'],
    ParentType,
    ContextType,
    RequireFields<
      MutationInviteForCommunityMembershipByEmailArgs,
      'invitationData'
    >
  >;
  joinCommunity?: Resolver<
    ResolversTypes['Community'],
    ParentType,
    ContextType,
    RequireFields<MutationJoinCommunityArgs, 'joinCommunityData'>
  >;
  messageUser?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationMessageUserArgs, 'messageData'>
  >;
  moveContributionToCallout?: Resolver<
    ResolversTypes['CalloutContribution'],
    ParentType,
    ContextType,
    RequireFields<MutationMoveContributionToCalloutArgs, 'moveContributionData'>
  >;
  removeCommunityRoleFromOrganization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveCommunityRoleFromOrganizationArgs, 'roleData'>
  >;
  removeCommunityRoleFromUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveCommunityRoleFromUserArgs, 'roleData'>
  >;
  removeCommunityRoleFromVirtual?: Resolver<
    ResolversTypes['VirtualContributor'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveCommunityRoleFromVirtualArgs, 'roleData'>
  >;
  removeMessageOnRoom?: Resolver<
    ResolversTypes['MessageID'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveMessageOnRoomArgs, 'messageData'>
  >;
  removeOrganizationRoleFromUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveOrganizationRoleFromUserArgs, 'membershipData'>
  >;
  removePlatformRoleFromUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationRemovePlatformRoleFromUserArgs, 'membershipData'>
  >;
  removeReactionToMessageInRoom?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveReactionToMessageInRoomArgs, 'reactionData'>
  >;
  removeUserFromGroup?: Resolver<
    ResolversTypes['UserGroup'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveUserFromGroupArgs, 'membershipData'>
  >;
  resetChatGuidance?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  revokeCredentialFromOrganization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<
      MutationRevokeCredentialFromOrganizationArgs,
      'revokeCredentialData'
    >
  >;
  revokeCredentialFromUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationRevokeCredentialFromUserArgs, 'revokeCredentialData'>
  >;
  revokeLicensePlanFromAccount?: Resolver<
    ResolversTypes['Account'],
    ParentType,
    ContextType,
    RequireFields<MutationRevokeLicensePlanFromAccountArgs, 'planData'>
  >;
  sendMessageReplyToRoom?: Resolver<
    ResolversTypes['Message'],
    ParentType,
    ContextType,
    RequireFields<MutationSendMessageReplyToRoomArgs, 'messageData'>
  >;
  sendMessageToCommunityLeads?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationSendMessageToCommunityLeadsArgs, 'messageData'>
  >;
  sendMessageToOrganization?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationSendMessageToOrganizationArgs, 'messageData'>
  >;
  sendMessageToRoom?: Resolver<
    ResolversTypes['Message'],
    ParentType,
    ContextType,
    RequireFields<MutationSendMessageToRoomArgs, 'messageData'>
  >;
  sendMessageToUser?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationSendMessageToUserArgs, 'messageData'>
  >;
  updateAccountPlatformSettings?: Resolver<
    ResolversTypes['Account'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateAccountPlatformSettingsArgs, 'updateData'>
  >;
  updateActor?: Resolver<
    ResolversTypes['Actor'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateActorArgs, 'actorData'>
  >;
  updateAnswerRelevance?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateAnswerRelevanceArgs, 'input'>
  >;
  updateCalendarEvent?: Resolver<
    ResolversTypes['CalendarEvent'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCalendarEventArgs, 'eventData'>
  >;
  updateCallout?: Resolver<
    ResolversTypes['Callout'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCalloutArgs, 'calloutData'>
  >;
  updateCalloutPublishInfo?: Resolver<
    ResolversTypes['Callout'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCalloutPublishInfoArgs, 'calloutData'>
  >;
  updateCalloutTemplate?: Resolver<
    ResolversTypes['CalloutTemplate'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCalloutTemplateArgs, 'calloutTemplateInput'>
  >;
  updateCalloutVisibility?: Resolver<
    ResolversTypes['Callout'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCalloutVisibilityArgs, 'calloutData'>
  >;
  updateCalloutsSortOrder?: Resolver<
    Array<ResolversTypes['Callout']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCalloutsSortOrderArgs, 'sortOrderData'>
  >;
  updateCommunityApplicationForm?: Resolver<
    ResolversTypes['Community'],
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateCommunityApplicationFormArgs,
      'applicationFormData'
    >
  >;
  updateCommunityGuidelines?: Resolver<
    ResolversTypes['CommunityGuidelines'],
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateCommunityGuidelinesArgs,
      'communityGuidelinesData'
    >
  >;
  updateCommunityGuidelinesTemplate?: Resolver<
    ResolversTypes['CommunityGuidelinesTemplate'],
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateCommunityGuidelinesTemplateArgs,
      'communityGuidelinesTemplateInput'
    >
  >;
  updateDiscussion?: Resolver<
    ResolversTypes['Discussion'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateDiscussionArgs, 'updateData'>
  >;
  updateDocument?: Resolver<
    ResolversTypes['Document'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateDocumentArgs, 'documentData'>
  >;
  updateEcosystemModel?: Resolver<
    ResolversTypes['EcosystemModel'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateEcosystemModelArgs, 'ecosystemModelData'>
  >;
  updateInnovationFlow?: Resolver<
    ResolversTypes['InnovationFlow'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateInnovationFlowArgs, 'innovationFlowData'>
  >;
  updateInnovationFlowSelectedState?: Resolver<
    ResolversTypes['InnovationFlow'],
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateInnovationFlowSelectedStateArgs,
      'innovationFlowStateData'
    >
  >;
  updateInnovationFlowSingleState?: Resolver<
    ResolversTypes['InnovationFlow'],
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateInnovationFlowSingleStateArgs,
      'innovationFlowStateData'
    >
  >;
  updateInnovationFlowStatesFromTemplate?: Resolver<
    ResolversTypes['InnovationFlow'],
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateInnovationFlowStatesFromTemplateArgs,
      'innovationFlowData'
    >
  >;
  updateInnovationFlowTemplate?: Resolver<
    ResolversTypes['InnovationFlowTemplate'],
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateInnovationFlowTemplateArgs,
      'innovationFlowTemplateInput'
    >
  >;
  updateInnovationHub?: Resolver<
    ResolversTypes['InnovationHub'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateInnovationHubArgs, 'updateData'>
  >;
  updateInnovationHubPlatformSettings?: Resolver<
    ResolversTypes['InnovationHub'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateInnovationHubPlatformSettingsArgs, 'updateData'>
  >;
  updateInnovationPack?: Resolver<
    ResolversTypes['InnovationPack'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateInnovationPackArgs, 'innovationPackData'>
  >;
  updateLicensePlan?: Resolver<
    ResolversTypes['LicensePlan'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateLicensePlanArgs, 'updateData'>
  >;
  updateLink?: Resolver<
    ResolversTypes['Link'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateLinkArgs, 'linkData'>
  >;
  updateOrganization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateOrganizationArgs, 'organizationData'>
  >;
  updatePost?: Resolver<
    ResolversTypes['Post'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePostArgs, 'postData'>
  >;
  updatePostTemplate?: Resolver<
    ResolversTypes['PostTemplate'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePostTemplateArgs, 'postTemplateInput'>
  >;
  updatePreferenceOnOrganization?: Resolver<
    ResolversTypes['Preference'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePreferenceOnOrganizationArgs, 'preferenceData'>
  >;
  updatePreferenceOnUser?: Resolver<
    ResolversTypes['Preference'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdatePreferenceOnUserArgs, 'preferenceData'>
  >;
  updateProfile?: Resolver<
    ResolversTypes['Profile'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateProfileArgs, 'profileData'>
  >;
  updateReference?: Resolver<
    ResolversTypes['Reference'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateReferenceArgs, 'referenceData'>
  >;
  updateSpace?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSpaceArgs, 'spaceData'>
  >;
  updateSpaceDefaults?: Resolver<
    ResolversTypes['SpaceDefaults'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSpaceDefaultsArgs, 'spaceDefaultsData'>
  >;
  updateSpacePlatformSettings?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSpacePlatformSettingsArgs, 'updateData'>
  >;
  updateSpaceSettings?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSpaceSettingsArgs, 'settingsData'>
  >;
  updateTagset?: Resolver<
    ResolversTypes['Tagset'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTagsetArgs, 'updateData'>
  >;
  updateUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, 'userData'>
  >;
  updateUserGroup?: Resolver<
    ResolversTypes['UserGroup'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserGroupArgs, 'userGroupData'>
  >;
  updateUserPlatformSettings?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserPlatformSettingsArgs, 'updateData'>
  >;
  updateVirtualContributor?: Resolver<
    ResolversTypes['VirtualContributor'],
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateVirtualContributorArgs,
      'virtualContributorData'
    >
  >;
  updateVirtualContributorPlatformSettings?: Resolver<
    ResolversTypes['VirtualContributor'],
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateVirtualContributorPlatformSettingsArgs,
      'updateData'
    >
  >;
  updateVirtualPersona?: Resolver<
    ResolversTypes['VirtualPersona'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateVirtualPersonaArgs, 'virtualPersonaData'>
  >;
  updateVisual?: Resolver<
    ResolversTypes['Visual'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateVisualArgs, 'updateData'>
  >;
  updateWhiteboard?: Resolver<
    ResolversTypes['Whiteboard'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateWhiteboardArgs, 'whiteboardData'>
  >;
  updateWhiteboardContent?: Resolver<
    ResolversTypes['Whiteboard'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateWhiteboardContentArgs, 'whiteboardData'>
  >;
  updateWhiteboardTemplate?: Resolver<
    ResolversTypes['WhiteboardTemplate'],
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateWhiteboardTemplateArgs,
      'whiteboardTemplateInput'
    >
  >;
  uploadFileOnLink?: Resolver<
    ResolversTypes['Link'],
    ParentType,
    ContextType,
    RequireFields<MutationUploadFileOnLinkArgs, 'file' | 'uploadData'>
  >;
  uploadFileOnReference?: Resolver<
    ResolversTypes['Reference'],
    ParentType,
    ContextType,
    RequireFields<MutationUploadFileOnReferenceArgs, 'file' | 'uploadData'>
  >;
  uploadFileOnStorageBucket?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType,
    RequireFields<MutationUploadFileOnStorageBucketArgs, 'file' | 'uploadData'>
  >;
  uploadImageOnVisual?: Resolver<
    ResolversTypes['Visual'],
    ParentType,
    ContextType,
    RequireFields<MutationUploadImageOnVisualArgs, 'file' | 'uploadData'>
  >;
};

export type MySpaceResultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MySpaceResults'] = ResolversParentTypes['MySpaceResults']
> = {
  latestActivity?: Resolver<
    Maybe<ResolversTypes['ActivityLogEntry']>,
    ParentType,
    ContextType
  >;
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NvpResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['NVP'] = ResolversParentTypes['NVP']
> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface NameIdScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['NameID'], any> {
  name: 'NameID';
}

export type OrganizationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']
> = {
  admins?: Resolver<
    Maybe<Array<ResolversTypes['User']>>,
    ParentType,
    ContextType
  >;
  agent?: Resolver<ResolversTypes['Agent'], ParentType, ContextType>;
  associates?: Resolver<
    Maybe<Array<ResolversTypes['User']>>,
    ParentType,
    ContextType
  >;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  contactEmail?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  domain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  group?: Resolver<
    Maybe<ResolversTypes['UserGroup']>,
    ParentType,
    ContextType,
    RequireFields<OrganizationGroupArgs, 'ID'>
  >;
  groups?: Resolver<
    Maybe<Array<ResolversTypes['UserGroup']>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  legalEntityName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  metrics?: Resolver<
    Maybe<Array<ResolversTypes['NVP']>>,
    ParentType,
    ContextType
  >;
  myRoles?: Resolver<
    Maybe<Array<ResolversTypes['OrganizationRole']>>,
    ParentType,
    ContextType
  >;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  owners?: Resolver<
    Maybe<Array<ResolversTypes['User']>>,
    ParentType,
    ContextType
  >;
  preferences?: Resolver<
    Array<ResolversTypes['Preference']>,
    ParentType,
    ContextType
  >;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  storageAggregator?: Resolver<
    Maybe<ResolversTypes['StorageAggregator']>,
    ParentType,
    ContextType
  >;
  verification?: Resolver<
    ResolversTypes['OrganizationVerification'],
    ParentType,
    ContextType
  >;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizationVerificationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OrganizationVerification'] = ResolversParentTypes['OrganizationVerification']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  lifecycle?: Resolver<ResolversTypes['Lifecycle'], ParentType, ContextType>;
  status?: Resolver<
    ResolversTypes['OrganizationVerificationEnum'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OryConfigResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OryConfig'] = ResolversParentTypes['OryConfig']
> = {
  issuer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  kratosPublicBaseURL?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = {
  endCursor?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  startCursor?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedOrganizationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PaginatedOrganization'] = ResolversParentTypes['PaginatedOrganization']
> = {
  organization?: Resolver<
    Array<ResolversTypes['Organization']>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedSpacesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PaginatedSpaces'] = ResolversParentTypes['PaginatedSpaces']
> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  spaces?: Resolver<Array<ResolversTypes['Space']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedUsersResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PaginatedUsers'] = ResolversParentTypes['PaginatedUsers']
> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlatformResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Platform'] = ResolversParentTypes['Platform']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  communication?: Resolver<
    ResolversTypes['Communication'],
    ParentType,
    ContextType
  >;
  configuration?: Resolver<ResolversTypes['Config'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  innovationHub?: Resolver<
    Maybe<ResolversTypes['InnovationHub']>,
    ParentType,
    ContextType,
    Partial<PlatformInnovationHubArgs>
  >;
  innovationHubs?: Resolver<
    Array<ResolversTypes['InnovationHub']>,
    ParentType,
    ContextType
  >;
  latestReleaseDiscussion?: Resolver<
    Maybe<ResolversTypes['LatestReleaseDiscussion']>,
    ParentType,
    ContextType
  >;
  library?: Resolver<ResolversTypes['Library'], ParentType, ContextType>;
  licensing?: Resolver<ResolversTypes['Licensing'], ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['Metadata'], ParentType, ContextType>;
  storageAggregator?: Resolver<
    ResolversTypes['StorageAggregator'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlatformFeatureFlagResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PlatformFeatureFlag'] = ResolversParentTypes['PlatformFeatureFlag']
> = {
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<
    ResolversTypes['PlatformFeatureFlagName'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlatformLocationsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PlatformLocations'] = ResolversParentTypes['PlatformLocations']
> = {
  about?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  aup?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blog?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  community?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contactsupport?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  domain?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  environment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  feedback?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  forumreleases?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  foundation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  help?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  impact?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  innovationLibrary?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  inspiration?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  landing?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  newuser?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  opensource?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privacy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  releases?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  security?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  support?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  switchplan?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  terms?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tips?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  comments?: Resolver<ResolversTypes['Room'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostTemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PostTemplate'] = ResolversParentTypes['PostTemplate']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  defaultDescription?: Resolver<
    ResolversTypes['Markdown'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PreferenceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Preference'] = ResolversParentTypes['Preference']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  definition?: Resolver<
    ResolversTypes['PreferenceDefinition'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PreferenceDefinitionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PreferenceDefinition'] = ResolversParentTypes['PreferenceDefinition']
> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  group?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['PreferenceType'], ParentType, ContextType>;
  valueType?: Resolver<
    ResolversTypes['PreferenceValueType'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes['Markdown']>,
    ParentType,
    ContextType
  >;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  location?: Resolver<
    Maybe<ResolversTypes['Location']>,
    ParentType,
    ContextType
  >;
  references?: Resolver<
    Maybe<Array<ResolversTypes['Reference']>>,
    ParentType,
    ContextType
  >;
  storageBucket?: Resolver<
    ResolversTypes['StorageBucket'],
    ParentType,
    ContextType
  >;
  tagline?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tagset?: Resolver<
    Maybe<ResolversTypes['Tagset']>,
    ParentType,
    ContextType,
    Partial<ProfileTagsetArgs>
  >;
  tagsets?: Resolver<
    Maybe<Array<ResolversTypes['Tagset']>>,
    ParentType,
    ContextType
  >;
  type?: Resolver<
    Maybe<ResolversTypes['ProfileType']>,
    ParentType,
    ContextType
  >;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  visual?: Resolver<
    Maybe<ResolversTypes['Visual']>,
    ParentType,
    ContextType,
    RequireFields<ProfileVisualArgs, 'type'>
  >;
  visuals?: Resolver<Array<ResolversTypes['Visual']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileCredentialVerifiedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProfileCredentialVerified'] = ResolversParentTypes['ProfileCredentialVerified']
> = {
  userEmail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vc?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  account?: Resolver<
    ResolversTypes['Account'],
    ParentType,
    ContextType,
    RequireFields<QueryAccountArgs, 'ID'>
  >;
  accounts?: Resolver<
    Array<ResolversTypes['Account']>,
    ParentType,
    ContextType
  >;
  activityFeed?: Resolver<
    ResolversTypes['ActivityFeed'],
    ParentType,
    ContextType,
    Partial<QueryActivityFeedArgs>
  >;
  activityFeedGrouped?: Resolver<
    Array<ResolversTypes['ActivityLogEntry']>,
    ParentType,
    ContextType,
    Partial<QueryActivityFeedGroupedArgs>
  >;
  activityLogOnCollaboration?: Resolver<
    Array<ResolversTypes['ActivityLogEntry']>,
    ParentType,
    ContextType,
    RequireFields<QueryActivityLogOnCollaborationArgs, 'queryData'>
  >;
  adminCommunicationMembership?: Resolver<
    ResolversTypes['CommunicationAdminMembershipResult'],
    ParentType,
    ContextType,
    RequireFields<QueryAdminCommunicationMembershipArgs, 'communicationData'>
  >;
  adminCommunicationOrphanedUsage?: Resolver<
    ResolversTypes['CommunicationAdminOrphanedUsageResult'],
    ParentType,
    ContextType
  >;
  askChatGuidanceQuestion?: Resolver<
    ResolversTypes['ChatGuidanceResult'],
    ParentType,
    ContextType,
    RequireFields<QueryAskChatGuidanceQuestionArgs, 'chatData'>
  >;
  askVirtualPersonaQuestion?: Resolver<
    ResolversTypes['VirtualPersonaResult'],
    ParentType,
    ContextType,
    RequireFields<QueryAskVirtualPersonaQuestionArgs, 'chatData'>
  >;
  getSupportedVerifiedCredentialMetadata?: Resolver<
    Array<ResolversTypes['CredentialMetadataOutput']>,
    ParentType,
    ContextType
  >;
  lookup?: Resolver<
    ResolversTypes['LookupQueryResults'],
    ParentType,
    ContextType
  >;
  me?: Resolver<ResolversTypes['MeQueryResults'], ParentType, ContextType>;
  organization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType,
    RequireFields<QueryOrganizationArgs, 'ID'>
  >;
  organizations?: Resolver<
    Array<ResolversTypes['Organization']>,
    ParentType,
    ContextType,
    Partial<QueryOrganizationsArgs>
  >;
  organizationsPaginated?: Resolver<
    ResolversTypes['PaginatedOrganization'],
    ParentType,
    ContextType,
    Partial<QueryOrganizationsPaginatedArgs>
  >;
  platform?: Resolver<ResolversTypes['Platform'], ParentType, ContextType>;
  rolesOrganization?: Resolver<
    ResolversTypes['ContributorRoles'],
    ParentType,
    ContextType,
    RequireFields<QueryRolesOrganizationArgs, 'rolesData'>
  >;
  rolesUser?: Resolver<
    ResolversTypes['ContributorRoles'],
    ParentType,
    ContextType,
    RequireFields<QueryRolesUserArgs, 'rolesData'>
  >;
  search?: Resolver<
    ResolversTypes['ISearchResults'],
    ParentType,
    ContextType,
    RequireFields<QuerySearchArgs, 'searchData'>
  >;
  space?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<QuerySpaceArgs, 'ID'>
  >;
  spaces?: Resolver<
    Array<ResolversTypes['Space']>,
    ParentType,
    ContextType,
    Partial<QuerySpacesArgs>
  >;
  spacesPaginated?: Resolver<
    ResolversTypes['PaginatedSpaces'],
    ParentType,
    ContextType,
    Partial<QuerySpacesPaginatedArgs>
  >;
  task?: Resolver<
    ResolversTypes['Task'],
    ParentType,
    ContextType,
    RequireFields<QueryTaskArgs, 'id'>
  >;
  tasks?: Resolver<
    Array<ResolversTypes['Task']>,
    ParentType,
    ContextType,
    Partial<QueryTasksArgs>
  >;
  user?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, 'ID'>
  >;
  userAuthorizationPrivileges?: Resolver<
    Array<ResolversTypes['AuthorizationPrivilege']>,
    ParentType,
    ContextType,
    RequireFields<
      QueryUserAuthorizationPrivilegesArgs,
      'userAuthorizationPrivilegesData'
    >
  >;
  users?: Resolver<
    Array<ResolversTypes['User']>,
    ParentType,
    ContextType,
    Partial<QueryUsersArgs>
  >;
  usersPaginated?: Resolver<
    ResolversTypes['PaginatedUsers'],
    ParentType,
    ContextType,
    Partial<QueryUsersPaginatedArgs>
  >;
  usersWithAuthorizationCredential?: Resolver<
    Array<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<
      QueryUsersWithAuthorizationCredentialArgs,
      'credentialsCriteriaData'
    >
  >;
  virtualContributor?: Resolver<
    ResolversTypes['VirtualContributor'],
    ParentType,
    ContextType,
    RequireFields<QueryVirtualContributorArgs, 'ID'>
  >;
  virtualContributors?: Resolver<
    Array<ResolversTypes['VirtualContributor']>,
    ParentType,
    ContextType,
    Partial<QueryVirtualContributorsArgs>
  >;
  virtualPersona?: Resolver<
    ResolversTypes['VirtualPersona'],
    ParentType,
    ContextType,
    RequireFields<QueryVirtualPersonaArgs, 'ID'>
  >;
  virtualPersonas?: Resolver<
    Array<ResolversTypes['VirtualPersona']>,
    ParentType,
    ContextType
  >;
};

export type QuestionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Question'] = ResolversParentTypes['Question']
> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReactionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Reaction'] = ResolversParentTypes['Reaction']
> = {
  emoji?: Resolver<ResolversTypes['Emoji'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['MessageID'], ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReferenceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Reference'] = ResolversParentTypes['Reference']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RelationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Relation'] = ResolversParentTypes['Relation']
> = {
  actorName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  actorRole?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  actorType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RelayPaginatedSpaceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RelayPaginatedSpace'] = ResolversParentTypes['RelayPaginatedSpace']
> = {
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  agent?: Resolver<ResolversTypes['Agent'], ParentType, ContextType>;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  collaboration?: Resolver<
    ResolversTypes['Collaboration'],
    ParentType,
    ContextType
  >;
  community?: Resolver<ResolversTypes['Community'], ParentType, ContextType>;
  context?: Resolver<ResolversTypes['Context'], ParentType, ContextType>;
  createdDate?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  metrics?: Resolver<
    Maybe<Array<ResolversTypes['NVP']>>,
    ParentType,
    ContextType
  >;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  settings?: Resolver<ResolversTypes['SpaceSettings'], ParentType, ContextType>;
  storageAggregator?: Resolver<
    ResolversTypes['StorageAggregator'],
    ParentType,
    ContextType
  >;
  subspace?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<RelayPaginatedSpaceSubspaceArgs, 'ID'>
  >;
  subspaces?: Resolver<
    Array<ResolversTypes['Space']>,
    ParentType,
    ContextType,
    Partial<RelayPaginatedSpaceSubspacesArgs>
  >;
  type?: Resolver<ResolversTypes['SpaceType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RelayPaginatedSpaceEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RelayPaginatedSpaceEdge'] = ResolversParentTypes['RelayPaginatedSpaceEdge']
> = {
  node?: Resolver<
    ResolversTypes['RelayPaginatedSpace'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RelayPaginatedSpacePageInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RelayPaginatedSpacePageInfo'] = ResolversParentTypes['RelayPaginatedSpacePageInfo']
> = {
  endCursor?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  startCursor?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RolesResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RolesResult'] = ResolversParentTypes['RolesResult']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RolesResultCommunityResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RolesResultCommunity'] = ResolversParentTypes['RolesResultCommunity']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SpaceType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RolesResultOrganizationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RolesResultOrganization'] = ResolversParentTypes['RolesResultOrganization']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  organizationID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  userGroups?: Resolver<
    Array<ResolversTypes['RolesResult']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RolesResultSpaceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RolesResultSpace'] = ResolversParentTypes['RolesResultSpace']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  spaceID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subspaces?: Resolver<
    Array<ResolversTypes['RolesResultCommunity']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['SpaceType'], ParentType, ContextType>;
  visibility?: Resolver<
    ResolversTypes['SpaceVisibility'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoomResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  messages?: Resolver<
    Array<ResolversTypes['Message']>,
    ParentType,
    ContextType
  >;
  messagesCount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoomEventSubscriptionResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RoomEventSubscriptionResult'] = ResolversParentTypes['RoomEventSubscriptionResult']
> = {
  message?: Resolver<
    Maybe<ResolversTypes['RoomMessageEventSubscriptionResult']>,
    ParentType,
    ContextType
  >;
  reaction?: Resolver<
    Maybe<ResolversTypes['RoomMessageReactionEventSubscriptionResult']>,
    ParentType,
    ContextType
  >;
  roomID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoomMessageEventSubscriptionResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RoomMessageEventSubscriptionResult'] = ResolversParentTypes['RoomMessageEventSubscriptionResult']
> = {
  data?: Resolver<ResolversTypes['Message'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['MutationType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoomMessageReactionEventSubscriptionResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RoomMessageReactionEventSubscriptionResult'] = ResolversParentTypes['RoomMessageReactionEventSubscriptionResult']
> = {
  data?: Resolver<ResolversTypes['Reaction'], ParentType, ContextType>;
  messageID?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['MutationType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SearchResult'] = ResolversParentTypes['SearchResult']
> = {
  __resolveType: TypeResolveFn<
    | 'SearchResultCallout'
    | 'SearchResultOrganization'
    | 'SearchResultPost'
    | 'SearchResultSpace'
    | 'SearchResultUser'
    | 'SearchResultUserGroup',
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  terms?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SearchResultType'], ParentType, ContextType>;
};

export type SearchResultCalloutResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SearchResultCallout'] = ResolversParentTypes['SearchResultCallout']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  terms?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SearchResultType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResultOrganizationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SearchResultOrganization'] = ResolversParentTypes['SearchResultOrganization']
> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  organization?: Resolver<
    ResolversTypes['Organization'],
    ParentType,
    ContextType
  >;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  terms?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SearchResultType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResultPostResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SearchResultPost'] = ResolversParentTypes['SearchResultPost']
> = {
  callout?: Resolver<ResolversTypes['Callout'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  terms?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SearchResultType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResultSpaceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SearchResultSpace'] = ResolversParentTypes['SearchResultSpace']
> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentSpace?: Resolver<
    Maybe<ResolversTypes['Space']>,
    ParentType,
    ContextType
  >;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  terms?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SearchResultType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResultUserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SearchResultUser'] = ResolversParentTypes['SearchResultUser']
> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  terms?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SearchResultType'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResultUserGroupResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SearchResultUserGroup'] = ResolversParentTypes['SearchResultUserGroup']
> = {
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  terms?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SearchResultType'], ParentType, ContextType>;
  userGroup?: Resolver<ResolversTypes['UserGroup'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SentryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Sentry'] = ResolversParentTypes['Sentry']
> = {
  enabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  endpoint?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  submitPII?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ServiceMetadataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ServiceMetadata'] = ResolversParentTypes['ServiceMetadata']
> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SourceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Source'] = ResolversParentTypes['Source']
> = {
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Space'] = ResolversParentTypes['Space']
> = {
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  agent?: Resolver<ResolversTypes['Agent'], ParentType, ContextType>;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  collaboration?: Resolver<
    ResolversTypes['Collaboration'],
    ParentType,
    ContextType
  >;
  community?: Resolver<ResolversTypes['Community'], ParentType, ContextType>;
  context?: Resolver<ResolversTypes['Context'], ParentType, ContextType>;
  createdDate?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  metrics?: Resolver<
    Maybe<Array<ResolversTypes['NVP']>>,
    ParentType,
    ContextType
  >;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  settings?: Resolver<ResolversTypes['SpaceSettings'], ParentType, ContextType>;
  storageAggregator?: Resolver<
    ResolversTypes['StorageAggregator'],
    ParentType,
    ContextType
  >;
  subspace?: Resolver<
    ResolversTypes['Space'],
    ParentType,
    ContextType,
    RequireFields<SpaceSubspaceArgs, 'ID'>
  >;
  subspaces?: Resolver<
    Array<ResolversTypes['Space']>,
    ParentType,
    ContextType,
    Partial<SpaceSubspacesArgs>
  >;
  type?: Resolver<ResolversTypes['SpaceType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceDefaultsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SpaceDefaults'] = ResolversParentTypes['SpaceDefaults']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  innovationFlowTemplate?: Resolver<
    Maybe<ResolversTypes['InnovationFlowTemplate']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SpaceSettings'] = ResolversParentTypes['SpaceSettings']
> = {
  collaboration?: Resolver<
    ResolversTypes['SpaceSettingsCollaboration'],
    ParentType,
    ContextType
  >;
  membership?: Resolver<
    ResolversTypes['SpaceSettingsMembership'],
    ParentType,
    ContextType
  >;
  privacy?: Resolver<
    ResolversTypes['SpaceSettingsPrivacy'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceSettingsCollaborationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SpaceSettingsCollaboration'] = ResolversParentTypes['SpaceSettingsCollaboration']
> = {
  allowMembersToCreateCallouts?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  allowMembersToCreateSubspaces?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  inheritMembershipRights?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceSettingsMembershipResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SpaceSettingsMembership'] = ResolversParentTypes['SpaceSettingsMembership']
> = {
  allowSubspaceAdminsToInviteMembers?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  policy?: Resolver<
    ResolversTypes['CommunityMembershipPolicy'],
    ParentType,
    ContextType
  >;
  trustedOrganizations?: Resolver<
    Array<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceSettingsPrivacyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SpaceSettingsPrivacy'] = ResolversParentTypes['SpaceSettingsPrivacy']
> = {
  allowPlatformSupportAsAdmin?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  mode?: Resolver<ResolversTypes['SpacePrivacyMode'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StorageAggregatorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['StorageAggregator'] = ResolversParentTypes['StorageAggregator']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  directStorageBucket?: Resolver<
    ResolversTypes['StorageBucket'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  parentEntity?: Resolver<
    Maybe<ResolversTypes['StorageAggregatorParent']>,
    ParentType,
    ContextType
  >;
  size?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  storageAggregators?: Resolver<
    Array<ResolversTypes['StorageAggregator']>,
    ParentType,
    ContextType
  >;
  storageBuckets?: Resolver<
    Array<ResolversTypes['StorageBucket']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StorageAggregatorParentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['StorageAggregatorParent'] = ResolversParentTypes['StorageAggregatorParent']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SpaceType'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StorageBucketResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['StorageBucket'] = ResolversParentTypes['StorageBucket']
> = {
  allowedMimeTypes?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  document?: Resolver<
    Maybe<ResolversTypes['Document']>,
    ParentType,
    ContextType,
    RequireFields<StorageBucketDocumentArgs, 'ID'>
  >;
  documents?: Resolver<
    Array<ResolversTypes['Document']>,
    ParentType,
    ContextType,
    Partial<StorageBucketDocumentsArgs>
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  maxFileSize?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  parentEntity?: Resolver<
    Maybe<ResolversTypes['StorageBucketParent']>,
    ParentType,
    ContextType
  >;
  size?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StorageBucketParentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['StorageBucketParent'] = ResolversParentTypes['StorageBucketParent']
> = {
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ProfileType'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StorageConfigResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['StorageConfig'] = ResolversParentTypes['StorageConfig']
> = {
  file?: Resolver<ResolversTypes['FileStorageConfig'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
  activityCreated?: SubscriptionResolver<
    ResolversTypes['ActivityCreatedSubscriptionResult'],
    'activityCreated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionActivityCreatedArgs, 'input'>
  >;
  calloutPostCreated?: SubscriptionResolver<
    ResolversTypes['CalloutPostCreated'],
    'calloutPostCreated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionCalloutPostCreatedArgs, 'calloutID'>
  >;
  communicationDiscussionUpdated?: SubscriptionResolver<
    ResolversTypes['Discussion'],
    'communicationDiscussionUpdated',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptionCommunicationDiscussionUpdatedArgs,
      'communicationID'
    >
  >;
  profileVerifiedCredential?: SubscriptionResolver<
    ResolversTypes['ProfileCredentialVerified'],
    'profileVerifiedCredential',
    ParentType,
    ContextType
  >;
  roomEvents?: SubscriptionResolver<
    ResolversTypes['RoomEventSubscriptionResult'],
    'roomEvents',
    ParentType,
    ContextType,
    RequireFields<SubscriptionRoomEventsArgs, 'roomID'>
  >;
  subspaceCreated?: SubscriptionResolver<
    ResolversTypes['SubspaceCreated'],
    'subspaceCreated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionSubspaceCreatedArgs, 'spaceID'>
  >;
};

export type SubspaceCreatedResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SubspaceCreated'] = ResolversParentTypes['SubspaceCreated']
> = {
  spaceID?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  subspace?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagsetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Tagset'] = ResolversParentTypes['Tagset']
> = {
  allowedValues?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TagsetType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagsetTemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TagsetTemplate'] = ResolversParentTypes['TagsetTemplate']
> = {
  allowedValues?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  defaultSelectedValue?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TagsetType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']
> = {
  created?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  end?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  errors?: Resolver<
    Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  itemsCount?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >;
  itemsDone?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  progress?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  results?: Resolver<
    Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  start?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['TaskStatus'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TemplatesSetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TemplatesSet'] = ResolversParentTypes['TemplatesSet']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  calloutTemplates?: Resolver<
    Array<ResolversTypes['CalloutTemplate']>,
    ParentType,
    ContextType
  >;
  calloutTemplatesCount?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  communityGuidelinesTemplate?: Resolver<
    Maybe<ResolversTypes['CommunityGuidelinesTemplate']>,
    ParentType,
    ContextType,
    RequireFields<TemplatesSetCommunityGuidelinesTemplateArgs, 'ID'>
  >;
  communityGuidelinesTemplates?: Resolver<
    Array<ResolversTypes['CommunityGuidelinesTemplate']>,
    ParentType,
    ContextType
  >;
  communityGuidelinesTemplatesCount?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  innovationFlowTemplate?: Resolver<
    Maybe<ResolversTypes['InnovationFlowTemplate']>,
    ParentType,
    ContextType,
    RequireFields<TemplatesSetInnovationFlowTemplateArgs, 'ID'>
  >;
  innovationFlowTemplates?: Resolver<
    Array<ResolversTypes['InnovationFlowTemplate']>,
    ParentType,
    ContextType
  >;
  innovationFlowTemplatesCount?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  postTemplate?: Resolver<
    Maybe<ResolversTypes['PostTemplate']>,
    ParentType,
    ContextType,
    RequireFields<TemplatesSetPostTemplateArgs, 'ID'>
  >;
  postTemplates?: Resolver<
    Array<ResolversTypes['PostTemplate']>,
    ParentType,
    ContextType
  >;
  postTemplatesCount?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  whiteboardTemplate?: Resolver<
    Maybe<ResolversTypes['WhiteboardTemplate']>,
    ParentType,
    ContextType,
    RequireFields<TemplatesSetWhiteboardTemplateArgs, 'ID'>
  >;
  whiteboardTemplates?: Resolver<
    Array<ResolversTypes['WhiteboardTemplate']>,
    ParentType,
    ContextType
  >;
  whiteboardTemplatesCount?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TimelineResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Timeline'] = ResolversParentTypes['Timeline']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  calendar?: Resolver<ResolversTypes['Calendar'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UuidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export interface Uuid_NameidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['UUID_NAMEID'], any> {
  name: 'UUID_NAMEID';
}

export interface Uuid_Nameid_EmailScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['UUID_NAMEID_EMAIL'], any> {
  name: 'UUID_NAMEID_EMAIL';
}

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  accountUpn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  agent?: Resolver<ResolversTypes['Agent'], ParentType, ContextType>;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  communityRooms?: Resolver<
    Maybe<Array<ResolversTypes['CommunicationRoom']>>,
    ParentType,
    ContextType
  >;
  directRooms?: Resolver<
    Maybe<Array<ResolversTypes['DirectRoom']>>,
    ParentType,
    ContextType
  >;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gender?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  isContactable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  preferences?: Resolver<
    Array<ResolversTypes['Preference']>,
    ParentType,
    ContextType
  >;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  storageAggregator?: Resolver<
    Maybe<ResolversTypes['StorageAggregator']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserGroupResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserGroup'] = ResolversParentTypes['UserGroup']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  members?: Resolver<
    Maybe<Array<ResolversTypes['User']>>,
    ParentType,
    ContextType
  >;
  parent?: Resolver<
    Maybe<ResolversTypes['Groupable']>,
    ParentType,
    ContextType
  >;
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerifiedCredentialResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['VerifiedCredential'] = ResolversParentTypes['VerifiedCredential']
> = {
  claims?: Resolver<
    Array<ResolversTypes['VerifiedCredentialClaim']>,
    ParentType,
    ContextType
  >;
  context?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  expires?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  issued?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  issuer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerifiedCredentialClaimResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['VerifiedCredentialClaim'] = ResolversParentTypes['VerifiedCredentialClaim']
> = {
  name?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VirtualContributorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['VirtualContributor'] = ResolversParentTypes['VirtualContributor']
> = {
  account?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  agent?: Resolver<ResolversTypes['Agent'], ParentType, ContextType>;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  bodyOfKnowledgeID?: Resolver<
    Maybe<ResolversTypes['UUID']>,
    ParentType,
    ContextType
  >;
  bodyOfKnowledgeType?: Resolver<
    Maybe<ResolversTypes['BodyOfKnowledgeType']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  storageAggregator?: Resolver<
    Maybe<ResolversTypes['StorageAggregator']>,
    ParentType,
    ContextType
  >;
  virtualPersona?: Resolver<
    ResolversTypes['VirtualPersona'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VirtualPersonaResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['VirtualPersona'] = ResolversParentTypes['VirtualPersona']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  dataAccessMode?: Resolver<
    ResolversTypes['VirtualPersonaAccessMode'],
    ParentType,
    ContextType
  >;
  engine?: Resolver<
    ResolversTypes['VirtualContributorEngine'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  prompt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VirtualPersonaResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['VirtualPersonaResult'] = ResolversParentTypes['VirtualPersonaResult']
> = {
  answer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  question?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sources?: Resolver<
    Maybe<Array<ResolversTypes['Source']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VisualResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Visual'] = ResolversParentTypes['Visual']
> = {
  allowedTypes?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  alternativeText?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  aspectRatio?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  maxHeight?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  maxWidth?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  minHeight?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  minWidth?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WhiteboardResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Whiteboard'] = ResolversParentTypes['Whiteboard']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  content?: Resolver<
    ResolversTypes['WhiteboardContent'],
    ParentType,
    ContextType
  >;
  contentUpdatePolicy?: Resolver<
    ResolversTypes['ContentUpdatePolicy'],
    ParentType,
    ContextType
  >;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  isMultiUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  nameID?: Resolver<ResolversTypes['NameID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  updatedDate?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface WhiteboardContentScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['WhiteboardContent'], any> {
  name: 'WhiteboardContent';
}

export type WhiteboardTemplateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['WhiteboardTemplate'] = ResolversParentTypes['WhiteboardTemplate']
> = {
  authorization?: Resolver<
    Maybe<ResolversTypes['Authorization']>,
    ParentType,
    ContextType
  >;
  content?: Resolver<
    ResolversTypes['WhiteboardContent'],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  APM?: ApmResolvers<ContextType>;
  Account?: AccountResolvers<ContextType>;
  AccountSubscription?: AccountSubscriptionResolvers<ContextType>;
  ActivityCreatedSubscriptionResult?: ActivityCreatedSubscriptionResultResolvers<ContextType>;
  ActivityFeed?: ActivityFeedResolvers<ContextType>;
  ActivityLogEntry?: ActivityLogEntryResolvers<ContextType>;
  ActivityLogEntryCalendarEventCreated?: ActivityLogEntryCalendarEventCreatedResolvers<ContextType>;
  ActivityLogEntryCalloutDiscussionComment?: ActivityLogEntryCalloutDiscussionCommentResolvers<ContextType>;
  ActivityLogEntryCalloutLinkCreated?: ActivityLogEntryCalloutLinkCreatedResolvers<ContextType>;
  ActivityLogEntryCalloutPostComment?: ActivityLogEntryCalloutPostCommentResolvers<ContextType>;
  ActivityLogEntryCalloutPostCreated?: ActivityLogEntryCalloutPostCreatedResolvers<ContextType>;
  ActivityLogEntryCalloutPublished?: ActivityLogEntryCalloutPublishedResolvers<ContextType>;
  ActivityLogEntryCalloutWhiteboardContentModified?: ActivityLogEntryCalloutWhiteboardContentModifiedResolvers<ContextType>;
  ActivityLogEntryCalloutWhiteboardCreated?: ActivityLogEntryCalloutWhiteboardCreatedResolvers<ContextType>;
  ActivityLogEntryChallengeCreated?: ActivityLogEntryChallengeCreatedResolvers<ContextType>;
  ActivityLogEntryMemberJoined?: ActivityLogEntryMemberJoinedResolvers<ContextType>;
  ActivityLogEntryOpportunityCreated?: ActivityLogEntryOpportunityCreatedResolvers<ContextType>;
  ActivityLogEntryUpdateSent?: ActivityLogEntryUpdateSentResolvers<ContextType>;
  Actor?: ActorResolvers<ContextType>;
  ActorGroup?: ActorGroupResolvers<ContextType>;
  Agent?: AgentResolvers<ContextType>;
  AgentBeginVerifiedCredentialOfferOutput?: AgentBeginVerifiedCredentialOfferOutputResolvers<ContextType>;
  AgentBeginVerifiedCredentialRequestOutput?: AgentBeginVerifiedCredentialRequestOutputResolvers<ContextType>;
  AnyInvitation?: AnyInvitationResolvers<ContextType>;
  Application?: ApplicationResolvers<ContextType>;
  ApplicationForRoleResult?: ApplicationForRoleResultResolvers<ContextType>;
  AuthenticationConfig?: AuthenticationConfigResolvers<ContextType>;
  AuthenticationProviderConfig?: AuthenticationProviderConfigResolvers<ContextType>;
  AuthenticationProviderConfigUnion?: AuthenticationProviderConfigUnionResolvers<ContextType>;
  Authorization?: AuthorizationResolvers<ContextType>;
  AuthorizationPolicyRuleCredential?: AuthorizationPolicyRuleCredentialResolvers<ContextType>;
  AuthorizationPolicyRulePrivilege?: AuthorizationPolicyRulePrivilegeResolvers<ContextType>;
  AuthorizationPolicyRuleVerifiedCredential?: AuthorizationPolicyRuleVerifiedCredentialResolvers<ContextType>;
  CID?: GraphQLScalarType;
  Calendar?: CalendarResolvers<ContextType>;
  CalendarEvent?: CalendarEventResolvers<ContextType>;
  Callout?: CalloutResolvers<ContextType>;
  CalloutContribution?: CalloutContributionResolvers<ContextType>;
  CalloutContributionDefaults?: CalloutContributionDefaultsResolvers<ContextType>;
  CalloutContributionPolicy?: CalloutContributionPolicyResolvers<ContextType>;
  CalloutFraming?: CalloutFramingResolvers<ContextType>;
  CalloutGroup?: CalloutGroupResolvers<ContextType>;
  CalloutPostCreated?: CalloutPostCreatedResolvers<ContextType>;
  CalloutTemplate?: CalloutTemplateResolvers<ContextType>;
  ChatGuidanceResult?: ChatGuidanceResultResolvers<ContextType>;
  Collaboration?: CollaborationResolvers<ContextType>;
  Communication?: CommunicationResolvers<ContextType>;
  CommunicationAdminMembershipResult?: CommunicationAdminMembershipResultResolvers<ContextType>;
  CommunicationAdminOrphanedUsageResult?: CommunicationAdminOrphanedUsageResultResolvers<ContextType>;
  CommunicationAdminRoomMembershipResult?: CommunicationAdminRoomMembershipResultResolvers<ContextType>;
  CommunicationAdminRoomResult?: CommunicationAdminRoomResultResolvers<ContextType>;
  CommunicationRoom?: CommunicationRoomResolvers<ContextType>;
  Community?: CommunityResolvers<ContextType>;
  CommunityGuidelines?: CommunityGuidelinesResolvers<ContextType>;
  CommunityGuidelinesTemplate?: CommunityGuidelinesTemplateResolvers<ContextType>;
  CommunityPolicy?: CommunityPolicyResolvers<ContextType>;
  CommunityRolePolicy?: CommunityRolePolicyResolvers<ContextType>;
  Config?: ConfigResolvers<ContextType>;
  Context?: ContextResolvers<ContextType>;
  Contributor?: ContributorResolvers<ContextType>;
  ContributorRoles?: ContributorRolesResolvers<ContextType>;
  Credential?: CredentialResolvers<ContextType>;
  CredentialDefinition?: CredentialDefinitionResolvers<ContextType>;
  CredentialMetadataOutput?: CredentialMetadataOutputResolvers<ContextType>;
  DID?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  DirectRoom?: DirectRoomResolvers<ContextType>;
  Discussion?: DiscussionResolvers<ContextType>;
  Document?: DocumentResolvers<ContextType>;
  EcosystemModel?: EcosystemModelResolvers<ContextType>;
  Emoji?: GraphQLScalarType;
  FileStorageConfig?: FileStorageConfigResolvers<ContextType>;
  Form?: FormResolvers<ContextType>;
  FormQuestion?: FormQuestionResolvers<ContextType>;
  Geo?: GeoResolvers<ContextType>;
  Groupable?: GroupableResolvers<ContextType>;
  ISearchResults?: ISearchResultsResolvers<ContextType>;
  IngestBatchResult?: IngestBatchResultResolvers<ContextType>;
  IngestResult?: IngestResultResolvers<ContextType>;
  InnovationFlow?: InnovationFlowResolvers<ContextType>;
  InnovationFlowState?: InnovationFlowStateResolvers<ContextType>;
  InnovationFlowTemplate?: InnovationFlowTemplateResolvers<ContextType>;
  InnovationHub?: InnovationHubResolvers<ContextType>;
  InnovationPack?: InnovationPackResolvers<ContextType>;
  Invitation?: InvitationResolvers<ContextType>;
  InvitationExternal?: InvitationExternalResolvers<ContextType>;
  InvitationForRoleResult?: InvitationForRoleResultResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  LatestReleaseDiscussion?: LatestReleaseDiscussionResolvers<ContextType>;
  Library?: LibraryResolvers<ContextType>;
  License?: LicenseResolvers<ContextType>;
  LicenseFeatureFlag?: LicenseFeatureFlagResolvers<ContextType>;
  LicensePlan?: LicensePlanResolvers<ContextType>;
  LicensePolicy?: LicensePolicyResolvers<ContextType>;
  LicensePolicyRuleFeatureFlag?: LicensePolicyRuleFeatureFlagResolvers<ContextType>;
  Licensing?: LicensingResolvers<ContextType>;
  Lifecycle?: LifecycleResolvers<ContextType>;
  LifecycleDefinition?: GraphQLScalarType;
  Link?: LinkResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  LookupQueryResults?: LookupQueryResultsResolvers<ContextType>;
  Markdown?: GraphQLScalarType;
  MeQueryResults?: MeQueryResultsResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  MessageID?: GraphQLScalarType;
  Metadata?: MetadataResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MySpaceResults?: MySpaceResultsResolvers<ContextType>;
  NVP?: NvpResolvers<ContextType>;
  NameID?: GraphQLScalarType;
  Organization?: OrganizationResolvers<ContextType>;
  OrganizationVerification?: OrganizationVerificationResolvers<ContextType>;
  OryConfig?: OryConfigResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PaginatedOrganization?: PaginatedOrganizationResolvers<ContextType>;
  PaginatedSpaces?: PaginatedSpacesResolvers<ContextType>;
  PaginatedUsers?: PaginatedUsersResolvers<ContextType>;
  Platform?: PlatformResolvers<ContextType>;
  PlatformFeatureFlag?: PlatformFeatureFlagResolvers<ContextType>;
  PlatformLocations?: PlatformLocationsResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostTemplate?: PostTemplateResolvers<ContextType>;
  Preference?: PreferenceResolvers<ContextType>;
  PreferenceDefinition?: PreferenceDefinitionResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  ProfileCredentialVerified?: ProfileCredentialVerifiedResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Question?: QuestionResolvers<ContextType>;
  Reaction?: ReactionResolvers<ContextType>;
  Reference?: ReferenceResolvers<ContextType>;
  Relation?: RelationResolvers<ContextType>;
  RelayPaginatedSpace?: RelayPaginatedSpaceResolvers<ContextType>;
  RelayPaginatedSpaceEdge?: RelayPaginatedSpaceEdgeResolvers<ContextType>;
  RelayPaginatedSpacePageInfo?: RelayPaginatedSpacePageInfoResolvers<ContextType>;
  RolesResult?: RolesResultResolvers<ContextType>;
  RolesResultCommunity?: RolesResultCommunityResolvers<ContextType>;
  RolesResultOrganization?: RolesResultOrganizationResolvers<ContextType>;
  RolesResultSpace?: RolesResultSpaceResolvers<ContextType>;
  Room?: RoomResolvers<ContextType>;
  RoomEventSubscriptionResult?: RoomEventSubscriptionResultResolvers<ContextType>;
  RoomMessageEventSubscriptionResult?: RoomMessageEventSubscriptionResultResolvers<ContextType>;
  RoomMessageReactionEventSubscriptionResult?: RoomMessageReactionEventSubscriptionResultResolvers<ContextType>;
  SearchResult?: SearchResultResolvers<ContextType>;
  SearchResultCallout?: SearchResultCalloutResolvers<ContextType>;
  SearchResultOrganization?: SearchResultOrganizationResolvers<ContextType>;
  SearchResultPost?: SearchResultPostResolvers<ContextType>;
  SearchResultSpace?: SearchResultSpaceResolvers<ContextType>;
  SearchResultUser?: SearchResultUserResolvers<ContextType>;
  SearchResultUserGroup?: SearchResultUserGroupResolvers<ContextType>;
  Sentry?: SentryResolvers<ContextType>;
  ServiceMetadata?: ServiceMetadataResolvers<ContextType>;
  Source?: SourceResolvers<ContextType>;
  Space?: SpaceResolvers<ContextType>;
  SpaceDefaults?: SpaceDefaultsResolvers<ContextType>;
  SpaceSettings?: SpaceSettingsResolvers<ContextType>;
  SpaceSettingsCollaboration?: SpaceSettingsCollaborationResolvers<ContextType>;
  SpaceSettingsMembership?: SpaceSettingsMembershipResolvers<ContextType>;
  SpaceSettingsPrivacy?: SpaceSettingsPrivacyResolvers<ContextType>;
  StorageAggregator?: StorageAggregatorResolvers<ContextType>;
  StorageAggregatorParent?: StorageAggregatorParentResolvers<ContextType>;
  StorageBucket?: StorageBucketResolvers<ContextType>;
  StorageBucketParent?: StorageBucketParentResolvers<ContextType>;
  StorageConfig?: StorageConfigResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  SubspaceCreated?: SubspaceCreatedResolvers<ContextType>;
  Tagset?: TagsetResolvers<ContextType>;
  TagsetTemplate?: TagsetTemplateResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  TemplatesSet?: TemplatesSetResolvers<ContextType>;
  Timeline?: TimelineResolvers<ContextType>;
  UUID?: GraphQLScalarType;
  UUID_NAMEID?: GraphQLScalarType;
  UUID_NAMEID_EMAIL?: GraphQLScalarType;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserGroup?: UserGroupResolvers<ContextType>;
  VerifiedCredential?: VerifiedCredentialResolvers<ContextType>;
  VerifiedCredentialClaim?: VerifiedCredentialClaimResolvers<ContextType>;
  VirtualContributor?: VirtualContributorResolvers<ContextType>;
  VirtualPersona?: VirtualPersonaResolvers<ContextType>;
  VirtualPersonaResult?: VirtualPersonaResultResolvers<ContextType>;
  Visual?: VisualResolvers<ContextType>;
  Whiteboard?: WhiteboardResolvers<ContextType>;
  WhiteboardContent?: GraphQLScalarType;
  WhiteboardTemplate?: WhiteboardTemplateResolvers<ContextType>;
};

export type AuthorizationPolicyResetOnAccountMutationVariables = Exact<{
  authorizationResetData: AccountAuthorizationResetInput;
}>;

export type AuthorizationPolicyResetOnAccountMutation = {
  authorizationPolicyResetOnAccount: { id: string };
};

export type AuthorizationPolicyResetOnOrganizationMutationVariables = Exact<{
  authorizationResetData: OrganizationAuthorizationResetInput;
}>;

export type AuthorizationPolicyResetOnOrganizationMutation = {
  authorizationPolicyResetOnOrganization: { nameID: string };
};

export type AuthorizationPolicyResetOnPlatformMutationVariables = Exact<{
  [key: string]: never;
}>;

export type AuthorizationPolicyResetOnPlatformMutation = {
  authorizationPolicyResetOnPlatform: { id: string };
};

export type AuthorizationPolicyResetOnUserMutationVariables = Exact<{
  authorizationResetData: UserAuthorizationResetInput;
}>;

export type AuthorizationPolicyResetOnUserMutation = {
  authorizationPolicyResetOnUser: { nameID: string };
};

export type CreateCalloutOnCollaborationMutationVariables = Exact<{
  data: CreateCalloutOnCollaborationInput;
}>;

export type CreateCalloutOnCollaborationMutation = {
  createCalloutOnCollaboration: {
    id: string;
    type: CalloutType;
    nameID: string;
  };
};

export type UpdateCommunityApplicationFormMutationVariables = Exact<{
  applicationFormData: UpdateCommunityApplicationFormInput;
}>;

export type UpdateCommunityApplicationFormMutation = {
  updateCommunityApplicationForm: { id: string };
};

export type UpdateCalloutPublishInfoMutationVariables = Exact<{
  data: UpdateCalloutPublishInfoInput;
}>;

export type UpdateCalloutPublishInfoMutation = {
  updateCalloutPublishInfo: { id: string };
};

export type UpdateCalloutMutationVariables = Exact<{
  data: UpdateCalloutInput;
}>;

export type UpdateCalloutMutation = { updateCallout: { id: string } };

export type UpdateVisualMutationVariables = Exact<{
  data: UpdateVisualInput;
}>;

export type UpdateVisualMutation = {
  updateVisual: { id: string; uri: string };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  me: {
    __typename: 'MeQueryResults';
    user?:
      | {
          __typename: 'User';
          id: string;
          nameID: string;
          firstName: string;
          lastName: string;
          email: string;
          gender: string;
          phone: string;
          accountUpn: string;
          agent: {
            __typename: 'Agent';
            id: string;
            did?: string | undefined;
            credentials?:
              | Array<{
                  __typename: 'Credential';
                  type: CredentialType;
                  resourceID: string;
                  id: string;
                }>
              | undefined;
          };
          profile: {
            __typename: 'Profile';
            id: string;
            displayName: string;
            tagline: string;
            description?: any | undefined;
            location?:
              | { __typename: 'Location'; country: string; city: string }
              | undefined;
            visual?:
              | {
                  __typename: 'Visual';
                  id: string;
                  uri: string;
                  name: string;
                  allowedTypes: Array<string>;
                  aspectRatio: number;
                  maxHeight: number;
                  maxWidth: number;
                  minHeight: number;
                  minWidth: number;
                  alternativeText?: string | undefined;
                }
              | undefined;
            references?:
              | Array<{
                  __typename: 'Reference';
                  id: string;
                  name: string;
                  uri: string;
                  description?: string | undefined;
                }>
              | undefined;
            tagsets?:
              | Array<{
                  __typename: 'Tagset';
                  id: string;
                  name: string;
                  tags: Array<string>;
                  allowedValues: Array<string>;
                  type: TagsetType;
                }>
              | undefined;
          };
        }
      | undefined;
  };
};

export type UserDetailsFragment = {
  __typename: 'User';
  id: string;
  nameID: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  accountUpn: string;
  agent: {
    __typename: 'Agent';
    credentials?:
      | Array<{
          __typename: 'Credential';
          type: CredentialType;
          resourceID: string;
        }>
      | undefined;
  };
  profile: {
    __typename: 'Profile';
    id: string;
    displayName: string;
    tagline: string;
    description?: any | undefined;
    location?:
      | { __typename: 'Location'; country: string; city: string }
      | undefined;
    visual?:
      | {
          __typename: 'Visual';
          id: string;
          uri: string;
          name: string;
          allowedTypes: Array<string>;
          aspectRatio: number;
          maxHeight: number;
          maxWidth: number;
          minHeight: number;
          minWidth: number;
          alternativeText?: string | undefined;
        }
      | undefined;
    references?:
      | Array<{
          __typename: 'Reference';
          id: string;
          name: string;
          uri: string;
          description?: string | undefined;
        }>
      | undefined;
    tagsets?:
      | Array<{
          __typename: 'Tagset';
          id: string;
          name: string;
          tags: Array<string>;
          allowedValues: Array<string>;
          type: TagsetType;
        }>
      | undefined;
  };
};

export type VisualFullFragment = {
  __typename: 'Visual';
  id: string;
  uri: string;
  name: string;
  allowedTypes: Array<string>;
  aspectRatio: number;
  maxHeight: number;
  maxWidth: number;
  minHeight: number;
  minWidth: number;
  alternativeText?: string | undefined;
};

export type TagsetDetailsFragment = {
  __typename: 'Tagset';
  id: string;
  name: string;
  tags: Array<string>;
  allowedValues: Array<string>;
  type: TagsetType;
};

export type UserAgentFragment = {
  __typename: 'User';
  agent: {
    __typename: 'Agent';
    id: string;
    did?: string | undefined;
    credentials?:
      | Array<{
          __typename: 'Credential';
          id: string;
          resourceID: string;
          type: CredentialType;
        }>
      | undefined;
  };
};

export type SpacesAllVisibilitiesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type SpacesAllVisibilitiesQuery = {
  spaces: Array<{ id: string; nameID: string; account: { id: string } }>;
};

export type SpaceSubspaceSubspacesQueryVariables = Exact<{
  spaceId: Scalars['UUID_NAMEID'];
  subspaceId: Scalars['UUID_NAMEID'];
}>;

export type SpaceSubspaceSubspacesQuery = {
  space: {
    id: string;
    nameID: string;
    profile: { displayName: string; description?: any | undefined };
    collaboration: { id: string };
    subspace: {
      id: string;
      nameID: string;
      profile: { displayName: string; description?: any | undefined };
      collaboration: {
        id: string;
        callouts: Array<{ id: string; type: CalloutType }>;
      };
      subspaces: Array<{
        nameID: string;
        profile: {
          displayName: string;
          tagline: string;
          description?: any | undefined;
          visuals: Array<{ id: string; name: string; uri: string }>;
          references?:
            | Array<{
                name: string;
                uri: string;
                description?: string | undefined;
              }>
            | undefined;
          tagset?: { tags: Array<string> } | undefined;
        };
        community: {
          leadOrganizations: Array<{
            nameID: string;
            profile: { id: string; displayName: string };
          }>;
          memberOrganizations: Array<{
            nameID: string;
            profile: { id: string; displayName: string };
          }>;
        };
      }>;
    };
  };
};

export type SpaceSubspacesCollaborationQueryVariables = Exact<{
  [key: string]: never;
}>;

export type SpaceSubspacesCollaborationQuery = {
  spaces: Array<{
    id: string;
    nameID: string;
    collaboration: {
      id: string;
      callouts: Array<{ type: CalloutType; id: string }>;
    };
    subspaces: Array<{
      id: string;
      nameID: string;
      collaboration: {
        id: string;
        callouts: Array<{ id: string; type: CalloutType }>;
      };
    }>;
  }>;
};

export type SpaceSubspacesCommunitiesQueryVariables = Exact<{
  spaceId: Scalars['UUID_NAMEID'];
}>;

export type SpaceSubspacesCommunitiesQuery = {
  space: {
    id: string;
    nameID: string;
    community: { id: string };
    subspaces: Array<{ id: string; nameID: string; community: { id: string } }>;
  };
};

export type TaskQueryVariables = Exact<{
  taskId: Scalars['UUID'];
}>;

export type TaskQuery = {
  task: {
    status: TaskStatus;
    results?: Array<string> | undefined;
    errors?: Array<string> | undefined;
  };
};

export type DigitalTwinDemoQueryVariables = Exact<{
  spaceNameID: Scalars['UUID_NAMEID'];
}>;

export type DigitalTwinDemoQuery = {
  space: {
    id: string;
    subspaces: Array<{
      profile: { displayName: string; tagline: string };
      context: { vision?: any | undefined; impact?: any | undefined };
      collaboration: {
        callouts: Array<{
          comments?: { messagesCount: number } | undefined;
          framing: { profile: { displayName: string; tagline: string } };
        }>;
      };
    }>;
  };
};

export type InnovationFlowStatesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type InnovationFlowStatesQuery = {
  spaces: Array<{
    subspaces: Array<{
      collaboration: {
        id: string;
        innovationFlow: { id: string };
        callouts: Array<{
          nameID: string;
          framing: {
            profile: {
              id: string;
              tagsets?: Array<{ name: string }> | undefined;
            };
          };
        }>;
      };
      subspaces: Array<{
        collaboration: {
          innovationFlow: { id: string };
          callouts: Array<{
            nameID: string;
            framing: {
              profile: {
                id: string;
                tagsets?: Array<{ name: string }> | undefined;
              };
            };
          }>;
        };
      }>;
    }>;
  }>;
};

export type RevokeCredentialFromUserMutationVariables = Exact<{
  revokeCredentialData: RevokeAuthorizationCredentialInput;
}>;

export type RevokeCredentialFromUserMutation = {
  revokeCredentialFromUser: { id: string };
};

export type SpacesChallengesOpportunitiesIdsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type SpacesChallengesOpportunitiesIdsQuery = {
  spaces: Array<{
    id: string;
    nameID: string;
    subspaces: Array<{
      id: string;
      nameID: string;
      subspaces: Array<{ id: string; nameID: string }>;
    }>;
  }>;
};

export type UsersWithCredentialsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type UsersWithCredentialsQuery = {
  users: Array<{
    id: string;
    nameID: string;
    agent: {
      id: string;
      credentials?:
        | Array<{ id: string; type: CredentialType; resourceID: string }>
        | undefined;
    };
  }>;
};

export type AdminSearchIngestFromScratchMutationVariables = Exact<{
  [key: string]: never;
}>;

export type AdminSearchIngestFromScratchMutation = {
  adminSearchIngestFromScratch: string;
};

export type SpacesLicenseUsageExcelQueryVariables = Exact<{
  [key: string]: never;
}>;

export type SpacesLicenseUsageExcelQuery = {
  spaces: Array<{
    id: string;
    nameID: string;
    profile: { displayName: string };
    account: {
      id: string;
      license: {
        visibility: SpaceVisibility;
        featureFlags: Array<{ name: LicenseFeatureFlagName; enabled: boolean }>;
      };
      host?:
        | { id: string; profile: { displayName: string } }
        | { id: string; profile: { displayName: string } }
        | { id: string; profile: { displayName: string } }
        | undefined;
    };
    community: {
      id: string;
      usersInRole: Array<{ profile: { displayName: string } }>;
    };
    subspaces: Array<{ id: string }>;
  }>;
};

export const VisualFullFragmentDoc = gql`
  fragment VisualFull on Visual {
    id
    uri
    name
    allowedTypes
    aspectRatio
    maxHeight
    maxWidth
    minHeight
    minWidth
    alternativeText
    __typename
  }
`;
export const TagsetDetailsFragmentDoc = gql`
  fragment TagsetDetails on Tagset {
    id
    name
    tags
    allowedValues
    type
    __typename
  }
`;
export const UserDetailsFragmentDoc = gql`
  fragment UserDetails on User {
    id
    nameID
    firstName
    lastName
    email
    gender
    phone
    accountUpn
    agent {
      credentials {
        type
        resourceID
        __typename
      }
      __typename
    }
    profile {
      id
      displayName
      tagline
      location {
        country
        city
        __typename
      }
      description
      visual(type: AVATAR) {
        ...VisualFull
        __typename
      }
      references {
        id
        name
        uri
        description
        __typename
      }
      tagsets {
        ...TagsetDetails
        __typename
      }
      __typename
    }
    __typename
  }
  ${VisualFullFragmentDoc}
  ${TagsetDetailsFragmentDoc}
`;
export const UserAgentFragmentDoc = gql`
  fragment UserAgent on User {
    agent {
      id
      did
      credentials {
        id
        resourceID
        type
        __typename
      }
      __typename
    }
    __typename
  }
`;
export const AuthorizationPolicyResetOnAccountDocument = gql`
  mutation authorizationPolicyResetOnAccount(
    $authorizationResetData: AccountAuthorizationResetInput!
  ) {
    authorizationPolicyResetOnAccount(
      authorizationResetData: $authorizationResetData
    ) {
      id
    }
  }
`;
export const AuthorizationPolicyResetOnOrganizationDocument = gql`
  mutation authorizationPolicyResetOnOrganization(
    $authorizationResetData: OrganizationAuthorizationResetInput!
  ) {
    authorizationPolicyResetOnOrganization(
      authorizationResetData: $authorizationResetData
    ) {
      nameID
    }
  }
`;
export const AuthorizationPolicyResetOnPlatformDocument = gql`
  mutation authorizationPolicyResetOnPlatform {
    authorizationPolicyResetOnPlatform {
      id
    }
  }
`;
export const AuthorizationPolicyResetOnUserDocument = gql`
  mutation authorizationPolicyResetOnUser(
    $authorizationResetData: UserAuthorizationResetInput!
  ) {
    authorizationPolicyResetOnUser(
      authorizationResetData: $authorizationResetData
    ) {
      nameID
    }
  }
`;
export const CreateCalloutOnCollaborationDocument = gql`
  mutation createCalloutOnCollaboration(
    $data: CreateCalloutOnCollaborationInput!
  ) {
    createCalloutOnCollaboration(calloutData: $data) {
      id
      type
      nameID
    }
  }
`;
export const UpdateCommunityApplicationFormDocument = gql`
  mutation updateCommunityApplicationForm(
    $applicationFormData: UpdateCommunityApplicationFormInput!
  ) {
    updateCommunityApplicationForm(applicationFormData: $applicationFormData) {
      id
    }
  }
`;
export const UpdateCalloutPublishInfoDocument = gql`
  mutation updateCalloutPublishInfo($data: UpdateCalloutPublishInfoInput!) {
    updateCalloutPublishInfo(calloutData: $data) {
      id
    }
  }
`;
export const UpdateCalloutDocument = gql`
  mutation updateCallout($data: UpdateCalloutInput!) {
    updateCallout(calloutData: $data) {
      id
    }
  }
`;
export const UpdateVisualDocument = gql`
  mutation updateVisual($data: UpdateVisualInput!) {
    updateVisual(updateData: $data) {
      id
      uri
    }
  }
`;
export const MeDocument = gql`
  query me {
    me {
      user {
        ...UserDetails
        ...UserAgent
        __typename
      }
      __typename
    }
  }
  ${UserDetailsFragmentDoc}
  ${UserAgentFragmentDoc}
`;
export const SpacesAllVisibilitiesDocument = gql`
  query spacesAllVisibilities {
    spaces(filter: { visibilities: [DEMO, ARCHIVED, ACTIVE] }) {
      id
      nameID
      account {
        id
      }
    }
  }
`;
export const SpaceSubspaceSubspacesDocument = gql`
  query spaceSubspaceSubspaces(
    $spaceId: UUID_NAMEID!
    $subspaceId: UUID_NAMEID!
  ) {
    space(ID: $spaceId) {
      id
      nameID
      profile {
        displayName
        description
      }
      collaboration {
        id
      }
      subspace(ID: $subspaceId) {
        id
        nameID
        profile {
          displayName
          description
        }
        collaboration {
          id
          callouts {
            id
            type
          }
        }
        subspaces {
          nameID
          profile {
            displayName
            tagline
            description
            visuals {
              id
              name
              uri
            }
            references {
              name
              uri
              description
            }
            tagset {
              tags
            }
          }
          community {
            leadOrganizations: organizationsInRole(role: LEAD) {
              nameID
              profile {
                id
                displayName
              }
            }
            memberOrganizations: organizationsInRole(role: MEMBER) {
              nameID
              profile {
                id
                displayName
              }
            }
          }
        }
      }
    }
  }
`;
export const SpaceSubspacesCollaborationDocument = gql`
  query spaceSubspacesCollaboration {
    spaces {
      id
      nameID
      collaboration {
        id
        callouts {
          type
          id
        }
      }
      subspaces {
        id
        nameID
        collaboration {
          id
          callouts {
            id
            type
          }
        }
      }
    }
  }
`;
export const SpaceSubspacesCommunitiesDocument = gql`
  query spaceSubspacesCommunities($spaceId: UUID_NAMEID!) {
    space(ID: $spaceId) {
      id
      nameID
      community {
        id
      }
      subspaces {
        id
        nameID
        community {
          id
        }
      }
    }
  }
`;
export const TaskDocument = gql`
  query task($taskId: UUID!) {
    task(id: $taskId) {
      status
      results
      errors
    }
  }
`;
export const DigitalTwinDemoDocument = gql`
  query digitalTwinDemo($spaceNameID: UUID_NAMEID!) {
    space(ID: $spaceNameID) {
      id
      subspaces {
        profile {
          displayName
          tagline
        }
        context {
          vision
          impact
        }
        collaboration {
          callouts {
            comments {
              messagesCount
            }
            framing {
              profile {
                displayName
                tagline
              }
            }
          }
        }
      }
    }
  }
`;
export const InnovationFlowStatesDocument = gql`
  query innovationFlowStates {
    spaces(filter: { visibilities: [DEMO, ARCHIVED, ACTIVE] }) {
      subspaces {
        collaboration {
          id
          innovationFlow {
            id
          }
          callouts {
            nameID
            framing {
              profile {
                id
                tagsets {
                  name
                }
              }
            }
          }
        }
        subspaces {
          collaboration {
            innovationFlow {
              id
            }
            callouts {
              nameID
              framing {
                profile {
                  id
                  tagsets {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const RevokeCredentialFromUserDocument = gql`
  mutation revokeCredentialFromUser(
    $revokeCredentialData: RevokeAuthorizationCredentialInput!
  ) {
    revokeCredentialFromUser(revokeCredentialData: $revokeCredentialData) {
      id
    }
  }
`;
export const SpacesChallengesOpportunitiesIdsDocument = gql`
  query spacesChallengesOpportunitiesIds {
    spaces(filter: { visibilities: [ARCHIVED, ACTIVE, DEMO] }) {
      id
      nameID
      subspaces {
        id
        nameID
        subspaces {
          id
          nameID
        }
      }
    }
  }
`;
export const UsersWithCredentialsDocument = gql`
  query usersWithCredentials {
    users {
      id
      nameID
      agent {
        id
        credentials {
          id
          type
          resourceID
        }
      }
    }
  }
`;
export const AdminSearchIngestFromScratchDocument = gql`
  mutation adminSearchIngestFromScratch {
    adminSearchIngestFromScratch
  }
`;
export const SpacesLicenseUsageExcelDocument = gql`
  query spacesLicenseUsageExcel {
    spaces(filter: { visibilities: [DEMO, ARCHIVED, ACTIVE] }) {
      id
      nameID
      profile {
        displayName
      }
      account {
        id
        license {
          visibility
          featureFlags {
            name
            enabled
          }
        }
        host {
          id
          profile {
            displayName
          }
        }
      }
      community {
        id
        usersInRole(role: MEMBER) {
          profile {
            displayName
          }
        }
      }
      subspaces {
        id
      }
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType
) => action();
const AuthorizationPolicyResetOnAccountDocumentString = print(
  AuthorizationPolicyResetOnAccountDocument
);
const AuthorizationPolicyResetOnOrganizationDocumentString = print(
  AuthorizationPolicyResetOnOrganizationDocument
);
const AuthorizationPolicyResetOnPlatformDocumentString = print(
  AuthorizationPolicyResetOnPlatformDocument
);
const AuthorizationPolicyResetOnUserDocumentString = print(
  AuthorizationPolicyResetOnUserDocument
);
const CreateCalloutOnCollaborationDocumentString = print(
  CreateCalloutOnCollaborationDocument
);
const UpdateCommunityApplicationFormDocumentString = print(
  UpdateCommunityApplicationFormDocument
);
const UpdateCalloutPublishInfoDocumentString = print(
  UpdateCalloutPublishInfoDocument
);
const UpdateCalloutDocumentString = print(UpdateCalloutDocument);
const UpdateVisualDocumentString = print(UpdateVisualDocument);
const MeDocumentString = print(MeDocument);
const SpacesAllVisibilitiesDocumentString = print(
  SpacesAllVisibilitiesDocument
);
const SpaceSubspaceSubspacesDocumentString = print(
  SpaceSubspaceSubspacesDocument
);
const SpaceSubspacesCollaborationDocumentString = print(
  SpaceSubspacesCollaborationDocument
);
const SpaceSubspacesCommunitiesDocumentString = print(
  SpaceSubspacesCommunitiesDocument
);
const TaskDocumentString = print(TaskDocument);
const DigitalTwinDemoDocumentString = print(DigitalTwinDemoDocument);
const InnovationFlowStatesDocumentString = print(InnovationFlowStatesDocument);
const RevokeCredentialFromUserDocumentString = print(
  RevokeCredentialFromUserDocument
);
const SpacesChallengesOpportunitiesIdsDocumentString = print(
  SpacesChallengesOpportunitiesIdsDocument
);
const UsersWithCredentialsDocumentString = print(UsersWithCredentialsDocument);
const AdminSearchIngestFromScratchDocumentString = print(
  AdminSearchIngestFromScratchDocument
);
const SpacesLicenseUsageExcelDocumentString = print(
  SpacesLicenseUsageExcelDocument
);
export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    authorizationPolicyResetOnAccount(
      variables: AuthorizationPolicyResetOnAccountMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: AuthorizationPolicyResetOnAccountMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<AuthorizationPolicyResetOnAccountMutation>(
            AuthorizationPolicyResetOnAccountDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'authorizationPolicyResetOnAccount',
        'mutation'
      );
    },
    authorizationPolicyResetOnOrganization(
      variables: AuthorizationPolicyResetOnOrganizationMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: AuthorizationPolicyResetOnOrganizationMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<AuthorizationPolicyResetOnOrganizationMutation>(
            AuthorizationPolicyResetOnOrganizationDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'authorizationPolicyResetOnOrganization',
        'mutation'
      );
    },
    authorizationPolicyResetOnPlatform(
      variables?: AuthorizationPolicyResetOnPlatformMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: AuthorizationPolicyResetOnPlatformMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<AuthorizationPolicyResetOnPlatformMutation>(
            AuthorizationPolicyResetOnPlatformDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'authorizationPolicyResetOnPlatform',
        'mutation'
      );
    },
    authorizationPolicyResetOnUser(
      variables: AuthorizationPolicyResetOnUserMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: AuthorizationPolicyResetOnUserMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<AuthorizationPolicyResetOnUserMutation>(
            AuthorizationPolicyResetOnUserDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'authorizationPolicyResetOnUser',
        'mutation'
      );
    },
    createCalloutOnCollaboration(
      variables: CreateCalloutOnCollaborationMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: CreateCalloutOnCollaborationMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<CreateCalloutOnCollaborationMutation>(
            CreateCalloutOnCollaborationDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'createCalloutOnCollaboration',
        'mutation'
      );
    },
    updateCommunityApplicationForm(
      variables: UpdateCommunityApplicationFormMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: UpdateCommunityApplicationFormMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<UpdateCommunityApplicationFormMutation>(
            UpdateCommunityApplicationFormDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'updateCommunityApplicationForm',
        'mutation'
      );
    },
    updateCalloutPublishInfo(
      variables: UpdateCalloutPublishInfoMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: UpdateCalloutPublishInfoMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<UpdateCalloutPublishInfoMutation>(
            UpdateCalloutPublishInfoDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'updateCalloutPublishInfo',
        'mutation'
      );
    },
    updateCallout(
      variables: UpdateCalloutMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: UpdateCalloutMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<UpdateCalloutMutation>(
            UpdateCalloutDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'updateCallout',
        'mutation'
      );
    },
    updateVisual(
      variables: UpdateVisualMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: UpdateVisualMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<UpdateVisualMutation>(
            UpdateVisualDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'updateVisual',
        'mutation'
      );
    },
    me(
      variables?: MeQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: MeQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<MeQuery>(MeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'me',
        'query'
      );
    },
    spacesAllVisibilities(
      variables?: SpacesAllVisibilitiesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SpacesAllVisibilitiesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SpacesAllVisibilitiesQuery>(
            SpacesAllVisibilitiesDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'spacesAllVisibilities',
        'query'
      );
    },
    spaceSubspaceSubspaces(
      variables: SpaceSubspaceSubspacesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SpaceSubspaceSubspacesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SpaceSubspaceSubspacesQuery>(
            SpaceSubspaceSubspacesDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'spaceSubspaceSubspaces',
        'query'
      );
    },
    spaceSubspacesCollaboration(
      variables?: SpaceSubspacesCollaborationQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SpaceSubspacesCollaborationQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SpaceSubspacesCollaborationQuery>(
            SpaceSubspacesCollaborationDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'spaceSubspacesCollaboration',
        'query'
      );
    },
    spaceSubspacesCommunities(
      variables: SpaceSubspacesCommunitiesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SpaceSubspacesCommunitiesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SpaceSubspacesCommunitiesQuery>(
            SpaceSubspacesCommunitiesDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'spaceSubspacesCommunities',
        'query'
      );
    },
    task(
      variables: TaskQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: TaskQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<TaskQuery>(TaskDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'task',
        'query'
      );
    },
    digitalTwinDemo(
      variables: DigitalTwinDemoQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: DigitalTwinDemoQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<DigitalTwinDemoQuery>(
            DigitalTwinDemoDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'digitalTwinDemo',
        'query'
      );
    },
    innovationFlowStates(
      variables?: InnovationFlowStatesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: InnovationFlowStatesQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<InnovationFlowStatesQuery>(
            InnovationFlowStatesDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'innovationFlowStates',
        'query'
      );
    },
    revokeCredentialFromUser(
      variables: RevokeCredentialFromUserMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: RevokeCredentialFromUserMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<RevokeCredentialFromUserMutation>(
            RevokeCredentialFromUserDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'revokeCredentialFromUser',
        'mutation'
      );
    },
    spacesChallengesOpportunitiesIds(
      variables?: SpacesChallengesOpportunitiesIdsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SpacesChallengesOpportunitiesIdsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SpacesChallengesOpportunitiesIdsQuery>(
            SpacesChallengesOpportunitiesIdsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'spacesChallengesOpportunitiesIds',
        'query'
      );
    },
    usersWithCredentials(
      variables?: UsersWithCredentialsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: UsersWithCredentialsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<UsersWithCredentialsQuery>(
            UsersWithCredentialsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'usersWithCredentials',
        'query'
      );
    },
    adminSearchIngestFromScratch(
      variables?: AdminSearchIngestFromScratchMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: AdminSearchIngestFromScratchMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<AdminSearchIngestFromScratchMutation>(
            AdminSearchIngestFromScratchDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'adminSearchIngestFromScratch',
        'mutation'
      );
    },
    spacesLicenseUsageExcel(
      variables?: SpacesLicenseUsageExcelQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<{
      data: SpacesLicenseUsageExcelQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.rawRequest<SpacesLicenseUsageExcelQuery>(
            SpacesLicenseUsageExcelDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'spacesLicenseUsageExcel',
        'query'
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
