// Packages
import { Model } from 'mongoose';

// Local Imports
import { AreaModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import { Area as AreaInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Areas.
 */
export class AreaDataAccessObject
  extends DataAccessObject<AreaInterface>
  implements DataAccessObjectInterface<AreaInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return AreaModel;
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
