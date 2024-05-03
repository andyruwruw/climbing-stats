// Packages
import {
  model,
  Schema,
} from 'mongoose';

const schema = new Schema({
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

  outdoors: {
    type: Boolean,
    default: true,
  },

  image: {
    type: String,
    default: '',
  },

  country: {
    type: String,
    default: 'US',
  },

  state: {
    type: String,
    default: '',
  },

  locale: {
    type: String,
    default: '',
  },

  address: {
    type: String,
    default: '',
  },

  color: {
    type: String,
    default: '#FF0000',
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

export const CragModel = model('Crag', schema);
