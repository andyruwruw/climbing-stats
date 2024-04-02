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
});

export const ClimbingPartnerModel = model('ClimbingPartner', schema);
