// Types
import { DatabaseRow } from './database';

/**
 * Gender options.
 */
export type Gender = 'man'
| 'woman'
| 'non-binary'
| 'agender'
| 'unknown';

/**
 * Privacy types.
 */
export type Privacy = 'private'
| 'public'
| 'unlisted';

export interface PublicUser extends DatabaseRow {
  /**
   * User's username.
   */
  username: string;

  /**
   * Display name.
   */
  displayName: string;

  /**
   * Image of user.
   */
  image: string;

  /**
   * External HREFs.
   */
  hrefs: ExternalHref;

  /**
   * User's age.
   */
  age: number;

  /**
   * User's gender.
   */
  gender: Gender;

  /**
   * User's locale.
   */
  locale: string;

  /**
   * User's state.
   */
  state: string;

  /**
   * User country.
   */
  country: string;

  /**
   * When this user was created.
   */
  created: number;

  /**
   * Imaginary points.
   */
  points: number;

  /**
   * Whether this user is an admin.
   */
  admin: boolean;

  /**
   * Privacy of viewing their profile.
   */
  profilePrivacy: Privacy;

  /**
   * Privacy of viewing their locale.
   */
  localePrivacy: Privacy;

  /**
   * Privacy of viewing their age.
   */
  agePrivacy: Privacy;

  /**
   * Privacy of viewing their ticks.
   */
  ticksPrivacy: Privacy;

  /**
   * Privacy of viewing their sessions.
   */
  sessionsPrivacy: Privacy;

  /**
   * Privacy of viewing their partners.
   */
  partnersPrivacy: Privacy;

  /**
   * Privacy of viewing their pyramid.
   */
  pyramidPrivacy: Privacy;

  /**
   * Privacy of viewing their map.
   */
  mapPrivacy: Privacy;
}

/**
 * User object.
 */
export interface User extends PublicUser {
  /**
   * User password hashed.
   */
  password: string;
}

/**
 * Someone you climb with.
 */
export interface ClimbingPartner extends DatabaseRow {
  /***
   * User this climbing partner climbs with.
   */
  user: string;

  /**
   * Climbing partner's first name.
   */
  first: string;

  /**
   * Climbing partner's last name.
   */
  last: string;

  /**
   * Rank comparing hours.
   */
  hoursRank: number;

  /**
   * Hours climbed with.
   */
  hours: number;

  /**
   * How much they're ahead of the next.
   */
  hoursBy: number;

  /**
   * Rank comparing outdoor hours.
   */
  outdoorHoursRank: number;

  /**
   * Outdoor hours climbed with.
   */
  outdoorHours: number;

  /**
   * Rank comparing sessions.
   */
  sessionsRank: number;

  /**
   * Total number of sessions.
   */
  sessions: number;

  /**
   * Rank comparing outdoor sessions.
   */
  outdoorSessionsRank: number;

  /**
   * Total number of outdoor sessions.
   */
  outdoorSessions: number;

  /**
   * Percent time outside.
   */
  outdoorPercent: number;

  /**
   * First session logged.
   */
  met: string;

  /**
   * Date of fisst session together.
   */
  metDate: number;

  /**
   * Where they rank in hours driven.
   */
  droveRank: number;

  /**
   * Hours driven together.
   */
  drove: number;

  /**
   * Whether to hide this person's name.
   */
  hide: boolean;
}

/**
 * Login session.
 */
export interface Token extends DatabaseRow {
  /**
   * User unique identifier.
   */
  user: string;

  /**
   * JSON web token.
   */
  token: string;

  /**
   * When this session was created.
   */
  created: number;
}

/**
 * Authorization token data.
 */
export interface TokenData {
  /**
   * User ID.
   */
  id: string;
}