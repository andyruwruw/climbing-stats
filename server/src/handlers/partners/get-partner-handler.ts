// Local Imports
import {
  MESSAGE_HANDLER_ITEM_NOT_FOUND,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
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
 * Retrieve a partner.
 */
export class GetPartnerHandler extends AbstractHandler {
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
            'partner',
            'ID',
          ),
        });
        return;
      }

      // Retrieve the rock.
      const partner = await AbstractHandler._database.climbingPartners.findById(id);

      if (!partner) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
            'partner',
            'ID',
            id,
          ),
        });
        return;
      }

      // Authenticate the session.
      let authenticated = false;

      if (!req.user) {
        authenticated = false;
      } else if (partner.user !== req.user) {
        const user = await AbstractHandler._database.users.findById(req.user);
        
        if (user.admin) {
          authenticated = true;
        }
      } else {
        authenticated = true;
      }

      const owner = await AbstractHandler._database.users.findById(partner.user);

      if (!authenticated
        && (owner.partnersPrivacy !== 'private'
        || partner.hide)) {
        res.status(200).send({
          partner: null,
        });
      }

      res.status(200).send({
        partner: {
          ...partner,
          last: partner.last.length ? partner.last[0].toUpperCase() : '?',
        },
      });
    } catch (error) {
      Monitor.log(
        GetPartnerHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
