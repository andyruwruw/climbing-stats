// Packages
import {
  model,
  Schema,
} from 'mongoose';

const schema = new Schema({
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

  rank: {
    type: Number,
    default: 1,
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
});

export const ClimbingPartnerModel = model('ClimbingPartner', schema);
