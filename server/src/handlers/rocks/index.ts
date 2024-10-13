// Local Imports
import { AbstractRouter } from '../abstract-router';
import { CreateRockHandler } from './create-rock-handler';
import { DeleteRockHandler } from './delete-rock-handler';
import { EditRockHandler } from './edit-rock-handler';
import { GetRockHandler } from './get-rock-handler';
import { GetRocksHandler } from './get-rocks-handler';

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
    this._routes.push(new CreateRockHandler());
    this._routes.push(new DeleteRockHandler());
    this._routes.push(new EditRockHandler());
    this._routes.push(new GetRockHandler());
    this._routes.push(new GetRocksHandler());
  }
}
