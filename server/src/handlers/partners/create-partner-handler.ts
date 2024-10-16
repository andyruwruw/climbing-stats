// Local Imports
import {
  AUTHORIZATION_TYPE,
  REQUEST_TYPE,
} from '../../config';
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
} from '../../config/messages';
import { cleanClimbingPartner } from '../../helpers/authorization';
import { AbstractHandler } from '../abstract-handler';
import { Monitor } from '../../helpers/monitor';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';

/**
 * Create a new partner.
 */
export class CreatePartnerHandler extends AbstractHandler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.POST,
      '/',
      AUTHORIZATION_TYPE.REQUIRED,
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
        first,
        last,
        hide = true,
      } = req.body;

      // Check for all required parameters.
      if (!first) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'partner',
            'first name',
          ),
        });
        return;
      }
      if (!last) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'partner',
            'last name inicial',
          ),
        });
        return;
      }

      // Create query.
      const query = {
        user: req.user,
        first,
        last,
        hoursRank: -1,
        hours: -1,
        hoursBy: 0,
        outdoorHoursRank: -1,
        outdoorHours: -1,
        sessionsRank: -1,
        sessions: -1,
        outdoorSessionsRank: -1,
        outdoorSessions: -1,
        outdoorPercent: 0,
        met: '',
        metDate: -1,
        droveRank: -1,
        drove: 0,
        hide,
      };

      const id = await AbstractHandler._database.climbingPartners.insert(query);

      res.status(201).send({
        partner: {
          id,
          ...cleanClimbingPartner(query),
        },
      });
    } catch (error) {
      Monitor.log(
        CreatePartnerHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
