// Local Imports
import { AbstractRouter } from '../abstract-router';

/**
 * Area routes.
 */
export class AreaRoutes extends AbstractRouter {
  /**
   * Instantiates an router wrapper.
   */
  constructor() {
    super('/areas');
  }

  /**
   * Initializes all routes.
   * 
   * @returns {void}
   */
  _initialize(): void {
    // this._routes.push(new DeleteAreaHandler());
  }
}
