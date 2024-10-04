// Local Imports
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
