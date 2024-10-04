// Local Imports
import { DataAccessObject } from './dao';

// Types
import { Route as RouteInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Routes.
 */
export class RouteDataAccessObject
  extends DataAccessObject<RouteInterface>
  implements DataAccessObjectInterface<RouteInterface> {
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
