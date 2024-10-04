// Packages
import { Model } from 'mongoose';

// Local Imports
import { MediaModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import { Media as MediaInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Medias.
 */
export class MediaDataAccessObject
  extends DataAccessObject<MediaInterface>
  implements DataAccessObjectInterface<MediaInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return MediaModel;
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
