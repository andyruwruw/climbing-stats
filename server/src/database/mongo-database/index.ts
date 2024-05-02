// Packages
import mongoose, {
  connect,
  connection,
} from 'mongoose';

// Local Imports
import {
  PlaylistDataAccessObject,
  UserDataAccessObject,
} from './daos';
import { MESSAGE_DATABASE_CONNECTION_SUCCESS } from '../../config/messages';
import { Database } from '../database';
import DatabaseUrlMissingError from '../../errors/database-url-missing';
import { Environment } from '../../helpers/environment';
import { Monitor } from '../../helpers/monitor';
import { TokenDataAccessObject } from './daos/token';

mongoose.set('strictQuery', false);

/**
 * Database connection to MongoDB.
 */
export class MongoDatabase extends Database {
  /**
   * Instantiates MongoDatabase with correct queries.
   */
  constructor() {
    super();

    this.playlists = new PlaylistDataAccessObject();
    this.tokens = new TokenDataAccessObject();
    this.users = new UserDataAccessObject();
  }

  /**
   * Connects to database.
   */
  async connect(): Promise<void> {
    if (!Environment.getDatabaseUrl()) {
      throw new DatabaseUrlMissingError();
    }

    const authorizedUrl = Environment.getDatabaseUrl()
      .replace(
        '<user>',
        Environment.getDatabaseUser(),
      )
      .replace(
        '<password>',
        Environment.getDatabasePassword(),
      );

    await connect(authorizedUrl);

    Monitor.log(
      MongoDatabase,
      MESSAGE_DATABASE_CONNECTION_SUCCESS,
      Monitor.Layer.UPDATE,
    );
  }

  /**
   * Whether the class is connected to the database.
   *
   * @returns {boolean} Whether the class is connected to the database.
   */
  isConnected(): boolean {
    return (connection && 'readyState' in connection) ? connection.readyState === 1 : false;
  }
}
