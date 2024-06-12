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
 * Creates a new area.
 *
 * @param {string} crag ID of the crag.
 * @param {string} name Name of the area.
 * @param {boolean} [officialName = true] Is this the official name?
 * @param {string[]} [altNames = []] Alternative names.
 * @param {string} [image = ''] Image of the area.
 * @param {ExternalHref} [hrefs = {}] Other links.
 * @param {ClimbingActivities[]} [activities = []] Activities in this area.
 * @param {boolean} [isPrivate = false] Is this area private?
 * @param {boolean} [privateName = false] Is the area's name private?
 * @param {string[]} [media = []] IDs of media for area.
 * @returns {Promise<Area | null>} Promise of area or null.
 */
const createArea = async (
  crag: string,
  name: string,
  officialName = true,
  altNames = [] as string[],
  image = '',
  hrefs = {} as ExternalHref,
  activities = [] as ClimbingActivities[],
  isPrivate = false,
  privateName = false,
  media = [] as string[],
): Promise<Area | null> => {
  try {
    if (!crag || !name) {
      return null;
    }

    const response = await request.post(
      '/areas/create',
      {
        crag,
        name,
        officialName,
        altNames,
        image,
        hrefs,
        activities,
        isPrivate,
        privateName,
        media,
      },
    );

    if (response.status === 201) {
      return response.data.area as Area;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

/**
 * Deletes an area.
 *
 * @param {string} id Area ID.
 * @returns {Promise<void>} Promise of the action.
 */
const deleteArea = async (id: string): Promise<void> => {
  try {
    if (!id) {
      return;
    }

    await request.delete(`/areas/delete?id=${id}`);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Edits an area.
 *
 * @param {string} id ID of area to edit.
 * @param {undefined | string} [crag = undefined] ID of the crag.
 * @param {undefined | string} [name = undefined] Name of the area.
 * @param {undefined | boolean} [officialName = undefined] Is this the official name?
 * @param {undefined | string[]} [altNames = undefined] Alternative names.
 * @param {undefined | string} [image = undefined] Image of the area.
 * @param {undefined | ExternalHref} [hrefs = undefined] Other links.
 * @param {undefined | ClimbingActivities[]} [activities = undefined] Activities in this area.
 * @param {undefined | boolean} [isPrivate = undefined] Is this area private?
 * @param {undefined | boolean} [privateName = undefined] Is the area's name private?
 * @param {undefined | string[]} [media = undefined] IDs of media for area.
 * @returns {Promise<Area | null>} Promise of area or null.
 */
const editArea = async (
  id: string,
  crag = undefined as undefined | string,
  name = undefined as undefined | string,
  officialName = undefined as undefined | boolean,
  altNames = undefined as undefined | string[],
  image = undefined as undefined | string,
  hrefs = undefined as undefined | ExternalHref,
  activities = undefined as undefined | ClimbingActivities[],
  isPrivate = undefined as undefined | boolean,
  privateName = undefined as undefined | boolean,
  media = undefined as undefined | string[],
): Promise<Area | null> => {
  try {
    if (!crag || !name) {
      return null;
    }

    const response = await request.put(
      '/areas/edit',
      {
        id,
        crag,
        name,
        officialName,
        altNames,
        image,
        hrefs,
        activities,
        isPrivate,
        privateName,
        media,
      },
    );

    if (response.status === 200) {
      return response.data.area as Area;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

/**
 * Retrieves an area.
 *
 * @param {string} id Area ID.
 * @returns {Promise<Dictionary<Area | Crag | Rock[] | Route[]> | null>}  Area Details.
 */
const getArea = async (id: string): Promise<Dictionary<Area | Crag | Rock[] | Route[]> | null> => {
  try {
    if (!id) {
      return null;
    }

    const response = await request.get(`/areas/get?id=${id}`);

    if (response.status === 200) {
      return response.data as Dictionary<Area | Crag | Rock[] | Route[]>;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

export default {
  createArea,
  deleteArea,
  editArea,
  getArea,
};
