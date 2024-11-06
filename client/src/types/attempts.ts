// Types
import {
  ClimbingActivities,
  ClimbingGrade,
} from './climbs';
import { DatabaseRow } from './database';
import { Dictionary } from '.';

/**
 * Tick status.
 */
export type AttemptStatus = 'attempt'
| 'hung'
| 'flash'
| 'send'
| 'day-flash'
| 'onsight'
| 'project'
| 'touch'
| 'unknown';

/**
 * Protection types.
 */
export type Protection = 'pads'
| 'bolts'
| 'top-rope'
| 'traditional'
| 'none'
| 'water'
| 'parachute'
| 'net';

/**
 * An attempt on a route.
 */
export interface Tick extends DatabaseRow {
  /**
   * Unique identifier of the owner of the tick.
   */
  user: string;

  /**
   * Route in question.
   */
  route: string;

  /**
   * Type of activity.
   */
  type: ClimbingActivities;

  /**
   * Completion.
   */
  status: AttemptStatus;

  /**
   * Does this count as a send.
   */
  sent: boolean;

  /**
   * What kind of protection was used.
   */
  protection: Protection;

  /**
   * Date attempted.
   */
  date: number;

  /**
   * Description of the attempt.
   */
  description: string;

  /**
   * Attempts made.
   */
  attempts: number;

  /**
   * Times sent.
   */
  laps: number;

  /**
   * Associated media.
   */
  media: string[];

  /**
   * Whether to feature on profile.
   */
  feature: boolean;

  /**
   * Suggested grade.
   */
  grade: ClimbingGrade;
}

/**
 * Tracks routes ticks.
 */
export interface TickTracker {
  /**
   * Grade this entry is for.
   */
  grade: ClimbingGrade | Dictionary<ClimbingGrade>;

  /**
   * Tick unique identifiers for attempts on this grade.
   */
  attempts: string[];

  /**
   * Route unique identifiers of unique climbs sent.
   */
  ticks: string[];

  /**
   * Route unique identifiers of unique climbs flashed.
   */
  flashes: string[];

  /**
   * Route unique identifiers of unique climbs onsight.
   */
  onsights: string[];
}

/**
 * Single entry in a tick pyramid.
 */
export interface TickPyramidEntry {
  /**
   * Climbing grade for entry.
   */
  grade: ClimbingGrade;

  /**
   * Ticks per status per activity.
   */
  activities: Record<ClimbingActivities, Record<AttemptStatus, number>>;
}

/**
 * Counts sessions on projects.
 */
export interface SessionCounter {
  /**
   * Unique identifier of the route.
   */
  id: string,

  /**
   * First session date on the route.
   */
  first: number,

  /**
   * Last session date on the route.
   */
  last: number,

  /**
   * Total number of sessions on the route.
   */
  total: number,
}

/**
 * Overall tick data.
 */
export interface TickSummations {
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
