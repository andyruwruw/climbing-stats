// Local Imports
import {
  AUTHORIZATION_TYPE,
  REQUEST_TYPE,
  ROCK_TYPES,
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
import { ClimbingActivities } from '../../types/climbs';

/**
 * Create a new rock.
 */
export class CreateRockHandler extends AbstractHandler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.POST,
      '/',
      AUTHORIZATION_TYPE.ADMIN,
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
        area = '',
        officiallyNamed = true,
        altNames = [] as string[],
        type = ROCK_TYPES.BOULDER,
        activities = [] as ClimbingActivities[],
        image = '',
        hrefs = {},
        isPrivate = false,
        privateName = false,
        privateLocation = false,
      } = req.body;

      // Check for all required parameters.
      if (!location) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'rock',
            'location',
          ),
        });
        return;
      }
      if (!name) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'rock',
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

      // Check that the area is a valid one.
      if (area.length) {
        const existingArea = await AbstractHandler._database.areas.findById(area);

        if (!existingArea) {
          res.status(404).send({
            error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
              'Area',
              'ID',
              area,
            ),
          });
          return;
        }
      }

      // Create query.
      const query = {
        location,
        area,
        name,
        officiallyNamed,
        altNames,
        type,
        activities,
        image,
        hrefs,
        updated: Date.now(),
        submitted: req.user,
        private: isPrivate,
        privateName,
        privateLocation,
        media: [],
      };

      const id = await AbstractHandler._database.rocks.insert(query);

      res.status(201).send({
        rock: {
          id,
          ...query,
        },
      });
    } catch (error) {
      Monitor.log(
        CreateRockHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
