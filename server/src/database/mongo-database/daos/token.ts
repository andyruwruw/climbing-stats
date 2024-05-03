// Packages
import { Model } from 'mongoose';

// Local Imports
import { TokenModel } from '../models';
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
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return TokenModel;
  }

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
