// Packages
import { Model } from 'mongoose';

// Local Imports
import { SessionModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import { Session as SessionInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Sessions.
 */
export class SessionDataAccessObject
  extends DataAccessObject<SessionInterface>
  implements DataAccessObjectInterface<SessionInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return SessionModel;
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
