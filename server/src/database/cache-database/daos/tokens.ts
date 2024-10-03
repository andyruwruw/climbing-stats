// Local Imports
import { DataAccessObject } from './dao';

// Types
import { Token as TokenInterface } from '../../../types/users';

/**
 * Data access object for Tokens.
 */
export class TokensDataAccessObject
  extends DataAccessObject<TokenInterface> {
  /**
   * Retrieves collection name.
   */
  _getCollectionName(): string {
    return 'tokens';
  }

  /**
   * Retrieves default sort value.
   *
   * @returns {Record<string, number>} Sort method.
   */
  _getTimeSort() {
    return {
      user: -1,
    };
  }
}
