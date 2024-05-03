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
 * Ends a user's session.
 */
export class CreateRouteHandler extends Handler {
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
        type,
        crag,
        name,
        area = '',
        rock = '',
        officialName = true,
        altNames = [],
        image = '',
        media = [],
        hrefs = {},
        danger = '',
        grade = {},
        isPrivate = false,
        privateName = false,
      } = req.body;

      // Check parameters.
      if (!type) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('route', 'Type'),
        });
        return;
      }
      if (!crag) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('route', 'Crag'),
        });
        return;
      }
      if (!name) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('route', 'Name'),
        });
        return;
      }

      const existing = await Handler.database.routes.findOne({
        type,
        crag,
        name,
      });

      if (existing) {
        res.status(409).send({
          error: MESSAGE_HANDLER_ITEM_EXISTS('Route', 'name'),
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

      const inserted = await Handler.database.routes.insert({
        type,
        crag,
        area,
        submitted: user.username,
        rock,
        name,
        officialName,
        altNames,
        image,
        media,
        hrefs,
        danger,
        grade,
        private: isPrivate,
        privateName,
        updated: time,
      });

      if (!inserted) {
        res.status(500).send({
          error: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      const route = await Handler.database.routes.findOne({
        crag,
        name,
        updated: time,
      });

      res.status(201).send({
        route,
      });
    } catch (error) {
      Monitor.log(
        CreateRouteHandler,
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
