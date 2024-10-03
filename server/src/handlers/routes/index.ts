// Local Imports
import { AbstractRouter } from '../abstract-router';

/**
 * Route routes.
 */
export class RouteRoutes extends AbstractRouter {
  /**
   * Instantiates an router wrapper.
   */
  constructor() {
    super('/routes');
  }

  /**
   * Initializes all routes.
   * 
   * @returns {void}
   */
  _initialize(): void {
    // this._routes.push(new DeleteRouteHandler());
  }
}
