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
import {
  Rock,
  Route
} from '../../types/tables';

/**
 * Retrieves a crag area.
 */
export class GetAreaHandler extends Handler {
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
          error: MESSAGE_HANDLER_PARAMETER_MISSING('area', 'ID'),
        });
        return;
      }

      const area = await Handler.database.areas.findById(id as string);

      if (!area) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_DOES_NOT_EXIST('area', 'ID'),
        });
        return;
      }

      const user = await userPromise;

      const promises = [];

      promises.push(Handler.database.crags.findById(area.crag));
      promises.push(Handler.database.rocks.find({ area: id }));
      promises.push(Handler.database.routes.find({ area: id }));

      await Promise.all(promises);

      const [
        crag,
        rocks,
        routes,
      ] = promises;

      res.status(200).send({
        area: Handler.applyAreaPrivacy(
          area,
          user,
        ),
        crag: Handler.applyCragPrivacy(
          await crag,
          user,
        ),
        rocks: (await rocks).map((rock: Rock) => (Handler.applyRockPrivacy(
          rock,
          user,
        ))),
        routes: (await routes).map((route: Route) => (Handler.applyRoutePrivacy(
          route,
          user,
        ))),
      });
    } catch (error) {
      Monitor.log(
        GetAreaHandler,
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
