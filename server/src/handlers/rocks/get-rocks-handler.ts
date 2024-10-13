// Local Imports
import {
  AUTHORIZATION_TYPE,
  PAGE_SIZE,
  REQUEST_TYPE,
  ROCK_TYPES,
} from '../../config';
import { MESSAGE_INTERNAL_SERVER_ERROR } from '../../config/messages';
import { AbstractHandler } from '../abstract-handler';
import { sanitizeNumber } from '../../helpers/sanitize';
import { Monitor } from '../../helpers/monitor';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';
import {
  QueryConditions,
  TextQuery,
} from '../../types/database';

/**
 * Retrieve a set of rocks.
 */
export class GetRocksHandler extends AbstractHandler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.GET,
      '/',
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
      // Parse request query.
      const {
        ids = '',
        search = '',
        offset = '0',
        limit = '',
        location = '',
        area = '',
        type = '',
        user = '',
        activity = '',
        isPrivate = '',
      } = req.query || {};

      // Construct database query.
      const query = {} as QueryConditions;

      if (ids) {
        query.id = { $in: `${ids}`.split(',') };
      }
      if (search) {
        query.name = { $search: `${search}` } as TextQuery;
      }
      if (location) {
        query.location = location;
      }
      if (area) {
        query.area = area;
      }
      if (type) {
        query.type = type;
      }
      if (user) {
        query.submitted = user;
      }
      if (activity) {
        query.activities = activity;
      }
      if (isPrivate !== '' && isPrivate === 'true') {
        query.private = isPrivate === 'true';
        query.submitted = req.user;
      }

      // Retrieve the rocks.
      const rocks = await AbstractHandler._database.rocks.find(
        query,
        {},
        {
          updated: -1,
        },
        sanitizeNumber(
          `${offset}`,
          0,
          undefined,
          0,
        ),
        sanitizeNumber(
          `${limit}`,
          PAGE_SIZE,
          PAGE_SIZE,
          1,
        ),
      );

      const isAdmin = (await AbstractHandler._database.users.findById(req.user)).admin;
      const final = [];

      for (let i = 0; i < rocks.length; i += 1) {
        const rock = {...rocks[i]};

        // Authenticate the session.
        let authenticated = (req.user && rock.submitted === req.user) || isAdmin;

        if (rock.private && !authenticated) {
          continue;
        }
        if (rock.privateName && !authenticated) {
          if (search) {
            continue;
          }
          
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

        final.push(rock);
      }

      res.status(200).send({
        rocks: final,
      });
    } catch (error) {
      Monitor.log(
        GetRocksHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
