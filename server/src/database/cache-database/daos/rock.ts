// Local Imports
import { DataAccessObject } from './dao';

// Types
import { Rock as RockInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Rocks.
 */
export class RockDataAccessObject
  extends DataAccessObject<RockInterface>
  implements DataAccessObjectInterface<RockInterface> {
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
