// Packages
import { Model } from 'mongoose';

// Local Imports
import { PlaylistModel } from '../models';
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
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return PlaylistModel;
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
