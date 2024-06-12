// Local Imports
import request from './request';

// Types
import {
  Area,
  AttemptStatus,
  ClimbingActivities,
  ClimbingGrade,
  Crag,
  Dictionary,
  Session,
  Tick,
} from '../types';

/**
 * Creates a new tick.
 *
 * @param {number} date Date of the tick.
 * @param {string} route Route for tick.
 * @param {AttemptStatus} status What was the outcome.
 * @param {ClimbingActivities} [type = ''] Type of climbing activity.
 * @param {string} [description = ''] More details on tick.
 * @param {number} [attempts = -1] Number of attempts made.
 * @param {number} [laps = -1] Number of laps made.
 * @param {string[]} [media = []] Media of tick.
 * @param {boolean} [feature = false] Whether to feature this on account.
 * @param {number} [rating = -1] Rating for route.
 * @param {ClimbingGrade} [gradeSuggestion = ''] Suggested grad.
 * @returns {Promise<Tick | null>} Promise of tick or null.
 */
const createTick = async (
  date: number,
  route: string,
  status: AttemptStatus,
  type = '' as ClimbingActivities,
  description = '',
  attempts = -1,
  laps = -1,
  media = [] as string[],
  feature = false,
  rating = -1,
  gradeSuggestion = '' as ClimbingGrade,
): Promise<Tick | null> => {
  try {
    if (!date || !route || !status) {
      return null;
    }

    const response = await request.post(
      '/tick/create',
      {
        date,
        route,
        status,
        type,
        description,
        attempts,
        laps,
        media,
        feature,
        rating,
        gradeSuggestion,
      },
    );

    if (response.status === 201) {
      return response.data.tick as Tick;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

/**
 * Deletes a tick.
 *
 * @param {string} id Tick ID.
 * @returns {Promise<void>} Promise of the action.
 */
const deleteTick = async (id: string): Promise<void> => {
  try {
    if (!id) {
      return;
    }

    await request.delete(`/ticks/delete?id=${id}`);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Edits a tick.
 *
 * @param {string} id ID of the session.
 * @param {undefined | string} [crag = undefined] Location of session.
 * @param {undefined | number} [date = undefined] Date of the session.
 * @param {undefined | string[]} [areas = undefined] Areas visited during the session.
 * @param {undefined | number} [start = undefined] Start of the session.
 * @param {undefined | number} [end = undefined] End of the session.
 * @param {undefined | number} [duration = undefined] Duration of the session.
 * @param {undefined | ClimbingActivities[]} [activities = undefined] Type of activitys.
 * @param {undefined | boolean} [outdoors = undefined] Whether the session is outdoors.
 * @param {undefined | number} [felt = undefined] How the climber felt.
 * @param {undefined | string} [description = undefined] Description of the session.
 * @param {undefined | string[]} [partners = undefined] Partners during the session.
 * @param {undefined | string[]} [media = undefined] Media from the session.
 * @param {undefined | string[]} [max = undefined] Grades of sends from the session.
 * @returns {Promise<Session | null>} Promise of session or null.
 */
const editTick = async (
  id: string,
  date = undefined as undefined | number,
  route = undefined as undefined | string,
  status = undefined as undefined | AttemptStatus,
  type = undefined as undefined | ClimbingActivities,
  description = undefined as undefined | string,
  attempts = undefined as undefined | number,
  laps = undefined as undefined | number,
  media = undefined as undefined | string[],
  feature = undefined as undefined | boolean,
  rating = undefined as undefined | number,
  gradeSuggestion = undefined as undefined | ClimbingGrade,
): Promise<Tick | null> => {
  try {
    if (!id) {
      return null;
    }

    const response = await request.put(
      '/ticks/edit',
      {
        id,
        date,
        route,
        status,
        type,
        description,
        attempts,
        laps,
        media,
        feature,
        rating,
        gradeSuggestion,
      },
    );

    if (response.status === 200) {
      return response.data.tick as Tick;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

/**
 * Retrieves a user's ticks.
 *
 * @param {string} username User's username.
 * @returns {Promise<Tick[] | null>} The user's ticks.
 */
const getTicks = async (username: string): Promise<Tick[] | null> => {
  try {
    const response = await request.get(`/ticks/gets${username ? `?username=${username}` : ''}`);

    if (response.status === 200) {
      return response.data.ticks as Tick[] | null;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default {
  createTick,
  deleteTick,
  editTick,
  getTicks,
};
