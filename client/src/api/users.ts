// Local Imports
import {
  optionalQueryParams,
  getRequest,
} from './request';

// Local Imports
import { PAGE_SIZE } from '../config';
import { setToken } from '../helpers/token';

// Types
import {
  Response,
  User,
} from '../types';

/**
 * Delete an existing user.
 *
 * @param {string} id User unique identifier.
 * @returns {Promise<Response<number>>} Number of items removed.
 */
const deleteUser = async (id: string): Promise<Response<number>> => {
  let response;
  let message;

  if (id) {
    try {
      response = await getRequest().delete(`/users/${id}`);
    } catch (error: unknown) {
      message = error;
    }
  }

  if (response && response.status === 204) {
    return {
      removed: 1,
      status: 204,
      error: null,
    };
  }

  return {
    removed: 0,
    status: response ? response.status : 500,
    error: `${message}`,
  };
};

/**
 * Checks for an existing session.
 *
 * @returns {Promise<Response<User | null>>} User session if one exists.
 */
const getLoginSession = async (): Promise<Response<User | null>> => {
  let response;
  let message;

  try {
    response = await getRequest().get('/users/session');
  } catch (error: unknown) {
    message = error;
  }

  if (response && response.status === 200) {
    return {
      user: (response.data.user as User),
      status: response.status,
      error: null,
    } as Response<User>;
  }

  return {
    user: null,
    status: response ? response.status : 500,
    error: `${message}`,
  } as Response<User>;
};

/**
 * Retrieves a single user.
 *
 * @param {string} id User's unique identifier.
 * @returns {Promise<Response<User>>} The user requested.
 */
const getUser = async (id: string): Promise<Response<User>> => {
  let response;
  let message;

  if (id) {
    try {
      response = await getRequest().get(`/users/${id}`);
    } catch (error: unknown) {
      message = error;
    }
  }

  if (response && response.status === 200) {
    return {
      user: (response.data.user as User),
      status: response.status,
      error: null,
    } as Response<User>;
  }

  return {
    user: null,
    status: response ? response.status : 500,
    error: `${message}`,
  } as Response<User>;
};

/**
 * Fetches a list of users.
 *
 * @param {number | undefined} [offset = undefined] Search cursor offset.
 * @param {number | undefined} [limit = undefined] Number of items to fetch (max 25).
 * @param {string[] | undefined} [ids = undefined] Set list of unique identifiers to fetch.
 * @param {string | undefined} route Route specification for attempts.
 * @param {string | undefined} activity Activity specifications for attempts.
 * @param {string | undefined} location Location specifications for sessions.
 * @param {string | undefined} [search = undefined] Query for name.
 * @returns {Promise<Response<User[]>>} A set of users.
 */
const getUsers = async (
  offset = 0,
  limit = PAGE_SIZE,
  ids = undefined as string[] | undefined,
  route = undefined as string | undefined,
  activity = undefined as string | undefined,
  location = undefined as string | undefined,
  search = undefined as string | undefined,
): Promise<Response<User[]>> => {
  let response;
  let message;

  try {
    response = await getRequest().get(`/areas?${optionalQueryParams({
      offset,
      limit,
      ids,
      route,
      activity,
      location,
      search,
    })}`);
  } catch (error: unknown) {
    message = error;
  }

  if (response && response.status === 200) {
    return {
      users: response.data.users,
      count: response.data.count,
      status: response.status,
      error: null,
    } as Response<User[]>;
  }

  return {
    users: null,
    count: 0,
    status: response ? response.status : 500,
    error: `${message}`,
  } as Response<User[]>;
};

/**
 * Creates a new login session.
 *
 * @param {string} username User's username.
 * @param {string} password User's password.
 * @returns {Response<User>} Response data.
 */
const loginUser = async (
  username: string,
  password: string,
) => {
  let response;
  let message;

  if (username && password) {
    try {
      response = await getRequest().post(
        '/users/session',
        {
          username,
          password,
        },
      );
    } catch (error: unknown) {
      message = error;
    }
  }

  if (response && response.status === 201) {
    setToken(response.data.token);

    return {
      user: (response.data.user as User),
      status: response.status,
      error: null,
    } as Response<User>;
  }

  return {
    user: null,
    status: response ? response.status : 500,
    error: `${message}`,
  } as Response<User>;
};

/**
 * Ends a current user session.
 *
 * @returns {Promise<Response<null>>} Promise of action.
 */
const logoutUser = async () => {
  let response;
  let message;

  try {
    response = await getRequest().delete('/users/session');
  } catch (error: unknown) {
    message = error;
  }

  if (response && response.status === 204) {
    setToken('');

    return {
      status: response.status,
      error: null,
    } as Response<null>;
  }

  return {
    status: response ? response.status : 500,
    error: `${message}`,
  } as Response<null>;
};

/**
 * Creates a new user.
 *
 * @param {string} username User's username.
 * @param {string} password User's password.
 * @param {string} displayName Display name.
 * @returns {Response<User>} Response data.
 */
const registerUser = async (
  username: string,
  password: string,
  displayName = '',
) => {
  let response;
  let message;

  if (username && password) {
    try {
      response = await getRequest().post(
        '/users',
        {
          displayName,
          username,
          password,
        },
      );
    } catch (error: unknown) {
      message = error;
    }
  }

  if (response && response.status === 201) {
    setToken(response.data.token);

    return {
      user: (response.data.user as User),
      status: response.status,
      error: null,
    } as Response<User>;
  }

  return {
    user: null,
    status: response ? response.status : 500,
    error: `${message}`,
  } as Response<User>;
};

export default {
  deleteUser,
  getLoginSession,
  getUser,
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
};
