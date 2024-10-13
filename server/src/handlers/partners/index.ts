// Local Imports
import { AbstractRouter } from '../abstract-router';

/**
 * Partner routes.
 */
export class PartnerRoutes extends AbstractRouter {
  /**
   * Instantiates an router wrapper.
   */
  constructor() {
    super('/partners');
  }

  /**
   * Initializes all routes.
   * 
   * @returns {void}
   */
  _initialize(): void {
    // this._routes.push(new CreateRockHandler());
  }
}
