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
  Area,
  Crag,
  Rock,
  Route,
} from '../../types/tables';

/**
 * Retrieves a piece of media.
 */
export class GetMediaHandler extends Handler {
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
          error: MESSAGE_HANDLER_PARAMETER_MISSING('media', 'ID'),
        });
        return;
      }

      const media = await Handler.database.media.findById(id as string);

      if (!media) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_DOES_NOT_EXIST('media', 'ID'),
        });
        return;
      }

      const user = await userPromise;

      const promises = [];

      promises.push(Handler.database.crags.find({ media: { $all: [ id as string ] } }));
      promises.push(Handler.database.areas.find({ media: { $all: [ id as string ] } }));
      promises.push(Handler.database.rocks.find({ media: { $all: [ id as string ] } }));
      promises.push(Handler.database.routes.find({ media: { $all: [ id as string ] } }));

      await Promise.all(promises);

      const [
        crags,
        areas,
        rocks,
        routes,
      ] = promises;

      res.status(200).send({
        media,
        area: (await areas).map((area: Area) => (Handler.applyAreaPrivacy(
          area,
          user,
        ))),
        crags: (await crags).map((crag: Crag) => (Handler.applyCragPrivacy(
          crag,
          user,
        ))),
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
        GetMediaHandler,
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
