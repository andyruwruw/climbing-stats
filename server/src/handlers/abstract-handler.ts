/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Abstract Handler
 * 
 * Class that defines a handlers route and implementation.
 */

// Local Imports
import {
  AUTHORIZATION_TYPE,
  REQUEST_TYPE,
  UPLOAD_TYPE,
} from '../config';
import { AbstractDatabase } from '../database/abstract-database';
import { getDatabase } from '../database';
import UsedAbstractHandlerError from '../errors/used-abstract-handler-error';

// Types
import {
  RequestAuthorization,
  RequestType,
  ServerRequest,
  ServerResponse,
  UploadType,
} from '../types';

/**
 * Abstract handler class.
 */
export class AbstractHandler {
  /**
   * Static reference to the database.
   */
  protected static _database: AbstractDatabase;

  /**
   * Handler request type.
   */
  protected _method: RequestType;

  /**
   * Handler path.
   */
  protected _path: string;

  /**
   * Whether this handler requires authorization.
   */
  protected _authorization: RequestAuthorization;

  /**
   * Whether the handler needs to upload files.
   */
  protected _upload: UploadType;

  /**
   * Instantiates a new handler.
   *
   * @param {RequestType} [method = 'get'] Request type.
   * @param {string} [path = '/'] Request path.
   * @param {RequestAuthorization} [authorization = 'none'] Authorization type for this endpoint.
   * @param {UploadType} [upload = 'none'] Whether the handler needs to upload files.
   */
  constructor(
    method = REQUEST_TYPE.GET,
    path = '/',
    authorization: RequestAuthorization = AUTHORIZATION_TYPE.NONE,
    upload: UploadType = UPLOAD_TYPE.NONE,
  ) {
    if (!AbstractHandler._database) {
      AbstractHandler._database = getDatabase();
    }

    this._connectDatabase();

    this._method = method;
    this._path = path;
    this._authorization = authorization;
    this._upload = upload;
  }

  /**
   * Handles the request, abstract function.
   *
   * @param {ServerRequest} req Incoming request.
   * @param {ServerResponse} res Outgoing response.
   */
  async execute(
    req: ServerRequest,
    res: ServerResponse,
  ): Promise<void> {
    throw new UsedAbstractHandlerError();
  }

  /**
   * Connects to the database.
   */
  async _connectDatabase(): Promise<void> {
  }

  /**
   * Retrieves this handler's request method.
   *
   * @returns {RequestType} Handler's request method..
   */
  getMethod(): RequestType {
    return this._method;
  }

  /**
   * Retrieves this handler's path.
   *
   * @returns {string} Handler's path.
   */
  getPath(): string {
    return this._path;
  }

  /**
   * Whether this endpoint requires authorization.
   * 
   * @returns {RequestAuthorization} Type of authentication needed for this request.
   */
  getAuthorization(): RequestAuthorization {
    return this._authorization;
  }

  /**
   * Whether this endpoint requires uploads.
   * 
   * @returns {UploadType} Type of upload needed for this request.
   */
  getUpload(): UploadType {
    return this._upload;
  }

  /**
   * Retrieves database instance.
   * 
   * @returns {AbstractDatabase} Static reference to database.
   */
  static getDatabase(): AbstractDatabase {
    return AbstractHandler._database;
  }
}
