// Local Imports
import { DataAccessObject } from './dao';

// Types
import { Token as TokenInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Tokens.
 */
export class TokenDataAccessObject
  extends DataAccessObject<TokenInterface>
  implements DataAccessObjectInterface<TokenInterface> {
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
