// Local Imports
import request from './request';

// Types
import {
  Area,
  ClimbingActivities,
  ClimbingGrade,
  Crag,
  Dictionary,
  Session,
} from '../types';

/**
 * Creates a new session.
 *
 * @param {string} crag Location of session.
 * @param {number} date Date of the session.
 * @param {string[]} [areas = []] Areas visited during the session.
 * @param {number} [start = -1] Start of the session.
 * @param {number} [end = -1] End of the session.
 * @param {number} [duration = -1] Duration of the session.
 * @param {ClimbingActivities[]} [activities = []] Type of activitys.
 * @param {boolean} [outdoors = false] Whether the session is outdoors.
 * @param {number} [felt = -1] How the climber felt.
 * @param {string} [description = ''] Description of the session.
 * @param {string[]} [partners = []] Partners during the session.
 * @param {string[]} [media = []] Media from the session.
 * @param {string[]} [max = []] Grades of sends from the session.
 * @returns {Promise<Session | null>} Promise of session or null.
 */
const createSession = async (
  crag: string,
  date: number,
  areas = [],
  start = -1,
  end = -1,
  duration = -1,
  activities = [],
  outdoors = false,
  felt = -1,
  description = '',
  partners = [],
  media = [],
  max = [],
): Promise<Session | null> => {
  try {
    if (!crag || !date) {
      return null;
    }

    const response = await request.post(
      '/session/create',
      {
        crag,
        date,
        areas,
        start,
        end,
        duration,
        activities,
        outdoors,
        felt,
        description,
        partners,
        media,
        max,
      },
    );

    if (response.status === 201) {
      return response.data.session as Session;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

/**
 * Deletes a session.
 *
 * @param {string} id Session ID.
 * @returns {Promise<void>} Promise of the action.
 */
const deleteSession = async (id: string): Promise<void> => {
  try {
    if (!id) {
      return;
    }

    await request.delete(`/sessions/delete?id=${id}`);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Edits a session.
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
const editSession = async (
  id: string,
  crag = undefined as undefined | string,
  date = undefined as undefined | number,
  areas = undefined as undefined | string[],
  start = undefined as undefined | number,
  end = undefined as undefined | number,
  duration = undefined as undefined | number,
  activities = undefined as undefined | ClimbingActivities[],
  outdoors = undefined as undefined | boolean,
  felt = undefined as undefined | number,
  description = undefined as undefined | string,
  partners = undefined as undefined | string[],
  media = undefined as undefined | string[],
  max = undefined as undefined | ClimbingGrade[],
): Promise<Session | null> => {
  try {
    if (!id) {
      return null;
    }

    const response = await request.put(
      '/sessions/edit',
      {
        id,
        crag,
        date,
        areas,
        start,
        end,
        duration,
        activities,
        outdoors,
        felt,
        description,
        partners,
        media,
        max,
      },
    );

    if (response.status === 200) {
      return response.data.session as Session;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

/**
 * Retrieves a session.
 *
 * @param {string} id Session ID.
 * @returns {Promise<Dictionary<Crag | Area[] | Session> | null>}  Session Details.
 */
const getSession = async (id: string): Promise<Dictionary<Crag | Area[] | Session> | null> => {
  try {
    if (!id) {
      return null;
    }

    const response = await request.get(`/sessions/get?id=${id}`);

    if (response.status === 200) {
      return response.data as Dictionary<Crag | Area[] | Session>;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

/**
 * Retrieves a user's sessions.
 *
 * @param {string} username User's username.
 * @returns {Promise<Session[] | null>} The user's sessions.
 */
const getSessions = async (username: string): Promise<Session[] | null> => {
  try {
    const response = await request.get(`/sessions/gets${username ? `?username=${username}` : ''}`);

    if (response.status === 200) {
      return response.data.sessions as Session[] | null;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default {
  createSession,
  deleteSession,
  editSession,
  getSession,
  getSessions,
};
