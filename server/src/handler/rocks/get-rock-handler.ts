// Local Imports
import { MESSAGE_INTERNAL_SERVER_ERROR } from '../../config/messages';
import { Monitor } from '../../helpers/monitor';
import { Handler } from '../handler';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';
import { validate } from '../../helpers/authentication';
import { Route } from '../../types/tables';

/**
 * Retrieves a rock.
 */
export class GetRockHandler extends Handler {
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
          error: MESSAGE_HANDLER_PARAMETER_MISSING('rock', 'ID'),
        });
        return;
      }

      const rock = await Handler.database.rocks.findById(id as string);

      if (!rock) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_DOES_NOT_EXIST('rock', 'ID'),
        });
        return;
      }

      const user = await userPromise;

      const promises = [];

      promises.push(Handler.database.crags.findById(rock.crag));
      promises.push(Handler.database.areas.findById(rock.area));
      promises.push(Handler.database.routes.find({ rock: id }));

      await Promise.all(promises);

      const [
        crag,
        area,
        routes,
      ] = promises;

      res.status(200).send({
        rock: Handler.applyRockPrivacy(
          rock,
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
        routes: (await routes).map((route: Route) => (Handler.applyRoutePrivacy(
          route,
          user,
        ))),
      });
    } catch (error) {
      Monitor.log(
        GetRockHandler,
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
function MESSAGE_HANDLER_PARAMETER_MISSING(arg0: string, arg1: string) {
  throw new Error('Function not implemented.');
}

function MESSAGE_HANDLER_ITEM_DOES_NOT_EXIST(arg0: string, arg1: string) {
  throw new Error('Function not implemented.');
}

