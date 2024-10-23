// Local Imports
import {
  optionalQueryParams,
  optionalRequestBody,
  getRequest,
} from './request';

// Types
import {
  ClimbingActivities,
  Response,
  ClimbingGrade,
  Session,
  SessionSummations,
} from '../types';

/**
 * Create a new session.
 *
 * @param {string} location Where this session was.
 * @param {number} start Starting time of the session.
 * @param {number} end End of the session.
 * @param {string[]} [areas = []] Areas time was spent.
 * @param {ClimbingActivities[]} [activities = []] What activites were done.
 * @param {string} [description = ''] Description of the session.
 * @param {number} [felt = -1] How the climber felt.
 * @param {string[]} [partners = []] Partners climbed with.
 * @param {number} [activeCal = -1] Active calories.
 * @param {number} [totalCal = -1] Total calories burned.
 * @param {number} [heart = -1] Average heartrate.
 * @param {number} [lowHeart = -1] Lowest heart rate reached.
 * @param {number} [highHeart = -1] Highest heart rate reached.
 * @param {string[]} [carpool = []] Who was carpooled with.
 * @param {number} [drive = 0] Length of drive.
 * @param {string[]} [media = []] Associated media.
 * @param {ClimbingGrade[]} [sent = []] Max item sent.
 * @returns {Promise<Response<Session>>} The new session if created successfully.
 */
const createSession = async (
  location: string,
  start: number,
  end: number,
  areas = [] as string[],
  activities = [] as ClimbingActivities[],
  description = '',
  felt = -1,
  partners = [] as string[],
  activeCal = -1,
  totalCal = -1,
  heart = -1,
  lowHeart = -1,
  highHeart = -1,
  carpool = [] as string[],
  drive = 0,
  sent = [] as ClimbingGrade[],
): Promise<Response<Session>> => {
  let response;
  let message;

  if (location
    && start
    && end) {
    try {
      response = await getRequest().post(
        '/sessions/',
        {
          location,
          start,
          end,
          areas,
          activities,
          description,
          felt,
          partners,
          activeCal,
          totalCal,
          heart,
          lowHeart,
          highHeart,
          carpool,
          drive,
          sent,
        },
      );
    } catch (error: unknown) {
      message = error;
    }
  }

  if (response && response.status === 201) {
    return {
      session: response.data.session as Session,
      status: 201,
      error: null,
    } as Response<Session>;
  }

  return {
    session: null,
    status: response ? response.status : 500,
    error: `${message}`,
  };
};

/**
 * Delete an existing session.
 *
 * @param {string} id Session unique identifier.
 * @returns {Promise<Response<number>>} Number of items removed.
 */
const deleteSession = async (id: string): Promise<Response<number>> => {
  let response;
  let message;

  if (id) {
    try {
      response = await getRequest().delete(`/sessions/${id}`);
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
 * Edits an existing session.
 *
 * @param {string} id Session unique identifier.
 * @param {string | undefined} [location] = undefined Where this session was.
 * @param {number | undefined} [start = undefined] Starting time of the session.
 * @param {number | undefined} [end = undefined] End of the session.
 * @param {string[] | undefined} [areas = undefined] Areas time was spent.
 * @param {ClimbingActivities[] | undefined} [activities = undefined] What activites were done.
 * @param {string | undefined} [description = undefined] Description of the session.
 * @param {number | undefined} [felt = undefined] How the climber felt.
 * @param {string[] | undefined} [partners = undefined] Partners climbed with.
 * @param {number | undefined} [activeCal = undefined] Active calories.
 * @param {number | undefined} [totalCal = undefined] Total calories burned.
 * @param {number | undefined} [heart = undefined] Average heartrate.
 * @param {number | undefined} [lowHeart = undefined] Lowest heart rate reached.
 * @param {number | undefined} [highHeart = undefined] Highest heart rate reached.
 * @param {string[] | undefined} [carpool = undefined] Who was carpooled with.
 * @param {number | undefined} [drive = undefined] Length of drive.
 * @param {string[] | undefined} [media = undefined] Associated media.
 * @param {ClimbingGrade[]} [sent = undefined] Max item sent.
 * @param {string | undefined} [location = undefined] Location of the route.
 * @returns {Promise<Response<Session>>} The new session if created successfully.
 */
const editSession = async (
  id: string,
  location = undefined as string | undefined,
  start = undefined as number | undefined,
  end = undefined as number | undefined,
  areas = undefined as string[] | undefined,
  activities = undefined as ClimbingActivities[] | undefined,
  description = undefined as string | undefined,
  felt = undefined as number | undefined,
  partners = undefined as string[] | undefined,
  activeCal = undefined as number | undefined,
  totalCal = undefined as number | undefined,
  heart = undefined as number | undefined,
  lowHeart = undefined as number | undefined,
  highHeart = undefined as number | undefined,
  carpool = undefined as string[] | undefined,
  drive = undefined as number | undefined,
  sent = undefined as ClimbingGrade[] | undefined,
): Promise<Response<Session>> => {
  let response;
  let message;

  if (id) {
    try {
      response = await getRequest().put(
        `/sessions/${id}`,
        optionalRequestBody({
          location,
          start,
          end,
          areas,
          activities,
          description,
          felt,
          partners,
          activeCal,
          totalCal,
          heart,
          lowHeart,
          highHeart,
          carpool,
          drive,
          sent,
        }),
      );
    } catch (error: unknown) {
      message = error;
    }
  }

  if (response && response.status === 200) {
    return {
      session: response.data.session as Session,
      status: 200,
      error: null,
    } as Response<Session>;
  }

  return {
    session: null,
    status: response ? response.status : 500,
    error: `${message}`,
  };
};

/**
 * Retrieves summations on sessions.
 *
 * @param {string | undefined} user Unique identifier of user to fetch summations of.
 * @returns {Promise<Response<SessionSummations>>} Session details
 */
const getSessionSummations = async (user = undefined as string | undefined): Promise<Response<SessionSummations>> => {
  let response;
  let message;

  try {
    response = await getRequest().get(`/sessions/summations?${optionalQueryParams({ user })}`);
  } catch (error: unknown) {
    message = error;
  }

  if (response && response.status === 200) {
    return {
      summations: response.data.summations as SessionSummations,
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
 * Retrieves a session.
 *
 * @param {string} id Unique identifier for an session.
 * @returns {Promise<Response<Session>>} Session details
 */
const getSession = async (id: string): Promise<Response<Session>> => {
  let response;
  let message;

  try {
    response = await getRequest().get(`/sessions/${id}`);
  } catch (error: unknown) {
    message = error;
  }

  if (response && response.status === 200) {
    return {
      session: response.data.session as Session,
      status: 200,
      error: `${message}`,
    };
  }

  return {
    session: null,
    status: response ? response.status : 500,
    error: `${message}`,
  };
};

/**
 * Retrieve a set of sessions.
 *
 * @param {string[] | undefined} [ids = undefined] Set list of unique identifiers to fetch.
 * @param {string | undefined} [search = undefined] Query for name.
 * @param {number | undefined} [offset = undefined] Search cursor offset.
 * @param {number | undefined} [limit = undefined] Number of items to fetch (max 25).
 * @param {string | undefined} [location = undefined] Location of sessions.
 * @param {string | undefined} [area = undefined] Area of sessions.
 * @param {boolean | undefined} [outdoors = undefined] Whether the session was outdoors.
 * @param {number | undefined} [before = undefined] A date to fetch before.
 * @param {number | undefined} [after = undefined] A date to fetch after.
 * @param {number | undefined} [minDuration = undefined] Minimum duration of session.
 * @param {number | undefined} [maxDuration = undefined] Maximum duration of session.
 * @param {ClimbingActivities| undefined} [activity = undefined] Activities of session.
 * @param {string | undefined} [partner = undefined] Partner in the session.
 * @param {string | undefined} [carpool = undefined] Carpool partner in the session.
 * @param {string | undefined} [user = undefined] User the session belongs to.
 * @returns {Promise<Response<Session[]>>} A set of sessions.
 */
const getSessions = async (
  ids = undefined as string[] | undefined,
  search = undefined as string | undefined,
  offset = undefined as number | undefined,
  limit = undefined as number | undefined,
  location = undefined as string | undefined,
  area = undefined as string | undefined,
  outdoors = undefined as boolean | undefined,
  before = undefined as boolean | undefined,
  after = undefined as boolean | undefined,
  minDuration = undefined as number | undefined,
  maxDuration = undefined as number | undefined,
  activity = undefined as ClimbingActivities | undefined,
  partner = undefined as string | undefined,
  carpool = undefined as string | undefined,
  user = undefined as string | undefined,
): Promise<Response<Session[]>> => {
  let response;
  let message;

  try {
    response = await getRequest().get(`/sessions/?${optionalQueryParams({
      ids,
      search,
      offset,
      limit,
      location,
      area,
      outdoors,
      before,
      after,
      minDuration,
      maxDuration,
      activity,
      partner,
      carpool,
      user,
    })}`);
  } catch (error: unknown) {
    message = error;
  }

  if (response && response.status === 200) {
    return {
      sessions: response.data.sessions,
      count: response.data.count,
      status: response.status,
      error: null,
    } as Response<Session[]>;
  }

  return {
    sessions: null,
    count: 0,
    status: response ? response.status : 500,
    error: `${message}`,
  } as Response<Session[]>;
};

export default {
  createSession,
  deleteSession,
  editSession,
  getSessionSummations,
  getSession,
  getSessions,
};
