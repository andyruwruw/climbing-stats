import mongoose from 'mongoose';
import { AbstractDatabase } from '../abstract-database';
import { UserDAO } from './user-dao';
import { User } from '../../types/users';
import { CreateUserData } from '../../types/users';

export class MongoDatabase extends AbstractDatabase {
  private userDao: UserDAO;

  constructor() {
    super();
    this.userDao = new UserDAO();
  }

  async connect(): Promise<void> {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/climbing-stats';
    await mongoose.connect(uri);
  }

  isConnected(): boolean {
    return mongoose.connection.readyState === 1;
  }

  // User methods
  async findUserByEmail(email: string): Promise<User | null> {
    return this.userDao.findByEmail(email);
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userDao.findByUsername(username);
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userDao.findById(id);
  }

  async createUser(data: CreateUserData): Promise<User> {
    return this.userDao.create(data);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const user = await this.userDao.update(id, data);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.userDao.delete(id);
  }
} 