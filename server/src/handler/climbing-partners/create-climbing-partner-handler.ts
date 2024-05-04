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

/**
 * Creates a new climbing partner.
 */
export class CreateClimbingPartnerHandler extends Handler {
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

      const {
        firstName = '?',
        lastName = '?',
        isPrivate = true,
        privateName = true,
        hours = -1,
        sessions = -1,
        outdoorHours = -1,
        outdoorSessions = -1,
      } = req.body;

      const user = await userPromise;

      if (!user) {
        res.status(401).send({
          error: MESSAGE_UNAUTHORIZED,
        });
        return;
      }

      const inserted = await Handler.database.climbingPartners.insert({
        user: user.username,
        firstName,
        lastName,
        private: isPrivate,
        privateName,
        hours,
        sessions,
        outdoorHours,
        outdoorSessions,
        met: '',
        next: '',
      });

      if (!inserted) {
        res.status(500).send({
          error: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      const partner = await Handler.database.climbingPartners.findOne({
        user: user.username,
        firstName,
        lastName,
        private: isPrivate,
        privateName,
        hours,
        sessions,
        outdoorHours,
        outdoorSessions,
      });

      res.status(201).send({
        partner,
      });
    } catch (error) {
      Monitor.log(
        CreateClimbingPartnerHandler,
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
