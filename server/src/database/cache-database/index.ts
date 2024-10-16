/**
 * Cache database implementation.
 * 
 * Used for testing, no persistance and holds all tables in memory.
 */
// Packages
import multer from 'multer';
import crypto from 'node:crypto';
import path from 'node:path';
import fs from 'fs';

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
import {
  MESSAGE_HANDLER_ITEM_NOT_FOUND,
  MESSAGE_INTERNAL_SERVER_ERROR,
} from '../../config/messages';
import {
  FILE_TYPES,
  UPLOAD_TYPE,
} from '../../config';
import { AbstractDatabase } from '../abstract-database';
import { Monitor } from '../../helpers/monitor';

// Types
import { ServerResponse } from '../../types';

/**
 * Memory database.
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

    this._upload[UPLOAD_TYPE.SOUND] = multer({
      storage: multer.diskStorage({
          destination: `${__dirname}/files`,
          filename: (
            req,
            file,
            callback,
          ) => {
            const filename = crypto.pseudoRandomBytes(16).toString('hex');
            const extension = FILE_TYPES[UPLOAD_TYPE.SOUND][file.mimetype];

            callback(null, `${filename}.${extension}`);
          },
      }),
      fileFilter: (
        req,
        file,
        cb,
      ) => {
        cb(
          null,
          !!FILE_TYPES[UPLOAD_TYPE.SOUND][file.mimetype],
        );
      },
    });
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

  /**
   * Uploads a file to the database.
   *
   * @param {multer.File} file File to be uploaded.
   * @returns {Promise<boolean>} Whether the file upload was successful.
   */ 
  async uploadFile(file: Express.Multer.File): Promise<boolean> {
    try {
      const fileDirectory = `${__dirname}/sounds`;

      if (!fs.existsSync(fileDirectory)) {
        return false;
      }

      await fs.writeFileSync(path.join(fileDirectory, file.filename), file.buffer);

      return true;
    } catch (error) {
      Monitor.log(
        CacheDatabase,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }

    return false;
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
    try {
      const fileDirectory = `${__dirname}/sounds`;

      if (!fs.existsSync(fileDirectory)) {
        return false;
      }

      await fs.writeFileSync(path.join(fileDirectory, name), data);

      return true;
    } catch (error) {
      Monitor.log(
        CacheDatabase,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }

    return false;
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
    try {
      const fileDirectory = `${__dirname}/sounds`;

      if (!fs.existsSync(fileDirectory)) {
        res.status(500).send({ error: MESSAGE_INTERNAL_SERVER_ERROR });
        return;
      }

      const files = fs.readdirSync(fileDirectory);

      let found = false;

      for (let i = 0; i < files.length; i += 1) {
        const fullName = files[i].split('.');

        fullName.splice(fullName.length - 1);

        if (fullName.join('.') === filename) {
          found = true;
          break;
        }
      }

      if (!found) {
        res.status(400).send({ error: MESSAGE_HANDLER_ITEM_NOT_FOUND });
      }

      const options = { root: fileDirectory };

      res.sendFile(
        filename,
        options,
        (error: Error) => {
          if (error) {
            Monitor.log(
              CacheDatabase,
              `${error}`,
              Monitor.Layer.WARNING,
            );
      
            res.status(500).send({ error: MESSAGE_INTERNAL_SERVER_ERROR });
          }
        },
      );
    } catch (error) {
      Monitor.log(
        CacheDatabase,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({ error: MESSAGE_INTERNAL_SERVER_ERROR });
    }
  }

  /**
   * Delete a file by name.
   *
   * @param {string} filename File name to be deleted.
   * @returns {Promise<boolean>} Whether the file was deleted successfully.
   */
  async deleteFile(filename: string): Promise<boolean> {
    const fileDirectory = `${__dirname}/sounds`;

    try {
      if (!fs.existsSync(fileDirectory)) {
        return false;
      }

      const files = fs.readdirSync(fileDirectory);

      for (let i = 0; i < files.length; i += 1) {
        const fullName = files[i].split('.');

        fullName.splice(fullName.length - 1);

        if (fullName.join('.') === filename) {
          fs.unlinkSync(`${fileDirectory}/${files[i]}`);
          return true;
        }
      }
    } catch (error) {
      Monitor.log(
        CacheDatabase,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }

    return false;
  }

  /**
   * Deletes all files.
   *
   * @returns {Promise<boolean>} Success.
   */
  async deleteAllFiles(): Promise<boolean> {
    const fileDirectory = `${__dirname}/sounds`;

    try {
      if (!fs.existsSync(fileDirectory)) {
        return false;
      }

      const dir = await fs.readdirSync(fileDirectory);

      for (let i = 0; i < dir.length; i += 1) {
        await fs.unlinkSync(path.join(fileDirectory, dir[i]));
      }

      return true;
    } catch (error) {
      Monitor.log(
        CacheDatabase,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }

    return false;
  }
}
