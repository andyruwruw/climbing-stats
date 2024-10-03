// Local Imports
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_LOGIN_ATTEMPT_FAILURE,
} from '../../config/messages';
import {
  cleanUser,
  comparePassword,
  generateToken,
} from '../../helpers/authorization';
import {
  AUTHORIZATION_TYPE,
  REQUEST_TYPE,
} from '../../config';
import { AbstractHandler } from '../abstract-handler';
import { Monitor } from '../../helpers/monitor';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';

/**
 * Creates a new login session.
 * 
 * Attempting to login with an old session active creates a new session.
 */
export class LoginUserHandler extends AbstractHandler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.POST,
      '/session',
      AUTHORIZATION_TYPE.OPTIONAL,
    );
  }

  /**
   * Handles the request.
   *
   * @param {ServerRequest} req Incoming request.
   * @param {ServerResponse} res Outgoing response.
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

      // Check for all required parameters.
      if (!username) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'user',
            'Username',
          ),
        });
        return;
      }
      if (!password) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'user',
            'Password',
          ),
        });
        return;
      }

      // Find the user.
      const user = await AbstractHandler._database.users.findOne({ username });

      // If it doesn't exist (username incorrect).
      if (!user) {
        res.status(401).send({ error: MESSAGE_LOGIN_ATTEMPT_FAILURE });
        return;
      }

      // If the passwords don't match (password incorrect).
      if (!await comparePassword(
        user.password,
        password,
      )) {
        res.status(401).send({ error: MESSAGE_LOGIN_ATTEMPT_FAILURE });
        return;
      }

      // Invalidate old token.
      if (req.token) {
        await AbstractHandler._database.tokens.delete({
          user: user.id as string,
          token: req.token,
        });
      }

      // Generate a token.
      const token = generateToken(user.id as string);

      await AbstractHandler._database.tokens.insert({
        user: user.id as string,
        token,
        created: Date.now(),
      });

      res.status(201).send({
        user: cleanUser(user),
        token,
      });
    } catch (error) {
      Monitor.log(
        LoginUserHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({ error: MESSAGE_INTERNAL_SERVER_ERROR });
    }
  }
}
