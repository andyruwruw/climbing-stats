import { Schema, model, Document } from 'mongoose';
import { ClimbingActivities } from './types';

export interface ILocation extends Document {
  name: string;
  officiallyNamed: boolean;
  altNames: string[];
  outdoors: boolean;
  image: string;
  country: string;
  state: string;
  locale: string;
  color: string;
  address: string;
  hrefs: Record<string, string>;
  updated: number;
  submitted: string;
  activities: ClimbingActivities[];
  private: boolean;
  privateName: boolean;
  privateLocation: boolean;
  media: string[];
}

const LocationSchema = new Schema<ILocation>({
  name: { type: String, required: true },
  officiallyNamed: { type: Boolean, default: true },
  altNames: { type: [String], default: [] },
  outdoors: { type: Boolean, required: true },
  image: { type: String, default: '' },
  country: { type: String, required: true },
  state: { type: String, required: true },
  locale: { type: String, required: true },
  color: { type: String },
  address: { type: String },
  hrefs: { type: Map, of: String, default: {} },
  updated: { type: Number, default: Date.now },
  submitted: { type: String, required: true },
  activities: {
    type: [String],
    enum: Object.values(ClimbingActivities),
    required: true
  },
  private: { type: Boolean, default: false },
  privateName: { type: Boolean, default: false },
  privateLocation: { type: Boolean, default: false },
  media: { type: [String], default: [] }
}, {
  timestamps: true
});

// Indexes for efficient querying
LocationSchema.index({ name: 'text', altNames: 'text' });
LocationSchema.index({ country: 1, state: 1, locale: 1 });
LocationSchema.index({ activities: 1 });
LocationSchema.index({ outdoors: 1 });

export const Location = model<ILocation>('Location', LocationSchema); 