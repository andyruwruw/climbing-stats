// Local Imports
import {
  MESSAGE_HANDLER_ITEM_EXISTS,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_UNAUTHORIZED
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
 * Ends a user's session.
 */
export class CreateRockHandler extends Handler {
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
        area = '',
        type = 'boulder',
        activities = [],
        isPrivate = false,
        privateName = false,
        media = [],
      } = req.body;

      // Check parameters.
      if (!crag) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('rock', 'Crag'),
        });
        return;
      }
      if (!name) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('rock', 'Name'),
        });
        return;
      }

      const existing = await Handler.database.rocks.findOne({
        crag,
        name,
      });

      if (existing) {
        res.status(409).send({
          error: MESSAGE_HANDLER_ITEM_EXISTS('Rock', 'name'),
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

      const inserted = await Handler.database.rocks.insert({
        crag,
        area,
        type,
        activities,
        name,
        officialName,
        altNames,
        image,
        hrefs,
        updated: time,
        submitted: user.username,
        private: isPrivate,
        privateName: privateName,
        media,
      });

      if (!inserted) {
        res.status(500).send({
          error: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      const rock = await Handler.database.rocks.findOne({
        crag,
        name,
        updated: time,
      });

      res.status(201).send({
        rock,
      });
    } catch (error) {
      Monitor.log(
        CreateRockHandler,
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
