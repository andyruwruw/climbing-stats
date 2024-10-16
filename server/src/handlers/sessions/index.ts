// Local Imports
import { AbstractRouter } from '../abstract-router';
import { CreateSessionHandler } from './create-session-handler';
import { DeleteSessionHandler } from './delete-session-handler';
import { EditSessionHandler } from './edit-session-handler';
import { GetSessionSummationsHandler } from './get-session-summations-handler';
import { GetSessionHandler } from './get-session-handler';
import { GetSessionsHandler } from './get-sessions-handler';

/**
 * Session routes.
 */
export class SessionRoutes extends AbstractRouter {
  /**
   * Instantiates an router wrapper.
   */
  constructor() {
    super('/sessions');
  }

  /**
   * Initializes all routes.
   * 
   * @returns {void}
   */
  _initialize(): void {
    this._routes.push(new CreateSessionHandler());
    this._routes.push(new DeleteSessionHandler());
    this._routes.push(new EditSessionHandler());
    this._routes.push(new GetSessionSummationsHandler());
    this._routes.push(new GetSessionHandler());
    this._routes.push(new GetSessionsHandler());
  }
}
