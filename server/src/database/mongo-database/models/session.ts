// Packages
import {
  model,
  Schema,
} from 'mongoose';

const schema = new Schema({
  id: {
    type: String,
    required: true,
  },

  user: {
    type: String,
    required: true,
  },

  date: {
    type: Number,
    default: Date.now(),
  },

  start: {
    type: Number,
    default: 0,
  },

  end: {
    type: Number,
    default: 0,
  },

  duration: {
    type: Number,
    default: 0,
  },

  location: {
    type: String,
    required: true,
  },

  activities: {
    type: Array,
    of: String,
    default: [],
  },

  felt: {
    type: Number,
    default: 5,
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
