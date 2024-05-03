// Local Imports
import { MESSAGE_HANDLER_PARAMETER_MISSING, MESSAGE_INTERNAL_SERVER_ERROR, MESSAGE_UNAUTHORIZED } from '../../config/messages';
import { validate } from '../../helpers/authentication';
import { Monitor } from '../../helpers/monitor';
import { Handler } from '../handler';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';
import { ClimbingActivities } from '@/types/tables';

/**
 * Ends a user's session.
 */
export class CreateTickHandler extends Handler {
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
        date,
        route,
        status,
        type = '',
        description = '',
        attempts = -1,
        laps = -1,
        media = [],
        feature = false,
        rating = -1,
        gradeSuggestion = '',
      } = req.body;

      // Check parameters.
      if (!date) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('tick', 'Date'),
        });
        return;
      }
      if (!route) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('tick', 'Route'),
        });
        return;
      }
      if (!status) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('tick', 'Status'),
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

      const inserted = await Handler.database.ticks.insert({
        user: user.username,
        date,
        type: type as ClimbingActivities,
        route,
        description,
        status,
        attempts,
        laps,
        media,
        feature,
        rating,
        gradeSuggestion,
      });

      if (!inserted) {
        res.status(500).send({
          error: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      const tick = await Handler.database.ticks.findOne({
        user: user.username,
        date,
        route,
        status,
      });

      res.status(201).send({
        tick,
      });
    } catch (error) {
      Monitor.log(
        CreateTickHandler,
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
