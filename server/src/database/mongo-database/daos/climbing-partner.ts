// Packages
import { Model } from 'mongoose';

// Local Imports
import { ClimbingPartnerModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import { ClimbingPartner as ClimbingPartnerInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for ClimbingPartners.
 */
export class ClimbingPartnerDataAccessObject
  extends DataAccessObject<ClimbingPartnerInterface>
  implements DataAccessObjectInterface<ClimbingPartnerInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return ClimbingPartnerModel;
  }

  /**
   * Retrieves default sort value.
   *
   * @returns {Record<string, number>} Sort method.
   */
  _getTimeSort() {
    return {
      hours: -1,
    };
  }
}
