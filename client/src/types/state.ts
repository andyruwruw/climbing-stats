// Types
import {
  ClimbingActivities,
  Dictionary,
  RouterPageName,
  Session,
  SessionCounter,
  Tick,
  TickTracker,
  User,
} from '.';

/**
 * Status of retrieval.
 */
export type RetrievalStatus = 'idle'
| 'loading'
| 'success'
| 'error';

/**
 * Overall root state.
 */
export interface RootState extends Record<string, any> {
  navigation: NavigationState;

  resize: ResizeState;

  sessions: SessionsState;

  ticks: TicksState;

  user: UserState;
}

/**
 * User state interface.
 */
export interface UserState extends Record<string, any> {
  /**
   * Current logged in user.
   */
  user: User | null;

  /**
   * Status of retrieval.
   */
  status: RetrievalStatus;

  /**
   * Error if any.
   */
  error: string | undefined;

  /**
   * If the user has been checked for a session.
   */
  checked: boolean;

  /**
   * Whether the user is an admin.
   * (Doesn't verify them for any admin calls, a user changing this will do nothing).
   */
  admin: boolean;

  /**
   * Whether to show login dialog.
   */
  dialog: boolean;
}

/**
 * Navigation state interface.
 */
export interface NavigationState extends Record<string, any> {
  /**
   * Name of the current page.
   */
  currentPage: RouterPageName;

  /**
   * Page parameters.
   */
  params: Dictionary<any>;
}

/**
 * Resize state interface.
 */
export interface ResizeState {
  /**
   * Width of page.
   */
  width: number;
}

export interface SessionsState extends Record<string, any> {
  /**
   * User's sessions.
   */
  sessions: Session[];

  /**
   * Number of sessions.
   */
  total: number;

  /**
   * Starting date of climbing.
   */
  start: number;

  /**
   * First session.
   */
  startSession: string;

  /**
   * Number of days climbed.
   */
  days: number;

  /**
   * Number of hours climbed.
   */
  hours: number;

  /**
   * Hours per day since start.
   */
  hoursPerDay: number;

  /**
   * Longest rest between sessions.
   */
  longestRest: number;

  /**
   * Number of indoor hours.
   */
  indoorHours: number;

  /**
   * Number of indoor sessions.
   */
  indoorSessions: number;

  /**
   * Number of outdoor hours.
   */
  outdoorHours: number;

  /**
   * Number of outdoor sessions.
   */
  outdoorSessions: number;

  /**
   * Indoor hours climbed per outdoor hours.
   */
  indoorPerOutdoor: number;

  /**
   * Status of retrieval.
   */
  status: RetrievalStatus;

  /**
   * Error if any.
   */
  error: string | undefined;
}

export interface TicksState extends Record<string, any> {
  /**
   * User's sessions.
   */
  ticks: Tick[];

  /**
   * Total number of unique climbs attempted.
   */
  uniqueClimbs: number;

  /**
   * Total climbs attempted.
   */
  totalClimbs: number;

  /**
   * Total number of unique boulders attempted.
   */
  uniqueBoulder: number;

  /**
   * Total boulders attempted.
   */
  totalBoulders: number;

  /**
   * Total number of unique routes attempted.
   */
  uniqueRoutes: number;

  /**
   * Total routes attempted.
   */
  totalRoutes: number;

  /**
   * Log of ticks, flashes, onsights and attempts at each grade.
   */
  tickLists: Record<ClimbingActivities, TickTracker[]>,

  /**
   * Logs of session counters for each route.
   */
  routeSessions: Dictionary<SessionCounter>,
}