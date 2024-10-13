// Local Imports
import { AbstractRouter } from '../abstract-router';
import { CreateAreaHandler } from './create-area-handler';
import { DeleteAreaHandler } from './delete-area-handler';
import { EditAreaHandler } from './edit-area-handler';
import { GetAreaHandler } from './get-area-handler';
import { GetAreasHandler } from './get-areas-handler';

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
    this._routes.push(new CreateAreaHandler());
    this._routes.push(new DeleteAreaHandler());
    this._routes.push(new EditAreaHandler());
    this._routes.push(new GetAreaHandler());
    this._routes.push(new GetAreasHandler());
  }
}
