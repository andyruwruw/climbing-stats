// Local Imports
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_NO_PERMISSION,
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
export class DeleteRouteHandler extends Handler {
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

      // Check parameters.
      if (!id) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('route', 'ID'),
        });
        return;
      }

      const route = await Handler.database.routes.findById(id as string);

      if (!route) {
        res.status(204).send({});
        return;
      }

      const user = await userPromise;

      if (!user) {
        res.status(401).send({
          error: MESSAGE_UNAUTHORIZED,
        });
        return;
      }

      if (!user.admin && route.submitted !== user.username) {
        res.status(401).send({
          error: MESSAGE_NO_PERMISSION,
        });
        return;
      }

      await Handler.database.routes.deleteById(id as string);

      res.status(204).send({});
    } catch (error) {
      Monitor.log(
        DeleteRouteHandler,
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
