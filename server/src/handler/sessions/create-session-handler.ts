// Local Imports
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
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
 * Logs a new session.
 */
export class CreateSessionHandler extends Handler {
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
        crag,
        date,
        areas = [],
        start = -1,
        end = -1,
        duration = -1,
        activities = [],
        outdoors = false,
        felt = -1,
        description = '',
        partners = [],
        media = [],
        max = [],
        privatePartners = true,
        isPrivate = true,
        privateCrag = true,
        privateDetails = true,
      } = req.body;

      // Check parameters.
      if (!crag) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('session', 'Location'),
        });
        return;
      }
      if (!date) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('session', 'Date'),
        });
        return;
      }

      const user = await userPromise;

      if (!user) {
        res.status(401).send({
          error: MESSAGE_UNAUTHORIZED,
        });
        return;
      }

      const inserted = await Handler.database.sessions.insert({
        user: user.username,
        crag,
        areas,
        date,
        start,
        end,
        duration,
        activities,
        outdoors,
        felt,
        description,
        partners,
        media,
        last: '',
        next: '',
        max,
        privatePartners,
        private: isPrivate,
        privateCrag,
        privateDetails,
      });

      if (!inserted) {
        res.status(500).send({
          error: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      const session = await Handler.database.sessions.findOne({
        user: user.username,
        crag,
        date,
        start,
        end,
      });

      res.status(201).send({
        session,
      });
    } catch (error) {
      Monitor.log(
        CreateSessionHandler,
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
