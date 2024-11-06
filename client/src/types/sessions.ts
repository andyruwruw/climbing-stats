// Types
import {
  ClimbingActivities,
  ClimbingGrade,
} from './climbs';
import { DatabaseRow } from './database';

/**
 * Represents a sesion.
 */
export interface Session extends DatabaseRow {
  /**
   * Unique identifier of the owner of this session.
   */
  user: string;

  /**
   * Where this session was.
   */
  location: string;

  /**
   * Areas time was spent.
   */
  areas: string[];

  /**
   * Whether this area is outdoors.
   */
  outdoors: boolean;

  /**
   * Date of the session.
   */
  date: number;

  /**
   * Starting time of the session.
   */
  start: number;

  /**
   * End of the session.
   */
  end: number;

  /**
   * Duration of the session.
   */
  duration: number;

  /**
   * What activites were done.
   */
  activities: ClimbingActivities[];

  /**
   * Description of the session.
   */
  description: string;

   /**
   * How the climber felt.
   */
  felt: number;

  /**
   * Partners climbed with.
   */
  partners: string[];

  /**
   * Active calories.
   */
  activeCal: number;

  /**
   * Total calories burned.
   */
  totalCal: number;

  /**
   * Average heartrate.
   */
  heart: number;

  /**
   * Lowest heart rate reached.
   */
  lowHeart: number;

  /**
   * Highest heart rate reached.
   */
  highHeart: number;

  /**
   * Who was carpooled with.
   */
  carpool: string[];

  /**
   * Length of drive.
   */
  drive: number;

  /**
   * Associated media.
   */
  media: string[];

  /**
   * Max item sent.
   */
  sent: ClimbingGrade[];
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
 * Overall session data.
 */
export interface SessionSummations {
  /**
   * Number of sessions.
   */
  sessions: number;

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
}
