// Local Imports
import {
  MESSAGE_HANDLER_ITEM_FOUND,
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
import { ClimbingActivities } from '../../types/attempts';
import { Area } from '../../types/climbs';

/**
 * Create a new area.
 */
export class CreateAreaHandler extends AbstractHandler {
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
        name,
        officiallyNamed = true,
        altNames = [] as string[],
        image = '',
        hrefs = {},
        activities = [] as ClimbingActivities[],
        isPrivate = false,
        privateName = false,
        privateLocation = false,
        media = [] as string[],
      } = req.body;

      // Check for all required parameters.
      if (!location) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'area',
            'location',
          ),
        });
        return;
      }
      if (!name) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'area',
            'name',
          ),
        });
        return;
      }

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

      // Check for an existing area.
      const existing = await AbstractHandler._database.areas.find({
        location,
        name,
      });

      if (existing) {
        res.status(400).send({
          error: MESSAGE_HANDLER_ITEM_FOUND(
            'Area',
            'name',
            name,
          ),
        });
        return;
      }

      // Create query.
      const query = {
        location,
        name,
        officiallyNamed,
        altNames,
        image,
        hrefs,
        activities,
        private: isPrivate,
        privateName,
        privateLocation,
        media,
        updated: Date.now(),
        submitted: req.user,
      } as Area;

      const id = await AbstractHandler._database.areas.insert(query);

      res.status(201).send({
        area: {
          id,
          ...query,
        },
      });
    } catch (error) {
      Monitor.log(
        CreateAreaHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
