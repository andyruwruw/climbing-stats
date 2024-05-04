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

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
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

  hours: {
    type: Number,
    default: 0,
  },

  sessions: {
    type: Number,
    default: 0,
  },

  outdoorHours: {
    type: Number,
    default: 0,
  },

  outdoorSessions: {
    type: Number,
    default: 0,
  },

  met: {
    type: String,
    default: '',
  },

  next: {
    type: String,
    default: '',
  },
});

export const ClimbingPartnerModel = model('ClimbingPartner', schema);
