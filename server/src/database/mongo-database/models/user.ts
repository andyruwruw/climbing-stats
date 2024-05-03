// Packages
import {
  model,
  Schema,
} from 'mongoose';

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },

  displayName: {
    type: String,
    default: '',
  },

  password: {
    type: String,
    default: '',
  },

  email: {
    type: String,
    default: '',
  },

  privacy: {
    type: String,
    default: '',
  },

  image: {
    type: String,
    default: '',
  },

  hrefs: {
    type: Object,
    default: {},
  },

  height: {
    type: Number,
    default: -1,
  },

  weight: {
    type: Number,
    default: -1,
  },

  started: {
    type: Number,
    default: -1,
  },

  created: {
    type: Number,
    default: Date.now(),
  },

  activities: {
    type: Array,
    of: String,
    default: [],
  },/

  max: {
    type: Array,
    of: String,
    default: [],
  },

  born: {
    type: Number,
    default: -1,
  },

  home: {
    type: String,
    default: '',
  },

  admin: {
    type: Boolean,
    default: false,
  },
});

export const UserModel = model('User', schema);
