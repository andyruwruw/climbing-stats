// Types
import {
  ChartInterval,
  ChartPeriod,
  Dictionary,
} from '../types';
import {
  RockType,
  ClimbingActivities,
} from '../types/climbs';
import { RetrievalStatus } from '../types/state';
import { Protection } from '../types/attempts';

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
export const PAGE_NAME: Dictionary<string> = {
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

/**
 * Profile page tab options.
 */
export const PROFILE_PAGE_TABS = [
  {
    label: 'Overview',
    value: 'overview',
  },
  {
    label: 'Ticks',
    value: 'ticks',
  },
  {
    label: 'Sessions',
    value: 'sessions',
  },
  {
    label: 'Locations',
    value: 'locations',
  },
  {
    label: 'Partners',
    value: 'partners',
  },
];

/**
 * List item categorical options for location outdoors field.
 */
export const LIST_ITEM_CATEGORICAL_OUTDOORS_OPTIONS = [
  {
    value: 'true',
    label: 'Outdoors',
    color: '#7FC442',
  },
  {
    value: 'false',
    label: 'Indoors',
    color: 'rgb(140, 140, 140)',
  },
] as Dictionary<string>[];

/**
 * List item categorical options for location state field.
 */
export const LIST_ITEM_CATEGORICAL_STATE_OPTIONS = [
  {
    value: 'AL',
    label: 'AL',
    color: '',
  },
  {
    value: 'AK',
    label: 'AK',
    color: '',
  },
  {
    value: 'AZ',
    label: 'AZ',
    color: '',
  },
  {
    value: 'AR',
    label: 'AR',
    color: '',
  },
  {
    value: 'CA',
    label: 'CA',
    color: '#FFDC7E',
  },
  {
    value: 'CO',
    label: 'CO',
    color: '',
  },
  {
    value: 'CT',
    label: 'CT',
    color: '',
  },
  {
    value: 'DE',
    label: 'DE',
    color: '',
  },
  {
    value: 'DC',
    label: 'DC',
    color: '',
  },
  {
    value: 'FL',
    label: 'FL',
    color: '',
  },
  {
    value: 'GA',
    label: 'GA',
    color: '',
  },
  {
    value: 'HI',
    label: 'HI',
    color: '#A4C2F4',
  },
  {
    value: 'ID',
    label: 'ID',
    color: '#DD7D6B',
  },
  {
    value: 'IL',
    label: 'IL',
    color: '',
  },
  {
    value: 'IN',
    label: 'IN',
    color: '',
  },
  {
    value: 'IA',
    label: 'IA',
    color: '',
  },
  {
    value: 'KS',
    label: 'KS',
    color: '',
  },
  {
    value: 'KY',
    label: 'KY',
    color: '#EA9999',
  },
  {
    value: 'LA',
    label: 'LA',
    color: '',
  },
  {
    value: 'ME',
    label: 'ME',
    color: '',
  },
  {
    value: 'MD',
    label: 'MD',
    color: '',
  },
  {
    value: 'MA',
    label: 'MA',
    color: '',
  },
  {
    value: 'MI',
    label: 'MI',
    color: '',
  },
  {
    value: 'MN',
    label: 'MN',
    color: '',
  },
  {
    value: 'MS',
    label: 'MS',
    color: '',
  },
  {
    value: 'MO',
    label: 'MO',
    color: '',
  },
  {
    value: 'MT',
    label: 'MT',
    color: '',
  },
  {
    value: 'NE',
    label: 'NE',
    color: '',
  },
  {
    value: 'NV',
    label: 'NV',
    color: '#E06666',
  },
  {
    value: 'NH',
    label: 'NH',
    color: '',
  },
  {
    value: 'NJ',
    label: 'NJ',
    color: '',
  },
  {
    value: 'NM',
    label: 'NM',
    color: '',
  },
  {
    value: 'NY',
    label: 'NY',
    color: '',
  },
  {
    value: 'NC',
    label: 'NC',
    color: '',
  },
  {
    value: 'ND',
    label: 'ND',
    color: '',
  },
  {
    value: 'OH',
    label: 'OH',
    color: '',
  },
  {
    value: 'OK',
    label: 'OK',
    color: '',
  },
  {
    value: 'OR',
    label: 'OR',
    color: '#CDB3D5',
  },
  {
    value: 'PA',
    label: 'PA',
    color: '',
  },
  {
    value: 'RI',
    label: 'RI',
    color: '',
  },
  {
    value: 'SC',
    label: 'SC',
    color: '',
  },
  {
    value: 'SD',
    label: 'SD',
    color: '',
  },
  {
    value: 'TN',
    label: 'TN',
    color: '',
  },
  {
    value: 'TX',
    label: 'TX',
    color: '',
  },
  {
    value: 'UT',
    label: 'UT',
    color: '#F6B26B',
  },
  {
    value: 'VT',
    label: 'VT',
    color: '',
  },
  {
    value: 'VA',
    label: 'VA',
    color: '',
  },
  {
    value: 'WA',
    label: 'WA',
    color: '#B6D7A8',
  },
  {
    value: 'WV',
    label: 'WV',
    color: '',
  },
  {
    value: 'WI',
    label: 'WI',
    color: '',
  },
  {
    value: 'WY',
    label: 'WY',
    color: '',
  },
  {
    value: 'BC',
    label: 'BC',
    color: '#8AD3D9',
  },
] as Dictionary<string>[];

/**
 * Intervals for data.
 */
export const CHART_INTERVAL = {
  ALL: 'all',
  WEEK: 'week',
  QUARTER: 'quarter',
  YEAR: 'year',
} as Dictionary<ChartInterval>;

/**
 * Period between chart entries.
 */
export const CHART_PERIOD = {
  DAILY: 'daily',
  FEW_DAYS: 'few-days',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
} as Dictionary<ChartPeriod>;
