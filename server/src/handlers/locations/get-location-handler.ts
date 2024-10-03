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

/**
 * Retrieve a location.
 */
export class GetLocationHandler extends AbstractHandler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.GET,
      '/:id',
      AUTHORIZATION_TYPE.OPTIONAL,
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
            'location',
            'ID',
          ),
        });
        return;
      }

      // Retrieve the location.
      const location = await AbstractHandler._database.locations.findById(id);

      if (!location) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
            'location',
            'ID',
            id,
          ),
        });
        return;
      }

      // Authenticate the session.
      let authenticated = true;

      if (!req.user) {
        authenticated = false;
      } else if (location.submitted !== req.user) {
        const user = await AbstractHandler._database.users.findById(req.user);

        if (user.admin) {
          authenticated = true;
        } else {
          authenticated = false;
        }
      }

      // Privacy settings.
      if (location.private && !authenticated) {
        location.name = 'Private Location';
        location.officiallyNamed = false,
        location.altNames = [];
        location.image = '';
        location.locale = '';
        location.hrefs = {};
        location.activities = [];
        location.media = [];
      } else if (location.privateName && !authenticated) {
        location.name = 'Private Location';
        location.officiallyNamed = false,
        location.altNames = [];
      } else if (location.privateLocation && !authenticated) {
        if ('address' in location.hrefs) {
          delete location.hrefs.address;
        }
        if ('googleMaps' in location.hrefs) {
          delete location.hrefs.googleMaps;
        }
        if ('coordinates' in location.hrefs) {
          delete location.hrefs.coordinates;
        }
        if ('appleMaps' in location.hrefs) {
          delete location.hrefs.appleMaps;
        }
      }

      res.status(200).send({
        location,
      });
    } catch (error) {
      Monitor.log(
        GetLocationHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
