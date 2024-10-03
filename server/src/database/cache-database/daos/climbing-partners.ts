// Local Imports
import { DataAccessObject } from './dao';

// Types
import { ClimbingPartner as ClimbingPartnerInterface } from '../../../types/users';

/**
 * Data access object for Climbing Partners.
 */
export class ClimbingPartnersDataAccessObject
  extends DataAccessObject<ClimbingPartnerInterface> {
  /**
   * Retrieves collection name.
   */
  _getCollectionName(): string {
    return 'partner';
  }

  /**
   * Retrieves default sort value.
   *
   * @returns {Record<string, number>} Sort method.
   */
  _getTimeSort() {
    return {
      hoursRank: -1,
    };
  }
}
