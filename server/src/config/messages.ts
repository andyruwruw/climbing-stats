/**
 * Response to database connection.
 */
export const MESSAGE_DATABASE_CONNECTION_SUCCESS = 'Database connection successful.';

/**
 * Response to database connection.
 */
export const MESSAGE_DATABASE_CACHE_CONNECTION_SUCCESS = 'Connected to cache database for testing purposes, change to MongoDB for production.';

/**
 * Error message thrown when abstract database is used.
 */
export const MESSAGE_USED_ABSTRACT_DATABASE_ERROR = 'Attempted to use Abstract Database, use a concrete implementation instead.';

/**
 * Error message thrown when abstract data access object is used.
 */
export const MESSAGE_USED_ABSTRACT_DAO_ERROR = 'Attempted to use Abstract Data Access Object, use a concrete implementation instead.';

/**
 * Error message thrown when database URL is missing.
 */
export const MESSAGE_DATABASE_URL_MISSING_ERROR = 'Database URL not set in .env!';

/**
 * Internal server error message.
 */
export const MESSAGE_INTERNAL_SERVER_ERROR = 'Internal Server Error';

/**
 * Unauthorized error message.
 */
export const MESSAGE_UNAUTHORIZED_ERROR = 'Unauthorized.';

/**
* Error message for using abstract handler.
*/
export const MESSAGE_USED_ABSTRACT_HANDLER_ERROR = 'Attempted to use Abstract Handler, use a concrete implementation instead.';

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
 * Error for weak password.
 * 
 * @constant
 */
export const MESSAGE_PASSWORD_WEAK = 'Your password does not meet minimum requirements.';

/**
 * Error message thrown when an item already exists.
 * 
 * @param {string} item Item attempted to be found or updated.
 * @param {string} parameter Name of parameter conflict.
 * @returns {string} Error message.
 */
export const MESSAGE_HANDLER_ITEM_EXISTS = (
  item: string,
  parameter: string,
) => `${item} with that ${parameter} already exists!`;

/**
 * Error message thrown when an item doesn't exist.
 * 
 * @param {string} item Item attempted to be found or updated.
 * @param {string} parameter Name of parameter conflict.
 * @returns {string} Error message.
 */
export const MESSAGE_HANDLER_ITEM_DOES_NOT_EXIST = (
  item: string,
  parameter: string,
) => `${item} with that ${parameter} doesn't exist!`;

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
 * Error for malformed requests missing a user ID.
 * 
 * @constant
 */
export const MESSAGE_MISSING_USER_ID = 'No user ID provided.';

/**
 * Error for malformed requests missing a request ID.
 * 
 * @constant
 */
export const MESSAGE_MISSING_REQUEST_ID = 'Missing callback code.';

/**
 * Authentication server error message.
 * /
 * @constant
 */
export const MESSAGE_UNAUTHORIZED = 'Not a valid user session.';

/**
 * Error for handler not found.
 * 
 * @constant
 */
export const MESSAGE_HANDLER_NOT_FOUND_ERROR = 'Handler was not found';

/**
 * Error for password mismatch.
 * 
 * @constant
 */
export const MESSAGE_AUTHENTICATION_INCORRECT = 'Username or password incorrect.';

/**
 * Error for lack of permission.
 * 
 * @constant
 */
export const MESSAGE_NO_PERMISSION = 'You don\'t have permission to do that!';
