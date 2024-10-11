// Local Imports
import { TOKEN_NAME } from '../config';

/**
 * Retrieves token from local storage.
 *
 * @returns {string | null} Token.
 */
export const getToken = (): string | null => (localStorage ? localStorage.getItem(TOKEN_NAME) : null);

/**
 * Retrieves token from local storage.
 *
 * @returns {string | null} Token.
 */
export const removeToken = (): void | null => (localStorage ? localStorage.removeItem(TOKEN_NAME) : null);

/**
 * Retrieves token from local storage.
 *
 * @returns {string | null} Token.
 */
export const setToken = (token: string): void => {
  if (localStorage) {
    localStorage.setItem(
      TOKEN_NAME,
      token,
    );
  }
};
