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
 * Retrieve a set of locations.
 */
export class GetLocationsHandler extends AbstractHandler {
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
        outdoors = '',
        user = '',
        country = '',
        state = '',
        locale = '',
        address = '',
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
      if (outdoors) {
        query.outdoors = outdoors === 'true';
      }
      if (user) {
        query.submitted = user;
      }
      if (country) {
        query.country = country;
      }
      if (state) {
        query.state = state;
      }
      if (locale) {
        query.locale = locale;
      }
      if (address) {
        query.address = address;
      }
      if (activity) {
        query.activities = activity;
      }
      if (isPrivate !== '' && isPrivate === 'true') {
        query.private = isPrivate === 'true';
        query.submitted = req.user;
      }

      // Retrieve the locations.
      const locations = await AbstractHandler._database.locations.find(
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

      for (let i = 0; i < locations.length; i += 1) {
        const location = {...locations[i]};

        // Authenticate the session.
        let authenticated = (req.user && location.submitted === req.user) || isAdmin;

        if (location.private && !authenticated) {
          continue;
        }
        if (location.privateName && !authenticated) {
          if (search) {
            continue;
          }
          
          location.name = 'Private Location';
          location.officiallyNamed = false,
          location.altNames = [];
        }
        if (location.privateLocation && !authenticated && location.hrefs) {
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

        final.push(location);
      }

      res.status(200).send({
        locations: final,
      });
    } catch (error) {
      Monitor.log(
        GetLocationsHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
