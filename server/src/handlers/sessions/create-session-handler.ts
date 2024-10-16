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
import {
  ClimbingActivities,
  ClimbingGrade,
 } from '../../types/climbs';
import { Session } from '../../types/sessions';

/**
 * Create a new session.
 */
export class CreateSessionHandler extends AbstractHandler {
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
        location,
        start,
        end,
        areas = [] as string[],
        activities = [] as ClimbingActivities[],
        description = '',
        felt = -1,
        partners = [] as string[],
        activeCal = -1,
        totalCal = -1,
        heart = -1,
        lowHeart = -1,
        highHeart = -1,
        carpool = [] as string[],
        drive = 0,
        media = [] as string[],
        sent = [] as ClimbingGrade[],
      } = req.body;

      // Check for all required parameters.
      if (!location) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'session',
            'location',
          ),
        });
        return;
      }
      if (!start) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'session',
            'start',
          ),
        });
        return;
      }
      if (!end) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'session',
            'end',
          ),
        });
        return;
      }

      // Find that location
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

      // Create query.
      const query = {
        user: req.user,
        location,
        areas,
        outdoors: location.outdoors,
        date: start,
        start,
        end,
        duration: end - start,
        activities,
        description,
        felt,
        partners,
        activeCal,
        totalCal,
        heart,
        lowHeart,
        highHeart,
        carpool,
        drive,
        media,
        sent,
      } as Session;

      const id = await AbstractHandler._database.sessions.insert(query);

      // Apply to climbing partners.

      // Apply to overall.

      res.status(201).send({
        session: {
          id,
          ...query,
        },
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
    }
  }
}
