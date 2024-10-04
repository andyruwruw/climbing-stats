// Local Imports
import request from './request';

// Types
import {
  Area,
  ClimbingActivities,
  Crag,
  Dictionary,
  ExternalHref,
  Rock,
  RockType,
  Route,
} from '../types';

/**
 * Creates a new rock.
 *
 * @param {string} crag Crag the rock is in.
 * @param {string} name Name of the rock.
 * @param {boolean} [officialName = true] Is this the official name?
 * @param {string[]} [altNames = []] Alternative names.
 * @param {string} [image = ''] Image of the rock.
 * @param {ExternalHref} [hrefs = {}] Other links.
 * @param {string} [area = ''] ID of area this rock is in.
 * @param {RockType} [type = 'boulder'] Type of rock.
 * @param {ClimbingActivities[]} [activities = []] Activities on this rock.
 * @param {boolean} [isPrivate = false] Is this rock private?
 * @param {boolean} [privateName = false] Is the rock's name private?
 * @param {string[]} [media = []] IDs of media for rock.
 * @returns {Promise<Rock | null>} Promise of rock or null.
 */
const createRock = async (
  crag: string,
  name: string,
  officialName = true,
  altNames = [],
  image = '',
  hrefs = {},
  area = '',
  type = 'boulder' as RockType,
  activities = [],
  isPrivate = false,
  privateName = false,
  media = [],
): Promise<Crag | null> => {
  try {
    if (!name || !crag) {
      return null;
    }

    const response = await request.post(
      '/rocks/create',
      {
        crag,
        name,
        officialName,
        altNames,
        image,
        hrefs,
        area,
        type,
        activities,
        isPrivate,
        privateName,
        media,
      },
    );

    if (response.status === 201) {
      return response.data.crag as Crag;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

/**
 * Deletes a rock.
 *
 * @param {string} id Rock ID.
 * @returns {Promise<void>} Promise of the action.
 */
const deleteRock = async (id: string): Promise<void> => {
  try {
    if (!id) {
      return;
    }

    await request.delete(`/rocks/delete?id=${id}`);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Edits a rock.
 *
 * @param {string} id ID of the rock.
 * @param {undefined | string} [crag = undefined] Crag the rock is in.
 * @param {undefined | string} [name = undefined] Name of the rock.
 * @param {undefined | boolean} [officialName = undefined] Is this the official name?
 * @param {undefined | string[]} [altNames = undefined] Alternative names.
 * @param {undefined | string} [image = undefined] Image of the rock.
 * @param {undefined | ExternalHref} [hrefs = undefined] Other links.
 * @param {undefined | string} [area = undefined] ID of area this rock is in.
 * @param {undefined | RockType} [type = undefined] Type of rock.
 * @param {undefined | ClimbingActivities[]} [activities = undefined] Activities on this rock.
 * @param {undefined | boolean} [isPrivate = undefined] Is this rock private?
 * @param {undefined | boolean} [privateName = undefined] Is the rock's name private?
 * @param {undefined | string[]} [media = undefined] IDs of media for rock.
 * @returns {Promise<Rock | null>} Promise of rock or null.
 */
const editRock = async (
  id: string,
  crag = undefined as undefined | string,
  name = undefined as undefined | string,
  officialName = undefined as undefined | boolean,
  altNames = undefined as undefined | string[],
  image = undefined as undefined | string,
  hrefs = undefined as undefined | ExternalHref,
  area = undefined as undefined | string,
  type = undefined as undefined | RockType,
  activities = undefined as undefined | ClimbingActivities,
  isPrivate = undefined as undefined | boolean,
  privateName = undefined as undefined | boolean,
  media = undefined as undefined | string[],
): Promise<Rock | null> => {
  try {
    if (!id) {
      return null;
    }

    const response = await request.put(
      '/rocks/edit',
      {
        id,
        crag,
        name,
        officialName,
        altNames,
        image,
        hrefs,
        area,
        type,
        activities,
        isPrivate,
        privateName,
        media,
      },
    );

    if (response.status === 200) {
      return response.data.rock as Rock;
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
const getRock = async (id: string): Promise<Dictionary<Crag | Area | Rock | Route[]> | null> => {
  try {
    if (!id) {
      return null;
    }

    const response = await request.get(`/rocks/get?id=${id}`);

    if (response.status === 200) {
      return response.data as Dictionary<Crag | Area | Rock | Route[]>;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

export default {
  createRock,
  deleteRock,
  editRock,
  getRock,
};
