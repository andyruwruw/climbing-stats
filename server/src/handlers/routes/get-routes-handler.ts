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
 * Retrieve a set of routes.
 */
export class GetRoutesHandler extends AbstractHandler {
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
        rock = '',
        type = '',
        grade = '',
        danger = '',
        user = '',
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
      if (rock) {
        query.rock = rock;
      }
      if (type) {
        query.type = type;
      }
      if (user) {
        query.submitted = user;
      }
      if (isPrivate !== '' && isPrivate === 'true') {
        query.private = isPrivate === 'true';
        query.submitted = req.user;
      }

      // Retrieve the routes.
      const routes = await AbstractHandler._database.routes.find(
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

      for (let i = 0; i < routes.length; i += 1) {
        const route = {...routes[i]};

        // Authenticate the session.
        let authenticated = (req.user && route.submitted === req.user) || isAdmin;

        if (route.private && !authenticated) {
          continue;
        }
        if (route.privateName && !authenticated) {
          if (search) {
            continue;
          }

          route.name = 'Private Route';
          route.officiallyNamed = false,
          route.altNames = [];
        }
        if (route.privateLocation && !authenticated && route.hrefs) {
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

        final.push(route);
      }

      res.status(200).send({
        rocks: final,
      });
    } catch (error) {
      Monitor.log(
        GetRoutesHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
