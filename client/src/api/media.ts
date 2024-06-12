// Local Imports
import request from './request';

// Types
import {
  Area,
  ClimbingActivities,
  Crag,
  Dictionary,
  ExternalHref,
  Media,
  MediaType,
  Rock,
  Route,
} from '../types';

/**
 * Creates a new media item.
 *
 * @param {MediaType} type Type of media.
 * @param {string} href Link to media.
 * @param {string} [caption = ''] Caption for media.
 * @param {number} [date = Date.now()] Date media was created.
 * @returns {Promise<<Media> | null>} Promise of media item or null.
 */
const createMedia = async (
  type: MediaType,
  href: string,
  caption = '',
  date = Date.now(),
): Promise<Media | null> => {
  try {
    if (!type || !href) {
      return null;
    }

    const response = await request.post(
      '/media/create',
      {
        type,
        href,
        caption,
        date,
      },
    );

    if (response.status === 201) {
      return response.data.media as Media;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

/**
 * Deletes a media item.
 *
 * @param {string} id Media ID.
 * @returns {Promise<void>} Promise of the action.
 */
const deleteMedia = async (id: string): Promise<void> => {
  try {
    if (!id) {
      return;
    }

    await request.delete(`/media/delete?id=${id}`);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Edits a media item.
 *
 * @param {string} id ID of the media item.
 * @param {undefined | MediaType} [type = undefined] Type of media.
 * @param {undefined | string} [href = undefined] Link to media.
 * @param {undefined | string} [caption = undefined] Caption for media.
 * @param {undefined | number} [date = undefined] Date media was created.
 * @returns {Promise<<Media> | null>} Promise of media item or null.
 */
const editMedia = async (
  id: string,
  type = undefined as undefined | MediaType,
  href = undefined as undefined | string,
  caption = undefined as undefined | string,
  date = undefined as undefined | number,
): Promise<Media | null> => {
  try {
    if (!id) {
      return null;
    }

    const response = await request.put(
      '/crags/edit',
      {
        id,
        type,
        href,
        caption,
        date,
      },
    );

    if (response.status === 200) {
      return response.data.media as Media;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

/**
 * Retrieves a media item.
 *
 * @param {string} id Media item ID.
 * @returns {Promise<Dictionary<Crag[] | Area[] | Rock[] | Route[] | Media> | null>}  Media Details.
 */
const getMedia = async (id: string): Promise<Dictionary<Crag[] | Area[] | Rock[] | Route[] | Media> | null> => {
  try {
    if (!id) {
      return null;
    }

    const response = await request.get(`/media/get?id=${id}`);

    if (response.status === 200) {
      return response.data as Dictionary<Crag[] | Area[] | Rock[] | Route[] | Media>;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

export default {
  createMedia,
  deleteMedia,
  editMedia,
  getMedia,
};
