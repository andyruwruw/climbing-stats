// Local Imports
import {
  optionalQueryParams,
  optionalRequestBody,
  getRequest,
} from './request';
import { CLIMBING_ACTIVITY } from '../config';

// Types
import {
  ClimbingActivities,
  ExternalHref,
  GradeSuggestions,
  Response,
  DangerSuggestions,
  Route,
  ClimbingGrade,
  RouteDanger,
} from '../types';

/**
 * Create a new route.
 *
 * @param {string} location Location of the route.
 * @param {string} name Name of the route.
 * @param {string} area Area this route is at.
 * @param {string} rock Rock this route is on.
 * @param {boolean} officiallyNamed Is this the official name?
 * @param {string[]} altNames Other names this route is known as.
 * @param {string} image Main image.
 * @param {ClimbingActivities} type Type of climbing activity.
 * @param {ExternalHref} hrefs External links.
 * @param {GradeSuggestions} grade Grade of item.
 * @param {DangerSuggestions} danger How dangerous the route is.
 * @param {boolean} isPrivate Whether this route contains private data.
 * @param {boolean} privateName Whether this route contains private data.
 * @param {boolean} privateLocation Whether this route contains private data.
 * @returns {Promise<Response<Route>>} The new route if created successfully.
 */
const createRoute = async (
  location: string,
  name: string,
  area = '',
  rock = '',
  officiallyNamed = true,
  altNames = [] as string[],
  image = '',
  type = CLIMBING_ACTIVITY.BOULDER,
  hrefs = {} as ExternalHref,
  grade = {} as GradeSuggestions,
  danger = {} as DangerSuggestions,
  isPrivate = false,
  privateName = false,
  privateLocation = false,
): Promise<Response<Route>> => {
  let response;
  let message;

  if (name) {
    try {
      response = await getRequest().post(
        '/routes/',
        {
          location,
          name,
          area,
          rock,
          officiallyNamed,
          altNames,
          image,
          type,
          hrefs,
          grade,
          danger,
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
      route: response.data.route as Route,
      status: 201,
      error: null,
    } as Response<Route>;
  }

  return {
    route: null,
    status: response ? response.status : 500,
    error: `${message}`,
  };
};

/**
 * Delete an existing route.
 *
 * @param {string} id Route unique identifier.
 * @returns {Promise<Response<number>>} Number of items removed.
 */
const deleteRoute = async (id: string): Promise<Response<number>> => {
  let response;
  let message;

  if (id) {
    try {
      response = await getRequest().delete(`/routes/${id}`);
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
 * Edits an existing route.
 *
 * @param {string} id Route unique identifier.
 * @param {string | undefined} [location = undefined] Location of the route.
 * @param {string | undefined} [name = undefined] Name of the route.
 * @param {string | undefined} [area = undefined] Area this route is at.
 * @param {string | undefined} [rock = undefined] Rock this route is on.
 * @param {boolean | undefined} [officiallyNamed = undefined] Is this the official name?
 * @param {string[] | undefined} [altNames = undefined] Other names this route is known as.
 * @param {string | undefined} [image = undefined] Main image.
 * @param {ClimbingActivities | undefined} [type = undefined] Type of climbing activity.
 * @param {ExternalHref | undefined} [hrefs = undefined] External links.
 * @param {GradeSuggestions | undefined} [grade = undefined] Grade of item.
 * @param {DangerSuggestions | undefined} [danger = undefined] How dangerous the route is.
 * @param {boolean | undefined} [isPrivate = undefined] Whether this route contains private data.
 * @param {boolean | undefined} [privateName = undefined] Whether this route contains private data.
 * @param {boolean | undefined} [privateLocation = undefined] Whether this route contains private data.
 * @returns {Promise<Response<Route>>} The new route if created successfully.
 */
const editRoute = async (
  id: string,
  location = undefined as string | undefined,
  name = undefined as string | undefined,
  area = undefined as string | undefined,
  rock = undefined as string | undefined,
  officiallyNamed = undefined as boolean | undefined,
  altNames = undefined as string[] | undefined,
  image = undefined as string | undefined,
  type = undefined as ClimbingActivities | undefined,
  hrefs = undefined as ExternalHref | undefined,
  grade = undefined as GradeSuggestions | undefined,
  danger = undefined as DangerSuggestions | undefined,
  isPrivate = undefined as boolean | undefined,
  privateName = undefined as boolean | undefined,
  privateLocation = undefined as boolean | undefined,
): Promise<Response<Route>> => {
  let response;
  let message;

  if (id) {
    try {
      response = await getRequest().put(
        `/routes/${id}`,
        optionalRequestBody({
          location,
          name,
          area,
          rock,
          officiallyNamed,
          altNames,
          image,
          type,
          hrefs,
          grade,
          danger,
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
      route: response.data.route as Route,
      status: 200,
      error: null,
    } as Response<Route>;
  }

  return {
    route: null,
    status: response ? response.status : 500,
    error: `${message}`,
  };
};

/**
 * Retrieves a route.
 *
 * @param {string} id Unique identifier for an route.
 * @returns {Promise<Response<Route>>} Route details
 */
const getRoute = async (id: string): Promise<Response<Route>> => {
  let response;
  let message;

  try {
    response = await getRequest().get(`/routes/${id}`);
  } catch (error: unknown) {
    message = error;
  }

  if (response && response.status === 200) {
    return {
      route: response.data.route as Route,
      status: 200,
      error: `${message}`,
    };
  }

  return {
    route: null,
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
 * @param {number | undefined} [location = undefined] Location of routes.
 * @param {number | undefined} [area = undefined] Area of routes.
 * @param {number | undefined} [rock = undefined] Rock of routes.
 * @param {ClimbingActivities | undefined} [type = undefined] Type of route.
 * @param {ClimbingGrade | undefined} [grade = undefined] Grade of the route.
 * @param {RouteDanger | undefined} [danger = undefined] Danger of the route.
 * @param {string | undefined} [user = undefined] Users who have interacted with the rock.
 * @param {boolean | undefined} [isPrivate = undefined] Whether the location is private.
 * @returns {Promise<Response<Rock[]>>} A set of routes.
 */
const getRoutes = async (
  ids = undefined as string[] | undefined,
  search = undefined as string | undefined,
  offset = undefined as number | undefined,
  limit = undefined as number | undefined,
  location = undefined as string | undefined,
  area = undefined as string | undefined,
  rock = undefined as string | undefined,
  type = undefined as ClimbingActivities | undefined,
  grade = undefined as ClimbingGrade | undefined,
  danger = undefined as RouteDanger | undefined,
  user = undefined as string | undefined,
  isPrivate = undefined as boolean | undefined,
): Promise<Response<Route[]>> => {
  let response;
  let message;

  try {
    response = await getRequest().get(`/routes/?${optionalQueryParams({
      ids,
      search,
      offset,
      limit,
      location,
      area,
      rock,
      type,
      grade,
      danger,
      user,
      isPrivate,
    })}`);
  } catch (error: unknown) {
    message = error;
  }

  if (response && response.status === 200) {
    return {
      routes: response.data.routes,
      count: response.data.count,
      status: response.status,
      error: null,
    } as Response<Route[]>;
  }

  return {
    routes: null,
    count: 0,
    status: response ? response.status : 500,
    error: `${message}`,
  } as Response<Route[]>;
};

export default {
  createRoute,
  deleteRoute,
  editRoute,
  getRoute,
  getRoutes,
};
