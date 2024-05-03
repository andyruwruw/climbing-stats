// Packages
import {
  model,
  Schema,
} from 'mongoose';

const schema = new Schema({
  user: {
    type: String,
    required: true,
  },

  date: {
    type: Number,
    default: Date.now(),
  },

  type: {
    type: String,
    default: '',
  },

  route: {
    type: String,
    default: '',
  },

  description: {
    type: String,
    default: '',
  },

  status: {
    type: String,
    default: '',
  },

  attempts: {
    type: Number,
    default: -1,
  },

  laps: {
    type: String,
    default: '',
  },

  media: {
    type: Array,
    of: String,
    default: [],
  },

  feature: {
    type: Boolean,
    default: false,
  },

  rating: {
    type: Number,
    default: -1,
  },

  gradeSuggestion: {
    type: String,
    default: '',
  },
});

export const TickModel = model('Tick', schema);
