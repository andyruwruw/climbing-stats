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
 * Retrieve a tick.
 */
export class GetTickHandler extends AbstractHandler {
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
            'tick',
            'ID',
          ),
        });
        return;
      }

      // Retrieve the tick.
      const tick = await AbstractHandler._database.ticks.findById(id);

      if (!tick) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
            'tick',
            'ID',
            id,
          ),
        });
        return;
      }

      const owner = await AbstractHandler._database.users.findById(tick.user);

      if (!owner || (req.user !== owner.id && owner.ticksPrivacy)) {
        res.status(403).send({ error: MESSAGE_UNAUTHORIZED_ERROR });
        return;
      }

      if (req.user !== owner.id) {
        tick.description = '';
      }

      res.status(200).send({
        tick,
      });
    } catch (error) {
      Monitor.log(
        GetTickHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
