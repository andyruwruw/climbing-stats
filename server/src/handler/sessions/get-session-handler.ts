// Local Imports
import { MESSAGE_HANDLER_ITEM_DOES_NOT_EXIST, MESSAGE_HANDLER_PARAMETER_MISSING, MESSAGE_INTERNAL_SERVER_ERROR } from '../../config/messages';
import { Monitor } from '../../helpers/monitor';
import { Handler } from '../handler';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';
import { validate } from '@/helpers/authentication';
import { Area } from '@/types/tables';

/**
 * Rretrieves a user's session.
 */
export class GetSessionHandler extends Handler {
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
          error: MESSAGE_HANDLER_PARAMETER_MISSING('session', 'ID'),
        });
        return;
      }

      const session = await Handler.database.sessions.findById(id as string);

      if (!session) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_DOES_NOT_EXIST('session', 'ID'),
        });
        return;
      }

      const user = await userPromise;

      const promises = [];

      promises.push(Handler.database.crags.findById(session.crag));
      promises.push(Handler.database.areas.find({
        areas: {
          $in: session.areas,
        }
      }));

      await Promise.all(promises);

      const [
        crag,
        areas,
      ] = promises;

      res.status(200).send({
        areas: (await areas).map((area: Area) => (Handler.applyAreaPrivacy(
          area,
          user,
        ))),
        crag: Handler.applyCragPrivacy(
          await crag,
          user,
        ),
        session: Handler.applySessionPrivacy(
          session,
          user,
        ),
      });
    } catch (error) {
      Monitor.log(
        GetSessionHandler,
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
