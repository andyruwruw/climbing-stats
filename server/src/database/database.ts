/* eslint @typescript-eslint/no-unused-vars: "off" */
// Local Imports
import { DataAccessObject } from './dao';

// Types
import {
  Area,
  ClimbingPartner,
  Crag,
  Media,
  Rock,
  Route,
  Session,
  Tick,
  Token,
  User,
} from '../types/tables';
import { DataAccessObjectInterface } from '../types/database';

/**
 * Abstract Database interface, only implement inherited classes.
 */
export class Database {
  /**
   * Data access object for Areas.
   */
  areas: DataAccessObjectInterface<Area> = new DataAccessObject<Area>();

  /**
   * Data access object for ClimbingPartners.
   */
  climbingPartners: DataAccessObjectInterface<ClimbingPartner> = new DataAccessObject<ClimbingPartner>();

  /**
   * Data access object for Crags.
   */
  crags: DataAccessObjectInterface<Crag> = new DataAccessObject<Crag>();


  /**
   * Data access object for Medias.
   */
  media: DataAccessObjectInterface<Media> = new DataAccessObject<Media>();

  /**
   * Data access object for Rocks.
   */
  rocks: DataAccessObjectInterface<Rock> = new DataAccessObject<Rock>();

  /**
   * Data access object for Routes.
   */
  routes: DataAccessObjectInterface<Route> = new DataAccessObject<Route>();

  /**
   * Data access object for Sessions.
   */
  sessions: DataAccessObjectInterface<Session> = new DataAccessObject<Session>();

  /**
   * Data access object for Ticks.
   */
  ticks: DataAccessObjectInterface<Tick> = new DataAccessObject<Tick>();

  /**
   * Data access object for Users.
   */
  tokens: DataAccessObjectInterface<Token> = new DataAccessObject<Token>();

  /**
   * Data access object for Users.
   */
  users: DataAccessObjectInterface<User> = new DataAccessObject<User>();

  /**
   * Connects to database.
   */
  async connect(): Promise<void> {
    throw new Error('Used abstract database!');
  }

  /**
   * Whether or not the database is connected.
   *
   * @returns {boolean} Whether or not the database is connected.
   */
  isConnected(): boolean {
    return false;
  }

  /**
   * Get's a data access object.
   * 
   * @param {string} name Name of data access object.
   * @returns {DataAccessObjectInterface} Data access object.
   */
  getDao(name: string): DataAccessObject<any> {
    return this.users;
  }
}
