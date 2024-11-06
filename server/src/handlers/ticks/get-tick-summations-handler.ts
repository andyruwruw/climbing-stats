// Local Imports
import {
  ATTEMPT_STATUS,
  AUTHORIZATION_TYPE,
  CLIMBING_ACTIVITY,
  REQUEST_TYPE,
} from '../../config';
import { MESSAGE_INTERNAL_SERVER_ERROR } from '../../config/messages';
import { gradeToDifficultyIndex } from '../../helpers/sanitize';
import { CLIMBING_GRADES } from '../../config/grades';
import { AbstractHandler } from '../abstract-handler';
import { Monitor } from '../../helpers/monitor';

// Types
import {
  Dictionary,
  ServerRequest,
  ServerResponse,
} from '../../types';
import {
  ClimbingActivities,
  ClimbingGrade,
  Route,
} from '../../types/climbs';
import { QueryConditions } from '../../types/database';
import { SessionCounter } from '../../types/sessions';
import { TickTracker } from '../../types/attempts';

/**
 * Retrieve information on a user's ticks.
 */
export class GetTickSummationsHandler extends AbstractHandler {
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
      const ticks = await AbstractHandler._database.ticks.find(
        query,
        {},
        {
          date: -1,
        },
      );

      let uniqueClimbs = 0;
      let totalClimbs = 0;
      let uniqueBoulder = 0;
      let totalBoulders = 0;

      const tickLists = {} as Record<ClimbingActivities, TickTracker[]>;
      const maxGrade = {} as Record<ClimbingActivities, ClimbingGrade>;
      const activities = Object.values(CLIMBING_ACTIVITY);

      for (let i = 0; i < activities.length; i += 1) {
        tickLists[activities[i]] = [];
        maxGrade[activities[i]] = '?';

        for (let j = 0; j < CLIMBING_GRADES.length; j += 1) {
          tickLists[activities[i]].push({
            grade: CLIMBING_GRADES[j],
            attempts: [],
            ticks: [],
            flashes: [],
            onsights: [],
          });
        }
      }

      const routes = {} as Dictionary<Route>;
      const routeSessions = {} as Dictionary<SessionCounter>;

      for (let i = 0; i < ticks.length; i += 1) {
        const tick = ticks[i];
        const routeId = tick.route;

        // If no unique identifier, skip.
        if (!routeId) {
          continue;
        }

        let route;

        // Get route details.
        if (routeId in routes) {
          route = routes[routeId];

          if ((route as Route).type === CLIMBING_ACTIVITY.BOULDER) {
            totalBoulders += 1;
          }
        } else {
          route = await AbstractHandler._database.routes.findById(routeId);
          routes[routeId] = route;

          if (route) {
            uniqueClimbs += 1;

            if ((route as Route).type === CLIMBING_ACTIVITY.BOULDER) {
              uniqueBoulder += 1;
            }
          }
        }

        // No route? No bother.
        if (!route) {
          continue;
        }

        totalClimbs += 1;

        const type = (route as Route).type;

        // Depending on what type.
        tickLists[type][gradeToDifficultyIndex(tick.grade)].attempts.push(tick.id);

        if (tick.sent) {
          if (tick.status === ATTEMPT_STATUS.FLASH
            && !(tickLists[type][gradeToDifficultyIndex(tick.grade)].flashes.includes(routeId))) {
            tickLists[type][gradeToDifficultyIndex(tick.grade)].flashes.push(routeId);
          } else if (tick.status === ATTEMPT_STATUS.ONSIGHT
            && !(tickLists[type][gradeToDifficultyIndex(tick.grade)].onsights.includes(routeId))) {
            tickLists[type][gradeToDifficultyIndex(tick.grade)].onsights.push(routeId);
          } else if (!(tickLists[type][gradeToDifficultyIndex(tick.grade)].ticks.includes(routeId))) {
            tickLists[type][gradeToDifficultyIndex(tick.grade)].ticks.push(routeId);
          }
        }

        // Track first and last sessions on routes.
        if (routeId in routeSessions) {
          if (routeSessions[routeId].first > tick.date) {
            routeSessions[routeId].first = tick.date;
          } else if (routeSessions[routeId].last < tick.date) {
            routeSessions[routeId].last = tick.date;
          }

          routeSessions[routeId][2] += 1;
        } else {
          routeSessions[routeId] = {
            id: routeId,
            first: tick.date,
            last: 0,
            total: 1,
          }
        }
      }

      res.status(200).send({
        summations: {
          uniqueClimbs,
          totalClimbs,
          uniqueBoulder,
          totalBoulders,
          uniqueRoutes: uniqueClimbs - uniqueBoulder,
          totalRoutes: totalClimbs - totalBoulders,
          tickLists,
          routeSessions,
        },
      });
    } catch (error) {
      Monitor.log(
        GetTickSummationsHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
