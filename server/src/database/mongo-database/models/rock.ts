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

  area: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    default: 'boulder',
  },

  activities: {
    type: Array,
    of: String,
    default: [],
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

export const RockModel = model('Rock', schema);
