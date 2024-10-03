// Local Imports
import { DataAccessObject } from './dao';

// Types
import { Tick as TickInterface } from '../../../types/attempts';

/**
 * Data access object for Ticks.
 */
export class TicksDataAccessObject
  extends DataAccessObject<TickInterface> {
  /**
   * Retrieves collection name.
   */
  _getCollectionName(): string {
    return 'ticks';
  }

  /**
   * Retrieves default sort value.
   *
   * @returns {Record<string, number>} Sort method.
   */
  _getTimeSort() {
    return {
      date: -1,
    };
  }
}
