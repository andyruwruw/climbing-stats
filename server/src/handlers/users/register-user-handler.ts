// Local Imports
import {
  AUTHORIZATION_TYPE,
  GRADING_SYSTEMS,
  PROFILE_PRIVACY,
  REQUEST_TYPE,
  USER_GENDER,
} from '../../config';
import {
  MESSAGE_HANDLER_ITEM_FOUND,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
} from '../../config/messages';
import {
  cleanUser,
  generateToken,
  hashPassword,
} from '../../helpers/authorization';
import { AbstractHandler } from '../abstract-handler';
import { Monitor } from '../../helpers/monitor';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';

/**
 * Creates a new user.
 */
export class RegisterUserHandler extends AbstractHandler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.POST,
      '',
      AUTHORIZATION_TYPE.NONE,
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
      // Parse request body.
      const {
        displayName,
        username,
        password,
      } = req.body;

      // Check for all required parameters.
      if (!displayName) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'user',
            'Name',
          ),
        });
        return;
      }
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

      // Find existing users.
      const existing = await AbstractHandler._database.users.findOne({ username });

      // Check that they don't already exist.
      if (existing) {
        res.status(400).send({
          error: MESSAGE_HANDLER_ITEM_FOUND(
            'User',
            'username',
            username,
          ),
        });
        return;
      }

      // Create the new user.
      const hashed = await hashPassword(password);

      const newUser = {
        username,
        password: hashed,
        displayName: username,
        image: '',
        hrefs: {},
        age: -1,
        gender: USER_GENDER.UNKNOWN,
        locale: '',
        state: '',
        country: '',
        created: Date.now(),
        points: 0,
        admin: false,
        profilePrivacy: PROFILE_PRIVACY.UNLISTED,
        localePrivacy: PROFILE_PRIVACY.UNLISTED,
        agePrivacy: PROFILE_PRIVACY.UNLISTED,
        ticksPrivacy: PROFILE_PRIVACY.UNLISTED,
        sessionsPrivacy: PROFILE_PRIVACY.UNLISTED,
        partnersPrivacy: PROFILE_PRIVACY.UNLISTED,
        pyramidPrivacy: PROFILE_PRIVACY.UNLISTED,
        mapPrivacy: PROFILE_PRIVACY.UNLISTED,
        boulderingGrades: GRADING_SYSTEMS.V_SCALE,
        routeGrades: GRADING_SYSTEMS.YOSEMITE_DECIMAL_SYSTEM,
      };

      const id = await AbstractHandler._database.users.insert(newUser);

      // Generate a token.
      const token = generateToken(id);

      await AbstractHandler._database.tokens.insert({
        user: id as string,
        token,
        created: Date.now(),
      });

      res.status(201).send({
        user: cleanUser({
          id,
          ...newUser,
        }),
        token,
      });
    } catch (error) {
      Monitor.log(
        RegisterUserHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({ error: MESSAGE_INTERNAL_SERVER_ERROR });
    }
  }
}
