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

  image: {
    type: String,
    default: '',
  },

  hrefs: {
    type: Object,
    default: {},
  },
});

export const UserModel = model('User', schema);
