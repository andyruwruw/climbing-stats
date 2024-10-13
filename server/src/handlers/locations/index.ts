// Local Imports
import { AbstractRouter } from '../abstract-router';
import { CreateLocationHandler } from './create-location-handler';
import { DeleteLocationHandler } from './delete-location-handler';
import { EditLocationHandler } from './edit-location-handler';
import { GetLocationHandler } from './get-location-handler';
import { GetLocationsHandler } from './get-locations-handler';

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
    this._routes.push(new CreateLocationHandler());
    this._routes.push(new DeleteLocationHandler());
    this._routes.push(new EditLocationHandler());
    this._routes.push(new GetLocationHandler());
    this._routes.push(new GetLocationsHandler());
  }
}
