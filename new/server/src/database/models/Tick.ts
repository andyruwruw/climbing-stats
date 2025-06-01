import { Schema, model, Document } from 'mongoose';
import { ClimbingActivities, AttemptStatus, Protection, ClimbingGrade } from './types';

export interface ITick extends Document {
  user: string;
  route: string;
  type: ClimbingActivities;
  status: AttemptStatus;
  sent: boolean;
  protection: Protection;
  date: number;
  description: string;
  attempts: number;
  laps: number;
  media: string[];
  feature: boolean;
  grade: ClimbingGrade;
}

const TickSchema = new Schema<ITick>({
  user: { type: String, required: true, ref: 'User' },
  route: { type: String, required: true, ref: 'Route' },
  type: { type: String, enum: Object.values(ClimbingActivities), required: true },
  status: { type: String, enum: Object.values(AttemptStatus), required: true },
  sent: { type: Boolean, default: false },
  protection: { type: String, enum: Object.values(Protection), required: true },
  date: { type: Number, default: Date.now },
  description: { type: String, default: '' },
  attempts: { type: Number, default: 1 },
  laps: { type: Number, default: 1 },
  media: { type: [String], default: [] },
  feature: { type: Boolean, default: false },
  grade: { type: String, required: true }
}, {
  timestamps: true
});

// Index for efficient querying
TickSchema.index({ user: 1, route: 1 });
TickSchema.index({ date: -1 });
TickSchema.index({ grade: 1 });

export const Tick = model<ITick>('Tick', TickSchema); 