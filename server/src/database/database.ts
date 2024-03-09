/* eslint @typescript-eslint/no-unused-vars: "off" */
// Local Imports
import { DataAccessObject } from './dao';

// Types
import {
  Playlist,
  User,
} from '../types/tables';
import { DataAccessObjectInterface } from '../types/database';

/**
 * Abstract Database interface, only implement inherited classes.
 */
export class Database {
  /**
   * Data access object for Playlists.
   */
  playlists: DataAccessObjectInterface<Playlist> = new DataAccessObject<Playlist>();

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
    switch (name) {
      case 'playlists':
        return this.playlists;
      default:
        return this.users;
    }
  }
}
