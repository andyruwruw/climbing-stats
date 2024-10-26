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
  Dictionary,
  ServerRequest,
  ServerResponse,
} from '../../types';
import {
  QueryConditions,
  TextQuery,
} from '../../types/database';
import { User } from '../../types/users';

/**
 * Retrieve a set of sessions.
 */
export class GetSessionsHandler extends AbstractHandler {
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
        outdoors = '',
        before = '',
        after = '',
        minDuration = '',
        maxDuration = '',
        activity = '',
        partner = '',
        carpool = '',
        user = '',
      } = req.query || {};

      // Construct database query.
      const query = {} as QueryConditions;

      if (ids) {
        query.id = { $in: `${ids}`.split(',') };
      }
      if (search && !user && req.user) {
        query.description = { $search: `${search}` } as TextQuery;
        query.user = req.user;
      }
      if (location) {
        query.location = location;
      }
      if (area) {
        query.areas = area;
      }
      if (outdoors) {
        query.outdoors = outdoors === 'true';
      }
      if (before && !isNaN(parseInt(before as string, 10))) {
        query.start = {
          $lte: parseInt(
            before as string,
            10,
          ),
        };
      }
      if (after && !isNaN(parseInt(after as string, 10))) {
        query.start = {
          $gte: parseInt(
            after as string,
            10,
          ),
        };
      }
      if (minDuration && !isNaN(parseInt(minDuration as string, 10))) {
        query.duration = {
          $gte: parseInt(
            minDuration as string,
            10,
          ),
        }
      }
      if (maxDuration && !isNaN(parseInt(maxDuration as string, 10))) {
        if (query.duration) {
          query.duration.$lt = parseInt(
            maxDuration as string,
            10,
          );
        } else {
          query.duration = {
            $lte: parseInt(
              maxDuration as string,
              10,
            ),
          }
        }
      }
      if (activity) {
        query.activities = activity;
      }
      if (partner) {
        query.partners = partner;
      }
      if (carpool) {
        query.carpool = carpool;
      }
      if (user) {
        query.user = user;
      }

      const isAdmin = req.user && (await AbstractHandler._database.users.findById(req.user)).admin;

      if ((!req.user || query.user !== req.user) && !isAdmin) {
        const owner = await AbstractHandler._database.users.findById(query.user);

        if (!owner || owner.sessionsPrivacy) {
          res.status(200).send({
            sessions: [],
          });
        }
      }

      // Retrieve the sessions.
      const sessions = await AbstractHandler._database.sessions.find(
        query,
        {},
        {
          date: -1,
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

      const final = [];
      const owners = {} as Dictionary<User>;

      for (let i = 0; i < sessions.length; i += 1) {
        const session = {...sessions[i]};

        // Authenticate the session.
        const authenticated = (req.user && session.user === req.user) || isAdmin;

        if (!authenticated) {
          let owner;

          if (session.user in owners) {
            owner = owners[session.user];
          } else {
            owner = await AbstractHandler._database.users.findById(session.user);
            owners[session.user] = owner;
          }

          if (owner.sessionsPrivacy) {
            continue;
          }

          session.description = '';
          session.carpool = [];
          session.drive = -1;

          if (!owner || owner.partnersPrivacy) {
            session.partners = [];
          }

          if (!owner || owner.ticksPrivacy) {
            session.sent = [];
          }
        }

        final.push(session);
      }

      res.status(200).send({
        sessions: final,
      });
    } catch (error) {
      Monitor.log(
        GetSessionsHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
