// Local Imports
import { AbstractRouter } from '../abstract-router';

/**
 * Rock routes.
 */
export class RockRoutes extends AbstractRouter {
  /**
   * Instantiates an router wrapper.
   */
  constructor() {
    super('/rocks');
  }

  /**
   * Initializes all routes.
   * 
   * @returns {void}
   */
  _initialize(): void {
    // this._routes.push(new DeleteRockHandler());
  }
}
