// Local Imports
import { AbstractRouter } from '../abstract-router';

/**
 * Location routes.
 */
export class LocationRoutes extends AbstractRouter {
  /**
   * Instantiates an router wrapper.
   */
  constructor() {
    super('/locations');
  }

  /**
   * Initializes all routes.
   * 
   * @returns {void}
   */
  _initialize(): void {
    // this._routes.push(new DeleteLocationHandler());
  }
}
