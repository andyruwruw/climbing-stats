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
import { QueryConditions } from '../../types/database';
import { User } from '../../types/users';

/**
 * Retrieve a set of ticks.
 */
export class GetTicksHandler extends AbstractHandler {
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
        route = '',
        status = '',
        sent = '',
        protection = '',
        date = '',
        feature = '',
        // grade = '',
        // search = '',
        offset = '0',
        limit = '',
        // location = '',
        // area = '',
        before = '',
        after = '',
        activity = '',
        user = '',
      } = req.query || {};

      // Construct database query.
      const query = {} as QueryConditions;

      if (ids) {
        query.id = { $in: `${ids}`.split(',') };
      }
      if (route) {
        query.route = route;
      }
      if (status) {
        query.status = status;
      }
      if (sent) {
        query.sent = (sent === 'true');
      }
      if (protection) {
        query.protection = protection;
      }
      if (date) {
        query.date = date;
      }
      if (feature) {
        query.feature = (feature === 'true');
      }
      if (before && !isNaN(parseInt(before as string, 10))) {
        query.date = {
          $lte: parseInt(
            before as string,
            10,
          ),
        };
      }
      if (after && !isNaN(parseInt(after as string, 10))) {
        query.date = {
          $gte: parseInt(
            after as string,
            10,
          ),
        };
      }
      if (activity) {
        query.activity = activity;
      }
      if (user) {
        query.user = user;
      }

      const isAdmin = req.user && (await AbstractHandler._database.users.findById(req.user)).admin;

      if ((!req.user || query.user !== req.user) && !isAdmin) {
        const owner = await AbstractHandler._database.users.findById(query.user);

        if (!owner || owner.ticksPrivacy) {
          res.status(200).send({
            sessions: [],
          });
        }
      }

      // Retrieve the ticks.
      const ticks = await AbstractHandler._database.ticks.find(
        query,
        {},
        {
          start: -1,
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

      for (let i = 0; i < ticks.length; i += 1) {
        const tick = {...ticks[i]};

        // Authenticate the session.
        const authenticated = (req.user && tick.user === req.user) || isAdmin;

        if (!authenticated) {
          let owner;

          if (tick.user in owners) {
            owner = owners[tick.user];
          } else {
            owner = await AbstractHandler._database.users.findById(tick.user);
            owners[tick.user] = owner;
          }

          if (owner.ticksPrivacy) {
            continue;
          }

          tick.description = '';
        }

        final.push(tick);
      }

      res.status(200).send({
        ticks: final,
      });
    } catch (error) {
      Monitor.log(
        GetTicksHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
