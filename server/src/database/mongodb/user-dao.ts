import { Schema, model } from 'mongoose';
import { User } from '../../types/users';
import { hashPassword } from '../../helpers/auth';

interface CreateUserData {
  username: string;
  email: string;
  password: string;
  displayName?: string;
}

const userSchema = new Schema<User>({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  displayName: { 
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  hrefs: {
    type: Map,
    of: String,
    default: {}
  },
  age: {
    type: Number,
    default: 0
  },
  gender: {
    type: String,
    enum: ['man', 'woman', 'non-binary', 'agender', 'unknown'],
    default: 'unknown'
  },
  locale: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  },
  created: {
    type: Number,
    default: () => Date.now()
  },
  points: {
    type: Number,
    default: 0
  },
  admin: {
    type: Boolean,
    default: false
  },
  profilePrivacy: {
    type: String,
    enum: ['private', 'public', 'unlisted'],
    default: 'public'
  },
  localePrivacy: {
    type: String,
    enum: ['private', 'public', 'unlisted'],
    default: 'public'
  },
  agePrivacy: {
    type: String,
    enum: ['private', 'public', 'unlisted'],
    default: 'public'
  },
  ticksPrivacy: {
    type: String,
    enum: ['private', 'public', 'unlisted'],
    default: 'public'
  },
  sessionsPrivacy: {
    type: String,
    enum: ['private', 'public', 'unlisted'],
    default: 'public'
  },
  partnersPrivacy: {
    type: String,
    enum: ['private', 'public', 'unlisted'],
    default: 'public'
  },
  pyramidPrivacy: {
    type: String,
    enum: ['private', 'public', 'unlisted'],
    default: 'public'
  },
  mapPrivacy: {
    type: String,
    enum: ['private', 'public', 'unlisted'],
    default: 'public'
  },
  boulderingGrades: {
    type: String,
    enum: [
      'v-scale',
      'font',
      'circuit-grading',
      'everything-v3'
    ],
    default: 'v-scale'
  },
  routeGrades: {
    type: String,
    enum: [
      'yosemite-decimal-system',
      'french',
      'uiaa',
      'bmc-traditional-grading',
      'australian'
    ],
    default: 'yosemite-decimal-system'
  }
});

const UserModel = model<User>('User', userSchema);

export class UserDAO {
  async findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ username: email }); // Using username as email
  }

  async findByUsername(username: string): Promise<User | null> {
    return UserModel.findOne({ username });
  }

  async findById(id: string): Promise<User | null> {
    return UserModel.findById(id);
  }

  async create(data: CreateUserData): Promise<User> {
    const hashedPassword = await hashPassword(data.password);
    return UserModel.create({
      username: data.username,
      password: hashedPassword,
      displayName: data.displayName || data.username,
      created: Date.now()
    });
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    return UserModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserModel.deleteOne({ _id: id });
    return result.deletedCount === 1;
  }
} 