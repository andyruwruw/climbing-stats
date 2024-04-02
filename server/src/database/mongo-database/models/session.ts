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

  crag: {
    type: String,
    required: true,
  },

  date: {
    type: Number,
    default: Date.now(),
  },

  start: {
    type: Number,
    default: Date.now(),
  },

  end: {
    type: Number,
    default: Date.now(),
  },

  duration: {
    type: Number,
    default: 0,
  },

  activities: {
    type: Array,
    of: String,
    default: [],
  },

  felt: {
    type: Number,
    default: -1,
  },

  description: {
    type: String,
    default: '',
  },

  partners: {
    type: Array,
    of: String,
    default: [],
  },

  media: {
    type: Array,
    of: String,
    default: [],
  },

  last: {
    type: String,
    default: '',
  },

  next: {
    type: String,
    default: '',
  },
});

export const SessionModel = model('Session', schema);
