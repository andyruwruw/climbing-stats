// Local Imports
import {
  ATTEMPT_STATUS,
  AUTHORIZATION_TYPE,
  CHART_INTERVAL,
  CHART_INTERVAL_LENGTH,
  REQUEST_TYPE,
} from '../../config';
import {
  getGradeAtSimpleIndex,
  gradeToSimplifiedDifficultyIndex,
  parseGrade,
  simplifyGrade,
} from '../../helpers/grades';
import { MESSAGE_INTERNAL_SERVER_ERROR } from '../../config/messages';
import { AbstractHandler } from '../abstract-handler';
import { convertGrade } from '../../helpers/sanitize';
import { Monitor } from '../../helpers/monitor';

// Types
import {
  ChartInterval,
  ServerRequest,
  ServerResponse,
} from '../../types';
import {
  GradingSystem,
  Route,
} from '../../types/climbs';
import { QueryConditions } from '../../types/database';
import { Tick } from '../../types/attempts';

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
      const {
        user = '',
        interval = 'all',
        start = '-1',
        activity = '',
        location = '',
        gradingSystem = '',
      } = req.query || {};

      // Construct database query.
      const query = {} as QueryConditions;
      if (user) {
        query.user = user;
      } else if (req.user) {
        query.user = req.user;
      } else {
        res.status(200).send({
          pyramid: [],
        });
      }
      if (activity.length) {
        if (`${activity}`.includes(',')) {
          query.type = {
            $in: `${activity}`.split(','),
          };
        } else {
          
        query.type = activity;
        }
      }

      let date = -1;

      if (start && !isNaN(parseInt(start as string, 10))) {
        date = parseInt(
          start as string,
          10,
        );

        query.date = {
          $gte: parseInt(
            start as string,
            10,
          ),
        };

        if (interval
          && Object.values(CHART_INTERVAL).includes(`${interval}` as ChartInterval)
          && interval !== CHART_INTERVAL.ALL) {
          query.date.$lte = date + CHART_INTERVAL_LENGTH[interval as ChartInterval];
        }
      }

      const isAdmin = req.user && (await AbstractHandler._database.users.findById(req.user)).admin;

      if ((!req.user || query.user !== req.user) && !isAdmin) {
        const owner = await AbstractHandler._database.users.findById(query.user);

        if (!owner || owner.profilePrivacy) {
          res.status(200).send({
            pyramid: [],
          });
        }
      }

      // Retrieve the sessions.
      let ticks = await AbstractHandler._database.ticks.find(
        query,
        {},
        {
          date: -1,
        },
      );

      if (location.length) {
        const tickRoutes = ticks.map((tick: Tick): string => (tick.route));

        const filteredRoutes = await AbstractHandler._database.routes.find({
          id: {
            $in: tickRoutes,
          },
          location,
        });

        const filteredRouteIds = filteredRoutes.map((route: Route): string => (route.id));

        ticks = ticks.filter((tick: Tick): boolean => (filteredRouteIds.includes(tick.route)));
      }

      const pyramid = [];

      for (let i = 0; i < ticks.length; i += 1) {
        const tick = ticks[i];

        if (![
          ATTEMPT_STATUS.ATTEMPT,
          ATTEMPT_STATUS.HUNG,
          ATTEMPT_STATUS.FLASH,
          ATTEMPT_STATUS.SEND,
          ATTEMPT_STATUS.DAY_FLASH,
          ATTEMPT_STATUS.ONSIGHT
        ].includes(tick.status)) {
          continue;
        }

        const grade = simplifyGrade(
          convertGrade(
            parseGrade(tick.grade),
            `${gradingSystem}` as GradingSystem,
          ),
          `${gradingSystem}` as GradingSystem,
        );

        const index = gradeToSimplifiedDifficultyIndex(grade);

        while (pyramid.length < index + 1) {
          pyramid.push({
            grade: getGradeAtSimpleIndex(pyramid.length),
            activities: {},
          });
        }

        if (!(tick.type in pyramid[i].activities)) {
          pyramid[i].activities[tick.type] = {
            attempt: 0,
            hung: 0,
            flash: 0,
            send: 0,
            dayFlash: 0,
            onsight: 0,
          };
        }

        pyramid[i].activities[tick.type][tick.status] += 1;
      }

      res.status(200).send({
        pyramid,
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
