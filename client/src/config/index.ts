// Types
import { RetrievalStatus } from '@/types/state';
import {
  ClimbingActivities,
  Dictionary,
  Protection,
  RockType,
  RouterPageName,
} from '../types';

/**
 * Backend URL.
 */
export const BACKEND_ORIGIN = 'http://localhost:8000';

/**
 * Session token name.
 */
export const TOKEN_NAME = 'climbing-stats';

/**
 * Size of pages.
 */
export const PAGE_SIZE = 25;

/**
 * Rock types.
 */
export const ROCK_TYPES = {
  BOULDER: 'boulder',
  WALL: 'wall',
} as Dictionary<RockType>;

/**
 * Various climbing activities.
 */
export const CLIMBING_ACTIVITY = {
  SPORT: 'sport',
  TOP_ROPE: 'top-rope',
  TRADITIONAL: 'traditional',
  BOULDER: 'boulder',
  FOLLOWED: 'followed',
  ICE: 'ice',
  MIXED: 'mixed',
  ALPINE: 'alpine',
  AID: 'aid',
  FREE_SOLO: 'free-solo',
  SPEED: 'speed',
  DEEP_WATER_SOLO: 'deep-water-solo',
  FREE_BASE: 'free-base',
} as Dictionary<ClimbingActivities>;

/**
 * Various types of climbing protection.
 */
export const CLIMBING_PROTECTION = {
  PADS: 'pads',
  BOLTS: 'bolts',
  TOP_ROPE: 'top-rope',
  TRADITIONAL: 'traditional',
  NONE: 'none',
  WATER: 'water',
  PARACHUTE: 'parachute',
  NET: 'net',
} as Dictionary<Protection>;

/**
 * Router page names.
 *
 * @enum
 * @constant
 */
export const PAGE_NAME: Dictionary<RouterPageName> = {
  /**
   * Landing page name.
   */
  LANDING: 'landing',

  /**
   * Home page name.
   */
  HOME: 'home',

  /**
   * Profile page name.
   */
  PROFILE: 'profile',

  /**
   * Location page name.
   */
  LOCATION: 'location',

  /**
   * Session page name.
   */
  SESSION: 'session',

  /**
   * Route page name.
   */
  ROUTE: 'route',

  /**
   * 404 error page name.
   */
  404: '404',
};

/**
 * Retrieval status.
 */
export const RETRIEVAL_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as Dictionary<RetrievalStatus>;

/**
 * Various breakpoints for screens.
 *
 * @enum
 * @constant
 */
export const VIEWPORT_BREAKPOINTS = {
  /**
   * Below is small.
   */
  SMALL: 600,

  /**
   * Below is medium.
   */
  MEDIUM: 840,

  /**
   * Below is large.
   */
  LARGE: 1280,

  // All above is huge.
};

/**
 * Number of milliseconds in a day.
 */
export const MILLISECONDS_IN_SECOND = 1000;

/**
 * Number of milliseconds in a day.
 */
export const MILLISECONDS_IN_MINUTE = 60000;

/**
 * Number of milliseconds in a day.
 */
export const MILLISECONDS_IN_HOUR = 3600000;

/**
 * Number of milliseconds in a day.
 */
export const MILLISECONDS_IN_DAY = 86400000;

/**
 * Number of milliseconds in a week.
 */
export const MILLISECONDS_IN_WEEK = 604800000;

/**
 * Number of milliseconds in a month.
 */
export const MILLISECONDS_IN_MONTH = 2629746000;

/**
 * Number of milliseconds in a year.
 */
export const MILLISECONDS_IN_YEAR = 31556952000;
