/**
 * Various message constants.
 * 
 * For consistancy, all message values are set here and imported.
 */

/**
 * Database messages
 * 
 * All message pertaining to database connection and errors.
 */

/**
 * Response to database connection.
 */
export const MESSAGE_DATABASE_CONNECTION_SUCCESS = 'Database connection successful.';

/**
 * Response to database connection.
 */
export const MESSAGE_CACHE_CONNECTION_SUCCESS = 'Cache connection successful.';

/**
 * Response to database connection.
 */
export const MESSAGE_DATABASE_CONNECTION_FAIL = 'Failed to connect to Database.';

/**
 * Response to database connection.
 */
export const MESSAGE_DATABASE_CACHE_CONNECTION_SUCCESS = 'Connected to cache database for testing purposes, change for production.';

/**
 * Error message thrown when database URL is missing.
 */
export const MESSAGE_DATABASE_URL_MISSING_ERROR = 'Database URL not set!';

/**
 * Response Messages
 * 
 * All messages sent back to users in responses to requests.
 */

/**
 * Internal server error message.
 */
export const MESSAGE_INTERNAL_SERVER_ERROR = 'Internal Server Error';

/**
 * Unauthorized error message.
 */
export const MESSAGE_UNAUTHORIZED_ERROR = 'Not authorized to use this endpoint.';

/**
 * Error message thrown when a parameter is missing in a general request.
 *
 * @param {string} item Item attempted to be found or updated.
 * @param {string} parameter Name of parameter missing.
 * @returns {string} Error message.
 */
export const MESSAGE_HANDLER_PARAMETER_MISSING = (
  item: string,
  parameter: string,
) => `${parameter} for ${item} not provided`;

/**
 * Success message for a successful request.
 * 
 * @param {string} item Item successfully found or updated.
 * @param {string} parameter Name of parameter searched.
 */
export const MESSAGE_HANDLER_UPDATE_SUCCESS = (
  item: string,
  parameter: string,
) => `${item} by the ${parameter} successfully updated.`;

/**
 * Error message thrown when an item is requested that doesn't exist.
 *
 * @param {string} item Item attempted to be found or updated.
 * @param {string} parameter Name of parameter searched.
 * @returns {string} Error message.
 */
export const MESSAGE_HANDLER_ITEM_NOT_FOUND = (
  item: string,
  parameter: string,
  value: string,
) => `${item} by the ${parameter} '${value}' not found.`;

/**
 * Error message thrown when an item is requested that already exists.
 *
 * @param {string} item Item attempted to be found or updated.
 * @param {string} parameter Name of parameter searched.
 * @returns {string} Error message.
 */
export const MESSAGE_HANDLER_ITEM_FOUND = (
  item: string,
  parameter: string,
  value: string,
) => `${item} by the ${parameter} '${value}' already exists.`;

/**
 * Error for invalid authentication request.
 * 
 * @constant
 */
export const MESSAGE_AUTHENTICATION_ERROR = 'Issue authenticating you!';

/**
 * Error for invalid user login not being present in Database.
 * 
 * @constant
 */
export const MESSAGE_MISSING_USER_INFORMATION = 'Unable to retrieve user information.';

/**
 * Authentication server error message.
 * 
 * @constant
 */
export const MESSAGE_UNAUTHORIZED = 'Not a valid user session.';

/**
 * Error for incorrect login information.
 * 
 * @constant
 */
export const MESSAGE_LOGIN_ATTEMPT_FAILURE = 'Username or password incorrect.';

/**
 * Error for handler not found.
 * 
 * @constant
 */
export const MESSAGE_HANDLER_NOT_FOUND_ERROR = 'Handler was not found';

/**
 * Misc
 * 
 * Other messages.
 */

/**
 * Error message thrown when using an abstract class.
 *
 * @param {string} type Type of abstract class. 
 * @returns {string} Error message. 
 */
export const MESSAGE_USED_ABSTRACT_CLASS_ERROR = (type: string) => (`Attempted to use Abstract ${type}, use a concrete implementation instead.`);
