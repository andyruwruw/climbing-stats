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
import { Database } from '../database';

/**
 * Memory database..
 */
export class CacheDatabase extends Database {
  /**
   * Instantiates CacheDatabase with correct queries.
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
    return;
  }

  /**
   * Whether the class is connected to the database.
   *
   * @returns {boolean} Whether the class is connected to the database.
   */
  isConnected(): boolean {
    return true;
  }
}
