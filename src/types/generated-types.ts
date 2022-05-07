export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Admin = {
  __typename?: 'Admin';
  avatarImageUrl?: Maybe<Scalars['String']>;
  blocks: BlocksConnection;
  createdAt: Scalars['String'];
  credential?: Maybe<ICredential>;
  credentials: ICredentialsConnection;
  deletes: DeletesConnection;
  folds: FoldsConnection;
  id: Scalars['String'];
  lastLoginedAt: Scalars['String'];
  name: Scalars['String'];
  pins: PinsConnection;
  privileges: PrivilegesConnection;
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
};


export type AdminBlocksArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type AdminCredentialsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type AdminDeletesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type AdminFoldsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type AdminPinsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type AdminPrivilegesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};

export type AdminAndUserUnion = Admin | User;

export type AdminAndUserWithPrivatePropsUnion = Admin | UserWithPrivateProps;

export type AdminEdge = {
  __typename?: 'AdminEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Admin>;
};

export type AdminPageInfo = {
  __typename?: 'AdminPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type AdminsConnection = {
  __typename?: 'AdminsConnection';
  edges: Array<AdminEdge>;
  pageInfo: AdminPageInfo;
  totalCount: Scalars['Int'];
};

export type Anonymous = {
  __typename?: 'Anonymous';
  createdAt: Scalars['String'];
  creator?: Maybe<User>;
  id: Scalars['String'];
  subCampus?: Maybe<Scalars['String']>;
  to: PostAndCommentUnion;
  watermark: Scalars['String'];
};

export type Authenable = {
  createdAt: Scalars['String'];
  delete?: Maybe<Delete>;
  id: Scalars['String'];
  roles: RolesConnection;
  to: User;
};


export type AuthenableRolesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};

export type AuthenticationInfo = {
  avatarImageUrl: Scalars['String'];
  college: Scalars['String'];
  gender: Gender;
  grade: Scalars['String'];
  images: Array<Scalars['String']>;
  name: Scalars['String'];
  roles?: InputMaybe<Array<Scalars['String']>>;
  school: Scalars['String'];
  studentId: Scalars['Float'];
  subCampus: Scalars['String'];
};

export type AvatarImageUploadCredentialInfo = {
  __typename?: 'AvatarImageUploadCredentialInfo';
  bucket: Scalars['String'];
  expiration: Scalars['String'];
  expiredTime: Scalars['Int'];
  key: Scalars['String'];
  region: Scalars['String'];
  sessionToken: Scalars['String'];
  startTime: Scalars['Int'];
  tmpSecretId: Scalars['String'];
  tmpSecretKey: Scalars['String'];
};

export type Block = {
  __typename?: 'Block';
  createdAt: Scalars['String'];
  creator: Admin;
  description: Scalars['String'];
  id: Scalars['String'];
  to: User;
};

export type BlockEdge = {
  __typename?: 'BlockEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Block>;
};

export type BlockPageInfo = {
  __typename?: 'BlockPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type BlocksConnection = {
  __typename?: 'BlocksConnection';
  edges: Array<BlockEdge>;
  pageInfo: BlockPageInfo;
  totalCount: Scalars['Int'];
};

export enum Code2Session_Grant_Type {
  BlankSpace = 'BLANK_SPACE',
  Curriculum = 'CURRICULUM'
}

export enum Conversation_State {
  Close = 'CLOSE',
  Running = 'RUNNING'
}

export type CensorDetail = {
  __typename?: 'CensorDetail';
  abuse?: Maybe<Array<Scalars['String']>>;
  ad?: Maybe<Array<Scalars['String']>>;
  contraband?: Maybe<Array<Scalars['String']>>;
  politics?: Maybe<Array<Scalars['String']>>;
  porn?: Maybe<Array<Scalars['String']>>;
};

export type CensorResponse = {
  __typename?: 'CensorResponse';
  detail: CensorDetail;
  suggestion: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  anonymous?: Maybe<Anonymous>;
  comments: CommentsConnection;
  commentsWithRelay: CommentsConnectionWithRelay;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  creator?: Maybe<User>;
  delete?: Maybe<Delete>;
  id: Scalars['String'];
  images?: Maybe<Array<Scalars['String']>>;
  mentions: MentionsConnection;
  reports: ReportsConnection;
  to: CommentToUnion;
  trendingComments: CommentsConnection;
  votes: VotesConnection;
};


export type CommentCommentsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type CommentCommentsWithRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type CommentMentionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type CommentReportsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type CommentTrendingCommentsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type CommentVotesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type CommentEdge = {
  __typename?: 'CommentEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Comment>;
};

export type CommentPageInfo = {
  __typename?: 'CommentPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type CommentToUnion = Anonymous | Comment | Post | User;

export type CommentsConnection = {
  __typename?: 'CommentsConnection';
  nodes: Array<Comment>;
  totalCount: Scalars['Int'];
};

export type CommentsConnectionWithRelay = {
  __typename?: 'CommentsConnectionWithRelay';
  edges: Array<CommentEdge>;
  pageInfo: CommentPageInfo;
  totalCount: Scalars['Int'];
};

export type Conversation = Node & {
  __typename?: 'Conversation';
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['String'];
  messages: MessageItemConnection;
  participants: ParticipantsConnection;
  state: Conversation_State;
  title: Scalars['String'];
};


export type ConversationMessagesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type ConversationParticipantsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type ConversationsConnection = {
  __typename?: 'ConversationsConnection';
  nodes: Array<Conversation>;
  totalCount: Scalars['Int'];
};

export type CredentialToUnion = Admin | User;

export enum Deadline_Type {
  AutoImport = 'AUTO_IMPORT',
  UserCreate = 'USER_CREATE'
}

export type Deadline = {
  __typename?: 'Deadline';
  courseName: Scalars['String'];
  createdAt: Scalars['String'];
  endDate: Scalars['String'];
  id: Scalars['String'];
  lesson: Lesson;
  startDate: Scalars['String'];
  title: Scalars['String'];
  type: Deadline_Type;
};

export type DeadlineEdge = {
  __typename?: 'DeadlineEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Deadline>;
};

export type DeadlinePageInfo = {
  __typename?: 'DeadlinePageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type DeadlinesConnection = {
  __typename?: 'DeadlinesConnection';
  edges: Array<DeadlineEdge>;
  pageInfo: DeadlinePageInfo;
  totalCount: Scalars['Int'];
};

export type Delete = {
  __typename?: 'Delete';
  createdAt: Scalars['String'];
  creator: Admin;
  id: Scalars['String'];
  to: DeletedUnion;
};

export type DeleteEdge = {
  __typename?: 'DeleteEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Delete>;
};

export type DeletePageInfo = {
  __typename?: 'DeletePageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type DeletedUnion = Comment | Post | Subject | UserAuthenInfo;

export type DeletesConnection = {
  __typename?: 'DeletesConnection';
  edges: Array<DeleteEdge>;
  pageInfo: DeletePageInfo;
  totalCount: Scalars['Int'];
};

export type Fold = {
  __typename?: 'Fold';
  createdAt: Scalars['String'];
  creator: Admin;
  id: Scalars['String'];
  to: Comment;
};

export type FoldEdge = {
  __typename?: 'FoldEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Fold>;
};

export type FoldPageInfo = {
  __typename?: 'FoldPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type FoldsConnection = {
  __typename?: 'FoldsConnection';
  edges: Array<FoldEdge>;
  pageInfo: FoldPageInfo;
  totalCount: Scalars['Int'];
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  None = 'NONE'
}

export type GetUnlimitedWXacodeArgsLineColor = {
  b?: InputMaybe<Scalars['Int']>;
  g?: InputMaybe<Scalars['Int']>;
  r?: InputMaybe<Scalars['Int']>;
};

export type Hashtag = {
  __typename?: 'Hashtag';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  posts: PostsConnection;
  title: Scalars['String'];
};


export type HashtagPostsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};

export type HashtagEdge = {
  __typename?: 'HashtagEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Hashtag>;
};

export type HashtagPageInfo = {
  __typename?: 'HashtagPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type HashtagsConnection = {
  __typename?: 'HashtagsConnection';
  edges: Array<HashtagEdge>;
  pageInfo: HashtagPageInfo;
  totalCount: Scalars['Int'];
};

export type ICredential = {
  __typename?: 'ICredential';
  createdAt: Scalars['String'];
  creator: Admin;
  id: Scalars['String'];
  to?: Maybe<CredentialToUnion>;
};

export type ICredentialEdge = {
  __typename?: 'ICredentialEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<ICredential>;
};

export type ICredentialPageInfo = {
  __typename?: 'ICredentialPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type ICredentialsConnection = {
  __typename?: 'ICredentialsConnection';
  edges: Array<ICredentialEdge>;
  pageInfo: ICredentialPageInfo;
  totalCount: Scalars['Int'];
};

export enum Iprivilege {
  AdminCanAcceptReport = 'ADMIN_CAN_ACCEPT_REPORT',
  AdminCanAddBlockOnUser = 'ADMIN_CAN_ADD_BLOCK_ON_USER',
  AdminCanAddFoldOnComment = 'ADMIN_CAN_ADD_FOLD_ON_COMMENT',
  AdminCanAddPinOnPost = 'ADMIN_CAN_ADD_PIN_ON_POST',
  AdminCanAuthenOther = 'ADMIN_CAN_AUTHEN_OTHER',
  AdminCanAuthenUser = 'ADMIN_CAN_AUTHEN_USER',
  AdminCanCreateAdmin = 'ADMIN_CAN_CREATE_ADMIN',
  AdminCanCreateUser = 'ADMIN_CAN_CREATE_USER',
  AdminCanDeleteAdmin = 'ADMIN_CAN_DELETE_ADMIN',
  AdminCanDeleteSubject = 'ADMIN_CAN_DELETE_SUBJECT',
  AdminCanDeleteUser = 'ADMIN_CAN_DELETE_USER',
  AdminCanRejectReport = 'ADMIN_CAN_REJECT_REPORT',
  AdminCanRemoveBlockOnUser = 'ADMIN_CAN_REMOVE_BLOCK_ON_USER',
  AdminCanRemovePinOnPost = 'ADMIN_CAN_REMOVE_PIN_ON_POST',
  AdminCanUpdateUser = 'ADMIN_CAN_UPDATE_USER',
  AdminCanViewState = 'ADMIN_CAN_VIEW_STATE',
  Root = 'ROOT',
  UserCanCreateSubject = 'USER_CAN_CREATE_SUBJECT'
}

export type ImagesUploadCredentialInfo = {
  __typename?: 'ImagesUploadCredentialInfo';
  bucket: Scalars['String'];
  expiration: Scalars['String'];
  expiredTime: Scalars['Int'];
  keys: Array<Scalars['String']>;
  region: Scalars['String'];
  sessionToken: Scalars['String'];
  startTime: Scalars['Int'];
  tmpSecretId: Scalars['String'];
  tmpSecretKey: Scalars['String'];
};

export type KeywordsExtractionResult = {
  __typename?: 'KeywordsExtractionResult';
  score: Scalars['Float'];
  word: Scalars['String'];
};

export type Lesson = {
  __typename?: 'Lesson';
  circle: Array<Scalars['Int']>;
  createdAt: Scalars['String'];
  dayOfWeek: Array<Scalars['Int']>;
  deadlines: DeadlinesConnection;
  description: Scalars['String'];
  destination: Scalars['String'];
  educatorName: Scalars['String'];
  end: Scalars['Int'];
  id: Scalars['String'];
  lessonId: Scalars['String'];
  name: Scalars['String'];
  start: Scalars['Int'];
};


export type LessonDeadlinesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};

export type LessonEdge = {
  __typename?: 'LessonEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Lesson>;
};

export type LessonPageInfo = {
  __typename?: 'LessonPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type LessonsConnection = {
  __typename?: 'LessonsConnection';
  edges: Array<LessonEdge>;
  pageInfo: LessonPageInfo;
  totalCount: Scalars['Int'];
};

export type LoginResult = Node & Person & {
  __typename?: 'LoginResult';
  authenInfo?: Maybe<UserAuthenInfo>;
  avatarImageUrl?: Maybe<Scalars['String']>;
  college?: Maybe<Scalars['String']>;
  comments: CommentsConnection;
  commentsWithRelay: CommentsConnectionWithRelay;
  conversations: ConversationsConnection;
  createdAt: Scalars['String'];
  credential?: Maybe<ICredential>;
  deadlines: DeadlinesConnection;
  gender?: Maybe<Gender>;
  grade?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastLoginedAt: Scalars['String'];
  lessons: LessonsConnection;
  name: Scalars['String'];
  openId: Scalars['String'];
  posts: PostsConnection;
  postsWithRelay: PostsConnectionWithRelay;
  privileges: PrivilegesConnection;
  replyNotifications?: Maybe<NotificationsConnection>;
  reports: ReportsConnection;
  roles: RolesConnection;
  school?: Maybe<Scalars['String']>;
  studentId?: Maybe<Scalars['Int']>;
  subCampus?: Maybe<Scalars['String']>;
  subjects: SubjectsConnection;
  token: Scalars['String'];
  unionId: Scalars['String'];
  updatedAt: Scalars['String'];
  upvoteNotifications?: Maybe<VoteWithUnreadCountsConnection>;
  userId: Scalars['String'];
  votes: VotesConnection;
  votesWithRelay: VotesConnectionWithRelay;
};


export type LoginResultCommentsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type LoginResultCommentsWithRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type LoginResultConversationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type LoginResultDeadlinesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type LoginResultLessonsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type LoginResultPostsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type LoginResultPostsWithRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type LoginResultPrivilegesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type LoginResultReplyNotificationsArgs = {
  actions?: InputMaybe<Array<Notification_Action>>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
  type?: InputMaybe<Notification_Type>;
};


export type LoginResultReportsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type LoginResultRolesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type LoginResultSubjectsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type LoginResultUpvoteNotificationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
  type?: InputMaybe<Notification_Type>;
};


export type LoginResultVotesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type LoginResultVotesWithRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};

export type Mention = {
  __typename?: 'Mention';
  about: PostAndCommentUnion;
  createdAt: Scalars['String'];
  creator: User;
  id: Scalars['String'];
  to: User;
};

export type MentionEdge = {
  __typename?: 'MentionEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Mention>;
};

export type MentionPageInfo = {
  __typename?: 'MentionPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type MentionsConnection = {
  __typename?: 'MentionsConnection';
  edges: Array<MentionEdge>;
  pageInfo: MentionPageInfo;
  totalCount: Scalars['Int'];
};

export type Message = Node & {
  __typename?: 'Message';
  content: Scalars['String'];
  conversation: Conversation;
  createdAt: Scalars['String'];
  creator: MessageCreatorUnion;
  id: Scalars['String'];
};

export type MessageCreatorUnion = Admin | User;

export type MessageItem = Message | Report;

export type MessageItemConnection = {
  __typename?: 'MessageItemConnection';
  nodes: Array<MessageItem>;
  totalCount: Scalars['Int'];
};

export type MpTemplateMsg = {
  appid: Scalars['String'];
  data: Scalars['String'];
  miniprograme: Scalars['String'];
  template_id: Scalars['String'];
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptReport: Scalars['Boolean'];
  addBlockOnUser: Block;
  addCommentOnComment: Comment;
  addCommentOnPost: Comment;
  addCommentOnUser: Comment;
  addDeadline: Deadline;
  addFoldOnComment: Fold;
  addLesson: Lesson;
  addMentionOnUser: Mention;
  addMessageOnConversation: Message;
  addPinOnPost: Pin;
  addPrivilegeOnAdmin: Privilege;
  addPrivilegeOnUser: Privilege;
  addReportOnComment: Report;
  addReportOnPost: Report;
  addReportOnUser: Report;
  addRoleOnUser: User;
  addUpvoteOnComment: Comment;
  addUpvoteOnPost: Post;
  addViewOnComment: View;
  addViewOnPost: View;
  authenAdmin: ICredential;
  authenUser: User;
  closeConversation: Conversation;
  createConversation: Conversation;
  createPost: Post;
  createRole: Role;
  createSubject: Subject;
  deleteComment: Delete;
  deletePost: Delete;
  deleteSubject: Delete;
  discardReport: Scalars['Boolean'];
  dropAllData: Scalars['Boolean'];
  dropData: Scalars['Boolean'];
  login: LoginResult;
  loginByCode: LoginResult;
  pureDeleteUser: Scalars['Boolean'];
  register: User;
  registerAdmin: Admin;
  removeBlockOnUser: Scalars['Boolean'];
  removePinOnPost: Scalars['Boolean'];
  removePrivilegeOnAdmin: Scalars['Boolean'];
  removePrivilegeOnUser: Scalars['Boolean'];
  removeUpvoteOnComment: Comment;
  removeUpvoteOnPost: Post;
  setReadAllNotifications: Scalars['Boolean'];
  setReadReplyNotifications: Scalars['Boolean'];
  setReadUpvoteNotifications: Scalars['Boolean'];
  setSchema: SetDbSchema;
  updateLesson: Lesson;
  updateSubject: Subject;
  updateUser: User;
};


export type MutationAcceptReportArgs = {
  content: Scalars['String'];
  reportId: Scalars['String'];
};


export type MutationAddBlockOnUserArgs = {
  description: Scalars['String'];
  id: Scalars['String'];
};


export type MutationAddCommentOnCommentArgs = {
  content: Scalars['String'];
  images?: InputMaybe<Array<Scalars['String']>>;
  isAnonymous?: InputMaybe<Scalars['Boolean']>;
  to: Scalars['String'];
};


export type MutationAddCommentOnPostArgs = {
  content: Scalars['String'];
  images?: InputMaybe<Array<Scalars['String']>>;
  isAnonymous?: InputMaybe<Scalars['Boolean']>;
  to: Scalars['String'];
};


export type MutationAddCommentOnUserArgs = {
  content: Scalars['String'];
  images?: InputMaybe<Array<Scalars['String']>>;
  isAnonymous?: InputMaybe<Scalars['Boolean']>;
  to: Scalars['String'];
};


export type MutationAddDeadlineArgs = {
  courseName: Scalars['String'];
  curriculumId?: InputMaybe<Scalars['String']>;
  deadlineId: Scalars['String'];
  endDate: Scalars['String'];
  id: Scalars['String'];
  startDate: Scalars['String'];
  title: Scalars['String'];
  type: Deadline_Type;
};


export type MutationAddFoldOnCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationAddLessonArgs = {
  circle: Array<Scalars['Int']>;
  dayOfWeek: Array<Scalars['Int']>;
  description: Scalars['String'];
  destination: Scalars['String'];
  educatorName: Scalars['String'];
  end: Scalars['Int'];
  id: Scalars['String'];
  lessonId: Scalars['String'];
  name: Scalars['String'];
  start: Scalars['Int'];
};


export type MutationAddMentionOnUserArgs = {
  content: Scalars['String'];
  images?: InputMaybe<Array<Scalars['String']>>;
  isAnonymous?: InputMaybe<Scalars['Boolean']>;
  to: Scalars['String'];
  toUser: Scalars['String'];
};


export type MutationAddMessageOnConversationArgs = {
  content: Scalars['String'];
  id: Scalars['String'];
};


export type MutationAddPinOnPostArgs = {
  postId: Scalars['String'];
};


export type MutationAddPrivilegeOnAdminArgs = {
  adminId: Scalars['String'];
  privilege: Iprivilege;
};


export type MutationAddPrivilegeOnUserArgs = {
  id: Scalars['String'];
  privilege: Iprivilege;
};


export type MutationAddReportOnCommentArgs = {
  description: Scalars['String'];
  to: Scalars['String'];
  type: Report_Type;
};


export type MutationAddReportOnPostArgs = {
  description: Scalars['String'];
  to: Scalars['String'];
  type: Report_Type;
};


export type MutationAddReportOnUserArgs = {
  description: Scalars['String'];
  to: Scalars['String'];
  type: Report_Type;
};


export type MutationAddRoleOnUserArgs = {
  roleId: Scalars['String'];
  to: Scalars['String'];
};


export type MutationAddUpvoteOnCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationAddUpvoteOnPostArgs = {
  postId: Scalars['String'];
};


export type MutationAddViewOnCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationAddViewOnPostArgs = {
  postId: Scalars['String'];
};


export type MutationAuthenAdminArgs = {
  to: Scalars['String'];
};


export type MutationAuthenUserArgs = {
  id: Scalars['String'];
  info?: InputMaybe<AuthenticationInfo>;
  token?: InputMaybe<Scalars['String']>;
};


export type MutationCloseConversationArgs = {
  conversationId: Scalars['String'];
};


export type MutationCreateConversationArgs = {
  description: Scalars['String'];
  participants: Array<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationCreatePostArgs = {
  content: Scalars['String'];
  images?: InputMaybe<Array<Scalars['String']>>;
  isAnonymous?: InputMaybe<Scalars['Boolean']>;
  subjectId?: InputMaybe<Scalars['String']>;
};


export type MutationCreateRoleArgs = {
  title: Scalars['String'];
};


export type MutationCreateSubjectArgs = {
  avatarImageUrl: Scalars['String'];
  backgroundImageUrl: Scalars['String'];
  description: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['String'];
};


export type MutationDeleteSubjectArgs = {
  id: Scalars['String'];
};


export type MutationDiscardReportArgs = {
  content: Scalars['String'];
  reportId: Scalars['String'];
};


export type MutationLoginArgs = {
  id?: InputMaybe<Scalars['String']>;
  sign: Scalars['String'];
  userId?: InputMaybe<Scalars['String']>;
};


export type MutationLoginByCodeArgs = {
  code: Scalars['String'];
  grantType?: InputMaybe<Code2Session_Grant_Type>;
};


export type MutationPureDeleteUserArgs = {
  userId: Scalars['String'];
};


export type MutationRegisterArgs = {
  code?: InputMaybe<Scalars['String']>;
  grantType?: InputMaybe<Code2Session_Grant_Type>;
  name: Scalars['String'];
  sign: Scalars['String'];
  userId?: InputMaybe<Scalars['String']>;
};


export type MutationRegisterAdminArgs = {
  avatarImageUrl: Scalars['String'];
  name: Scalars['String'];
  sign: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationRemoveBlockOnUserArgs = {
  from: Scalars['String'];
};


export type MutationRemovePinOnPostArgs = {
  from: Scalars['String'];
};


export type MutationRemovePrivilegeOnAdminArgs = {
  from: Scalars['String'];
  privilege: Iprivilege;
};


export type MutationRemovePrivilegeOnUserArgs = {
  from: Scalars['String'];
  privilege: Iprivilege;
};


export type MutationRemoveUpvoteOnCommentArgs = {
  from: Scalars['String'];
};


export type MutationRemoveUpvoteOnPostArgs = {
  from: Scalars['String'];
};


export type MutationSetReadReplyNotificationsArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationSetReadUpvoteNotificationsArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationUpdateLessonArgs = {
  id?: InputMaybe<Scalars['String']>;
  lessonId?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateSubjectArgs = {
  avatarImageUrl?: InputMaybe<Scalars['String']>;
  backgroundImageUrl?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
  avatarImageUrl?: InputMaybe<Scalars['String']>;
  isCollegePrivate?: InputMaybe<Scalars['Boolean']>;
  isGenderPrivate?: InputMaybe<Scalars['Boolean']>;
  isGradePrivate?: InputMaybe<Scalars['Boolean']>;
  isSchoolPrivate?: InputMaybe<Scalars['Boolean']>;
  isSubCampusPrivate?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  sign?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export enum Nlp_Sentiment {
  Negative = 'NEGATIVE',
  Neutral = 'NEUTRAL',
  Positive = 'POSITIVE'
}

export enum Notification_Action {
  AddCommentOnComment = 'ADD_COMMENT_ON_COMMENT',
  AddCommentOnPost = 'ADD_COMMENT_ON_POST',
  AddCommentOnUser = 'ADD_COMMENT_ON_USER',
  AddUpvoteOnComment = 'ADD_UPVOTE_ON_COMMENT',
  AddUpvoteOnPost = 'ADD_UPVOTE_ON_POST'
}

export enum Notification_Type {
  All = 'ALL',
  Read = 'READ',
  UnRead = 'UN_READ'
}

export type Node = {
  id: Scalars['String'];
};

export type Notifiable = {
  about: PostAndCommentUnion;
  creator?: Maybe<User>;
  id: Scalars['String'];
  to: User;
};

export type Notification = Notifiable & {
  __typename?: 'Notification';
  about: PostAndCommentUnion;
  action: Notification_Action;
  createdAt: Scalars['String'];
  creator?: Maybe<User>;
  id: Scalars['String'];
  isRead: Scalars['Boolean'];
  to: User;
};

export type NotificationEdge = {
  __typename?: 'NotificationEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Notification>;
};

export type NotificationPageInfo = {
  __typename?: 'NotificationPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type NotificationsConnection = {
  __typename?: 'NotificationsConnection';
  edges: Array<NotificationEdge>;
  pageInfo: NotificationPageInfo;
  totalCount: Scalars['Int'];
};

export enum Order_By {
  CreatedAtDesc = 'CREATED_AT_DESC',
  Trending = 'TRENDING'
}

export type ParticipantsConnection = {
  __typename?: 'ParticipantsConnection';
  nodes: Array<User>;
  totalCount: Scalars['Int'];
};

export type Person = {
  authenInfo?: Maybe<UserAuthenInfo>;
  comments: CommentsConnection;
  commentsWithRelay: CommentsConnectionWithRelay;
  conversations: ConversationsConnection;
  credential?: Maybe<ICredential>;
  deadlines: DeadlinesConnection;
  id: Scalars['String'];
  lessons: LessonsConnection;
  name: Scalars['String'];
  posts: PostsConnection;
  postsWithRelay: PostsConnectionWithRelay;
  privileges: PrivilegesConnection;
  replyNotifications?: Maybe<NotificationsConnection>;
  reports: ReportsConnection;
  roles: RolesConnection;
  subjects: SubjectsConnection;
  upvoteNotifications?: Maybe<VoteWithUnreadCountsConnection>;
  userId: Scalars['String'];
  votes: VotesConnection;
  votesWithRelay: VotesConnectionWithRelay;
};


export type PersonCommentsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type PersonCommentsWithRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type PersonConversationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type PersonDeadlinesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type PersonLessonsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type PersonPostsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type PersonPostsWithRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type PersonPrivilegesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type PersonReplyNotificationsArgs = {
  actions?: InputMaybe<Array<Notification_Action>>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
  type?: InputMaybe<Notification_Type>;
};


export type PersonReportsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type PersonRolesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type PersonSubjectsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type PersonUpvoteNotificationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
  type?: InputMaybe<Notification_Type>;
};


export type PersonVotesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type PersonVotesWithRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};

export type Pin = {
  __typename?: 'Pin';
  createdAt: Scalars['String'];
  creator: Admin;
  id: Scalars['String'];
  to?: Maybe<PostAndCommentUnion>;
};

export type PinEdge = {
  __typename?: 'PinEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Pin>;
};

export type PinPageInfo = {
  __typename?: 'PinPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type PinsConnection = {
  __typename?: 'PinsConnection';
  edges: Array<PinEdge>;
  pageInfo: PinPageInfo;
  totalCount: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  anonymous?: Maybe<Anonymous>;
  /** @deprecated 请使用commentsWithRelay */
  comments: CommentsConnection;
  commentsWithRelay: CommentsConnectionWithRelay;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  creator?: Maybe<User>;
  delete?: Maybe<Delete>;
  foldedComments: CommentsConnection;
  foldedCommentsWithRelay: CommentsConnectionWithRelay;
  hashtags: HashtagsConnection;
  id: Scalars['String'];
  images?: Maybe<Array<Scalars['String']>>;
  reports: ReportsConnection;
  subject?: Maybe<Subject>;
  trendingComments: CommentsConnection;
  votes: VotesConnection;
  votesWithRelay: VotesConnectionWithRelay;
};


export type PostCommentsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type PostCommentsWithRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type PostFoldedCommentsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type PostFoldedCommentsWithRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type PostHashtagsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type PostReportsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type PostTrendingCommentsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type PostVotesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type PostVotesWithRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};

export type PostAndCommentUnion = Comment | Post;

export type PostEdge = {
  __typename?: 'PostEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Post>;
};

export type PostPageInfo = {
  __typename?: 'PostPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type PostsConnection = {
  __typename?: 'PostsConnection';
  nodes: Array<Post>;
  totalCount: Scalars['Int'];
};

export type PostsConnectionWithRelay = {
  __typename?: 'PostsConnectionWithRelay';
  edges: Array<PostEdge>;
  pageInfo: PostPageInfo;
  totalCount: Scalars['Int'];
};

export type Privilege = {
  __typename?: 'Privilege';
  createdAt: Scalars['String'];
  creator: Admin;
  id: Scalars['String'];
  to: AdminAndUserUnion;
  value: Iprivilege;
};

export type PrivilegeEdge = {
  __typename?: 'PrivilegeEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Privilege>;
};

export type PrivilegePageInfo = {
  __typename?: 'PrivilegePageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type PrivilegesConnection = {
  __typename?: 'PrivilegesConnection';
  edges: Array<PrivilegeEdge>;
  pageInfo: PrivilegePageInfo;
  totalCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  admin: Admin;
  admins: AdminsConnection;
  autoSummarization: Scalars['String'];
  blocks: BlocksConnection;
  censorText: CensorResponse;
  comment: Comment;
  commentCommentsWithRelay: CommentsConnectionWithRelay;
  commentsCreatedWithin: CommentsConnection;
  conversation: Conversation;
  conversations: ConversationsConnection;
  credential: ICredential;
  credentials: ICredentialsConnection;
  deadline: Deadline;
  delete: Delete;
  deletedComments: CommentsConnection;
  deletedPosts: PostsConnection;
  deletes: DeletesConnection;
  findOriginPostByCommentId: Post;
  folds: FoldsConnection;
  getAuthenUserImagesUploadCredentialInfo: ImagesUploadCredentialInfo;
  getAvatarImageUploadCredentialInfo: AvatarImageUploadCredentialInfo;
  getCommentImagesUploadCredentialInfo: ImagesUploadCredentialInfo;
  getPostImagesUploadCredentialInfo: ImagesUploadCredentialInfo;
  getSubjectImagesUploadCredentialInfo: ImagesUploadCredentialInfo;
  getUnlimitedWXacode: Scalars['String'];
  getWXMiniProgrameShortLink: Scalars['String'];
  hashtag: Hashtag;
  hashtags: HashtagsConnection;
  keywordsExtraction: Array<KeywordsExtractionResult>;
  lesson: Lesson;
  lessons: LessonsConnection;
  mention: Mention;
  mentions: MentionsConnection;
  message: Message;
  pin: Pin;
  pins: PinsConnection;
  post: Post;
  /** @deprecated 请使用 Post.commentsWithRelay */
  postCommentsWithRelay: CommentsConnectionWithRelay;
  /** @deprecated 请使用postsWithRelay */
  posts: PostsConnection;
  postsCreatedWithin: PostsConnection;
  postsWithRelay: PostsConnectionWithRelay;
  privilege: Privilege;
  privileges: PrivilegesConnection;
  registerWithin: UsersConnection;
  report: Report;
  reports: ReportsConnection;
  roles: RolesConnection;
  search: SearchResultItemConnection;
  sendSubscibeMessage: Scalars['String'];
  sendUniformMessage: Scalars['String'];
  sentimentAnalysis: SentimentAnalysisResult;
  subject: Subject;
  /** @deprecated 请使用 subjects.postsWithRelay */
  subjectPostsWithRelay: PostsConnectionWithRelay;
  /** @deprecated 请使用 subjectsWithRelay */
  subjects: SubjectsConnection;
  subjectsWithRelay: SubjectsConnectionWithRelay;
  textClassification: TextClassificationResult;
  /** @deprecated 请使用 trendingPostsWithRelay */
  trendingPosts: PostsConnection;
  trendingPostsWithRelay: PostsConnectionWithRelay;
  user: User;
  userAuthenInfos: UserAuthenInfosConnection;
  userCommentsWithRelay: CommentsConnectionWithRelay;
  userPostsWithRelay: PostsConnectionWithRelay;
  userReplyNotifications?: Maybe<NotificationsConnection>;
  userUpvoteNotifications?: Maybe<VoteWithUnreadCountsConnection>;
  users: UsersConnection;
  votesCreatedWithin: VotesConnection;
  whoAmI: AdminAndUserWithPrivatePropsUnion;
};


export type QueryAdminArgs = {
  id: Scalars['String'];
};


export type QueryAdminsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type QueryAutoSummarizationArgs = {
  content: Scalars['String'];
  length?: InputMaybe<Scalars['Int']>;
};


export type QueryBlocksArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type QueryCensorTextArgs = {
  content: Scalars['String'];
};


export type QueryCommentArgs = {
  id: Scalars['String'];
};


export type QueryCommentCommentsWithRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  id: Scalars['String'];
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type QueryCommentsCreatedWithinArgs = {
  endTime: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  startTime: Scalars['String'];
};


export type QueryConversationArgs = {
  id: Scalars['String'];
};


export type QueryConversationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryCredentialArgs = {
  credentialId: Scalars['String'];
};


export type QueryCredentialsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type QueryDeadlineArgs = {
  id: Scalars['String'];
};


export type QueryDeleteArgs = {
  deleteId: Scalars['String'];
};


export type QueryDeletedCommentsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryDeletedPostsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryDeletesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type QueryFindOriginPostByCommentIdArgs = {
  id: Scalars['String'];
};


export type QueryFoldsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type QueryGetAuthenUserImagesUploadCredentialInfoArgs = {
  fileNames: Array<Scalars['String']>;
};


export type QueryGetAvatarImageUploadCredentialInfoArgs = {
  fileName: Scalars['String'];
};


export type QueryGetCommentImagesUploadCredentialInfoArgs = {
  fileNames: Array<Scalars['String']>;
};


export type QueryGetPostImagesUploadCredentialInfoArgs = {
  fileNames: Array<Scalars['String']>;
};


export type QueryGetSubjectImagesUploadCredentialInfoArgs = {
  fileNames: Array<Scalars['String']>;
};


export type QueryGetUnlimitedWXacodeArgs = {
  auto_color?: InputMaybe<Scalars['Boolean']>;
  check_path?: InputMaybe<Scalars['Boolean']>;
  env_version?: InputMaybe<Scalars['String']>;
  is_hyaline?: InputMaybe<Scalars['Boolean']>;
  line_color?: InputMaybe<GetUnlimitedWXacodeArgsLineColor>;
  page?: InputMaybe<Scalars['String']>;
  scene: Scalars['String'];
  width?: InputMaybe<Scalars['Int']>;
};


export type QueryGetWxMiniProgrameShortLinkArgs = {
  is_permanent?: InputMaybe<Scalars['Boolean']>;
  page_title: Scalars['String'];
  page_url: Scalars['String'];
};


export type QueryHashtagArgs = {
  id: Scalars['String'];
};


export type QueryHashtagsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type QueryKeywordsExtractionArgs = {
  content: Scalars['String'];
  keywordNum?: InputMaybe<Scalars['Int']>;
};


export type QueryLessonArgs = {
  id: Scalars['String'];
};


export type QueryLessonsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type QueryMentionArgs = {
  id: Scalars['String'];
};


export type QueryMentionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type QueryMessageArgs = {
  id: Scalars['String'];
};


export type QueryPinArgs = {
  id: Scalars['String'];
};


export type QueryPinsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryPostCommentsWithRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  id: Scalars['String'];
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type QueryPostsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryPostsCreatedWithinArgs = {
  endTime: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  startTime: Scalars['String'];
};


export type QueryPostsWithRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type QueryPrivilegeArgs = {
  id: Scalars['String'];
};


export type QueryPrivilegesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type QueryRegisterWithinArgs = {
  endTime: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  startTime: Scalars['String'];
};


export type QueryReportArgs = {
  id: Scalars['String'];
};


export type QueryReportsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryRolesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type QuerySearchArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
  query: Scalars['String'];
  type: Searchtype;
};


export type QuerySendSubscibeMessageArgs = {
  data: Scalars['String'];
  lang?: InputMaybe<Scalars['String']>;
  miniprograme_state?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['String']>;
  template_id: Scalars['String'];
  touser: Scalars['String'];
};


export type QuerySendUniformMessageArgs = {
  mp_template_msg: MpTemplateMsg;
  touser: Scalars['String'];
  weapp_template_msg: WeappTemplateMsg;
};


export type QuerySentimentAnalysisArgs = {
  content: Scalars['String'];
};


export type QuerySubjectArgs = {
  id: Scalars['String'];
};


export type QuerySubjectPostsWithRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  id: Scalars['String'];
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type QuerySubjectsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QuerySubjectsWithRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type QueryTextClassificationArgs = {
  content: Scalars['String'];
};


export type QueryTrendingPostsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryTrendingPostsWithRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryUserAuthenInfosArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type QueryUserCommentsWithRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  id: Scalars['String'];
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type QueryUserPostsWithRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  id: Scalars['String'];
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type QueryUserReplyNotificationsArgs = {
  actions?: InputMaybe<Array<Notification_Action>>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  id: Scalars['String'];
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
  type?: InputMaybe<Notification_Type>;
};


export type QueryUserUpvoteNotificationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  id: Scalars['String'];
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
  type?: InputMaybe<Notification_Type>;
};


export type QueryUsersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryVotesCreatedWithinArgs = {
  endTime: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  startTime: Scalars['String'];
};

export enum Report_State {
  Close = 'CLOSE',
  Open = 'OPEN',
  Pending = 'PENDING'
}

export enum Report_Type {
  Fraud = 'FRAUD',
  LewdHarass = 'LEWD_HARASS',
  Other = 'OTHER'
}

export type ReplyNotification = Notifiable & {
  __typename?: 'ReplyNotification';
  about: PostAndCommentUnion;
  action: Notification_Action;
  createdAt: Scalars['String'];
  creator?: Maybe<User>;
  id: Scalars['String'];
  isRead: Scalars['Boolean'];
  to: User;
};

export type Report = Node & {
  __typename?: 'Report';
  conversation: Conversation;
  createdAt: Scalars['String'];
  creator: User;
  description: Scalars['String'];
  id: Scalars['String'];
  state: Report_State;
  to: Report2Union;
  type: Report_Type;
};

export type Report2Union = Comment | Post | User;

export type ReportsConnection = {
  __typename?: 'ReportsConnection';
  nodes: Array<Report>;
  totalCount: Scalars['Int'];
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['String'];
  creator: Admin;
  id: Scalars['String'];
  title: Scalars['String'];
  users: UsersConnectionWithRelay;
};


export type RoleUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};

export type RoleEdge = {
  __typename?: 'RoleEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Role>;
};

export type RolePageInfo = {
  __typename?: 'RolePageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type RolesConnection = {
  __typename?: 'RolesConnection';
  edges: Array<RoleEdge>;
  pageInfo: RolePageInfo;
  totalCount: Scalars['Int'];
};

export enum Searchtype {
  Comment = 'COMMENT',
  Post = 'POST',
  Subject = 'SUBJECT',
  User = 'USER'
}

export type SearchResultItem = Comment | Post | Subject | User;

export type SearchResultItemConnection = {
  __typename?: 'SearchResultItemConnection';
  edges: Array<SearchResultItemEdge>;
  pageInfo: SearchResultItemPageInfo;
  totalCount: Scalars['Int'];
};

export type SearchResultItemEdge = {
  __typename?: 'SearchResultItemEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<SearchResultItem>;
};

export type SearchResultItemPageInfo = {
  __typename?: 'SearchResultItemPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type SentimentAnalysisResult = {
  __typename?: 'SentimentAnalysisResult';
  negative: Scalars['Float'];
  neutral: Scalars['Float'];
  positive: Scalars['Float'];
  sentiment: Nlp_Sentiment;
};

export type SetDbSchema = {
  __typename?: 'SetDbSchema';
  array: Array<Scalars['String']>;
  arrayIndexOffset: Scalars['Int'];
  convertedPrimitiveFields_: Scalars['String'];
  messageId_?: Maybe<Scalars['String']>;
  pivot_: Scalars['Float'];
  wrappers_?: Maybe<Scalars['String']>;
};

export type Subject = {
  __typename?: 'Subject';
  avatarImageUrl: Scalars['String'];
  backgroundImageUrl: Scalars['String'];
  createdAt: Scalars['String'];
  creator: User;
  description: Scalars['String'];
  id: Scalars['String'];
  /** @deprecated 请使用 postsWithRelay */
  posts: PostsConnection;
  postsWithRelay: PostsConnectionWithRelay;
  title: Scalars['String'];
};


export type SubjectPostsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type SubjectPostsWithRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};

export type SubjectEdge = {
  __typename?: 'SubjectEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Subject>;
};

export type SubjectPageInfo = {
  __typename?: 'SubjectPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type SubjectsConnection = {
  __typename?: 'SubjectsConnection';
  nodes: Array<Subject>;
  totalCount: Scalars['Int'];
};

export type SubjectsConnectionWithRelay = {
  __typename?: 'SubjectsConnectionWithRelay';
  edges: Array<SubjectEdge>;
  pageInfo: SubjectPageInfo;
  totalCount: Scalars['Int'];
};

export type Subscription = {
  __typename?: 'Subscription';
  addCommented: Comment;
  notificationsAdded: UpvoteNotificationAndReplyNotificationUnion;
  votesChanged: PostAndCommentUnion;
};


export type SubscriptionAddCommentedArgs = {
  ids: Array<Scalars['String']>;
};


export type SubscriptionNotificationsAddedArgs = {
  id: Scalars['String'];
};


export type SubscriptionVotesChangedArgs = {
  ids: Array<Scalars['String']>;
};

export type TextClassificationResult = {
  __typename?: 'TextClassificationResult';
  fifthClassName?: Maybe<Scalars['String']>;
  fifthClassProbability?: Maybe<Scalars['Float']>;
  firstClassName?: Maybe<Scalars['String']>;
  firstClassProbability?: Maybe<Scalars['Float']>;
  fourthClassName?: Maybe<Scalars['String']>;
  fourthClassProbability?: Maybe<Scalars['Float']>;
  secondClassName?: Maybe<Scalars['String']>;
  secondClassProbability?: Maybe<Scalars['Float']>;
  thirdClassName?: Maybe<Scalars['String']>;
  thirdClassProbability?: Maybe<Scalars['Float']>;
};

export type UpvoteNotification = Notifiable & {
  __typename?: 'UpvoteNotification';
  about: PostAndCommentUnion;
  action: Notification_Action;
  createdAt: Scalars['String'];
  creator?: Maybe<User>;
  id: Scalars['String'];
  isRead: Scalars['Boolean'];
  to: User;
};

export type UpvoteNotificationAndReplyNotificationUnion = ReplyNotification | UpvoteNotification;

export type User = Node & Person & {
  __typename?: 'User';
  authenInfo?: Maybe<UserAuthenInfo>;
  avatarImageUrl?: Maybe<Scalars['String']>;
  college?: Maybe<Scalars['String']>;
  comments: CommentsConnection;
  commentsWithRelay: CommentsConnectionWithRelay;
  conversations: ConversationsConnection;
  createdAt: Scalars['String'];
  credential?: Maybe<ICredential>;
  deadlines: DeadlinesConnection;
  gender?: Maybe<Gender>;
  grade?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastLoginedAt: Scalars['String'];
  lessons: LessonsConnection;
  name: Scalars['String'];
  openId: Scalars['String'];
  posts: PostsConnection;
  postsWithRelay: PostsConnectionWithRelay;
  privileges: PrivilegesConnection;
  replyNotifications?: Maybe<NotificationsConnection>;
  reports: ReportsConnection;
  roles: RolesConnection;
  school?: Maybe<Scalars['String']>;
  studentId?: Maybe<Scalars['Int']>;
  subCampus?: Maybe<Scalars['String']>;
  subjects: SubjectsConnection;
  unionId: Scalars['String'];
  updatedAt: Scalars['String'];
  upvoteNotifications?: Maybe<VoteWithUnreadCountsConnection>;
  userId: Scalars['String'];
  votes: VotesConnection;
  votesWithRelay: VotesConnectionWithRelay;
};


export type UserCommentsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type UserCommentsWithRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type UserConversationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type UserDeadlinesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type UserLessonsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type UserPostsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type UserPostsWithRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type UserPrivilegesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type UserReplyNotificationsArgs = {
  actions?: InputMaybe<Array<Notification_Action>>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
  type?: InputMaybe<Notification_Type>;
};


export type UserReportsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type UserRolesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type UserSubjectsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type UserUpvoteNotificationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
  type?: InputMaybe<Notification_Type>;
};


export type UserVotesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type UserVotesWithRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};

export type UserAuthenInfo = Authenable & {
  __typename?: 'UserAuthenInfo';
  avatarImageUrl: Scalars['String'];
  college: Scalars['String'];
  createdAt: Scalars['String'];
  delete?: Maybe<Delete>;
  gender: Gender;
  grade: Scalars['String'];
  id: Scalars['String'];
  images?: Maybe<Array<Scalars['String']>>;
  roles: RolesConnection;
  school: Scalars['String'];
  studentId: Scalars['Float'];
  subCampus: Scalars['String'];
  to: User;
};


export type UserAuthenInfoRolesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};

export type UserAuthenInfoEdge = {
  __typename?: 'UserAuthenInfoEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<UserAuthenInfo>;
};

export type UserAuthenInfoPageInfo = {
  __typename?: 'UserAuthenInfoPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type UserAuthenInfosConnection = {
  __typename?: 'UserAuthenInfosConnection';
  edges: Array<UserAuthenInfoEdge>;
  pageInfo: UserAuthenInfoPageInfo;
  totalCount: Scalars['Int'];
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<User>;
};

export type UserPageInfo = {
  __typename?: 'UserPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type UserWithPrivateProps = Node & Person & {
  __typename?: 'UserWithPrivateProps';
  authenInfo?: Maybe<UserAuthenInfo>;
  avatarImageUrl?: Maybe<Scalars['String']>;
  college?: Maybe<Scalars['String']>;
  comments: CommentsConnection;
  commentsWithRelay: CommentsConnectionWithRelay;
  conversations: ConversationsConnection;
  createdAt: Scalars['String'];
  credential?: Maybe<ICredential>;
  deadlines: DeadlinesConnection;
  gender?: Maybe<Gender>;
  grade?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isCollegePrivate?: Maybe<Scalars['Boolean']>;
  isGenderPrivate?: Maybe<Scalars['Boolean']>;
  isGradePrivate?: Maybe<Scalars['Boolean']>;
  isSchoolPrivate?: Maybe<Scalars['Boolean']>;
  isSubCampusPrivate?: Maybe<Scalars['Boolean']>;
  lastLoginedAt: Scalars['String'];
  lessons: LessonsConnection;
  name: Scalars['String'];
  openId: Scalars['String'];
  posts: PostsConnection;
  postsWithRelay: PostsConnectionWithRelay;
  privileges: PrivilegesConnection;
  replyNotifications?: Maybe<NotificationsConnection>;
  reports: ReportsConnection;
  roles: RolesConnection;
  school?: Maybe<Scalars['String']>;
  studentId?: Maybe<Scalars['Int']>;
  subCampus?: Maybe<Scalars['String']>;
  subjects: SubjectsConnection;
  unionId: Scalars['String'];
  updatedAt: Scalars['String'];
  upvoteNotifications?: Maybe<VoteWithUnreadCountsConnection>;
  userId: Scalars['String'];
  votes: VotesConnection;
  votesWithRelay: VotesConnectionWithRelay;
};


export type UserWithPrivatePropsCommentsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type UserWithPrivatePropsCommentsWithRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type UserWithPrivatePropsConversationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type UserWithPrivatePropsDeadlinesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type UserWithPrivatePropsLessonsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type UserWithPrivatePropsPostsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type UserWithPrivatePropsPostsWithRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type UserWithPrivatePropsPrivilegesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type UserWithPrivatePropsReplyNotificationsArgs = {
  actions?: InputMaybe<Array<Notification_Action>>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
  type?: InputMaybe<Notification_Type>;
};


export type UserWithPrivatePropsReportsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type UserWithPrivatePropsRolesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};


export type UserWithPrivatePropsSubjectsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type UserWithPrivatePropsUpvoteNotificationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
  type?: InputMaybe<Notification_Type>;
};


export type UserWithPrivatePropsVotesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type UserWithPrivatePropsVotesWithRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Order_By>;
};

export type UsersConnection = {
  __typename?: 'UsersConnection';
  nodes: Array<User>;
  totalCount: Scalars['Int'];
};

export type UsersConnectionWithRelay = {
  __typename?: 'UsersConnectionWithRelay';
  edges: Array<UserEdge>;
  pageInfo: UserPageInfo;
  totalCount: Scalars['Int'];
};

export type View = {
  __typename?: 'View';
  createdAt: Scalars['String'];
  id: Scalars['String'];
};

export type Vote = VoteInterface & {
  __typename?: 'Vote';
  createdAt: Scalars['String'];
  creator: User;
  id: Scalars['String'];
  to: PostAndCommentUnion;
};

export type VoteEdge = {
  __typename?: 'VoteEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Vote>;
};

export type VoteInterface = {
  creator: User;
  id: Scalars['String'];
  to: PostAndCommentUnion;
};

export type VotePageInfo = {
  __typename?: 'VotePageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type VoteWithUnreadCount = VoteInterface & {
  __typename?: 'VoteWithUnreadCount';
  createdAt: Scalars['String'];
  creator: User;
  id: Scalars['String'];
  to: PostAndCommentUnion;
  unreadCount: Scalars['Int'];
};

export type VoteWithUnreadCountEdge = {
  __typename?: 'VoteWithUnreadCountEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<VoteWithUnreadCount>;
};

export type VoteWithUnreadCountPageInfo = {
  __typename?: 'VoteWithUnreadCountPageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type VoteWithUnreadCountsConnection = {
  __typename?: 'VoteWithUnreadCountsConnection';
  edges: Array<VoteWithUnreadCountEdge>;
  pageInfo: VoteWithUnreadCountPageInfo;
  totalCount: Scalars['Int'];
};

export type VotesConnection = {
  __typename?: 'VotesConnection';
  nodes: Array<Vote>;
  totalCount: Scalars['Int'];
  viewerCanUpvote: Scalars['Boolean'];
  viewerHasUpvoted: Scalars['Boolean'];
};

export type VotesConnectionWithRelay = {
  __typename?: 'VotesConnectionWithRelay';
  edges?: Maybe<Array<VoteEdge>>;
  pageInfo?: Maybe<VotePageInfo>;
  totalCount?: Maybe<Scalars['Int']>;
  viewerCanUpvote: Scalars['Boolean'];
  viewerHasUpvoted: Scalars['Boolean'];
};

export type WeappTemplateMsg = {
  data: Scalars['String'];
  emphasis_keyword: Scalars['String'];
  form_id: Scalars['String'];
  page: Scalars['String'];
  template_id: Scalars['String'];
};
