// Local Imports
import request from './request';

// Types
import {
  Area,
  ClimbingActivities,
  Crag,
  Danger,
  Dictionary,
  ExternalHref,
  GradeSuggestions,
  Rock,
  RockType,
  Route,
} from '../types';

/**
 * Creates a new route.
 *
 * @param {ClimbingActivities} type Type of activity.
 * @param {string} crag Crag the route is in.
 * @param {string} name Name of the route.
 * @param {string} [area = ''] Area the route is in.
 * @param {string} [rock = ''] Rock the route is on.
 * @param {boolean} [officialName = true] Is this the official name?
 * @param {string[]} [altNames = []] Alternative names.
 * @param {string} [image = ''] Image of the route.
 * @param {string[]} [media = []] IDs of media for route.
 * @param {ExternalHref} [hrefs = {}] Other links.
 * @param {Danger} [danger = ''] Danger of the route.
 * @param {GradeSuggestions} [grade = {}] Grade of the route.
 * @param {boolean} [isPrivate = false] Is this route private?
 * @param {boolean} [privateName = false] Is the route's name private?
 * @returns {Promise<Route | null>} Promise of route or null.
 */
const createRoute = async (
  type: ClimbingActivities,
  crag: string,
  name: string,
  area = '',
  rock = '',
  officialName = true,
  altNames = [] as string[],
  image = '',
  media = [] as string[],
  hrefs = {} as ExternalHref,
  danger = '',
  grade = {} as GradeSuggestions,
  isPrivate = false,
  privateName = false,
): Promise<Route | null> => {
  try {
    if (!name || !crag) {
      return null;
    }

    const response = await request.post(
      '/routes/create',
      {
        type,
        crag,
        name,
        area,
        rock,
        officialName,
        altNames,
        image,
        media,
        hrefs,
        danger,
        grade,
        isPrivate,
        privateName,
      },
    );

    if (response.status === 201) {
      return response.data.route as Route;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

/**
 * Deletes a route.
 *
 * @param {string} id Route ID.
 * @returns {Promise<void>} Promise of the action.
 */
const deleteRoute = async (id: string): Promise<void> => {
  try {
    if (!id) {
      return;
    }

    await request.delete(`/routes/delete?id=${id}`);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Edits a route.
 *
 * @param {string} id ID of the route.
 * @param {undefined | ClimbingActivities} [type = undefined] Type of activity.
 * @param {undefined | string} [crag = undefined] Crag the route is in.
 * @param {undefined | string} [name = undefined] Name of the route.
 * @param {undefined | string} [area = undefined] Area the route is in.
 * @param {undefined | string} [rock = undefined] Rock the route is on.
 * @param {undefined | boolean} [officialName = undefined] Is this the official name?
 * @param {undefined | string[]} [altNames = undefined] Alternative names.
 * @param {undefined | string} [image = undefined] Image of the route.
 * @param {undefined | string[]} [media = undefined] IDs of media for route.
 * @param {undefined | ExternalHref} [hrefs = undefined] Other links.
 * @param {undefined | Danger} [danger = undefined] Danger of the route.
 * @param {undefined | GradeSuggestions} [grade = undefined] Grade of the route.
 * @param {undefined | boolean} [isPrivate = undefined] Is this route private?
 * @param {undefined | boolean} [privateName = undefined] Is the route's name private?
 * @returns {Promise<Route | null>} Promise of route or null.
 */
const editRoute = async (
  id: string,
  type = undefined as undefined | ClimbingActivities,
  crag = undefined as undefined | string,
  name = undefined as undefined | string,
  area = undefined as undefined | string,
  rock = undefined as undefined | string,
  officialName = undefined as undefined | boolean,
  altNames = undefined as undefined | string[],
  image = undefined as undefined | string,
  media = undefined as undefined | string[],
  hrefs = undefined as undefined | ExternalHref,
  danger = undefined as undefined | string,
  grade = undefined as undefined | GradeSuggestions,
  isPrivate = undefined as undefined | boolean,
  privateName = undefined as undefined | boolean,
): Promise<Route | null> => {
  try {
    if (!id) {
      return null;
    }

    const response = await request.put(
      '/routes/edit',
      {
        id,
        type,
        crag,
        name,
        area,
        rock,
        officialName,
        altNames,
        image,
        media,
        hrefs,
        danger,
        grade,
        isPrivate,
        privateName,
      },
    );

    if (response.status === 200) {
      return response.data.route as Route;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

/**
 * Retrieves a rock.
 *
 * @param {string} id Rock ID.
 * @returns {Promise<Dictionary<Crag | Area | Rock | Route[]> | null>}  Crag Details.
 */
const getRoute = async (id: string): Promise<Dictionary<Crag | Area | Rock | Route[]> | null> => {
  try {
    if (!id) {
      return null;
    }

    const response = await request.get(`/routes/get?id=${id}`);

    if (response.status === 200) {
      return response.data as Dictionary<Crag | Area | Rock | Route[]>;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

export default {
  createRoute,
  deleteRoute,
  editRoute,
  getRoute,
};
