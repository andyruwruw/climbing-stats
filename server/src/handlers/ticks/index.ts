// Local Imports
import { AbstractRouter } from '../abstract-router';

/**
 * Tick routes.
 */
export class TickRoutes extends AbstractRouter {
  /**
   * Instantiates an router wrapper.
   */
  constructor() {
    super('/ticks');
  }

  /**
   * Initializes all routes.
   * 
   * @returns {void}
   */
  _initialize(): void {
    // this._routes.push(new DeleteTickHandler());
  }
}
