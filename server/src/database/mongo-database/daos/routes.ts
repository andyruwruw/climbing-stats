// Local Imports
import { DataAccessObject } from './dao';

// Types
import { Route as RouteInterface } from '../../../types/climbs';

/**
 * Data access object for Routes.
 */
export class RoutesDataAccessObject
  extends DataAccessObject<RouteInterface> {
  /**
   * Retrieves collection name.
   */
  _getCollectionName(): string {
    return 'routes';
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
