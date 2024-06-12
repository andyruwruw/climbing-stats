// Packages
import axios from 'axios';

// Local Imports
import request from './request';

// Types
import {
  PrivacySetting,
  User,
} from '../types';

/**
 * Starts a new session.
 *
 * @param {string} username User's username.
 * @param {string} password User's password.
 * @returns {Promise<User | null>} Promise of user or null.
 */
const login = async (
  username: string,
  password: string,
): Promise<User | null> => {
  try {
    const response = await request.post(
      '/authentication/login',
      {
        username,
        password,
      },
    );

    if (response.status === 201) {
      return response.data.user as User;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

/**
 * Ends the user's current session.
 *
 * @returns {Promise<void>} Promise of the action.
 */
const logout = async (): Promise<void> => {
  try {
    await request.delete('/authentication/logout');
  } catch (error) {
    console.log(error);
  }
};

/**
 * Registers a new user.
 *
 * @param {string} fullName User's full name.
 * @param {string} username User's username.
 * @param {string} password User's password.
 * @param {PrivacySetting} privacy User's privacy setting.
 * @param {string} [email = ''] User's email.
 * @returns {Promise<User | null>} Promise of user or null.
 */
const register = async (
  fullName: string,
  username: string,
  password: string,
  privacy = 'private' as PrivacySetting,
  email = '',
): Promise<User | null> => {
  try {
    const response = await axios.post('http://localhost:3000/api/authentication/register', {
      username,
      fullName,
      email,
      password,
      privacy,
    });
    // const response = await request.post(
    //   '/authentication/register',
    //   {
    //     username,
    //     fullName,
    //     email,
    //     password,
    //     privacy,
    //   },
    // );

    if (response.status === 201) {
      return response.data.user as User;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

export default {
  login,
  logout,
  register,
};
