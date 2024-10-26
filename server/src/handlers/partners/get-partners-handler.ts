// Local Imports
import {
  AUTHORIZATION_TYPE,
  PAGE_SIZE,
  REQUEST_TYPE,
} from '../../config';
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
} from '../../config/messages';
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
 * Retrieve a set of partners.
 */
export class GetPartnersHandler extends AbstractHandler {
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
        user,
        search = '',
        offset = '0',
        limit = '',
      } = req.query || {};

      // Check for all required parameters.
      if (!user) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'partner',
            'user',
          ),
        });
        return;
      }

      const owner = await AbstractHandler._database.users.findById(`${user}`);
      const isAdmin = (await AbstractHandler._database.users.findById(req.user)).admin;

      if ((!req.user
        || req.user !== user)
        && owner.partnersPrivacy
        && !isAdmin) {
        res.status(200).send({
          partners: [],
        });
      }

      // Construct database query.
      const query = {} as QueryConditions;

      if (search) {
        query.name = { $search: `${search}` } as TextQuery;
      }
      if (user) {
        query.submitted = user;
      }

      // Retrieve the partners.
      const partners = await AbstractHandler._database.climbingPartners.find(
        query,
        {},
        {
          hours: -1,
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

      for (let i = 0; i < partners.length; i += 1) {
        const partner = {
          ...partners[i],
          last: partners[i].last.length ? partners[i].last[0].toUpperCase() : '?',
        };

        if (((!req.user
          || req.user !== user)
          && !isAdmin)
          && partner.hide) {
          continue;
        }

        final.push(partner);
      }

      res.status(200).send({
        partners: final,
      });
    } catch (error) {
      Monitor.log(
        GetPartnersHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
