// Local Imports
import {
  MESSAGE_HANDLER_ITEM_EXISTS,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import { validate } from '../../helpers/authentication';
import { Monitor } from '../../helpers/monitor';
import { Handler } from '../handler';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';

/**
 * Creates a new crag area.
 */
export class CreateAreaHandler extends Handler {
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
        crag,
        name,
        officialName = true,
        altNames = [],
        image = '',
        hrefs = {},
        activities = [],
        isPrivate = false,
        privateName = false,
        media = [],
      } = req.body;

      // Check parameters.
      if (!crag) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('area', 'Crag'),
        });
        return;
      }
      if (!crag) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('area', 'Name'),
        });
        return;
      }

      const existing = await Handler.database.areas.findOne({
        crag,
        name,
      });

      if (existing) {
        res.status(409).send({
          error: MESSAGE_HANDLER_ITEM_EXISTS('Area', 'name'),
        });
        return;
      }

      const user = await userPromise;

      if (!user) {
        res.status(401).send({
          error: MESSAGE_UNAUTHORIZED,
        });
        return;
      }

      const time = Date.now();

      const inserted = await Handler.database.areas.insert({
        crag,
        name,
        officialName,
        altNames,
        image,
        hrefs,
        updated: time,
        submitted: user.username,
        activities,
        private: isPrivate,
        privateName,
        media,
      });

      if (!inserted) {
        res.status(500).send({
          error: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      const area = await Handler.database.areas.findOne({
        crag,
        name,
        updated: time,
      });

      res.status(201).send({
        area,
      });
    } catch (error) {
      Monitor.log(
        CreateAreaHandler,
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
