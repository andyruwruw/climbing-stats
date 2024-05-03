// Packages
import { Model } from 'mongoose';

// Local Imports
import { CragModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import { Crag as CragInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Crags.
 */
export class CragDataAccessObject
  extends DataAccessObject<CragInterface>
  implements DataAccessObjectInterface<CragInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return CragModel;
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
