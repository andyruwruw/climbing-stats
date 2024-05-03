// Packages
import * as jsonwebtoken from 'jsonwebtoken';

// Local Imports
import { COOKIE_NAME } from '../config';
import { Environment } from './environment';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../types';

/**
 * Retrieves a cookie from requests.
 *
 * @param {ServerRequest} req Incoming request.
 * @returns {string | null} Cookie value.
 */
export const getCookie = (req: ServerRequest): string | null => {
  if ('cookie' in req.body) {
    return req.body.cookie;
  }
  if ('cookie' in req.query) {
    return req.query.cookie as string;
  }
  if (!(COOKIE_NAME in req.cookies)) {
    return null;
  }
  return req.cookies[COOKIE_NAME];
};

/**
 * Attatches a cookie to an outgoing response.
 *
 * @param {ServerResponse} res Outgoing response.
 * @param {string} cookie Cookie to be attached.
 */
export const attatchCookie = (
  res: ServerResponse,
  cookie: string,
): void => {
  res.setHeader('Access-Control-Expose-Headers', 'Set-Cookie');
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${cookie}`);
};

/**
 * Generates a signed token.
 *
 * @param {any} data Data to sign.
 * @param {string} [expires = '24h'] When the token expires.
 * @returns {string} Signed token.
 */
export const generateToken = (
  data: any,
  expires = '24h',
): string => {
  return jsonwebtoken.sign(
    data,
    Environment.getSecret(),
    {
      expiresIn: expires,
    },
  );
};

/**
 * Decodes a signed token.
 *
 * @param {string} token Signed token.
 * @returns {any} Data from token.
 */
export const decodeToken = (token: string): any => {
  return jsonwebtoken.verify(
    token,
    Environment.getSecret(),
  );
};
