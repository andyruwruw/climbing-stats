// Local Imports
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
