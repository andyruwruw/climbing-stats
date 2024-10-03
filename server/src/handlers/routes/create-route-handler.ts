// Local Imports
import {
  AUTHORIZATION_TYPE,
  CLIMBING_ACTIVITY,
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
  DangerSuggestions,
  GradeSuggestions,
  Route,
} from '../../types/climbs';
import {
  ServerRequest,
  ServerResponse,
} from '../../types';

/**
 * Create a new route.
 */
export class CreateRouteHandler extends AbstractHandler {
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
        rock = '',
        officiallyNamed = true,
        altNames = [] as string[],
        image = '',
        type = CLIMBING_ACTIVITY.BOULDER,
        hrefs = {},
        media = [] as string[],
        grade = {} as GradeSuggestions,
        danger = {} as DangerSuggestions,
        isPrivate = false,
        privateName = false,
        privateLocation = false,
      } = req.body;

      // Check for all required parameters.
      if (!location) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'route',
            'location',
          ),
        });
        return;
      }
      if (!name) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'route',
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

      // Check that the rock is a valid one.
      if (rock.length) {
        const existingRock = await AbstractHandler._database.rocks.findById(rock);

        if (!existingRock) {
          res.status(404).send({
            error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
              'Rock',
              'ID',
              rock,
            ),
          });
          return;
        }
      }

      // Create query.
      const query = {
        type,
        location,
        area,
        rock,
        name,
        officiallyNamed,
        altNames,
        image,
        hrefs,
        media,
        grade,
        private: isPrivate,
        privateName,
        privateLocation,
        danger,
        updated: Date.now(),
        submitted: req.user,
      } as Route;

      const id = await AbstractHandler._database.routes.insert(query);

      res.status(201).send({
        route: {
          id,
          ...query,
        },
      });
    } catch (error) {
      Monitor.log(
        CreateRouteHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
