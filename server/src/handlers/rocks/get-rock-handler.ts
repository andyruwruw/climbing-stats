// Local Imports
import {
  MESSAGE_HANDLER_ITEM_NOT_FOUND,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
} from '../../config/messages';
import {
  AUTHORIZATION_TYPE,
  REQUEST_TYPE,
  ROCK_TYPES,
} from '../../config';
import { AbstractHandler } from '../abstract-handler';
import { Monitor } from '../../helpers/monitor';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';

/**
 * Retrieve a rock.
 */
export class GetRockHandler extends AbstractHandler {
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
            'rock',
            'ID',
          ),
        });
        return;
      }

      // Retrieve the rock.
      const rock = await AbstractHandler._database.rocks.findById(id);

      if (!rock) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
            'rock',
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
      } else if (rock.submitted !== req.user) {
        const user = await AbstractHandler._database.users.findById(req.user);

        if (user.admin) {
          authenticated = true;
        } else {
          authenticated = false;
        }
      }

      // Privacy settings.
      if (rock.private && !authenticated) {
        rock.location = '';
        rock.area = '';
        rock.name = `Private ${rock.type === ROCK_TYPES.WALL ? 'Wall' : 'Boulder'}`;
        rock.officiallyNamed = false,
        rock.altNames = [];
        rock.activities = [];
        rock.image = '';
        rock.hrefs = {};
        rock.media = [];
      }
      if (rock.privateName && !authenticated) {
        rock.name = `Private ${rock.type === ROCK_TYPES.WALL ? 'Wall' : 'Boulder'}`;
        rock.officiallyNamed = false,
        rock.altNames = [];
      }
      if (rock.privateLocation && !authenticated && rock.hrefs) {
        if ('address' in rock.hrefs) {
          delete rock.hrefs.address;
        }
        if ('googleMaps' in rock.hrefs) {
          delete rock.hrefs.googleMaps;
        }
        if ('coordinates' in rock.hrefs) {
          delete rock.hrefs.coordinates;
        }
        if ('appleMaps' in rock.hrefs) {
          delete rock.hrefs.appleMaps;
        }
      }

      res.status(200).send({
        rock,
      });
    } catch (error) {
      Monitor.log(
        GetRockHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
