import { Schema, model, Document } from 'mongoose';
import { Gender, Privacy, GradingSystem } from './types';
import { hashPassword } from '../../utils/auth';

export interface IUser extends Document {
  username: string;
  password: string;
  displayName: string;
  image: string;
  hrefs: Record<string, string>;
  age: number;
  gender: Gender;
  locale: string;
  state: string;
  country: string;
  created: number;
  points: number;
  admin: boolean;
  profilePrivacy: Privacy;
  localePrivacy: Privacy;
  agePrivacy: Privacy;
  ticksPrivacy: Privacy;
  sessionsPrivacy: Privacy;
  partnersPrivacy: Privacy;
  pyramidPrivacy: Privacy;
  mapPrivacy: Privacy;
  boulderingGrades: GradingSystem;
  routeGrades: GradingSystem;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: { type: String, required: true },
  image: { type: String, default: '' },
  hrefs: { type: Map, of: String, default: {} },
  age: { type: Number },
  gender: { type: String, enum: Object.values(Gender), default: Gender.UNKNOWN },
  locale: { type: String },
  state: { type: String },
  country: { type: String },
  created: { type: Number, default: Date.now },
  points: { type: Number, default: 0 },
  admin: { type: Boolean, default: false },
  profilePrivacy: { type: String, enum: Object.values(Privacy), default: Privacy.PUBLIC },
  localePrivacy: { type: String, enum: Object.values(Privacy), default: Privacy.PUBLIC },
  agePrivacy: { type: String, enum: Object.values(Privacy), default: Privacy.PUBLIC },
  ticksPrivacy: { type: String, enum: Object.values(Privacy), default: Privacy.PUBLIC },
  sessionsPrivacy: { type: String, enum: Object.values(Privacy), default: Privacy.PUBLIC },
  partnersPrivacy: { type: String, enum: Object.values(Privacy), default: Privacy.PUBLIC },
  pyramidPrivacy: { type: String, enum: Object.values(Privacy), default: Privacy.PUBLIC },
  mapPrivacy: { type: String, enum: Object.values(Privacy), default: Privacy.PUBLIC },
  boulderingGrades: { type: String, enum: Object.values(GradingSystem), default: GradingSystem.V_SCALE },
  routeGrades: { type: String, enum: Object.values(GradingSystem), default: GradingSystem.YDS }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await hashPassword(this.password);
  }
  next();
});

export const User = model<IUser>('User', UserSchema); 