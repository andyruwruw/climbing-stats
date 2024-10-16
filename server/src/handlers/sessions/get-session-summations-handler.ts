// Local Imports
import {
  AUTHORIZATION_TYPE,
  MILLISECONDS_IN_DAY,
  MILLISECONDS_IN_HOUR,
  REQUEST_TYPE,
} from '../../config';
import { MESSAGE_INTERNAL_SERVER_ERROR } from '../../config/messages';
import { AbstractHandler } from '../abstract-handler';
import { Monitor } from '../../helpers/monitor';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';
import { QueryConditions } from '../../types/database';

/**
 * Retrieve information on a user's sessions.
 */
export class GetSessionSummationsHandler extends AbstractHandler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.GET,
      '/summations',
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
      const { user = '' } = req.query || {};

      // Construct database query.
      const query = {} as QueryConditions;
      if (user) {
        query.user = user;
      } else if (req.user) {
        query.user = req.user;
      } else {
        res.status(200).send({
          summations: {},
        });
      }

      const isAdmin = req.user && (await AbstractHandler._database.users.findById(req.user)).admin;

      if ((!req.user || query.user !== req.user) && !isAdmin) {
        const owner = await AbstractHandler._database.users.findById(query.user);

        if (!owner || owner.profilePrivacy) {
          res.status(200).send({
            summations: {},
          });
        }
      }

      // Retrieve the sessions.
      const sessions = await AbstractHandler._database.sessions.find(
        query,
        {},
        {
          start: -1,
        },
      );

      let oldest = null;
      let hours = 0;

      let outdoorHours = 0;
      let outdoorSessions = 0;

      const dates = [];

      for (let i = 0; i < sessions.length; i += 1) {
        const session = sessions[i];

        dates.push(Math.floor(session.date / MILLISECONDS_IN_DAY));

        if (!oldest || session.date < oldest.date) {
          oldest = session;
        }

        hours += session.duration;
        
        if (session.outdoors) {
          outdoorHours += session.duration;
          outdoorSessions += 1;
        }
      }

      const days = Math.floor((Date.now() - oldest.date) / MILLISECONDS_IN_DAY);

      dates.sort();
      let last = null as null | number;
      let longestRest = 0;

      for (let i = 0; i < dates.length; i += 1) {
        if (last !== null && dates[i] - last > longestRest) {
          longestRest = dates[i] - last;
        }

        last = dates[i];
      }

      res.status(200).send({
        summations: {
          sessions: sessions.length,
          start: oldest.date,
          startSession: oldest.id,
          days,
          hours: hours / MILLISECONDS_IN_HOUR,
          hoursPerDay: hours / days / MILLISECONDS_IN_HOUR,
          longestRest,
          indoorHours: (hours - outdoorHours) / MILLISECONDS_IN_HOUR,
          indoorSessions: sessions.length - outdoorSessions,
          outdoorHours: outdoorHours / MILLISECONDS_IN_HOUR,
          outdoorSessions,
          indoorPerOutdoor: (hours - outdoorHours) / outdoorHours,
        },
      });
    } catch (error) {
      Monitor.log(
        GetSessionSummationsHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
