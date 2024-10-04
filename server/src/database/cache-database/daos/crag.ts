// Local Imports
import { DataAccessObject } from './dao';

// Types
import { Crag as CragInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Crags.
 */
export class CragDataAccessObject
  extends DataAccessObject<CragInterface>
  implements DataAccessObjectInterface<CragInterface> {
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
