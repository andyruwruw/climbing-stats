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
import { QueryUpdate } from '../../types/database';

/**
 * Edits an existing session.
 */
export class EditTickHandler extends AbstractHandler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.PUT,
      '/:id',
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

      // Parse request body.
      const {
        route = undefined,
        type = undefined,
        status = undefined,
        sent = undefined,
        protection = undefined,
        date = undefined,
        description = undefined,
        attempts = undefined,
        laps = undefined,
        feature = undefined,
        grade = undefined,
      } = req.body;

      // Check if the route exists.
      const existing = await AbstractHandler._database.ticks.findById(id);

      if (!existing) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
            'ticks',
            'ID',
            id,
          ),
        });
        return;
      }

      // Is the user allowed to carry out this action?
      if (existing.user !== req.user) {
        const user = await AbstractHandler._database.users.findById(req.user);

        if (!user.admin) {
          res.status(403).send({ error: MESSAGE_UNAUTHORIZED_ERROR });
          return;
        }
      }

      // Check references
      if (route !== undefined && route !== '') {
        // Check that the location is a valid one.
        const existingRoute = await AbstractHandler._database.routes.findById(route);

        if (!existingRoute) {
          res.status(404).send({
            error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
              'route',
              'ID',
              route,
            ),
          });
          return;
        }
      }

      // Construct our query.
      const query = {} as QueryUpdate;

      if (route !== undefined) {
        query.route = route;
      }
      if (type !== undefined) {
        query.type = type;
      }
      if (status !== undefined) {
        query.status = status;
      }
      if (sent !== undefined) {
        query.sent = sent;
      }
      if (protection !== undefined) {
        query.protection = protection;
      }
      if (date !== undefined) {
        query.date = date;
      }
      if (description !== undefined) {
        query.description = description;
      }
      if (attempts !== undefined) {
        query.attempts = attempts;
      }
      if (laps !== undefined) {
        query.laps = laps;
      }
      if (feature !== undefined) {
        query.feature = feature;
      }
      if (grade !== undefined) {
        query.grade = grade;
      }

      // Make the update.
      await AbstractHandler._database.ticks.update(
        { id },
        query,
      );

      res.status(200).send({
        ticks: {
          ...existing,
          ...query,
        },
      });
    } catch (error) {
      Monitor.log(
        EditTickHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
