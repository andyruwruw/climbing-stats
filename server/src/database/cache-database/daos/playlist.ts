// Local Imports
import { DataAccessObject } from './dao';

// Types
import { Playlist as PlaylistInterface } from '../../../types/tables';
import { DataAccessObjectInterface as DataAccessObjectInterface } from '../../../types/database';

/**
 * Data access object for Playlists.
 */
export class PlaylistDataAccessObject
  extends DataAccessObject<PlaylistInterface>
  implements DataAccessObjectInterface<PlaylistInterface> {
  /**
   * Retrieves default sort value.
   *
   * @returns {Record<string, number>} Sort method.
   */
  _getTimeSort() {
    return {
      updated: -1,
    };
  }
}
