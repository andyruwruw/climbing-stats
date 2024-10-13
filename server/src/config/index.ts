// Local Imports
import { Environment } from '../helpers/environment';

// Types
import {
  Dictionary,
  RequestAuthorization,
  RequestType,
  UploadType,
} from '../types';
import {
  AttemptStatus,
  ClimbingActivities,
  Protection
} from '../types/attempts';
import {
  Gender,
  Privacy
} from '../types/users';
import { DatabaseType } from '../types/database';
import { RockType } from '../types/climbs';

/**
 * Various request types enum.
 *
 * @enum
 */
export const REQUEST_TYPE = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
} as Dictionary<RequestType>;

/**
 * Different authorization requirements for endpoints.
 * 
 * @enum
 */
export const AUTHORIZATION_TYPE = {
  NONE: 'none',
  REQUIRED: 'required',
  OPTIONAL: 'optional',
  ADMIN: 'admin',
} as Dictionary<RequestAuthorization>;

/**
 * Database type enum.
 *
 * @enum
 */
export const DATABASE_TYPE = {
  MONGO: 'mongo',
  MONGO_LOCAL: 'mongo-local',
  CACHE: 'cache',
} as Dictionary<DatabaseType>;

/**
 * Handler upload type.
 * 
 * @enum
 */
export const UPLOAD_TYPE = {
  NONE: 'none',
  SOUND: 'sound',
  IMAGE: 'image',
} as Dictionary<UploadType>;

/**
 * Various user genders.
 * 
 * @enum
 */
export const USER_GENDER = {
  MAN: 'man',
  WOMAN: 'woman',
  NONBINARY: 'non-binary',
  AGENDER: 'agender',
  UNKNOWN: 'unknown',
} as Dictionary<Gender>;

/**
 * Privacy settings.
 */
export const PROFILE_PRIVACY = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  UNLISTED: 'unlisted',
} as Dictionary<Privacy>;

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
 * Various attempt status'.
 */
export const ATTEMPT_STATUS = {
  ATTEMPT: 'attempt',
  HUNG: 'hung',
  FLASH: 'flash',
  SEND: 'send',
  DAY_FLASH: 'day-flash',
  ONSIGHT: 'onsight',
  PROJECT: 'project',
  TOUCH: 'touch',
  UNKNOWN: 'unknown',
} as Dictionary<AttemptStatus>;

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
 * File times for upload types.
 */
export const FILE_TYPES = {
  none: {},
  sound: {
    'audio/mpeg': 'mp3',
    'audio/wav': 'wav',
    'audio/3gpp2': '3g2',
    'audio/3gpp': '3gp',
    'audio/webm': 'weba',
    'audio/ogg': 'oga',
    'audio/midi': 'midi',
    'audio/aac': 'aac',
    'audio/x-midi': 'midi',
  },
  image: {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
  },
} as Record<UploadType, Dictionary<string>>;

/**
 * Developmental URL.
 */
export const DEVELOPMENT_URL = `http://localhost:${Environment ? Environment.getServerPort() : 8000 }`;

/**
 * Production URL.
 */
export const PRODUCTION_URL = '';

/**
 * Salt work factor.
 */
export const SALT_WORK_FACTOR = 8;

/**
 * Default pagination size.
 */
export const PAGE_SIZE = 25;

/**
 * Maximum number of cached items.
 */
export const MAX_CACHE_SIZE = 1;
