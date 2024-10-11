/* eslint-disable max-len */
// Packages
import axios, {
  AxiosHeaders,
  AxiosInstance,
} from 'axios';

// Local Imports
import { BACKEND_ORIGIN } from '../config';
import { getToken } from '../helpers/token';

// Types
import { Dictionary } from '../types';

/**
 * Instantiates the axios instance.
 */
export const getRequest = (): AxiosInstance => {
  const headers = {} as AxiosHeaders;
  const token = getToken();

  if (token) {
    headers.Authorization = `Bearer ${getToken()}`;
  }

  return axios.create({
    baseURL: `${BACKEND_ORIGIN}`,
    headers,
  });
};

/**
 * Turns a body into query parameters.
 *
 * @link https://www.branch.io/glossary/query-parameters/#:~:text=What%20are%20query%20parameters%3F,on%20the%20data%20being%20passed.
 * @param {Dictionary<any>} body Request body.
 * @returns {string} Request query parameters.
 */
export const stringifyBody = (body: Record<string, unknown>): string => {
  const parameters = new URLSearchParams();
  const keys = Object.keys(body);

  for (let i = 0; i < keys.length; i += 1) {
    parameters.append(keys[i], `${body[keys[i]]}`);
  }

  return `?${parameters.toString()}`;
};

/**
 * Only adds non-undefined parameters to query.
 *
 * @param {Dictionary<any>} parameters Parameters to check.
 * @returns {string} Query parameters.
 */
export const optionalQueryParams = (parameters: Dictionary<any>): string => {
  const query = new URLSearchParams();

  const keys = Object.keys(parameters);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];

    if (parameters[key] !== undefined) {
      query.append(
        key,
        `${parameters[key]}`,
      );
    }
  }

  return query.toString();
};

/**
 * Only adds non-undefined parameters to body.
 *
 * @param {Dictionary<any>} parameters Parameters to check.
 * @returns {Dictionary<any>} Request body.
 */
export const optionalRequestBody = (parameters: Dictionary<any>): Dictionary<any> => {
  const body = {} as Dictionary<any>;

  const keys = Object.keys(parameters);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];

    if (parameters[key] !== undefined) {
      body[key] = parameters[key];
    }
  }

  return body;
};
