import { Model, Document, FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';

export abstract class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    try {
      const entity = new this.model(data);
      return await entity.save();
    } catch (error) {
      throw this.handleDatabaseError(error);
    }
  }

  async findById(id: string): Promise<T | null> {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw this.handleDatabaseError(error);
    }
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    try {
      return await this.model.findOne(filter);
    } catch (error) {
      throw this.handleDatabaseError(error);
    }
  }

  async find(filter: FilterQuery<T>, options?: QueryOptions): Promise<T[]> {
    try {
      return await this.model.find(filter, null, options);
    } catch (error) {
      throw this.handleDatabaseError(error);
    }
  }

  async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
    try {
      return await this.model.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw this.handleDatabaseError(error);
    }
  }

  async delete(id: string): Promise<T | null> {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw this.handleDatabaseError(error);
    }
  }

  async exists(filter: FilterQuery<T>): Promise<boolean> {
    try {
      return await this.model.exists(filter) !== null;
    } catch (error) {
      throw this.handleDatabaseError(error);
    }
  }

  protected handleDatabaseError(error: any): Error {
    // Log the error here
    console.error('Database Error:', error);

    if (error.name === 'ValidationError') {
      return new Error('Invalid data provided');
    }

    if (error.name === 'MongoServerError' && error.code === 11000) {
      return new Error('Duplicate entry found');
    }

    return new Error('Database operation failed');
  }
} 