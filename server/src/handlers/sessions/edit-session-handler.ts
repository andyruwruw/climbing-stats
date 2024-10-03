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
export class EditSessionHandler extends AbstractHandler {
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
        location = undefined,
        start = undefined,
        end = undefined,
        areas = undefined,
        activities = undefined,
        description = undefined,
        felt = undefined,
        partners = undefined,
        activeCal = undefined,
        totalCal = undefined,
        heart = undefined,
        lowHeart = undefined,
        highHeart = undefined,
        carpool = undefined,
        drive = undefined,
        sent = undefined,
      } = req.body;

      // Check if the route exists.
      const existing = await AbstractHandler._database.sessions.findById(id);

      if (!existing) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
            'sessions',
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
      if (location !== undefined && location !== '') {
        // Check that the location is a valid one.
        const existingLocation = await AbstractHandler._database.locations.findById(location);

        if (!existingLocation) {
          res.status(404).send({
            error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
              'location',
              'ID',
              location,
            ),
          });
          return;
        }
      }

      const partnerIds = [];
      if (partners !== undefined && partners instanceof Array && partners.length) {
        for (let i = 0; i < partners.length; i += 1) {
          if (!partnerIds.includes(partners[i])) {
            partnerIds.push(partners[i]);
          }
        }
      }
      if (carpool !== undefined && carpool instanceof Array && carpool.length) {
        for (let i = 0; i < carpool.length; i += 1) {
          if (!partnerIds.includes(carpool[i])) {
            partnerIds.push(carpool[i]);
          }
        }
      }

      const existingPartners = await AbstractHandler._database.climbingPartners.find({
        id: {
          $in: partnerIds,
        },
      });

      if (existingPartners.length !== partnerIds.length) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
            'partner',
            'ID',
            'Something',
          ),
        });
        return;
      }

      // Construct our query.
      const query = {} as QueryUpdate;

      if (location !== undefined) {
        query.location = location;
      }
      if (start !== undefined) {
        query.start = start;
      }
      if (end !== undefined) {
        query.end = end;
      }
      if (areas !== undefined) {
        query.areas = areas;
      }
      if (activities !== undefined) {
        query.activities = activities;
      }
      if (description !== undefined) {
        query.description = description;
      }
      if (felt !== undefined) {
        query.felt = felt;
      }
      if (partners !== undefined) {
        query.partners = partners;
      }
      if (activeCal !== undefined) {
        query.activeCal = activeCal;
      }
      if (totalCal !== undefined) {
        query.totalCal = totalCal;
      }
      if (heart !== undefined) {
        query.heart = heart;
      }
      if (lowHeart !== undefined) {
        query.lowHeart = lowHeart;
      }
      if (highHeart !== undefined) {
        query.highHeart = highHeart;
      }
      if (carpool !== undefined) {
        query.carpool = carpool;
      }
      if (drive !== undefined) {
        query.drive = drive;
      }
      if (sent !== undefined) {
        query.sent = sent;
      }

      // Make the update.
      await AbstractHandler._database.sessions.update(
        { id },
        query,
      );

      res.status(200).send({
        session: {
          ...existing,
          ...query,
        },
      });
    } catch (error) {
      Monitor.log(
        EditSessionHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
