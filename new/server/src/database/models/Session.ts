import { Schema, model, Document } from 'mongoose';
import { ClimbingActivities, ClimbingGrade } from './types';

export interface ISession extends Document {
  user: string;
  location: string;
  areas: string[];
  outdoors: boolean;
  date: number;
  start: number;
  end: number;
  duration: number;
  activities: ClimbingActivities[];
  description: string;
  felt: number;
  partners: string[];
  activeCal: number;
  totalCal: number;
  heart: number;
  lowHeart: number;
  highHeart: number;
  carpool: string[];
  drive: number;
  media: string[];
  sent: ClimbingGrade[];
}

const SessionSchema = new Schema<ISession>({
  user: { type: String, required: true, ref: 'User' },
  location: { type: String, required: true, ref: 'Location' },
  areas: { type: [String], ref: 'Area', default: [] },
  outdoors: { type: Boolean, required: true },
  date: { type: Number, required: true },
  start: { type: Number, required: true },
  end: { type: Number, required: true },
  duration: { type: Number, required: true },
  activities: {
    type: [String],
    enum: Object.values(ClimbingActivities),
    required: true
  },
  description: { type: String, default: '' },
  felt: { type: Number, min: 1, max: 10 },
  partners: { type: [String], ref: 'User', default: [] },
  activeCal: { type: Number },
  totalCal: { type: Number },
  heart: { type: Number },
  lowHeart: { type: Number },
  highHeart: { type: Number },
  carpool: { type: [String], ref: 'User', default: [] },
  drive: { type: Number, default: 0 },
  media: { type: [String], default: [] },
  sent: { type: [String], default: [] }
}, {
  timestamps: true
});

// Indexes for efficient querying
SessionSchema.index({ user: 1, date: -1 });
SessionSchema.index({ location: 1 });
SessionSchema.index({ partners: 1 });
SessionSchema.index({ activities: 1 });

export const Session = model<ISession>('Session', SessionSchema); 