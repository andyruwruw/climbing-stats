// Packages
import { Model } from 'mongoose';

// Local Imports
import { TickModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import { Tick as TickInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Ticks.
 */
export class TickDataAccessObject
  extends DataAccessObject<TickInterface>
  implements DataAccessObjectInterface<TickInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return TickModel;
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
