// Packages
import mongoose, {
  connect,
  connection,
} from 'mongoose';

// Local Imports
import {
  AreaDataAccessObject,
  ClimbingPartnerDataAccessObject,
  CragDataAccessObject,
  MediaDataAccessObject,
  RockDataAccessObject,
  RouteDataAccessObject,
  SessionDataAccessObject,
  TickDataAccessObject,
  TokenDataAccessObject,
  UserDataAccessObject,
} from './daos';
import { MESSAGE_DATABASE_CONNECTION_SUCCESS } from '../../config/messages';
import { Environment } from '../../helpers/environment';
import { Database } from '../database';
import { Monitor } from '../../helpers/monitor';
import DatabaseUrlMissingError from '../../errors/database-url-missing';

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

    this.areas = new AreaDataAccessObject();
    this.climbingPartners = new ClimbingPartnerDataAccessObject();
    this.crags = new CragDataAccessObject();
    this.media = new MediaDataAccessObject();
    this.rocks = new RockDataAccessObject();
    this.routes = new RouteDataAccessObject();
    this.sessions = new SessionDataAccessObject();
    this.ticks = new TickDataAccessObject();
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
