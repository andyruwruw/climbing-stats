// Packages
import {
  model,
  Schema,
} from 'mongoose';

const schema = new Schema({
  type: {
    type: String,
    default: 'image',
  },

  creator: {
    type: String,
    required: true,
  },

  href: {
    type: String,
    required: true,
  },

  caption: {
    type: String,
    default: '',
  },

  date: {
    type: Number,
    default: Date.now(),
  },
});

export const MediaModel = model('Media', schema);
