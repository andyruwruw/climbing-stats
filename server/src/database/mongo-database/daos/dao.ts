/* eslint @typescript-eslint/no-unused-vars: "off" */
// Packages
import {
  Collection,
  Db,
  Document,
  Filter,
  FindOptions,
  MatchKeysAndValues,
  OptionalId,
  Sort,
  UpdateFilter
} from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

// Local Imports
import { AbstractDataAccessObject } from '../../abstract-dao';
import { MAX_CACHE_SIZE } from '../../../config';
import UsedAbstractDaoError from '../../../errors/used-abstract-dao-error';

// Types
import {
  QueryConditions,
  QueryProjection,
  QueryUpdate,
  DataAccessObjectInterface,
  MariaDbQuery,
  QuerySort,
  DatabaseRow,
  DatabaseListener,
} from '../../../types/database';
import { Dictionary } from '../../../types';

/**
 * Abstract class for Data Access Objects.
 */
export class DataAccessObject<T>
  extends AbstractDataAccessObject<T>
  implements DataAccessObjectInterface<T> {
  /**
   * Listeners for setting Db.
   * 
   * @type {DatabaseListener[]}
   */
  static _setDbListeners = [] as DatabaseListener[];

  /**
   * Reference to MongoDb collection.
   */
  _collection: Collection<Document> | null = null;

  /**
   * Cached results.
   */
  _cache: Dictionary<T> = {};

  /**
   * How long each item has been cached.
   */
  _history: Dictionary<number> = {};

  /**
   * Whether to cache all results.
   */
  _cacheAll = false;

  /**
   * Instantiates a new DataAccessObject.
   * 
   * @param {boolean} cacheAll Whether to cache all results.
   */
  constructor(cacheAll = false) {
    super();
  
    this.setInstanceDb = this.setInstanceDb.bind(this);

    DataAccessObject._setDbListeners.push(this.setInstanceDb);
    DataAccessObject._daoReferences[this._getCollectionName()] = this;

    this._cacheAll = cacheAll;
  }

  /**
   * Sets reference to collection.
   */
  static setDb(db: Db) {
    for (let i = 0; i < DataAccessObject._setDbListeners.length; i += 1) {
      DataAccessObject._setDbListeners[i](db);
    }
  }

  /**
   * Sets collection reference to Db.
   *
   * @param {Db} db MongoDb Db.
   */
  setInstanceDb(db: Db) {
    this._collection = db.collection(this._getCollectionName());
  }

  /**
   * Retrieves default sort value.
   *
   * @returns {Record<string, number>} Sort method.
   */
  _getSort() {
    return {};
  }

  /**
   * Pain.
   */
  async query(query: string | MariaDbQuery): Promise<unknown> {
    return null;
  }

  /**
   * Not needed.
   */
  async createTable(): Promise<void> {
    return;
  }

  /**
   * Not needed.
   */
  async dropTable(): Promise<void> {
    return;
  }

  /**
   * Deletes all items from the Database.
   */
  async deleteAll(): Promise<void> {
    // await this._model.deleteMany({});
    if (!this._collection) {
      return;
    }
    await this._collection.deleteMany({});

    this._cache = {};
    this._history = {};
  }

  /**
   * Creates a new instance of the item in the Database.
   *
   * @param {T} options The item to create.
   * @returns {Promise<string>} ID of item created.
   */
  async insert(item: T): Promise<string> {
    // const row = new this._model(item);

    // await row.save();

    // return 1;
    if (!this._collection) {
      return '';
    }

    const id = uuidv4();

    const withId = {
      id,
      ...item,
    } as T;

    await this._collection.insertOne(withId as OptionalId<Document>);

    this._cache[id] = withId;
    this._history[id] = Date.now();

    this._limitCacheSize();

    return id;
  }

  /**
   * Limits the cache's size.
   */
  _limitCacheSize(): void  {
    if (!this._cacheAll && Object.keys(this._cache).length > MAX_CACHE_SIZE) {
      while (Object.keys(this._cache).length > MAX_CACHE_SIZE) {
        const ids = Object.keys(this._cache);

        let min = Number.MAX_VALUE;
        let id = '';

        for (let i = 0; i < ids.length; i += 1) {
          if (this._history[ids[i]] < min) {
            min = this._history[ids[i]];
            id = ids[i];
          }
        }
  
        delete this._cache[id];
        delete this._history[id];
      }
    }
  }

  /**
   * Finds one item in the Database.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @param {QueryProjection} projection The projection to apply to the query.
   * @returns {Promise<T | null>} The item.
   */
  async findOne(
    filter: QueryConditions = {},
    projection: QueryProjection = {},
  ): Promise<T | null> {
    // return this._model.findOne(
    //   filter,
    //   projection,
    // );
    if (!this._collection) {
      return null;
    }

    if ('id' in filter && filter.id as string in this._cache) {
      this._history[filter.id as string] = Date.now();
      return this._cache[filter.id as string];
    }

    // const cleanedFilter = { ...filter };
    // if ('_id' in filter && !(filter._id instanceof ObjectId)) {
    //   cleanedFilter._id = new ObjectId(`${filter._id}`);
    // }

    const item = (await this._collection.findOne(
      filter,
      {
        projection,
      }
    )) as T | null;

    if (!item) {
      return null;
    }

    const response = {} as Dictionary<DatabaseRow>;
    const keys = Object.keys(item);

    for (let i = 0; i < keys.length; i += 1) {
      if (keys[i] !== '_id') {
        response[keys[i]] = (item as T as Dictionary<DatabaseRow>)[keys[i]];
      }
    }

    const { id } = item as T as Dictionary<DatabaseRow>;

    if (id) {
      this._cache[id as string] = item as T;
      this._history[id as string] = Date.now();

      this._limitCacheSize();
    }

    return response as T;
  }

  /**
   * Finds all of the item in the Database.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @param {QueryProjection} projection The projection to apply to the query.
   * @param {QuerySort | null} sort The sort to apply to the query.
   * @returns {Promise<T[]>} The items.
   */
  async find(
    filter: QueryConditions = {},
    projection: QueryProjection = {},
    sort: QuerySort | null = null,
    offset: number = 0,
    limit: number = -1,
  ): Promise<T[]> {
    if (!this._collection) {
      return [];
    }

    const options = {} as FindOptions<Document>;

    if (limit > 0) {
      options.limit = limit;
    }
    if (offset > 0) {
      options.skip = offset;
    }
    if (sort) {
      options.sort = sort as Sort;
    } else {
      options.sort = this._getSort();
    }

    // const cleanedFilter = { ...filter };
    // if ('_id' in filter && !(filter._id instanceof ObjectId)) {
    //   cleanedFilter._id = new ObjectId(`${filter._id}`);
    // }

    // return this._model.find(
    //   filter,
    //   projection,
    //   options,
    // );

    const items = (await (await this._collection.find(
      filter,
      options,
    )).toArray()) as T[] as Dictionary<DatabaseRow>[];

    const response = [] as T[];

    for (let i = 0; i < items.length; i += 1) {
      const item = {} as T as Dictionary<DatabaseRow>;
      const keys = Object.keys(items[i] as T as Record<string, any>);

      for (let j = 0; j < keys.length; j += 1) {
        if (keys[j] !== '_id') {
          item[keys[j]] = items[i][keys[j]];
        }
      }

      response.push(item as T);

      const { id } = item as T as Dictionary<DatabaseRow>;

      if (id) {
        this._cache[id as string] = item as T;
        this._history[id as string] = Date.now();
      }
    }

    this._limitCacheSize();

    return response;
  }

  /**
   * Finds an item by it's id from the Database.
   *
   * @param {string} id The id of the item.
   * @returns {Promise<T | null>} The item or null if not found.
   */
  async findById(id: string): Promise<T | null> {
    if (!this._collection) {
      return null;
    }

    if (id in this._cache) {
      this._history[id as string] = Date.now();
      return this._cache[id as string];
    }

    const item = await this.findOne({ id });

    this._cache[id as string] = item as T;
    this._history[id as string] = Date.now();

    this._limitCacheSize();

    return item;
  }

  /**
   * Counts the number of documents in a collection.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @returns {Promise<number>} The number of items.
   */
  async count(filter: QueryConditions = {}): Promise<number> {
    // const results = this._model.countDocuments(filter);
    // return results;
    if (!this._collection) {
      return -1;
    }

    // const cleanedFilter = { ...filter };
    // if ('_id' in filter && !(filter._id instanceof ObjectId)) {
    //   cleanedFilter._id = new ObjectId(`${filter._id}`);
    // }

    return this._collection.countDocuments(filter);
  }

  /**
   * Deletes all items or a subset of items from the Database.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @returns {Promise<number>} The number of items deleted.
   */
  async delete(filter: QueryConditions = {}): Promise<number> {
    // const {
    //   deletedCount,
    // } = await this._model.deleteMany(filter);

    // return deletedCount;
    if (!this._collection) {
      return -0;
    }

    // const cleanedFilter = { ...filter };
    // if ('_id' in filter && !(filter._id instanceof ObjectId)) {
    //   cleanedFilter._id = new ObjectId(`${filter._id}`);
    // }
    const items = await (await this._collection.find(filter)).toArray();

    for (let i = 0; i < items.length; i += 1) {
      if (items[i].id in this._cache) {
        delete this._cache[items[i].id];
        delete this._history[items[i].id];
      }
    }

    const response = await this._collection.deleteMany(filter);

    return response.deletedCount;
  }

  /**
   * Deletes a single item by its id from the Database.
   *
   * @param {string} id The id of the item.
   * @returns {Promise<boolean>} Whether the item was deleted.
   */
  async deleteById(id: string): Promise<boolean> {
    // const {
    //   deletedCount,
    // } = await this._model.deleteOne({ _id: id });

    // return deletedCount === 1;
    if (!this._collection) {
      return false;
    }

    if (id in this._cache) {
      delete this._cache[id];
      delete this._history[id];
    }

    const response = await this._collection.deleteOne({ id });

    return response.deletedCount > 0;
  }

  /**
   * Updates one item in the Database matching the filter.
   *
   * @param {QueryConditions} filter
   * @param {QueryUpdate} update
   * @param {boolean} insertNew
   * @returns {Promise<boolean>} Whether the item was updated.
   */
  async update(
    conditions: QueryConditions = {},
    update: QueryUpdate = {},
  ): Promise<number> {
    // const { modifiedCount } = await this._model.updateOne(
    //   conditions,
    //   update,
    //   {
    //     upsert: true,
    //   },
    // );

    // return modifiedCount;
    if (!this._collection) {
      return 0;
    }

    const alteredUpdate = { $set: {} } as UpdateFilter<Document>;

    for (const key in update) {
      (alteredUpdate.$set as MatchKeysAndValues<Document>)[key] = update[key];
    }

    // const cleanedFilter = { ...conditions };
    // if ('_id' in conditions && !(conditions._id instanceof ObjectId)) {
    //   cleanedFilter._id = new ObjectId(`${conditions._id}`);
    // }
    const item = await this._collection.findOne(conditions);

    if (item && item.id in this._cache) {
      delete this._cache[item.id];
      delete this._history[item.id];
    }

    const response = await this._collection.updateOne(
      conditions as Filter<Document>,
      alteredUpdate,
    );

    const { id } = update;

    if (id && id as string in this._cache) {
      delete this._cache[id as string];
      delete this._history[id as string];
    }

    return response.modifiedCount;
  }

  /**
   * Updates all items in the Database matching the filter.
   *
   * @param {QueryConditions} filter
   * @param {QueryUpdate} update
   * @param {boolean} insertNew
   * @returns {Promise<number>} The number of documents updated.
   */
  async updateMany(
    filter: QueryConditions = {},
    update: QueryUpdate = {},
    insertNew = true,
  ): Promise<number> {
    // const { modifiedCount } = await this._model.updateMany(
    //   filter,
    //   update,
    //   {
    //     upsert: insertNew,
    //   },
    // );

    // return modifiedCount;
    if (!this._collection) {
      return 0;
    }

    const alteredUpdate = {
      $set: {},
    } as UpdateFilter<Document>;

    for (const key in update) {
      (alteredUpdate.$set as MatchKeysAndValues<Document>)[key] = update[key];
    }

    // const cleanedFilter = { ...filter };
    // if ('_id' in filter && !(filter._id instanceof ObjectId)) {
    //   cleanedFilter._id = new ObjectId(`${filter._id}`);
    // }

    const response = await this._collection.updateMany(
      filter as Filter<Document>,
      alteredUpdate,
      {
        upsert: insertNew,
      },
    );

    const items = await (await this._collection.find(filter)).toArray();

    for (let i = 0; i < items.length; i += 1) {
      const { id } = items[i];

      if (id) {
        this._cache[id] = items[i] as T;
        this._history[id] = Date.now();
      }
    }

    this._limitCacheSize();

    return response.modifiedCount;
  }

  /**
   * Clears all items from the table.
   *
   * @returns {Promise<void>} Promise of the action.
   */
  async clear(): Promise<void> {
    this._cache = {};
    this._history = {};

    await this.deleteAll();
  }

  /**
   * Retrieves collection name.
   */
  _getCollectionName(): string {
    throw new UsedAbstractDaoError();
  }
}
