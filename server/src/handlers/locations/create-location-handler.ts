// Local Imports
import {
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
import { Location } from '../../types/climbs';

/**
 * Create a new location.
 */
export class CreateLocationHandler extends AbstractHandler {
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
        name,
        officiallyNamed = true,
        altNames = [] as string[],
        outdoors = true,
        image = '',
        country = '',
        state = '',
        locale = '',
        color = '',
        hrefs = {},
        activities = [] as ClimbingActivities[],
        isPrivate = false,
        privateName = false,
        privateLocation = false,
        media = [] as string[],
      } = req.body;

      // Check for all required parameters.
      if (!name) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'location',
            'name',
          ),
        });
        return;
      }

      // Create query.
      const query = {
        name,
        officiallyNamed,
        altNames,
        outdoors,
        image,
        country,
        state,
        locale,
        color,
        hrefs,
        updated: Date.now(),
        submitted: req.user,
        activities,
        private: isPrivate,
        privateName,
        privateLocation,
        media,
      } as Location;

      const id = await AbstractHandler._database.locations.insert(query);

      res.status(201).send({
        location: {
          id,
          ...query,
        },
      });
    } catch (error) {
      Monitor.log(
        CreateLocationHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
