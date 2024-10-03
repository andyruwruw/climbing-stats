// Packages
import {
  NextFunction,
  Request,
  Response,
} from 'express';

// Types
import { DatabaseRow } from './database';

/**
 * Various request types.
 */
export type RequestType = 'get'
| 'put'
| 'post'
| 'delete';

/**
 * Different authorization requirements for endpoints.
 */
export type RequestAuthorization = 'none'
| 'required'
| 'optional'
| 'admin';

/**
 * Handler upload type.
 */
export type UploadType = 'none'
| 'sound'
| 'image';

/**
 * Basic object type.
 */
export type Dictionary<T> = Record<string, T>;

/**
 * API request object.
 */
export interface ServerRequest extends Request {
  /**
   * User ID.
   */
  user?: string;

  /**
   * Session token.
   */
  token?: string;
}

/**
 * API response object.
 */
export type ServerResponse = Response;

/**
 * Middleware function for Express.
 */
export type Middleware = ((
  req?: ServerRequest,
  res?: ServerResponse,
  next?: NextFunction,
) => Promise<void> | void)
| ((
  req: ServerRequest,
  res: ServerResponse,
  next: NextFunction,
) => Promise<void> | void)
| NextFunction;


/**
 * Types of media.
 */
type MediaType = 'image'
| 'youtube'
| 'instagram'
| 'website'
| 'drive';

/**
 * A media element.
 */
export interface Media extends DatabaseRow {
  /**
   * Type of media.
   */
  type: MediaType;

  /**
   * Id of user who made media.
   */
  creator: string;

  /**
   * Link to media.
   */
  href: string;

  /**
   * Caption of media.
   */
  caption?: string;

  /**
   * Associated date.
   */
  date?: number;
}

/**
 * References to href of items.
 */
export interface ExternalHref {
  /**
   * Address to item.
   */
  address?: string;

  /**
   * Mountain Project link.
   */
  moutainProject?: string;

  /**
   * Google Maps link.
   */
  googleMaps?: string;

  /**
   * Website.
   */
  website?: string;

  /**
   * 8a link.
   */
  eightA?: string;

  /**
   * Sendage link.
   */
  sendage?: string;

  /**
   * Raw coordinates.
   */
  coordinates?: string;

  /**
   * Apple maps link.
   */
  appleMaps?: string;

  /**
   * Youtube link.
   */
  youtube?: string;

  /**
   * Vimeo link.
   */
  vimeo?: string;

  /**
   * Instagram link.
   */
  instagram?: string;
}
