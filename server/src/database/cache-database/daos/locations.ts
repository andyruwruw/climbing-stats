// Local Imports
import { DataAccessObject } from './dao';

// Types
import { Location as LocationInterface } from '../../../types/climbs';

/**
 * Data access object for Locations.
 */
export class LocationsDataAccessObject
  extends DataAccessObject<LocationInterface> {
  /**
   * Retrieves collection name.
   */
  _getCollectionName(): string {
    return 'locations';
  }

  /**
   * Retrieves default sort value.
   *
   * @returns {Record<string, number>} Sort method.
   */
  _getTimeSort() {
    return {
      name: -1,
    };
  }
}
