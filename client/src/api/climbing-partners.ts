// Local Imports
import request from './request';

// Types
import { ClimbingPartner } from '../types';

/**
 * Creates a new climbing partner.
 *
 * @param {string} [firstName = '?'] First name of partner.
 * @param {string} [lastName = '?'] Last name of partner.
 * @param {boolean} [isPrivate = true] Whether the partner is private.
 * @param {boolean} [privateName = true] Whether the partner's name is private.
 * @returns {Promise<ClimbingPartner | null>} Promise of partner or null.
 */
const createPartner = async (
  firstName = '?',
  lastName = '?',
  isPrivate = true,
  privateName = true,
): Promise<ClimbingPartner | null> => {
  try {
    const response = await request.post(
      '/partners/create',
      {
        firstName,
        lastName,
        isPrivate,
        privateName,
      },
    );

    if (response.status === 201) {
      return response.data.partner as ClimbingPartner;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

/**
 * Deletes an partner.
 *
 * @param {string} id Partner ID.
 * @returns {Promise<void>} Promise of the action.
 */
const deletePartner = async (id: string): Promise<void> => {
  try {
    if (!id) {
      return;
    }

    await request.delete(`/partners/delete?id=${id}`);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Edits a partner.
 *
 * @param {string} id Partner ID.
 * @param {string} [firstName = '?'] First name of partner.
 * @param {string} [lastName = '?'] Last name of partner.
 * @param {boolean} [isPrivate = true] Whether the partner is private.
 * @param {boolean} [privateName = true] Whether the partner's name is private.
 * @returns {Promise<ClimbingPartner | null>} Promise of partner or null.
 */
const editPartner = async (
  id: string,
  firstName = '?',
  lastName = '?',
  isPrivate = true,
  privateName = true,
): Promise<ClimbingPartner | null> => {
  try {
    if (!id) {
      return null;
    }

    const response = await request.put(
      '/partners/edit',
      {
        id,
        firstName,
        lastName,
        isPrivate,
        privateName,
      },
    );

    if (response.status === 200) {
      return response.data.partner as ClimbingPartner;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

/**
 * Retrieves a partner.
 *
 * @param {string} username Partner ID.
 * @returns {Promise<ClimbingPartner[] | null>}  Area Details.
 */
const getPartners = async (username: string): Promise<ClimbingPartner[] | null> => {
  try {
    if (!username) {
      return null;
    }

    const response = await request.get(`/partners/get?username=${username}`);

    if (response.status === 200) {
      return response.data.partners as ClimbingPartner[];
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

export default {
  createPartner,
  deletePartner,
  editPartner,
  getPartners,
};
