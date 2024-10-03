// Local Imports
import { DataAccessObject } from './dao';

// Types
import { User as UserInterface } from '../../../types/users';

/**
 * Data access object for Users.
 */
export class UsersDataAccessObject
  extends DataAccessObject<UserInterface> {
  /**
   * Retrieves collection name.
   */
  _getCollectionName(): string {
    return 'users';
  }

  /**
   * Retrieves default sort value.
   *
   * @returns {Record<string, number>} Sort method.
   */
  _getTimeSort() {
    return {
      created: -1,
    };
  }
}
