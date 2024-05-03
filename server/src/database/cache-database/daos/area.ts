// Local Imports
import { DataAccessObject } from './dao';

// Types
import { Area as AreaInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Areas.
 */
export class AreaDataAccessObject
  extends DataAccessObject<AreaInterface>
  implements DataAccessObjectInterface<AreaInterface> {
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
