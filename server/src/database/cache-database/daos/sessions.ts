// Local Imports
import { DataAccessObject } from './dao';

// Types
import { Session as SessionInterface } from '../../../types/sessions';

/**
 * Data access object for Sessions.
 */
export class SessionsDataAccessObject
  extends DataAccessObject<SessionInterface> {
  /**
   * Retrieves collection name.
   */
  _getCollectionName(): string {
    return 'sessions';
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
