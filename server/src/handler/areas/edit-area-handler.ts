// Local Imports
import {
  MESSAGE_HANDLER_ITEM_DOES_NOT_EXIST,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import { validate } from '../../helpers/authentication';
import { Monitor } from '../../helpers/monitor';
import { Handler } from '../handler';

// Types
import {
  Dictionary,
  ServerRequest,
  ServerResponse,
} from '../../types';
import { DatabaseColumnTypes } from '../../types/database';
/**
 * Edits a crag area.
 */
export class EditAreaHandler extends Handler {
  /**
   * Executes the handler.
   *
   * @param {ServerRequest} req Request for handler.
   * @param {ServerResponse} res Response to request.
   */
  async execute(
    req: ServerRequest,
    res: ServerResponse,
  ): Promise<void> {
    try {
      // Verify current user session.
      const userPromise = validate(
        req,
        Handler.database,
      );
      
      const {
        id,
        crag = undefined,
        name = undefined,
        officialName = undefined,
        altNames = undefined,
        image = undefined,
        hrefs = undefined,
        activities = undefined,
        isPrivate = undefined,
        privateName = undefined,
        privateLocation = undefined,
        media = undefined,
      } = req.body;

      if (!id) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('area', 'ID'),
        });
        return;
      }

      const area = await Handler.database.areas.findById(id);

      if (!area) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_DOES_NOT_EXIST('area', 'ID'),
        });
        return;
      }

      const user = await userPromise;
      
      if (!user.admin && area.submitted !== user.username) {
        res.status(401).send({
          error: MESSAGE_UNAUTHORIZED,
        });
      }

      const update = {
        updated: Date.now(),
      } as Dictionary<DatabaseColumnTypes>;

      if (crag !== undefined) {
        update.crag = crag;
      }
      if (name !== undefined) {
        update.name = name;
      }
      if (officialName !== undefined) {
        update.officialName = officialName;
      }
      if (altNames !== undefined) {
        update.altNames = altNames;
      }
      if (image !== undefined) {
        update.image = image;
      }
      if (hrefs !== undefined) {
        update.hrefs = hrefs;
      }
      if (activities !== undefined) {
        update.activities = activities;
      }
      if (isPrivate !== undefined) {
        update.private = isPrivate;
      }
      if (privateName !== undefined) {
        update.privateName = privateName;
      }
      if (privateLocation !== undefined) {
        update.privateLocation = privateLocation;
      }
      if (media !== undefined) {
        update.media = media;
      }

      const updated = await Handler.database.areas.update(
        {
          _id: id,
        },
        update,
      );

      if (!updated) {
        res.status(500).send({
          error: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      res.status(200).send({
        area: {
          ...area,
          ...update,
        },
      });
    } catch (error) {
      Monitor.log(
        EditAreaHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
      return;
    }
  }
}
