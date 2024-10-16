// Local Imports
import {
  ATTEMPT_STATUS,
  AUTHORIZATION_TYPE,
  CLIMBING_ACTIVITY,
  REQUEST_TYPE,
} from '../../config';
import { MESSAGE_INTERNAL_SERVER_ERROR } from '../../config/messages';
import { gradeToDifficultyIndex } from '../../helpers/sanitize';
import { AbstractHandler } from '../abstract-handler';
import { Monitor } from '../../helpers/monitor';

// Types
import {
  Dictionary,
  ServerRequest,
  ServerResponse,
} from '../../types';
import { QueryConditions } from '../../types/database';
import { SessionCounter } from '../../types/sessions';
import { RouteMaxTracker } from '../../types/attempts';
import { ClimbingGrade, Route } from '../../types/climbs';

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

      let bouldersSent = 0;
      const maxBoulders = [] as RouteMaxTracker[];
      const maxBoulderFlashes = [] as RouteMaxTracker[];

      let sportsSent = 0;
      const maxSport = [] as RouteMaxTracker[];
      const maxSportFlashes = [] as RouteMaxTracker[];

      let tradsSent = 0;
      const maxTrad = [] as RouteMaxTracker[];
      const maxTradFlashes = [] as RouteMaxTracker[];

      let TRsSent = 0;
      const maxTRs = [] as RouteMaxTracker[];
      const maxTRsFlashes = [] as RouteMaxTracker[];

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

        // Depending on what type.
        if ((route as Route).type === CLIMBING_ACTIVITY.BOULDER) {
          totalBoulders += 1;

          if (tick.sent) {
            bouldersSent += 1;

            if (maxBoulders.length < 10) {
              maxBoulders.push({
                id: routeId,
                grade: tick.grade,
              });
            } else if (gradeToDifficultyIndex(maxBoulders[maxBoulders.length - 1].grade) < gradeToDifficultyIndex(tick.grade)) {
              maxBoulders.pop();
              maxBoulders.push({
                id: routeId,
                grade: tick.grade,
              });
              maxBoulders.sort((
                a: RouteMaxTracker,
                b: RouteMaxTracker,
              ) => (gradeToDifficultyIndex(b.grade) - gradeToDifficultyIndex(a.grade)));
            }

            if ([
              ATTEMPT_STATUS.FLASH,
              ATTEMPT_STATUS.ONSIGHT,
            ].includes(tick.status)) {
              if (maxBoulderFlashes.length < 10) {
                maxBoulderFlashes.push({
                  id: routeId,
                  grade: tick.grade,
                });
              } else if (gradeToDifficultyIndex(maxBoulderFlashes[maxBoulderFlashes.length - 1].grade) < gradeToDifficultyIndex(tick.grade)) {
                maxBoulderFlashes.pop();
                maxBoulderFlashes.push({
                  id: routeId,
                  grade: tick.grade,
                });
                maxBoulderFlashes.sort((
                  a: RouteMaxTracker,
                  b: RouteMaxTracker,
                ) => (gradeToDifficultyIndex(b.grade) - gradeToDifficultyIndex(a.grade)));
              }
            }
          }
        } else if ((route as Route).type === CLIMBING_ACTIVITY.SPORT) {
          if (tick.sent) {
            sportsSent += 1;

            if (maxSport.length < 10) {
              maxSport.push({
                id: routeId,
                grade: tick.grade,
              });
            } else if (gradeToDifficultyIndex(maxSport[maxSport.length - 1].grade) < gradeToDifficultyIndex(tick.grade)) {
              maxSport.pop();
              maxSport.push({
                id: routeId,
                grade: tick.grade,
              });
              maxSport.sort((
                a: RouteMaxTracker,
                b: RouteMaxTracker,
              ) => (gradeToDifficultyIndex(b.grade) - gradeToDifficultyIndex(a.grade)));
            }

            if ([
              ATTEMPT_STATUS.FLASH,
              ATTEMPT_STATUS.ONSIGHT,
            ].includes(tick.status)) {
              if (maxSportFlashes.length < 10) {
                maxSportFlashes.push({
                  id: routeId,
                  grade: tick.grade,
                });
              } else if (gradeToDifficultyIndex(maxSportFlashes[maxSportFlashes.length - 1].grade) < gradeToDifficultyIndex(tick.grade)) {
                maxSportFlashes.pop();
                maxSportFlashes.push({
                  id: routeId,
                  grade: tick.grade,
                });
                maxSportFlashes.sort((
                  a: RouteMaxTracker,
                  b: RouteMaxTracker,
                ) => (gradeToDifficultyIndex(b.grade) - gradeToDifficultyIndex(a.grade)));
              }
            }
          }
        } else if ((route as Route).type === CLIMBING_ACTIVITY.TRADITIONAL
          || (route as Route).type === CLIMBING_ACTIVITY.ALPINE) {
          if (tick.sent) {
            tradsSent += 1;

            if (maxTrad.length < 10) {
              maxTrad.push({
                id: routeId,
                grade: tick.grade,
              });
            } else if (gradeToDifficultyIndex(maxTrad[maxTrad.length - 1].grade) < gradeToDifficultyIndex(tick.grade)) {
              maxTrad.pop();
              maxTrad.push({
                id: routeId,
                grade: tick.grade,
              });
              maxTrad.sort((
                a: RouteMaxTracker,
                b: RouteMaxTracker,
              ) => (gradeToDifficultyIndex(b.grade) - gradeToDifficultyIndex(a.grade)));
            }

            if ([
              ATTEMPT_STATUS.FLASH,
              ATTEMPT_STATUS.ONSIGHT,
            ].includes(tick.status)) {
              if (maxTradFlashes.length < 10) {
                maxTradFlashes.push({
                  id: routeId,
                  grade: tick.grade,
                });
              } else if (gradeToDifficultyIndex(maxTradFlashes[maxTradFlashes.length - 1].grade) < gradeToDifficultyIndex(tick.grade)) {
                maxTradFlashes.pop();
                maxTradFlashes.push({
                  id: routeId,
                  grade: tick.grade,
                });
                maxTradFlashes.sort((
                  a: RouteMaxTracker,
                  b: RouteMaxTracker,
                ) => (gradeToDifficultyIndex(b.grade) - gradeToDifficultyIndex(a.grade)));
              }
            }
          }
        } else if ((route as Route).type === CLIMBING_ACTIVITY.TOP_ROPE
          || (route as Route).type === CLIMBING_ACTIVITY.followed) {
          if (tick.sent) {
            TRsSent += 1;

            if (maxTRs.length < 10) {
              maxTRs.push({
                id: routeId,
                grade: tick.grade,
              });
            } else if (gradeToDifficultyIndex(maxTRs[maxTRs.length - 1].grade) < gradeToDifficultyIndex(tick.grade)) {
              maxTRs.pop();
              maxTRs.push({
                id: routeId,
                grade: tick.grade,
              });
              maxTRs.sort((
                a: RouteMaxTracker,
                b: RouteMaxTracker,
              ) => (gradeToDifficultyIndex(b.grade) - gradeToDifficultyIndex(a.grade)));
            }

            if ([
              ATTEMPT_STATUS.FLASH,
              ATTEMPT_STATUS.ONSIGHT,
            ].includes(tick.status)) {
              if (maxTRsFlashes.length < 10) {
                maxTRsFlashes.push({
                  id: routeId,
                  grade: tick.grade,
                });
              } else if (gradeToDifficultyIndex(maxTRsFlashes[maxTRsFlashes.length - 1].grade) < gradeToDifficultyIndex(tick.grade)) {
                maxTRsFlashes.pop();
                maxTRsFlashes.push({
                  id: routeId,
                  grade: tick.grade,
                });
                maxTRsFlashes.sort((
                  a: RouteMaxTracker,
                  b: RouteMaxTracker,
                ) => (gradeToDifficultyIndex(b.grade) - gradeToDifficultyIndex(a.grade)));
              }
            }
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

      const routeIds = Object.keys(routes);

      const longestBoulderProjects = [];
      const longestRouteProjects = [];

      // Find top 10 longest projects.
      for (let i = 0; i < routeIds.length; i += 1) {
        const routeId = routeIds[i];

        if (routes[routeId].type === CLIMBING_ACTIVITY.BOULDER) {
          if (longestBoulderProjects.length < 10) {
            longestBoulderProjects.push(routeSessions[routeId]);
            continue;
          } else if (longestBoulderProjects[longestBoulderProjects.length - 1].total < routeSessions[routeId].total) {
            longestBoulderProjects.pop();
            longestBoulderProjects.push(routeSessions[routeId]);
            longestBoulderProjects.sort((
              a: SessionCounter,
              b: SessionCounter,
            ) => (b.total - a.total));
          }
        } else {
          if (longestRouteProjects.length < 10) {
            longestRouteProjects.push(routeSessions[routeId]);
            continue;
          } else if (longestRouteProjects[longestRouteProjects.length - 1].total < routeSessions[routeId].total) {
            longestRouteProjects.pop();
            longestRouteProjects.push(routeSessions[routeId]);
            longestRouteProjects.sort((
              a: SessionCounter,
              b: SessionCounter,
            ) => (b.total - a.total));
          }
        }
      }

      console.log(longestBoulderProjects);

      res.status(200).send({
        summations: {
          uniqueClimbs,
          totalClimbs,
          uniqueBoulder,
          totalBoulders,
          uniqueRoutes: uniqueClimbs - uniqueBoulder,
          totalRoutes: totalClimbs - totalBoulders,
          bouldersSent,
          maxBoulders: maxBoulders.map((tick: RouteMaxTracker) => ({
            ...tick,
            route: routes[tick.id],
          })),
          maxBoulderFlashes: maxBoulderFlashes.map((tick: RouteMaxTracker) => ({
            ...tick,
            route: routes[tick.id],
          })),
          sportsSent,
          maxSport: maxSport.map((tick: RouteMaxTracker) => ({
            ...tick,
            route: routes[tick.id],
          })),
          maxSportFlashes: maxSportFlashes.map((tick: RouteMaxTracker) => ({
            ...tick,
            route: routes[tick.id],
          })),
          tradsSent,
          maxTrad: maxTrad.map((tick: RouteMaxTracker) => ({
            ...tick,
            route: routes[tick.id],
          })),
          maxTradFlashes: maxTradFlashes.map((tick: RouteMaxTracker) => ({
            ...tick,
            route: routes[tick.id],
          })),
          TRsSent,
          maxTRs: maxTRs.map((tick: RouteMaxTracker) => ({
            ...tick,
            route: routes[tick.id],
          })),
          maxTRsFlashes: maxTRsFlashes.map((tick: RouteMaxTracker) => ({
            ...tick,
            route: routes[tick.id],
          })),
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
