import { BaseRepository } from '../base/BaseRepository';
import { User, IUser } from '../models/User';

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return this.findOne({ username });
  }

  async findByDisplayName(displayName: string): Promise<IUser | null> {
    return this.findOne({ displayName });
  }

  async updatePoints(userId: string, points: number): Promise<IUser | null> {
    return this.update(userId, { $inc: { points } });
  }

  async updatePrivacySettings(userId: string, settings: Partial<{
    profilePrivacy: string;
    localePrivacy: string;
    agePrivacy: string;
    ticksPrivacy: string;
    sessionsPrivacy: string;
    partnersPrivacy: string;
    pyramidPrivacy: string;
    mapPrivacy: string;
  }>): Promise<IUser | null> {
    return this.update(userId, { $set: settings });
  }
} 