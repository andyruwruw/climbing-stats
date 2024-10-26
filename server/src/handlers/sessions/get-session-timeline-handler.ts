// Local Imports
import {
  AUTHORIZATION_TYPE,
  CHART_INTERVAL,
  CHART_INTERVAL_LENGTH,
  CHART_PERIOD,
  REQUEST_TYPE,
} from '../../config';
import {
  addSessionToLocationTimeline,
  addSessionToPartnerTimeline,
  addSessionToTimeline,
} from '../../helpers/timeline';
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
} from '../../config/messages';
import { AbstractHandler } from '../abstract-handler';
import { filterUnique } from '../../helpers';
import { Monitor } from '../../helpers/monitor';

// Types
import {
  ChartInterval,
  ChartPeriod,
  Dictionary,
  ServerRequest,
  ServerResponse,
} from '../../types';
import { QueryConditions } from '../../types/database';

/**
 * Retrieve a timeline of user's sessions.
 */
export class GetSessionTimelineHandler extends AbstractHandler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.GET,
      '/timeline',
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
        period = CHART_PERIOD.FEW_DAYS,
        outdoors = '',
        activity = '',
        partner = '',
        byPartner = 'false',
        byLocation = 'false',
      } = req.query || {};

      // Construct database query.
      const query = {} as QueryConditions;
      if (user) {
        query.user = user;
      } else if (req.user) {
        query.user = req.user;
      } else {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'user',
            'ID',
          ),
        });
        return;
      }
      if (outdoors.length) {
        query.outdoors = outdoors === 'true';
      }
      if (activity.length) {
        query.activities = activity;
      }
      if (partner.length) {
        query.partners = partner;
      }

      let date = -1;

      if (start && !isNaN(parseInt(start as string, 10))) {
        date = parseInt(
          start as string,
          10,
        );

        query.start = {
          $gte: parseInt(
            start as string,
            10,
          ),
        };

        if (interval
          && Object.values(CHART_INTERVAL).includes(`${interval}` as ChartInterval)
          && interval !== CHART_INTERVAL.ALL) {
          query.end = {
            $lte: date + CHART_INTERVAL_LENGTH[interval as ChartInterval],
          };
        }
      }

      const isAdmin = req.user && (await AbstractHandler._database.users.findById(req.user)).admin;

      if ((!req.user || query.user !== req.user) && !isAdmin) {
        const owner = await AbstractHandler._database.users.findById(query.user);

        if (!owner || owner.sessionsPrivacy) {
          res.status(200).send({
            timeline: [],
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
      );

      let earliest = Date.now();

      for (let i = 0; i < sessions.length; i += 1) {
        if (sessions[i].date < earliest) {
          earliest = sessions[i].date;
        }
      }

      const timeline = [];
      const parsedPeriod = Object.values(CHART_PERIOD).includes(`${period}` as ChartPeriod) ? `${period}` as ChartPeriod : CHART_PERIOD.FEW_DAYS;
      const map = {} as Dictionary<boolean>;

      for (let i = 0; i < sessions.length; i += 1) {
        const session = sessions[i];

        if (byPartner && `${byPartner}` === 'true') {
          addSessionToPartnerTimeline(
            timeline,
            earliest,
            parsedPeriod,
            session,
            map,
          );
        } else if (byLocation && `${byLocation}` === 'true') {
          addSessionToLocationTimeline(
            timeline,
            earliest,
            parsedPeriod,
            session,
            map,
          );
        } else {
          addSessionToTimeline(
            timeline,
            earliest,
            parsedPeriod,
            session,
          );
        }
      }

      const response = {
        start: earliest,
        period: parsedPeriod,
        interval,
        timeline,
      } as Dictionary<any>;

      if (byPartner && `${byPartner}` === 'true') {
        const partnerIds = filterUnique(Object.keys(map));

        const partners = await AbstractHandler._database.climbingPartners.find({
          id: {
            $in: partnerIds,
          },
        });

        const partnerMap = {};

        for (let i = 0; i < partners.length; i += 1) {
          if (!(partners[i].id in partnerMap)) {
            partnerMap[partners[i].id] = partners[i];
          }
        }

        response.partners = partnerMap;
      } else if (byLocation && `${byLocation}` === 'true') {
        const locationIds = filterUnique(Object.keys(map));

        const locations = await AbstractHandler._database.locations.find({
          id: {
            $in: locationIds,
          },
        });

        const locationMap = {};

        for (let i = 0; i < locations.length; i += 1) {
          if (!(locations[i].id in locationMap)) {
            locationMap[locations[i].id] = locations[i];
          }
        }

        response.locations = locationMap;
      }

      res.status(200).send(response);
    } catch (error) {
      Monitor.log(
        GetSessionTimelineHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
      return;
    }
  }
}
