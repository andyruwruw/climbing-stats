// Local Imports
import { AbstractRouter } from '../abstract-router';
import { CreateTickHandler } from './create-tick-handler';
import { DeleteTickHandler } from './delete-tick-handler';
import { EditTickHandler } from './edit-tick-handler';
import { GetTickHandler } from './get-tick-handler';
import { GetTickPyramidHandler } from './get-tick-pyramid-handler';
import { GetTickSummationsHandler } from './get-tick-summations-handler';
import { GetTicksHandler } from './get-ticks-handler';

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
    this._routes.push(new CreateTickHandler());
    this._routes.push(new DeleteTickHandler());
    this._routes.push(new EditTickHandler());
    this._routes.push(new GetTickPyramidHandler());
    this._routes.push(new GetTickSummationsHandler());
    this._routes.push(new GetTickHandler());
    this._routes.push(new GetTicksHandler());
  }
}
