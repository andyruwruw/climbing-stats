// Local Imports
import {
  AUTHORIZATION_TYPE,
  PAGE_SIZE,
  REQUEST_TYPE,
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
 * Retrieve a set of areas.
 */
export class GetAreasHandler extends AbstractHandler {
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

      // Retrieve the areas.
      const areas = await AbstractHandler._database.areas.find(
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

      for (let i = 0; i < areas.length; i += 1) {
        const area = {...areas[i]};

        // Authenticate the session.
        let authenticated = (req.user && area.submitted === req.user) || isAdmin;

        if (area.private && !authenticated) {
          continue;
        }
        if (area.privateName && !authenticated) {
          if (search) {
            continue;
          }
          
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

        final.push(area);
      }

      res.status(200).send({
        areas: final,
      });
    } catch (error) {
      Monitor.log(
        GetAreasHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
