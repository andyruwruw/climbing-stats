// Types
import { Dictionary } from '.';
import { ClimbingActivities, ClimbingGrade } from './climbs';
import { DatabaseRow } from './database';

/**
 * Tick status.
 */
type AttemptStatus = 'attempt'
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
type Protection = 'pads'
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
