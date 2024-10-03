// Local Imports
import {
  AUTHORIZATION_TYPE,
  CLIMBING_PROTECTION,
  REQUEST_TYPE,
} from '../../config';
import {
  MESSAGE_HANDLER_ITEM_NOT_FOUND,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
} from '../../config/messages';
import { AbstractHandler } from '../abstract-handler';
import { Monitor } from '../../helpers/monitor';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';

/**
 * Create a new tick.
 */
export class CreateTickHandler extends AbstractHandler {
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
        route,
        type,
        status,
        sent = true,
        protection = CLIMBING_PROTECTION.PADS,
        date = Date.now(),
        description = '',
        attempts = 0,
        laps = 0,
        media = [],
        feature = false,
        grade = '',
      } = req.body;

      if (!route) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'tick',
            'route',
          ),
        });
        return;
      }
      if (!type) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'tick',
            'type',
          ),
        });
        return;
      }
      if (!status) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'tick',
            'status',
          ),
        });
        return;
      }

      // Check that the rock is a valid one.
      const existingRoute = await AbstractHandler._database.routes.findById(route);

      if (!existingRoute) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
            'Route',
            'ID',
            route,
          ),
        });
        return;
      }
      
      // Create query.
      const query = {
        user: req.user,
        route,
        type,
        status,
        sent,
        protection,
        date,
        description,
        attempts,
        laps,
        media,
        feature,
        grade,
      };

      const id = await AbstractHandler._database.ticks.insert(query);

      res.status(201).send({
        tick: {
          id,
          ...query,
        },
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
    }
  }
}
