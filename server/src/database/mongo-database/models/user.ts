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
});

export const UserModel = model('
ser', schema);
