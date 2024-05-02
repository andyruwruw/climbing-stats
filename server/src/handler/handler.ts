/* eslint @typescript-eslint/no-unused-vars: "off" */
// Local Imports
import { MESSAGE_DATABASE_CONNECTION_SUCCESS } from '../config/messages';
import { getDatabase } from '../database';
import { Database } from '../database/database';
import { Monitor } from '../helpers/monitor';
import UsedAbstractHandlerError from '../errors/used-abstract-handler-error';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../types';

/**
 * Abstract handler class.
 */
export class Handler {
  /**
   * Database instance.
   */
  static database: Database;

  /**
   * Whether the handler is ready to execute.
   */
  _ready = false;

  /**
   * Handles the request.
   *
   * @param {ServerRequest} req Incoming request.
   * @param {ServerResponse} res Outgoing response.
   */
  async execute(
    req: ServerRequest,
    res: ServerResponse,
    id: string = '',
  ): Promise<void> {
    throw new UsedAbstractHandlerError();
  }

  /**
   * Connects to the database.
   */
  async connectDatabase(): Promise<void> {
    if (!Handler.database) {
      Handler.database = getDatabase();
    }

    try {
      if (!Handler.database.isConnected()) {
        await Handler.database.connect();

        Monitor.log(
          Handler,
          MESSAGE_DATABASE_CONNECTION_SUCCESS,
          Monitor.Layer.INFO,
        );
      }

      this._ready = true;
    } catch (error) {
      Monitor.trace(
        Handler,
        `Failed to connect to database: ${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }
}
