// Packages
import {
  Db,
  GridFSBucket,
  MongoClient,
} from 'mongodb';
import { Readable } from 'stream';
import multer, { Multer } from 'multer';

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
  MESSAGE_DATABASE_CONNECTION_FAIL, 
  MESSAGE_DATABASE_CONNECTION_SUCCESS,
  MESSAGE_HANDLER_ITEM_NOT_FOUND,
  MESSAGE_INTERNAL_SERVER_ERROR,
} from '../../config/messages';
import {
  FILE_TYPES,
  UPLOAD_TYPE,
} from '../../config';
import { AbstractDatabase } from '../abstract-database';
import { DataAccessObject } from './daos/dao';
import { Environment } from '../../helpers/environment';
import { Monitor } from '../../helpers/monitor';
import DatabaseUrlMissingError from '../../errors/database-url-missing';

// Types
import {
  ServerResponse,
  UploadType,
} from '../../types';

MongoClient.setMaxListeners(200);

/**
 * Database connection to MongoDB.
 */
export class MongoDatabase extends AbstractDatabase {
  /**
   * Reference to MongoClient.
   */
  protected _client: MongoClient | null;

  /**
   * Reference to database.
   */
  protected _db: Db | null;

  /**
   * Multers for uploading files.
   */
  protected _upload: Record<UploadType, Multer | null> = {
    none: null,
    sound: null,
    image: null,
  };

  /**
   * Instantiates MongoDatabase with correct queries.
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
      storage: multer.memoryStorage(),
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

    this._client = null;
    this._db = null;
  }

  /**
   * Connects to database.
   */
  async connect(): Promise<void> {
    if (!Environment.getDatabaseUrl()) {
      throw new DatabaseUrlMissingError();
    }

    const authorizedUrl = Environment.getDatabaseUrl()
      .replace('<user>', Environment.getDatabaseUser())
      .replace('<password>', Environment.getDatabasePassword())
      .replace('<host>', Environment.getDatabaseHost())
      .replace('<port>', `${Environment.getDatabasePort()}`);

    this._client = new MongoClient(authorizedUrl);

    this._client = await this._client.connect();

    if (!this._client) {
      Monitor.log(
        MongoDatabase,
        MESSAGE_DATABASE_CONNECTION_FAIL,
        Monitor.Layer.WARNING,
      );

      return;
    }

    this._db = this._client.db(Environment.getDatabaseName());

    DataAccessObject.setDb(this._db);

    Monitor.log(
      MongoDatabase,
      MESSAGE_DATABASE_CONNECTION_SUCCESS,
      Monitor.Layer.UPDATE
    );
  }

  /**
   * Whether or not the database is connected.
   *
   * @returns {boolean} Whether or not the database is connected.
   */
  isConnected(): boolean {
    return !!this._client;
  }

  /**
   * Uploads a file to the database.
   *
   * @param {multer.File} file File to be uploaded.
   * @returns {Promise<boolean>} Whether the file upload was successful.
   */ 
  async uploadFile(file: Express.Multer.File): Promise<boolean> {
    try {
      const bucket = new GridFSBucket(
        this._db as Db,
        { bucketName: 'uploads' },
      );
  
      const readable = new Readable();
  
      readable.push(file.buffer);
      readable.push(null);
  
      const upload = bucket.openUploadStream(
        file.originalname,
        {
          contentType: file.mimetype,
          metadata: { uploadedAt: new Date() },
        },
      );
  
      await readable.pipe(upload);

      return true;
    } catch (error) {
      Monitor.log(
        MongoDatabase,
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
      const bucket = new GridFSBucket(
        this._db as Db,
        { bucketName: 'uploads' },
      );
  
      const readable = new Readable();
  
      readable.push(data);
      readable.push(null);
  
      const upload = bucket.openUploadStream(
        name,
        {
          contentType: mimeType,
          metadata: { uploadedAt: new Date() },
        },
      );
  
      await readable.pipe(upload);

      return true;
    } catch (error) {
      Monitor.log(
        MongoDatabase,
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
      const bucket = new GridFSBucket(
        this._db as Db,
        { bucketName: 'uploads' },
      );

      const files = (await (await bucket.find({ filename })).toArray());

      if (!files.length) {
        Monitor.log(
          MongoDatabase,
          'File requested does not exist.',
          Monitor.Layer.WARNING,
        );

        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
            'sound',
            'file name',
            filename,
          ),
        });
        return;
      }

      const download = bucket.openDownloadStreamByName(filename);

      download.on(
        'data',
        (chunk) => {
          res.write(chunk);
        },
      );
      download.on(
        'error',
        (error) => {
          Monitor.trace(
            MongoDatabase,
            `${error}`,
            Monitor.Layer.WARNING,
          );

          if (!res.headersSent) {
            res.sendStatus(500);
          }
        },
      );
      download.on(
        'end',
        () => {
          res.end();
        },
      );
    } catch (error) {
      Monitor.trace(
        MongoDatabase,
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
    try {
      const bucket = new GridFSBucket(
        this._db as Db,
        { bucketName: 'uploads' },
      );

      const files = (await (await bucket.find({ filename })).toArray());

      if (!files.length) {
        return true;
      }

      const [ result ] = files;

      await bucket.delete(result._id);

      return true;
    } catch (error) {
      Monitor.log(
        MongoDatabase,
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
    try {
      const bucket = new GridFSBucket(
        this._db as Db,
        { bucketName: 'uploads' },
      );

      await bucket.drop();

      return true;
    } catch (error) {
      Monitor.log(
        MongoDatabase,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }

    return false;
  }
}
