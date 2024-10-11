// Local Imports
import {
  optionalQueryParams,
  optionalRequestBody,
  getRequest,
} from './request';

// Types
import {
  ClimbingActivities,
  ExternalHref,
  Location,
  Response,
} from '../types';

/**
 * Create a new location.
 *
 * @param {string} name Name of the location.
 * @param {boolean} officiallyNamed Is this the official name?
 * @param {string[]} altNames Other names this location is known as.
 * @param {boolean} outdoors Whether this location is outdoors.
 * @param {string} image Main image.
 * @param {string} country Country this location is in.
 * @param {string} state State this location is in.
 * @param {string} locale Locale of this location.
 * @param {string} color Color of the location.
 * @param {ExternalHref} hrefs External links.
 * @param {ClimbingActivities[]} activities What activites are available.
 * @param {boolean} isPrivate Whether this location contains private data.
 * @param {boolean} privateName Whether this location contains private data.
 * @param {boolean} privateLocation Whether this location contains private data.
 * @returns {Promise<Response<Location>>} The new location if created successfully.
 */
const createLocation = async (
  name: string,
  officiallyNamed = true,
  altNames = [] as string[],
  outdoors = true,
  image = '',
  country = '',
  state = '',
  locale = '',
  color = '',
  hrefs = {} as ExternalHref,
  activities = [] as ClimbingActivities[],
  isPrivate = false,
  privateName = false,
  privateLocation = false,
): Promise<Response<Location>> => {
  let response;
  let message;

  if (name) {
    try {
      response = await getRequest().post(
        '/locations',
        {
          name,
          officiallyNamed,
          altNames,
          outdoors,
          image,
          country,
          state,
          locale,
          color,
          hrefs,
          activities,
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
      location: response.data.location as Location,
      status: 201,
      error: null,
    } as Response<Location>;
  }

  return {
    location: null,
    status: response ? response.status : 500,
    error: `${message}`,
  };
};

/**
 * Delete an existing location.
 *
 * @param {string} id Location unique identifier.
 * @returns {Promise<Response<number>>} Number of items removed.
 */
const deleteLocation = async (id: string): Promise<Response<number>> => {
  let response;
  let message;

  if (id) {
    try {
      response = await getRequest().delete(`/locations/${id}`);
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
 * Edits an existing location.
 *
 * @param {string} id Location unique identifier.
 * @param {string | undefined} [name = undefined] Name of the location.
 * @param {boolean | undefined} [officiallyNamed = undefined] Is this the official name?
 * @param {string[] | undefined} [altNames = undefined] Other names this location is known as.
 * @param {boolean | undefined} [outdoors = undefined] Whether this location is outdoors.
 * @param {string | undefined} [image = undefined] Main image.
 * @param {string | undefined} [country = undefined] Country this location is in.
 * @param {string | undefined} [state = undefined] State this location is in.
 * @param {string | undefined} [locale = undefined] Locale of this location.
 * @param {string | undefined} [color = undefined] Color of the location.
 * @param {ExternalHref | undefined} [hrefs = undefined] External links.
 * @param {ClimbingActivities[] | undefined} [activities = undefined] What activites are available.
 * @param {boolean | undefined} [isPrivate = undefined] Whether this location contains private data.
 * @param {boolean | undefined} [privateName = undefined] Whether this location contains private data.
 * @param {boolean | undefined} [privateLocation = undefined] Whether this location contains private data.
 * @returns {Promise<Response<Location>>} Promise of location or null.
 */
const editLocation = async (
  id: string,
  name = undefined as string | undefined,
  officiallyNamed = undefined as boolean | undefined,
  altNames = undefined as string[] | undefined,
  outdoors = undefined as boolean | undefined,
  image = undefined as string | undefined,
  country = undefined as string | undefined,
  state = undefined as string | undefined,
  locale = undefined as string | undefined,
  color = undefined as string | undefined,
  hrefs = undefined as ExternalHref | undefined,
  activities = undefined as ClimbingActivities[] | undefined,
  isPrivate = undefined as boolean | undefined,
  privateName = undefined as boolean | undefined,
  privateLocation = undefined as boolean | undefined,
): Promise<Response<Location>> => {
  let response;
  let message;

  if (id) {
    try {
      response = await getRequest().put(
        `/locations/${id}`,
        optionalRequestBody({
          name,
          officiallyNamed,
          altNames,
          outdoors,
          image,
          country,
          state,
          locale,
          color,
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
      location: response.data.location as Location,
      status: 200,
      error: null,
    } as Response<Location>;
  }

  return {
    location: null,
    status: response ? response.status : 500,
    error: `${message}`,
  };
};

/**
 * Retrieves a location.
 *
 * @param {string} id Unique identifier for an location.
 * @returns {Promise<Response<Location>>} Location details
 */
const getLocation = async (id: string): Promise<Response<Location>> => {
  let response;
  let message;

  try {
    response = await getRequest().get(`/locations/${id}`);
  } catch (error: unknown) {
    message = error;
  }

  if (response && response.status === 200) {
    return {
      location: response.data.location as Location,
      status: 200,
      error: `${message}`,
    };
  }

  return {
    location: null,
    status: response ? response.status : 500,
    error: `${message}`,
  };
};

/**
 * Retrieve a set of locations.
 *
 * @param {string[] | undefined} [ids = undefined] Set list of unique identifiers to fetch.
 * @param {string | undefined} [search = undefined] Query for name.
 * @param {number | undefined} [offset = undefined] Search cursor offset.
 * @param {number | undefined} [limit = undefined] Number of items to fetch (max 25).
 * @param {boolean | undefined} [outdoors = undefined] Whether the locations are outdoors.
 * @param  {string | undefined} [user = undefined] Users who have interacted with the location.
 * @param  {string | undefined} [country = undefined] Country the location is in.
 * @param  {string | undefined} [state = undefined] State the location is in.
 * @param  {string | undefined} [locale = undefined] Locale the location is in.
 * @param  {string | undefined} [address = undefined] Address of the location.
 * @param  {ClimbingActivities | undefined} [activity = undefined] Included activities in the location.
 * @param  {boolean | undefined} [isPrivate = undefined] Whether the location is private.
 * @returns {Promise<Response<Location[]>>} A set of locations.
 */
const getLocations = async (
  ids = undefined as string[] | undefined,
  search = undefined as string | undefined,
  offset = undefined as number | undefined,
  limit = undefined as number | undefined,
  outdoors = undefined as boolean | undefined,
  user = undefined as string | undefined,
  country = undefined as string | undefined,
  state = undefined as string | undefined,
  locale = undefined as string | undefined,
  address = undefined as string | undefined,
  activity = undefined as ClimbingActivities | undefined,
  isPrivate = undefined as boolean | undefined,
): Promise<Response<Location[]>> => {
  let response;
  let message;

  try {
    response = await getRequest().get(`/locations?${optionalQueryParams({
      ids,
      search,
      offset,
      limit,
      outdoors,
      user,
      country,
      state,
      locale,
      address,
      activity,
      isPrivate,
    })}`);
  } catch (error: unknown) {
    message = error;
  }

  if (response && response.status === 200) {
    return {
      locations: response.data.locations,
      count: response.data.count,
      status: response.status,
      error: null,
    } as Response<Location[]>;
  }

  return {
    locations: null,
    count: 0,
    status: response ? response.status : 500,
    error: `${message}`,
  } as Response<Location[]>;
};

export default {
  createLocation,
  deleteLocation,
  editLocation,
  getLocation,
  getLocations,
};
