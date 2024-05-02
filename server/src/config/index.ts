/**
 * Developmental URL.
 * 
 * @constant
 */
export const DEVELOPMENT_URL = 'http://localhost:8080';

/**
 * Production URL.
 * 
 * @constant
 */
export const PRODUCTION_URL = 'https://playlist-partner-hosting.vercel.app';

/**
 * Authentication salt work factor.
 * 
 * @constant
 */
export const SALT_WORK_FACTOR = 24;

/**
 * Dabaase type enum.
 * 
 * @enum
 */
export const DATABASE_TYPE = {
  'MONGO': 'mongo',
  'MONGO_LOCAL': 'mongo-local',
  'CACHE': 'cache',
};
