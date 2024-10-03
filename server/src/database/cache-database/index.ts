// Local Imports
import {
  AreasDataAccessObject,
  ClimbingPartnersDataAccessObject,
  LocationsDataAccessObject,
  RocksDataAccessObject,
  RoutesDataAccessObject,
  SessionsDataAccessObject,
  TicksDataAccessObject,
  TokensDataAccessObject,
  UsersDataAccessObject,
} from './daos';
import { AbstractDatabase } from '../abstract-database';

/**
 * Memory database..
 */
export class CacheDatabase extends AbstractDatabase {
  /**
   * Instantiates CacheDatabase with correct queries.
   */
  constructor() {
    super();

    this.areas = new AreasDataAccessObject();
    this.climbingPartners = new ClimbingPartnersDataAccessObject();
    this.locations = new LocationsDataAccessObject();
    this.rocks = new RocksDataAccessObject();
    this.routes = new RoutesDataAccessObject();
    this.sessions = new SessionsDataAccessObject();
    this.ticks = new TicksDataAccessObject();
    this.tokens = new TokensDataAccessObject();
    this.users = new UsersDataAccessObject();
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
