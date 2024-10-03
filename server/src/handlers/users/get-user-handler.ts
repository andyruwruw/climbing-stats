// Local Imports
import {
  MESSAGE_HANDLER_ITEM_NOT_FOUND,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_UNAUTHORIZED_ERROR,
} from '../../config/messages';
import {
  AUTHORIZATION_TYPE,
  PROFILE_PRIVACY,
  REQUEST_TYPE,
} from '../../config';
import { AbstractHandler } from '../abstract-handler';
import { cleanUser } from '../../helpers/authorization';
import { Monitor } from '../../helpers/monitor';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';

/**
 * Fetches a user's data.
 * 
 * Admin privilages needed to fetch any user other than self.
 */
export class GetUserHandler extends AbstractHandler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.GET,
      '/:id',
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
      // Parse path parameters.
      const { id } = req.params || {};

      // Check for all required parameters.
      if (!id) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'user',
            'ID',
          ),
        });
        return;
      }

      // Check if the user exists.
      const user = await AbstractHandler._database.users.findById(id);

      // Was the user found?
      if (!user) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
            'user',
            'ID',
            id,
          ),
        });
        return;
      }

      /**
       * Do you have permission?
       */
      if (id !== req.user && user.profilePrivacy === PROFILE_PRIVACY.PRIVATE) {
        res.status(403).send({ error: MESSAGE_UNAUTHORIZED_ERROR });
        return;
      }

      res.status(200).send({ user: cleanUser(user) });
    } catch (error) {
      Monitor.log(
        GetUserHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({ error: MESSAGE_INTERNAL_SERVER_ERROR });
    }
  }
}
