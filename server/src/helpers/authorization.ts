// Packages
import { NextFunction } from 'express';
import * as jsonwebtoken from 'jsonwebtoken';
import crypto from 'node:crypto';
import bcrypt from 'bcrypt';

// Local Imports
import {
  MESSAGE_AUTHENTICATION_ERROR,
  MESSAGE_UNAUTHORIZED_ERROR,
} from '../config/messages';
import { AbstractHandler } from '../handlers/abstract-handler';
import { SALT_WORK_FACTOR } from '../config';
import { Environment } from './environment';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../types';
import {
  PublicUser,
  User,
  TokenData,
} from '../types/users';

/**
 * Generates and encrypts an authorization token.
 *
 * @param {string} user User ID.
 * @returns {string} Token data.
 */
export const generateToken = (user: string): string => {
  const payload = { id: user } as TokenData;

  return jsonwebtoken.sign(
    payload,
    Environment.getSecret(),
    { expiresIn: '168h' },
  );
};

/**
 * Decodes a signed token.
 *
 * @param {string} token Signed token.
 * @returns {TokenData} Data from token.
 */
export const decodeToken = (token: string): TokenData => {
  return jsonwebtoken.verify(
    token,
    Environment.getSecret(),
  ) as TokenData;
};


/**
 * Hashes a password before insertion.
 *
 * @param {string} password Plain-text password.
 * @returns {string} Hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

  const hash = await bcrypt.hash(
    password,
    salt,
  );

  return hash;
};

/**
 * Validates an incoming password against a vaild password.
 *
 * @param {string} valid Stored password.
 * @param {string} subject Password to test.
 * @returns {Promise<boolean>} Whether the passwords match.
 */
export const comparePassword = async (
  valid: string,
  subject: string,
): Promise<boolean> => {
  return bcrypt.compare(
    subject,
    valid,
  );
};


/**
 * Validates a request, requiring any session active.
 *
 * @param {ServerRequest} req Incoming request.
 * @param {ServerResponse} res Server response.
 * @param {Middleware} next Next middleware for request.
 * @returns {Promise<void>} Promise of action.
 */
export const requiresAuthorization = async (
  req: ServerRequest,
  res: ServerResponse,
  next: NextFunction,
): Promise<void> => {
  const authorizationHeader = (req.get('Authorization') || '').split(' ');
  const token = authorizationHeader[0] === 'Bearer' ? authorizationHeader[1] : null;

  if (!token) {
    res.status(401).send({ error: MESSAGE_UNAUTHORIZED_ERROR });
    return;
  }

  try {
    const { id = '' } = decodeToken(token);

    const existing = await AbstractHandler.getDatabase().tokens.findOne({
      user: id,
      token,
    });

    if (!existing) {
      res.status(401).send({ error: MESSAGE_UNAUTHORIZED_ERROR });
      return;
    }

    req.user = id;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).send({ error: MESSAGE_AUTHENTICATION_ERROR });
    return;
  }
};

/**
 * Validates a request, requiring an admin session active.
 *
 * @param {ServerRequest} req Incoming request.
 * @param {ServerResponse} res Server response.
 * @param {NextFunction} next Next middleware for request.
 * @returns {Promise<void>} Promise of action.
 */
export const requiresAdmin = async (
  req: ServerRequest,
  res: ServerResponse,
  next: NextFunction,
): Promise<void> => {
  const authorizationHeader = (req.get('Authorization') || '').split(' ');
  const token = authorizationHeader[0] === 'Bearer' ? authorizationHeader[1] : null;

  if (!token) {
    res.status(401).send({ error: MESSAGE_UNAUTHORIZED_ERROR });
    return;
  }

  try {
    const { id = '' } = decodeToken(token);

    const existing = await AbstractHandler.getDatabase().tokens.findOne({
      user: id,
      token,
    });

    if (!existing) {
      res.status(401).send({ error: MESSAGE_UNAUTHORIZED_ERROR });
      return;
    }

    req.user = id;
    req.token = token;

    const user = await AbstractHandler.getDatabase().users.findById(id);

    if (!user) {
      res.status(401).send({ error: MESSAGE_UNAUTHORIZED_ERROR });
      return;
    }

    if (!user.admin) {
      res.status(403).send({ error: MESSAGE_UNAUTHORIZED_ERROR });
      return;
    }

    next();
  } catch (error) {
    res.status(401).send({ error: MESSAGE_AUTHENTICATION_ERROR });
    return;
  }
};

/**
 * Validates a request, optionally finding session active.
 *
 * @param {ServerRequest} req Incoming request.
 * @param {ServerResponse} res Server response.
 * @param {NextFunction} next Next middleware for request.
 * @returns {Promise<void>} Promise of action.
 */
export const optionalAuthorization = async (
  req: ServerRequest,
  res: ServerResponse,
  next: NextFunction,
): Promise<void> => {
  const authorizationHeader = (req.get('Authorization') || '').split(' ');
  const token = authorizationHeader[0] === 'Bearer' ? authorizationHeader[1] : null;

  try {
    if (token) {
      const { id = '' } = decodeToken(token);

      const existing = await AbstractHandler.getDatabase().tokens.findOne({
        user: id,
        token,
      });

      if (existing) {
        req.user = id;
        req.token = token;
      }
    }
  } catch (error) {
    req.user = '';
    req.token = '';
  }

  next();
};

/**
 * Cleans user data of private data.
 *
 * @param {User} user User to be cleaned. 
 * @returns {PublicUser} User public data.
 */
export const cleanUser = (user: User): PublicUser => ({
  id: user.id,
  username: user.username,
  displayName: user.displayName,
  image: user.image,
  hrefs: user.hrefs,
  age: user.age,
  gender: user.gender,
  locale: user.locale,
  state: user.state,
  country: user.country,
  created: user.created,
  points: user.points,
  admin: user.admin,
});

/**
 * Encrypt a value.
 *
 * @param {string} value Value of item.
 * @returns {string} Encrypted string.
 */
export const encrypt = (name: string): string => {
  const hash = crypto.createHash('sha256');
  return hash.update(name).digest('hex');
};
