// Local Imports
import {
  MESSAGE_HANDLER_ITEM_NOT_FOUND,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_UNAUTHORIZED_ERROR,
} from '../../config/messages';
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
 * Retrieve a session.
 */
export class GetSessionHandler extends AbstractHandler {
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
            'session',
            'ID',
          ),
        });
        return;
      }

      // Retrieve the session.
      const session = await AbstractHandler._database.sessions.findById(id);

      if (!session) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
            'session',
            'ID',
            id,
          ),
        });
        return;
      }

      const owner = await AbstractHandler._database.users.findById(session.user);

      if (!owner || (req.user !== owner.id && owner.sessionsPrivacy)) {
        res.status(403).send({ error: MESSAGE_UNAUTHORIZED_ERROR });
        return;
      }

      if (req.user !== owner.id) {
        session.description = '';
        session.carpool = [];
        session.drive = -1;
      }

      if (req.user !== owner.id && owner.partnersPrivacy) {
        session.partners = [];
      }

      if (req.user !== owner.id && owner.ticksPrivacy) {
        session.sent = [];
      }

      res.status(200).send({
        session,
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
    }
  }
}
