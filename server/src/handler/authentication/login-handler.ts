// Local Imports
import {
  MESSAGE_AUTHENTICATION_INCORRECT,
  MESSAGE_INTERNAL_SERVER_ERROR,
} from '../../config/messages';
import {
  comparePassword,
  convertUserToPublic,
} from '../../helpers/authentication';
import {
  attatchCookie,
  generateToken,
} from '../../helpers/cookie';
import { Monitor } from '../../helpers/monitor';
import { Handler } from '../handler';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';

/**
 * Logs a user into their account, starting a new session.
 */
export class LoginHandler extends Handler {
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
      const {
        username,
        password,
      } = req.body;

      const user = await Handler.database.users.findOne({
        username,
      });

      if (!user || !await comparePassword(
        user.password,
        password,
      )) {
        res.status(401).send({
          error: MESSAGE_AUTHENTICATION_INCORRECT,
        });
        return;
      }

      // Generate a new session token.
      const token = generateToken({
        user: user.username,
        date: Date.now(),
      });
      const inserted = await Handler.database.tokens.insert({
        user: user.username,
        token,
        created: Date.now(),
      });

      if (!inserted) {
        res.status(500).send({
          error: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      // Send back user and session.
      attatchCookie(
        res,
        token,
      );

      res.status(201).send({
        user: convertUserToPublic(user),
      });
      return;
    } catch (error) {
      Monitor.log(
        LoginHandler,
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
