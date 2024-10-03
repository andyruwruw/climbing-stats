/* eslint @typescript-eslint/no-unused-vars: "off" */
/**
 * Abstract Database
 * 
 * Abstract implementation of a database connection.
 */
// Packages
import { Multer } from 'multer';

// Local Imports
import { AbstractDataAccessObject } from './abstract-dao';
import UsedAbstractDatabaseError from '../errors/used-abstract-database-error';

// Types
import { 
  Area,
  Location,
  Rock,
  Route,
} from '../types/climbs';
import {
  ClimbingPartner,
  Token,
  User,
} from '../types/users';
import {
  ServerResponse,
  UploadType,
} from '../types';
import { DataAccessObjectInterface } from '../types/database';
import { Session } from '../types/sessions';
import { Tick } from '../types/attempts';

/**
 * Abstract Database interface, only implement inherited classes.
 */
export class AbstractDatabase {
  /**
   * Data access object for Areas.
   */
  areas: DataAccessObjectInterface<Area> = new AbstractDataAccessObject<Area>();

  /**
   * Data access object for Climbing Partners.
   */
  climbingPartners: DataAccessObjectInterface<ClimbingPartner> = new AbstractDataAccessObject<ClimbingPartner>();

  /**
   * Data access object for Locations.
   */
  locations: DataAccessObjectInterface<Location> = new AbstractDataAccessObject<Location>();

  /**
   * Data access object for Rocks.
   */
  rocks: DataAccessObjectInterface<Rock> = new AbstractDataAccessObject<Rock>();

  /**
   * Data access object for Routes.
   */
  routes: DataAccessObjectInterface<Route> = new AbstractDataAccessObject<Route>();

  /**
   * Data access object for Sessions.
   */
  sessions: DataAccessObjectInterface<Session> = new AbstractDataAccessObject<Session>();

  /**
   * Data access object for Ticks.
   */
  ticks: DataAccessObjectInterface<Tick> = new AbstractDataAccessObject<Tick>();

  /**
   * Data access object for Tokens.
   */
  tokens: DataAccessObjectInterface<Token> = new AbstractDataAccessObject<Token>();

  /**
   * Data access object for Users.
   */
  users: DataAccessObjectInterface<User> = new AbstractDataAccessObject<User>();

  /**
   * Multers for uploading files.
   */
  protected _upload: Record<UploadType, Multer | null> = {
    none: null,
    sound: null,
    image: null,
  };
  
  /**
   * Connects to database.
   */
  async connect(): Promise<void> {
    throw new UsedAbstractDatabaseError();
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
   * Retrieves multer for upload type.
   *
   * @param {UploadType} type Upload type.
   * @returns {Multer | null} Multer for upload.
   */
  getMulter(type: UploadType): Multer | null {
    return this._upload[type];
  }

  /**
   * Uploads a file to the database.
   *
   * @param {multer.File} file File to be uploaded.
   * @returns {Promise<boolean>} Whether the file upload was successful.
   */ 
  async uploadFile(file: Express.Multer.File): Promise<boolean> {
    throw new UsedAbstractDatabaseError();
  }

  /**
   * Uploads a file to the database.
   *
   * @param {string} name File name.
   * @param {string} mimeType File mime type.
   * @param {Buffer} data File to be uploaded.
   * @returns {Promise<boolean>} Whether the file upload was successful.
   */ 
  async uploadFileDirect(
    name: string,
    mimeType: string,
    data: Buffer,
  ): Promise<boolean> {
    throw new UsedAbstractDatabaseError();
  }

  /**
   * Starts a download stream of a file.
   *
   * @param {string} filename File's name.
   * @param {ServerResponse} res Server response object.
   * @returns {Promise<void>} Promise of the action. 
   */
  async downloadFile(
    filename: string,
    res: ServerResponse,
  ): Promise<void> {
    throw new UsedAbstractDatabaseError();
  }

  /**
   * Delete a file by name.
   *
   * @param {string} filename File name to be deleted.
   * @returns {Promise<boolean>} Whether the file was deleted successfully.
   */
  async deleteFile(filename: string): Promise<boolean> {
    throw new UsedAbstractDatabaseError();
  }

  /**
   * Deletes all files.
   *
   * @returns {Promise<boolean>} Success.
   */
  async deleteAllFiles(): Promise<boolean> {
    throw new UsedAbstractDatabaseError();
  }
}
