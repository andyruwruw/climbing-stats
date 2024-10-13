// Local Imports
import { AbstractRouter } from '../abstract-router';
import { CreateRouteHandler } from './create-route-handler';
import { DeleteRouteHandler } from './delete-route-handler';
import { EditRouteHandler } from './edit-route-handler';
import { GetRouteHandler } from './get-route-handler';
import { GetRoutesHandler } from './get-routes-handler';

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
    this._routes.push(new CreateRouteHandler());
    this._routes.push(new DeleteRouteHandler());
    this._routes.push(new EditRouteHandler());
    this._routes.push(new GetRouteHandler());
    this._routes.push(new GetRoutesHandler());
  }
}
