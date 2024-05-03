// Local Imports
import {
  attatchCookie,
  getCookie,
} from '../../helpers/cookie';
import { MESSAGE_INTERNAL_SERVER_ERROR } from '../../config/messages';
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
export class LogoutHandler extends Handler {
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
      const cookie = getCookie(req);

      // No session detected.
      if (!cookie || !user) {
        res.status(200).send({});
        return;
      }

      // Delete the session token.
      await Handler.database.tokens.delete({
        user: user.username as string,
        token: cookie,
      });

      // Send back dead token.
      attatchCookie(
        res,
        '',
      );

      res.status(200).send({});
    } catch (error) {
      Monitor.log(
        LogoutHandler,
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
