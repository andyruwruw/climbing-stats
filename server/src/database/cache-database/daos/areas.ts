// Local Imports
import { DataAccessObject } from './dao';

// Types
import { Area as AreaInterface } from '../../../types/climbs';

/**
 * Data access object for Areas.
 */
export class AreasDataAccessObject
  extends DataAccessObject<AreaInterface> {
  /**
   * Retrieves collection name.
   */
  _getCollectionName(): string {
    return 'areas';
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
