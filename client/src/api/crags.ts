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
  Route,
} from '../types';

/**
 * Creates a new crag.
 *
 * @param {string} name Name of the crag.
 * @param {string} country Country the crag is in.
 * @param {string} state State the crag is in.
 * @param {boolean} [officialName = true] Is this the official name?
 * @param {string[]} [altNames = []] Alternative names.
 * @param {boolean} [outdoors = false] Whether this crag is outdoors.
 * @param {string} [image = ''] Image of the crag.
 * @param {string} [locale = ''] Crag locale, or general location, ie. Willamette Valley.
 * @param {string} [color = ''] Color of crag.
 * @param {string} [address = ''] Address of crag.
 * @param {ExternalHref} [hrefs = {}] Other links.
 * @param {ClimbingActivities[]} [activities = []] Activities in this crag.
 * @param {boolean} [isPrivate = false] Is this crag private?
 * @param {boolean} [privateName = false] Is the crag's name private?
 * @param {boolean} [privateLocation = false] Is the crag's location private?
 * @param {string[]} [media = []] IDs of media for crag.
 * @returns {Promise<Crag | null>} Promise of crag or null.
 */
const createCrag = async (
  name: string,
  country: string,
  state: string,
  officialName = true,
  altNames = [],
  outdoors = false,
  image = '',
  locale = '',
  color = '',
  address = '',
  hrefs = {},
  activities = [],
  isPrivate = false,
  privateName = false,
  privateLocation = false,
  media = [],
): Promise<Crag | null> => {
  try {
    if (!name || !country || !state) {
      return null;
    }

    const response = await request.post(
      '/crags/create',
      {
        name,
        country,
        state,
        officialName,
        altNames,
        outdoors,
        image,
        locale,
        color,
        address,
        hrefs,
        activities,
        isPrivate,
        privateName,
        privateLocation,
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
 * Deletes an crag.
 *
 * @param {string} id Crag ID.
 * @returns {Promise<void>} Promise of the action.
 */
const deleteCrag = async (id: string): Promise<void> => {
  try {
    if (!id) {
      return;
    }

    await request.delete(`/crags/delete?id=${id}`);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Edits a crag.
 *
 * @param {string} id ID of the crag.
 * @param {undefined | string} [name = undefined] Name of the crag.
 * @param {undefined | string} [country = undefined] Country the crag is in.
 * @param {undefined | string} [state = undefined] State the crag is in.
 * @param {undefined | boolean} [officialName = undefined] Is this the official name?
 * @param {undefined | string[]} [altNames = undefined] Alternative names.
 * @param {undefined | boolean} [outdoors = undefined] Whether this crag is outdoors.
 * @param {undefined | string} [image = undefined] Image of the crag.
 * @param {undefined | string} [locale = undefined] Crag locale, or general location, ie. Willamette Valley.
 * @param {undefined | string} [color = undefined] Color of crag.
 * @param {undefined | string} [address = undefined] Address of crag.
 * @param {undefined | ExternalHref} [hrefs = undefined] Other links.
 * @param {undefined | ClimbingActivities[]} [activities = undefined] Activities in this crag.
 * @param {undefined | boolean} [isPrivate = undefined] Is this crag private?
 * @param {undefined | boolean} [privateName = undefined] Is the crag's name private?
 * @param {undefined | boolean} [privateLocation = undefined] Is the crag's location private?
 * @param {undefined | string[]} [media = undefined] IDs of media for crag.
 * @returns {Promise<Crag | null>} Promise of crag or null.
 */
const editCrag = async (
  id: string,
  name = undefined as undefined | string,
  country = undefined as undefined | string,
  state = undefined as undefined | string,
  officialName = undefined as undefined | boolean,
  altNames = undefined as undefined | string[],
  outdoors = undefined as undefined | boolean,
  image = undefined as undefined | string,
  locale = undefined as undefined | string,
  color = undefined as undefined | string,
  address = undefined as undefined | string,
  hrefs = undefined as undefined | ExternalHref,
  activities = undefined as undefined | ClimbingActivities[],
  isPrivate = undefined as undefined | boolean,
  privateName = undefined as undefined | boolean,
  privateLocation = undefined as undefined | boolean,
  media = undefined as undefined | string[],
): Promise<Crag | null> => {
  try {
    if (!id) {
      return null;
    }

    const response = await request.put(
      '/crags/edit',
      {
        id,
        name,
        country,
        state,
        officialName,
        altNames,
        outdoors,
        image,
        locale,
        color,
        address,
        hrefs,
        activities,
        isPrivate,
        privateName,
        privateLocation,
        media,
      },
    );

    if (response.status === 200) {
      return response.data.crag as Crag;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

/**
 * Retrieves a crag.
 *
 * @param {string} id Crag ID.
 * @returns {Promise<Dictionary<Crag | Area[] | Rock[] | Route[]> | null>}  Crag Details.
 */
const getCrag = async (id: string): Promise<Dictionary<Crag | Area[] | Rock[] | Route[]> | null> => {
  try {
    if (!id) {
      return null;
    }

    const response = await request.get(`/crags/get?id=${id}`);

    if (response.status === 200) {
      return response.data as Dictionary<Crag | Area[] | Rock[] | Route[]>;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

export default {
  createCrag,
  deleteCrag,
  editCrag,
  getCrag,
};
