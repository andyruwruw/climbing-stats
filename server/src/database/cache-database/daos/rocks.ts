// Local Imports
import { DataAccessObject } from './dao';

// Types
import { Rock as RockInterface } from '../../../types/climbs';

/**
 * Data access object for Rocks.
 */
export class RocksDataAccessObject
  extends DataAccessObject<RockInterface> {
  /**
   * Retrieves collection name.
   */
  _getCollectionName(): string {
    return 'rocks';
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
