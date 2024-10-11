// Local Imports
import {
  optionalQueryParams,
  optionalRequestBody,
  getRequest,
} from './request';
import { ROCK_TYPES } from '../config';

// Types
import {
  ClimbingActivities,
  ExternalHref,
  Rock,
  Response,
  RockType,
} from '../types';

/**
 * Create a new rock.
 *
 * @param {string} location Location of the rock.
 * @param {string} name Name of the rock.
 * @param {boolean} officiallyNamed Is this the official name?
 * @param {string[]} altNames Other names this rock is known as.
 * @param {boolean} outdoors Whether this rock is outdoors.
 * @param {string} image Main image.
 * @param {string} country Country this rock is in.
 * @param {string} state State this rock is in.
 * @param {string} locale Locale of this rock.
 * @param {string} color Color of the rock.
 * @param {ExternalHref} hrefs External links.
 * @param {ClimbingActivities[]} activities What activites are available.
 * @param {boolean} isPrivate Whether this rock contains private data.
 * @param {boolean} privateName Whether this rock contains private data.
 * @param {boolean} privateLocation Whether this rock contains private data.
 * @returns {Promise<Response<Rock>>} The new rock if created successfully.
 */
const createRock = async (
  location: string,
  name: string,
  area = '',
  officiallyNamed = true,
  altNames = [] as string[],
  type = ROCK_TYPES.BOULDER,
  activities = [] as ClimbingActivities[],
  image = '',
  hrefs = {} as ExternalHref,
  outdoors = true,
  isPrivate = false,
  privateName = false,
  privateLocation = false,
): Promise<Response<Rock>> => {
  let response;
  let message;

  if (name) {
    try {
      response = await getRequest().post(
        '/rocks/',
        {
          location,
          name,
          area,
          officiallyNamed,
          altNames,
          type,
          activities,
          image,
          hrefs,
          outdoors,
          isPrivate,
          privateName,
          privateLocation,
        },
      );
    } catch (error: unknown) {
      message = error;
    }
  }

  if (response && response.status === 201) {
    return {
      rock: response.data.rock as Rock,
      status: 201,
      error: null,
    } as Response<Rock>;
  }

  return {
    rock: null,
    status: response ? response.status : 500,
    error: `${message}`,
  };
};

/**
 * Delete an existing rock.
 *
 * @param {string} id Rock unique identifier.
 * @returns {Promise<Response<number>>} Number of items removed.
 */
const deleteRock = async (id: string): Promise<Response<number>> => {
  let response;
  let message;

  if (id) {
    try {
      response = await getRequest().delete(`/rocks/${id}`);
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
 * Edits an existing rock.
 *
 * @param {string} id Rock unique identifier.
 * @param {string | undefined} [location = undefined] Location of the rock.
 * @param {string | undefined} [name = undefined] Name of the rock.
 * @param {boolean | undefined} [officiallyNamed = undefined] Is this the official name?
 * @param {string[] | undefined} [altNames = undefined] Other names this rock is known as.
 * @param {boolean | undefined} [outdoors = undefined] Whether this rock is outdoors.
 * @param {string | undefined} [image = undefined] Main image.
 * @param {string | undefined} [country = undefined] Country this rock is in.
 * @param {string | undefined} [state = undefined] State this rock is in.
 * @param {string | undefined} [locale = undefined] Locale of this rock.
 * @param {string | undefined} [color = undefined] Color of the rock.
 * @param {ExternalHref | undefined} [hrefs = undefined] External links.
 * @param {ClimbingActivities[] | undefined} [activities = undefined] What activites are available.
 * @param {boolean | undefined} [isPrivate = undefined] Whether this rock contains private data.
 * @param {boolean | undefined} [privateName = undefined] Whether this rock contains private data.
 * @param {boolean | undefined} [privateLocation = undefined] Whether this rock contains private data.
 * @returns {Promise<Response<Rock>>} The new rock if created successfully.
 */
const editRock = async (
  id: string,
  location = undefined as string | undefined,
  name = undefined as string | undefined,
  area = undefined as string | undefined,
  officiallyNamed = undefined as boolean | undefined,
  altNames = undefined as string[] | undefined,
  type = undefined as RockType | undefined,
  activities = undefined as ClimbingActivities[] | undefined,
  image = undefined as string | undefined,
  hrefs = undefined as ExternalHref | undefined,
  outdoors = undefined as boolean | undefined,
  isPrivate = undefined as boolean | undefined,
  privateName = undefined as boolean | undefined,
  privateLocation = undefined as boolean | undefined,
): Promise<Response<Rock>> => {
  let response;
  let message;

  if (id) {
    try {
      response = await getRequest().put(
        `/rocks/${id}`,
        optionalRequestBody({
          location,
          name,
          area,
          officiallyNamed,
          altNames,
          type,
          activities,
          image,
          hrefs,
          outdoors,
          isPrivate,
          privateName,
          privateLocation,
        }),
      );
    } catch (error: unknown) {
      message = error;
    }
  }

  if (response && response.status === 200) {
    return {
      rock: response.data.rock as Rock,
      status: 200,
      error: null,
    } as Response<Rock>;
  }

  return {
    rock: null,
    status: response ? response.status : 500,
    error: `${message}`,
  };
};

/**
 * Retrieves a rock.
 *
 * @param {string} id Unique identifier for an rock.
 * @returns {Promise<Response<Rock>>} Rock details
 */
const getRock = async (id: string): Promise<Response<Rock>> => {
  let response;
  let message;

  try {
    response = await getRequest().get(`/rocks/${id}`);
  } catch (error: unknown) {
    message = error;
  }

  if (response && response.status === 200) {
    return {
      rock: response.data.rock as Rock,
      status: 200,
      error: `${message}`,
    };
  }

  return {
    rock: null,
    status: response ? response.status : 500,
    error: `${message}`,
  };
};

/**
 * Retrieve a set of rocks.
 *
 * @param {string[] | undefined} [ids = undefined] Set list of unique identifiers to fetch.
 * @param {string | undefined} [search = undefined] Query for name.
 * @param {number | undefined} [offset = undefined] Search cursor offset.
 * @param {number | undefined} [limit = undefined] Number of items to fetch (max 25).
 * @param {number | undefined} [location = undefined] Location of rocks.
 * @param {number | undefined} [area = undefined] Area of rocks.
 * @param {RockType | undefined} [type = undefined] Type of rock.
 * @param  {string | undefined} [user = undefined] Users who have interacted with the rock.
 * @param  {ClimbingActivities | undefined} [activity = undefined] Included activities in the rock.
 * @param  {boolean | undefined} [isPrivate = undefined] Whether the location is private.
 * @returns {Promise<Response<Rock[]>>} A set of rocks.
 */
const getRocks = async (
  ids = undefined as string[] | undefined,
  search = undefined as string | undefined,
  offset = undefined as number | undefined,
  limit = undefined as number | undefined,
  location = undefined as string | undefined,
  area = undefined as string | undefined,
  type = undefined as RockType | undefined,
  user = undefined as string | undefined,
  activity = undefined as ClimbingActivities | undefined,
  isPrivate = undefined as boolean | undefined,
): Promise<Response<Rock[]>> => {
  let response;
  let message;

  try {
    response = await getRequest().get(`/rocks/?${optionalQueryParams({
      ids,
      search,
      offset,
      limit,
      location,
      area,
      type,
      user,
      activity,
      isPrivate,
    })}`);
  } catch (error: unknown) {
    message = error;
  }

  if (response && response.status === 200) {
    return {
      rocks: response.data.rocks,
      count: response.data.count,
      status: response.status,
      error: null,
    } as Response<Rock[]>;
  }

  return {
    rocks: null,
    count: 0,
    status: response ? response.status : 500,
    error: `${message}`,
  } as Response<Rock[]>;
};

export default {
  createRock,
  deleteRock,
  editRock,
  getRock,
  getRocks,
};
