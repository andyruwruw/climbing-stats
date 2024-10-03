// Local Imports
import { AbstractRouter } from '../abstract-router';

/**
 * Session routes.
 */
export class SessionRoutes extends AbstractRouter {
  /**
   * Instantiates an router wrapper.
   */
  constructor() {
    super('/sessions');
  }

  /**
   * Initializes all routes.
   * 
   * @returns {void}
   */
  _initialize(): void {
    // this._routes.push(new DeleteSessionHandler());
  }
}
