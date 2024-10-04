// Packages
import { Model } from 'mongoose';

// Local Imports
import { RockModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import { Rock as RockInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Rocks.
 */
export class RockDataAccessObject
  extends DataAccessObject<RockInterface>
  implements DataAccessObjectInterface<RockInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return RockModel;
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
