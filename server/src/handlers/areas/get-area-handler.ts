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
 * Retrieve an area.
 */
export class GetAreaHandler extends AbstractHandler {
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
            'area',
            'ID',
          ),
        });
        return;
      }

      // Retrieve the area.
      const area = await AbstractHandler._database.areas.findById(id);

      if (!area) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
            'area',
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
      } else if (area.submitted !== req.user) {
        const user = await AbstractHandler._database.users.findById(req.user);

        if (user.admin) {
          authenticated = true;
        } else {
          authenticated = false;
        }
      }

      // Privacy settings.
      if (area.private && !authenticated) {
        area.location = '';
        area.name = 'Private Area';
        area.officiallyNamed = false,
        area.altNames = [];
        area.image = '';
        area.hrefs = {};
        area.activities = [];
        area.media = [];
      }
      if (area.privateName && !authenticated) {
        area.name = 'Private Area';
        area.officiallyNamed = false,
        area.altNames = [];
      }
      if (area.privateLocation && !authenticated && area.hrefs) {
        if ('address' in area.hrefs) {
          delete area.hrefs.address;
        }
        if ('googleMaps' in area.hrefs) {
          delete area.hrefs.googleMaps;
        }
        if ('coordinates' in area.hrefs) {
          delete area.hrefs.coordinates;
        }
        if ('appleMaps' in area.hrefs) {
          delete area.hrefs.appleMaps;
        }
      }

      res.status(200).send({
        area,
      });
    } catch (error) {
      Monitor.log(
        GetAreaHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
