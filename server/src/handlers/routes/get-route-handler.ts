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
 * Retrieve a route.
 */
export class GetRouteHandler extends AbstractHandler {
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
            'route',
            'ID',
          ),
        });
        return;
      }

      // Retrieve the route.
      const route = await AbstractHandler._database.routes.findById(id);

      if (!route) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
            'route',
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
      } else if (route.submitted !== req.user) {
        const user = await AbstractHandler._database.users.findById(req.user);

        if (user.admin) {
          authenticated = true;
        } else {
          authenticated = false;
        }
      }

      // Privacy settings.
      if (route.private && !authenticated) {
        route.location = '';
        route.area = '';
        route.rock = '';
        route.name = 'Private Route';
        route.officiallyNamed = false,
        route.altNames = [];
        route.image = '';
        route.hrefs = {};
        route.media = [];
      } else if (route.privateName && !authenticated) {
        route.name = 'Private Route';
        route.officiallyNamed = false,
        route.altNames = [];
      } else if (route.privateLocation && !authenticated) {
        if ('address' in route.hrefs) {
          delete route.hrefs.address;
        }
        if ('googleMaps' in route.hrefs) {
          delete route.hrefs.googleMaps;
        }
        if ('coordinates' in route.hrefs) {
          delete route.hrefs.coordinates;
        }
        if ('appleMaps' in route.hrefs) {
          delete route.hrefs.appleMaps;
        }
      }

      res.status(200).send({
        route,
      });
    } catch (error) {
      Monitor.log(
        GetRouteHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
