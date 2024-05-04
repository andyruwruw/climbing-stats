// Local Imports
import {
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
import { Session } from '../../types/tables';

/**
 * Ends a user's session.
 */
export class GetSessionsHandler extends Handler {
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

      const { username } = req.query;

      const user = await userPromise;

      if (!user || username !== user.username) {
        const subject = await Handler.database.users.findOne({
          username,
        });

        if (subject.privacy === 'private') {
          res.status(401).send({
            error: MESSAGE_UNAUTHORIZED,
          });
          return;
        }
      }

      const sessions = await Handler.database.sessions.find({
        user: username,
      });

      res.status(200).send({
        sessions: sessions.map((session: Session) => (Handler.applySessionPrivacy(
          session,
          user,
        ))),
      });
    } catch (error) {
      Monitor.log(
        GetSessionsHandler,
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
