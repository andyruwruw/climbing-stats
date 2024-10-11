// Local Imports
import {
  optionalQueryParams,
  optionalRequestBody,
  getRequest,
} from './request';

// Types
import {
  Area,
  ClimbingActivities,
  ExternalHref,
  Response,
} from '../types';

/**
 * Create a new area.
 *
 * @param {string} location What location this area belongs to.
 * @param {string} name Name of the area.
 * @param {boolean} [officiallyNamed = true] Is this the official name?
 * @param {string[]} [altNames = []] Other names this area is known as.
 * @param {string} [image = ''] Main image of the area.
 * @param {ExternalHref} [hrefs = {}] External links.
 * @param {ClimbingActivities[]} [activities = []] Available climbing activities.
 * @param {boolean} [isPrivate = false] Whether this area contains private information.
 * @param {boolean} [privateName = false] Whether this area contains private information.
 * @param {boolean} [privateLocation = false] Whether this area contains private information.
 * @param {string[]} [media = []] Associated media.
 * @returns {Promise<Response<Area>>} The new area if created successfully.
 */
const createArea = async (
  location: string,
  name: string,
  officiallyNamed = true,
  altNames = [] as string[],
  image = '',
  hrefs = {} as ExternalHref,
  activities = [] as ClimbingActivities[],
  isPrivate = false,
  privateName = false,
  privateLocation = false,
  media = [] as string[],
): Promise<Response<Area>> => {
  let response;
  let message;

  if (location && name) {
    try {
      response = await getRequest().post(
        '/areas',
        {
          location,
          name,
          officiallyNamed,
          altNames,
          image,
          hrefs,
          activities,
          isPrivate,
          privateName,
          privateLocation,
          media,
        },
      );
    } catch (error: unknown) {
      message = error;
    }
  }

  if (response && response.status === 201) {
    return {
      area: response.data.area as Area,
      status: 201,
      error: null,
    } as Response<Area>;
  }

  return {
    area: null,
    status: response ? response.status : 500,
    error: `${message}`,
  };
};

/**
 * Delete an existing area.
 *
 * @param {string} id Area unique identifier.
 * @returns {Promise<Response<number>>} Number of items removed.
 */
const deleteArea = async (id: string): Promise<Response<number>> => {
  let response;
  let message;

  if (id) {
    try {
      response = await getRequest().delete(`/areas/${id}`);
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
 * Edits an existing area.
 *
 * @param {string} id Area unique identifier.
 * @param {undefined | string} [location = undefined] What location this area belongs to.
 * @param {undefined | string} [name = undefined] Name of the area.
 * @param {undefined | boolean} [officiallyNamed = undefined] Is this the official name?
 * @param {undefined | string[]} [altNames = undefined] Other names this area is known as.
 * @param {undefined | string} [image = undefined] Main image of the area.
 * @param {undefined | ExternalHref} [hrefs = undefined] External links.
 * @param {undefined | ClimbingActivities[]} [activities = undefined] Available climbing activities.
 * @param {undefined | boolean} [isPrivate = undefined] Whether this area contains private information.
 * @param {undefined | boolean} [privateName = undefined] Whether this area contains private data.
 * @param {undefined | boolean} [privateLocation = undefined] Whether this area contains private data.
 * @returns {Promise<Response<Area>>} Promise of area or null.
 */
const editArea = async (
  id: string,
  location = undefined as undefined | string,
  name = undefined as undefined | string,
  officiallyNamed = undefined as undefined | boolean,
  altNames = undefined as undefined | string[],
  image = undefined as undefined | string,
  hrefs = undefined as undefined | ExternalHref,
  activities = undefined as undefined | ClimbingActivities[],
  isPrivate = undefined as undefined | boolean,
  privateName = undefined as undefined | boolean,
  privateLocation = undefined as undefined | boolean,
): Promise<Response<Area>> => {
  let response;
  let message;

  if (id) {
    try {
      response = await getRequest().put(
        `/areas/${id}`,
        optionalRequestBody({
          location,
          name,
          officiallyNamed,
          altNames,
          image,
          hrefs,
          activities,
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
      area: response.data.area as Area,
      status: 200,
      error: null,
    } as Response<Area>;
  }

  return {
    area: null,
    status: response ? response.status : 500,
    error: `${message}`,
  };
};

/**
 * Retrieves an area.
 *
 * @param {string} id Unique identifier for an area.
 * @returns {Promise<Response<Area>>} Area details
 */
const getArea = async (id: string): Promise<Response<Area>> => {
  let response;
  let message;

  try {
    response = await getRequest().get(`/areas/${id}`);
  } catch (error: unknown) {
    message = error;
  }

  if (response && response.status === 200) {
    return {
      area: response.data.area as Area,
      status: 200,
      error: `${message}`,
    };
  }

  return {
    area: null,
    status: response ? response.status : 500,
    error: `${message}`,
  };
};

/**
 * Retrieve a set of areas.
 *
 * @param {string[] | undefined} [ids = undefined] Set list of unique identifiers to fetch.
 * @param {string | undefined} [search = undefined] Query for name.
 * @param {number | undefined} [offset = undefined] Search cursor offset.
 * @param {number | undefined} [limit = undefined] Number of items to fetch (max 25).
 * @param {number | undefined} [location = undefined] Location of areas.
 * @param {number | undefined} [user = undefined] User who submitted areas.
 * @param {ClimbingActivities | undefined} [activity = undefined] Climbing activity at areas.
 * @param {boolean | undefined} [isPrivate = undefined] Whether the area is private.
 * @returns {Promise<Response<Area[]>>} A set of areas.
 */
const getAreas = async (
  ids = undefined as undefined | string[],
  search = undefined as undefined | string,
  offset = undefined as undefined | number,
  limit = undefined as undefined | number,
  location = undefined as undefined | string,
  user = undefined as undefined | string,
  activity = undefined as undefined | ClimbingActivities,
  isPrivate = undefined as undefined | boolean,
): Promise<Response<Area[]>> => {
  let response;
  let message;

  try {
    response = await getRequest().get(`/areas?${optionalQueryParams({
      ids,
      search,
      offset,
      limit,
      location,
      user,
      activity,
      isPrivate,
    })}`);
  } catch (error: unknown) {
    message = error;
  }

  if (response && response.status === 200) {
    return {
      areas: response.data.areas,
      count: response.data.count,
      status: response.status,
      error: null,
    } as Response<Area[]>;
  }

  return {
    areas: null,
    count: 0,
    status: response ? response.status : 500,
    error: `${message}`,
  } as Response<Area[]>;
};

export default {
  createArea,
  deleteArea,
  editArea,
  getArea,
  getAreas,
};
