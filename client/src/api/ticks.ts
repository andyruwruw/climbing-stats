// Local Imports
import {
  optionalQueryParams,
  optionalRequestBody,
  getRequest,
} from './request';
import {
  CLIMBING_ACTIVITY,
  CLIMBING_PROTECTION,
} from '../config';

// Types
import {
  ClimbingActivities,
  Response,
  ClimbingGrade,
  AttemptStatus,
  Tick,
  Protection,
  TickSummations,
} from '../types';

/**
 * Create a new tick.
 *
 * @param {string} route Route the tick is for.
 * @param {AttemptStatus} status Status of send.
 * @param {ClimbingActivities} type Type of climbing activity.
 * @param {boolean} sent Whether this counts for the user as a send.
 * @param {Protection} protection Type of protection used.
 * @param {number} date Date of attempt.
 * @param {string} description Private notes on attempt.
 * @param {number} attempts Number of attempts on route about.
 * @param {number} laps Number of laps on route about.
 * @param {boolean} feature Whether to feature this climb.
 * @param {ClimbingGrade} grade Rough user assigned grade on route.
 * @returns {Promise<Response<Tick>>} The new tick if created successfully.
 */
const createTick = async (
  route: string,
  status: AttemptStatus,
  type = CLIMBING_ACTIVITY.BOULDER,
  sent = true,
  protection = CLIMBING_PROTECTION.PADS,
  date = Date.now(),
  description = '',
  attempts = 0,
  laps = 0,
  feature = false,
  grade = '',
): Promise<Response<Tick>> => {
  let response;
  let message;

  if (route && status) {
    try {
      response = await getRequest().post(
        '/ticks/',
        {
          route,
          status,
          type,
          sent,
          protection,
          date,
          description,
          attempts,
          laps,
          feature,
          grade,
        },
      );
    } catch (error: unknown) {
      message = error;
    }
  }

  if (response && response.status === 201) {
    return {
      tick: response.data.tick as Tick,
      status: 201,
      error: null,
    } as Response<Tick>;
  }

  return {
    tick: null,
    status: response ? response.status : 500,
    error: `${message}`,
  };
};

/**
 * Delete an existing tick.
 *
 * @param {string} id Tick unique identifier.
 * @returns {Promise<Response<number>>} Number of items removed.
 */
const deleteTick = async (id: string): Promise<Response<number>> => {
  let response;
  let message;

  if (id) {
    try {
      response = await getRequest().delete(`/ticks/${id}`);
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
 * Edits an existing tick.
 *
 * @param {string} id Tick unique identifier.
 * @param {string | undefined} [route = undefined] Route the tick is for.
 * @param {AttemptStatus | undefined} [status = undefined] Status of send.
 * @param {ClimbingActivities | undefined} [type = undefined] Type of climbing activity.
 * @param {boolean | undefined} [sent = undefined] Whether this counts for the user as a send.
 * @param {Protection | undefined} [protection = undefined] Type of protection used.
 * @param {number | undefined} [date = undefined] Date of attempt.
 * @param {string | undefined} [description = undefined] Private notes on attempt.
 * @param {number | undefined} [attempts = undefined] Number of attempts on route about.
 * @param {number | undefined} [laps = undefined] Number of laps on route about.
 * @param {boolean | undefined} [feature = undefined] Whether to feature this climb.
 * @param {ClimbingGrade | undefined} [grade = undefined] Rough user assigned grade on route.
 * @returns {Promise<Response<Route>>} The new tick if created successfully.
 */
const editTick = async (
  id: string,
  route = undefined as string | undefined,
  status = undefined as AttemptStatus | undefined,
  type = undefined as ClimbingActivities | undefined,
  sent = undefined as boolean | undefined,
  protection = undefined as Protection | undefined,
  date = undefined as number | undefined,
  description = undefined as string | undefined,
  attempts = undefined as number | undefined,
  laps = undefined as number | undefined,
  feature = undefined as boolean | undefined,
  grade = undefined as string | undefined,
): Promise<Response<Tick>> => {
  let response;
  let message;

  if (id) {
    try {
      response = await getRequest().put(
        `/ticks/${id}`,
        optionalRequestBody({
          route,
          status,
          type,
          sent,
          protection,
          date,
          description,
          attempts,
          laps,
          feature,
          grade,
        }),
      );
    } catch (error: unknown) {
      message = error;
    }
  }

  if (response && response.status === 200) {
    return {
      tick: response.data.tick as Tick,
      status: 200,
      error: null,
    } as Response<Tick>;
  }

  return {
    tick: null,
    status: response ? response.status : 500,
    error: `${message}`,
  };
};

/**
 * Retrieves summations on ticks.
 *
 * @param {string | undefined} user Unique identifier of user to fetch summations of.
 * @returns {Promise<Response<TickSummations>>} Tick details
 */
const getTickSummations = async (user = undefined as string | undefined): Promise<Response<TickSummations>> => {
  let response;
  let message;

  try {
    response = await getRequest().get(`/ticks/summations?${optionalQueryParams({ user })}`);
  } catch (error: unknown) {
    message = error;
  }

  if (response && response.status === 200) {
    return {
      summations: response.data.summations as TickSummations,
      status: 200,
      error: `${message}`,
    };
  }

  return {
    summations: null,
    status: response ? response.status : 500,
    error: `${message}`,
  };
};

/**
 * Retrieves a tick.
 *
 * @param {string} id Unique identifier for an tick.
 * @returns {Promise<Response<Tick>>} Tick details
 */
const getTick = async (id: string): Promise<Response<Tick>> => {
  let response;
  let message;

  try {
    response = await getRequest().get(`/ticks/${id}`);
  } catch (error: unknown) {
    message = error;
  }

  if (response && response.status === 200) {
    return {
      tick: response.data.tick as Tick,
      status: 200,
      error: `${message}`,
    };
  }

  return {
    tick: null,
    status: response ? response.status : 500,
    error: `${message}`,
  };
};

/**
 * Retrieve a set of ticks.
 *
 * @param {string[] | undefined} [ids = undefined] Set list of unique identifiers to fetch.
 * @param {string | undefined} [route = undefined] Route the tick is of.
 * @param {string | undefined} [status = undefined] Status of the attempt.
 * @param {string | undefined} [sent = undefined] Whether the attempt counts as a send.
 * @param {string | undefined} [protection = undefined] Protection of the tick.
 * @param {string | undefined} [date = undefined] Date of the tick.
 * @param {string | undefined} [feature = undefined] Whether the tick is featured.
 * @param {string | undefined} [grade = undefined] Grade of the route the tick is for.
 * @param {string | undefined} [search = undefined] Query for name.
 * @param {number | undefined} [offset = undefined] Search cursor offset.
 * @param {number | undefined} [limit = undefined] Number of items to fetch (max 25).
 * @param {number | undefined} [location = undefined] Location of tick.
 * @param {number | undefined} [area = undefined] Area of tick.
 * @param {number | undefined} [before = undefined] Fetch ticks before a set date.
 * @param {number | undefined} [after = undefined] Fetch ticks after a set date.
 * @param {ClimbingActivities | undefined} [activity = undefined] Type of route.
 * @param {string | undefined} [user = undefined] Users who made the tick.
 * @returns {Promise<Response<Rock[]>>} A set of ticks.
 */
const getTicks = async (
  ids = undefined as string[] | undefined,
  route = undefined as string | undefined,
  status = undefined as AttemptStatus | undefined,
  sent = undefined as boolean | undefined,
  protection = undefined as Protection | undefined,
  date = undefined as number | undefined,
  feature = undefined as boolean | undefined,
  grade = undefined as ClimbingGrade | undefined,
  search = undefined as string | undefined,
  offset = undefined as number | undefined,
  limit = undefined as number | undefined,
  location = undefined as string | undefined,
  area = undefined as string | undefined,
  before = undefined as number | undefined,
  after = undefined as number | undefined,
  activity = undefined as ClimbingActivities | undefined,
  user = undefined as string | undefined,
): Promise<Response<Tick[]>> => {
  let response;
  let message;

  try {
    response = await getRequest().get(`/ticks/?${optionalQueryParams({
      ids,
      route,
      status,
      sent,
      protection,
      date,
      feature,
      grade,
      search,
      offset,
      limit,
      location,
      area,
      before,
      after,
      activity,
      user,
    })}`);
  } catch (error: unknown) {
    message = error;
  }

  if (response && response.status === 200) {
    return {
      ticks: response.data.ticks,
      count: response.data.count,
      status: response.status,
      error: null,
    } as Response<Tick[]>;
  }

  return {
    ticks: null,
    count: 0,
    status: response ? response.status : 500,
    error: `${message}`,
  } as Response<Tick[]>;
};

export default {
  createTick,
  deleteTick,
  editTick,
  getTickSummations,
  getTick,
  getTicks,
};
