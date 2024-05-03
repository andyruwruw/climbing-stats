// Local Imports
import { DataAccessObject } from './dao';

// Types
import { Tick as TickInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Ticks.
 */
export class TickDataAccessObject
  extends DataAccessObject<TickInterface>
  implements DataAccessObjectInterface<TickInterface> {
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
