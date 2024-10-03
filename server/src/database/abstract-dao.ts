/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Abstract data access object.
 * 
 * Abstract implementation of a data access object for a database table.
 */

// Local Imports
import { PAGE_SIZE } from '../config';
import UsedAbstractDaoError from '../errors/used-abstract-dao-error';
import { Dictionary } from '../types';

// Types
import {
  DataAccessObjectInterface,
  MariaDbQuery,
  QueryConditions,
  QueryProjection,
  QuerySort,
  QueryUpdate,
} from '../types/database';

/**
 * Abstract Data Access Object
 */
export class AbstractDataAccessObject<T> implements DataAccessObjectInterface<T> {
  /**
   * References to other DAOs.
   * 
   * @type {Dictionary<DataAccessObject>}
   */
  static _daoReferences = {} as Dictionary<DataAccessObjectInterface<any>>;

  /**
   * Instantiates a new AbstractDataAccessObject.
   */
  constructor() {
    AbstractDataAccessObject._daoReferences[this._getCollectionName()] = this;
  }
  
  /**
   * Clears all items from the table.
   *
   * @returns {Promise<void>} Promise of the action.
   */
  clear(): Promise<void> {
    throw new UsedAbstractDaoError();
  }

  /**
   * Not needed.
   */
  createTable(): Promise<void> {
    throw new UsedAbstractDaoError();
  }

  /**
   * Counts the number of documents in from the Database.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @returns {Promise<number>} The number of documents.
   */
  count(conditions: QueryConditions = {}): Promise<number> {
    throw new UsedAbstractDaoError();
  }

  /**
   * Deletes all items or a subset of items from the Database.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @returns {Promise<number>} The number of items deleted.
   */
  delete(conditions: QueryConditions): Promise<number> {
    throw new UsedAbstractDaoError();
  }

  /**
   * Deletes all items from the Database.
   */
  deleteAll(): Promise<void> {
    throw new UsedAbstractDaoError();
  }

  /**
   * Deletes a single item by its id from the Database.
   *
   * @param {string} id The id of the item.
   * @returns {Promise<boolean>} Whether the item was deleted.
   */
  deleteById(id: string): Promise<boolean> {
    throw new UsedAbstractDaoError();
  }

  /**
   * Not needed.
   */
  dropTable(): Promise<void> {
    throw new UsedAbstractDaoError();
  }

  /**
   * Finds all of the item in the Database.
   *
   * @param {QueryConditions} [filter = {}] The filter to apply to the query.
   * @param {QueryProjection} [projection = {}] The projection to apply to the query.
   * @param {QuerySort | null} [sort = null] How to sort the items.
   * @param {number} [offset = 0] Offset cursor.
   * @param {number} [limit = PAGE_SIZE] Limit of items to return.
   * @returns {Promise<T[]>} The items.
   */
  find(
    filter: QueryConditions = {},
    projection: QueryProjection = {},
    sort: QuerySort | null = null,
    offset: number = 0,
    limit: number = PAGE_SIZE,
  ): Promise<T[]> {
    throw new UsedAbstractDaoError();
  }

  /**
   * Finds an item by it's id from the Database.
   *
   * @param {string} id The id of the item.
   * @returns {Promise<T | null>} The item or null if not found.
   */
  findById(id: string): Promise<T | null> {
    throw new UsedAbstractDaoError();
  }

  /**
   * Finds one item in the Database.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @param {QueryProjection} [projection = {}] The projection to apply to the query.
   * @returns {Promise<T | null>} The item.
   */
  findOne(
    conditions: QueryConditions,
    projection: QueryProjection = {},
  ): Promise<T | null> {
    throw new UsedAbstractDaoError();
  }

  /**
   * Creates a new instance of the item in the Database.
   *
   * @param {T} options The item to create.
   * @returns {T} The created item.
   */
  insert(item: T): Promise<string> {
    throw new UsedAbstractDaoError();
  }

  /**
   * SQL pain.
   * 
   * @param {string | MariaDbQuery} [query = ''] SQL query.
   * @returns {Promise<unknown>} SQL response.
   */
  query(query: string | MariaDbQuery = ''): Promise<unknown> {
    throw new UsedAbstractDaoError();
  }

  /**
   * Updates one item in the Database matching the filter.
   *
   * @param {QueryConditions} [filter = {}] Which document.
   * @param {QueryUpdate} [update = {}] Update to document.
   * @param {boolean} [insertNew = true] Whether to insert a new row.
   * @returns {Promise<boolean>} Whether the item was updated.
   */
  update(
    conditions: QueryConditions = {},
    update: QueryUpdate = {},
    insertNew = true,
  ): Promise<number> {
    throw new UsedAbstractDaoError();
  }

  /**
   * Updates all items in the Database matching the filter.
   *
   * @param {QueryConditions} [filter = {}] Which document.
   * @param {QueryUpdate} [update = {}] Update to document.
   * @param {boolean} [insertNew = true] Whether to insert a new row.
   * @returns {Promise<number>} The number of documents updated.
   */
  updateMany(
    filter: QueryConditions = {},
    update: QueryUpdate = {},
    insertNew = true,
  ): Promise<number> {
    throw new UsedAbstractDaoError();
  }

  /**
   * Database collection name.
   *
   * @returns {string} Collection name.
   */
  _getCollectionName(): string {
    return 'abstract';
  }

  /**
   * Retrieves another DAO.
   *
   * @param {string} key DAO key. 
   * @returns {DataAccessObjectInterface<any>} Another DAO.
   */
  _getDao(key: string): DataAccessObjectInterface<any> | null {
    return AbstractDataAccessObject._daoReferences[key] || null;
  }
}
