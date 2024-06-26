// Local Imports
import {
  MESSAGE_HANDLER_ITEM_DOES_NOT_EXIST,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
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
 * Retrieves a route.
 */
export class GetRouteHandler extends Handler {
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

      const { id } = req.query;

      if (!id) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('route', 'ID'),
        });
        return;
      }

      const route = await Handler.database.routes.findById(id as string);

      if (!route) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_DOES_NOT_EXIST('route', 'ID'),
        });
        return;
      }

      const user = await userPromise;

      const promises = [];

      promises.push(Handler.database.crags.findById(route.crag));
      promises.push(Handler.database.areas.findById(route.area));
      promises.push(Handler.database.rocks.findById(route.rock));

      await Promise.all(promises);

      const [
        crag,
        area,
        rock,
      ] = promises;

      res.status(200).send({
        rock: Handler.applyRockPrivacy(
          await rock,
          user,
        ),
        area: Handler.applyAreaPrivacy(
          await area,
          user,
        ),
        crag: Handler.applyCragPrivacy(
          await crag,
          user,
        ),
        route: Handler.applyRoutePrivacy(
          route,
          user,
        ),
      });
    } catch (error) {
      Monitor.log(
        GetRouteHandler,
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
