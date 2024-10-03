/**
 * Abstract Router
 * 
 * Defines a set of handlers, extends Express router and adds middleware.
 */

// Packages
import {
  Application,
  Router as ExpressRouter,
} from 'express';

// Local Imports
import {
  optionalAuthorization,
  requiresAdmin,
  requiresAuthorization,
} from '../helpers/authorization';
import {
  AUTHORIZATION_TYPE,
  REQUEST_TYPE,
  UPLOAD_TYPE,
} from '../config';
import { AbstractHandler } from './abstract-handler';
import { RateLimiter } from '../helpers/rate-limit';
import { handleCors } from '../helpers/cors';
import UsedAbstractRouterError from '../errors/used-abstract-router-error';

// Types
import { Middleware } from '../types';


/**
 * Wrapper around express router.
 */
export class AbstractRouter {
  /**
   * Path for routes under this router.
   */
  protected _path: string;

  /**
   * Instance of express router.
   */
  protected _router: ExpressRouter;

  /**
   * Various handlers.
   */
  protected _routes = [] as AbstractHandler[];

  /**
   * Instantiates an router wrapper.
   */
  constructor(path: string) {
    this._path = path;
    this._router = ExpressRouter();

    this._initialize();
  }

  /**
   * Initializes all routes, abstract function.
   *
   * @returns {void}
   */
  _initialize(): void {
    throw new UsedAbstractRouterError();
  }

  /**
   * Apply various routes to application.
   *
   * @param {Application} app Express application.
   * @returns {void}
   */
  apply(app: Application): void {
    for (let i = 0; i < this._routes.length; i += 1) {
      const handler = this._routes[i];

      const middleware = [
        handleCors,
        handler.execute,
      ] as Middleware[];

      if (handler.getUpload() === UPLOAD_TYPE.SOUND) {
        const multer = AbstractHandler.getDatabase().getMulter(UPLOAD_TYPE.SOUND);

        if (multer) {
          middleware.unshift(multer.single('file'));
        }
      }

      middleware.unshift(RateLimiter.rateLimit);

      if (handler.getAuthorization() === AUTHORIZATION_TYPE.REQUIRED) {
        middleware.unshift(requiresAuthorization);
      } else if (handler.getAuthorization() === AUTHORIZATION_TYPE.OPTIONAL) {
        middleware.unshift(optionalAuthorization);
      } else if (handler.getAuthorization() === AUTHORIZATION_TYPE.ADMIN) {
        middleware.unshift(requiresAdmin);
      }

      switch (handler.getMethod()) {
        case REQUEST_TYPE.POST:
          app.post(
            `${this._path}${handler.getPath()}`,
            ...middleware,
          );
          break;
        case REQUEST_TYPE.PUT:
          app.put(
            `${this._path}${handler.getPath()}`,
            ...middleware,
          );
          break;
        case REQUEST_TYPE.DELETE:
          app.delete(
            `${this._path}${handler.getPath()}`,
            ...middleware,
          );
          break;
        default:
          app.get(
            `${this._path}${handler.getPath()}`,
            ...middleware,
          );
          break;
      }
    }
  }  
}
