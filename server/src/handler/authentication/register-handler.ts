// Local Imports
import {
  MESSAGE_HANDLER_ITEM_EXISTS,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_PASSWORD_WEAK,
} from '../../config/messages';
import {
  convertUserToPublic,
  hashPassword
} from '../../helpers/authentication';
import { Monitor } from '../../helpers/monitor';
import { Handler } from '../handler';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';

/**
 * Registers a new user.
 */
export class RegisterHandler extends Handler {
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
      // Get parameters
      const {
        username,
        fullName,
        password,
        email = '',
        privacy = 'private',
        image = '',
        hrefs = {},
        height = -1,
        weight = -1,
        started = -1,
        created = Date.now(),
        activities = [],
        max = [],
        born = -1,
        home = '',
      } = req.body;

      // Check parameters.
      if (!fullName) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('user', 'Full name'),
        });
        return;
      }
      if (!username) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('user', 'Username'),
        });
        return;
      }
      if (!password) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('user', 'Password'),
        });
        return;
      }
      if (!(password.length >= 8
        && /\d/.test(password)
        && /[A-Z]/.test(password)
        && /[!#$%&*+\-:;<=>?@^~|]/.test(password))) {
        res.status(400).send({
          error: MESSAGE_PASSWORD_WEAK,
        });
        return;
      }

      console.log(fullName, username, password);

      const existing = await Handler.database.users.findOne({
        username,
      });

      if (existing) {
        res.status(409).send({
          error: MESSAGE_HANDLER_ITEM_EXISTS('User', 'username'),
        });
        return;
      }

      const hashed = await hashPassword(password);

      await Handler.database.users.insert({
        username,
        displayName: fullName,
        password: hashed,
        email,
        privacy,
        image,
        hrefs,
        height,
        weight,
        started,
        created,
        activities,
        max,
        born,
        home,
        admin: false,
      });

      const user = await Handler.database.users.findOne({
        username,
      });

      if (!user) {
        res.status(500).send({
          error: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      res.status(201).send({
        user: convertUserToPublic(user),
      });
    } catch (error) {
      Monitor.log(
        RegisterHandler,
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
