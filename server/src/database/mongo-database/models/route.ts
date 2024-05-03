// Packages
import {
  model,
  Schema,
} from 'mongoose';

const schema = new Schema({
  type: {
    type: String,
    required: true,
  },

  crag: {
    type: String,
    required: true,
  },

  area: {
    type: String,
    required: true,
  },

  rock: {
    type: String,
    required: true,
  },

  submitted: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  officialName: {
    type: Boolean,
    default: true,
  },

  altNames: {
    type: Array,
    of: String,
    default: [],
  },

  image: {
    type: String,
    default: '',
  },

  media: {
    type: Array,
    of: String,
    default: [],
  },

  hrefs: {
    type: Object,
    default: {},
  },

  grade: {
    type: Object,
    default: {},
  },

  danger: {
    type: String,
    default: 'G',
  },

  private: {
    type: Boolean,
    default: false,
  },

  privateName: {
    type: Boolean,
    default: false,
  },

  updated: {
    type: Number,
    default: Date.now(),
  },
});

export const RouteModel = model('Route', schema);
