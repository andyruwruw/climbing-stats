// Packages
import {
  model,
  Schema,
} from 'mongoose';

const schema = new Schema({
  crag: {
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

  hrefs: {
    type: Object,
    default: {},
  },

  updated: {
    type: Number,
    default: Date.now(),
  },

  submitted: {
    type: String,
    required: true,
  },

  activities: {
    type: Array,
    of: String,
    default: [],
  },

  private: {
    type: Boolean,
    default: false,
  },

  privateName: {
    type: Boolean,
    default: false,
  },

  privateLocation: {
    type: Boolean,
    default: false,
  },

  media: {
    type: Array,
    of: String,
    default: [],
  },
});

export const AreaModel = model('Area', schema);
