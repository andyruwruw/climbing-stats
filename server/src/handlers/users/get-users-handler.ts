// Local Imports
import {
  MESSAGE_INTERNAL_SERVER_ERROR,
} from '../../config/messages';
import {
  AUTHORIZATION_TYPE,
  PAGE_SIZE,
  PROFILE_PRIVACY,
  REQUEST_TYPE,
} from '../../config';
import { sanitizeNumber } from '../../helpers/sanitize';
import { AbstractHandler } from '../abstract-handler';
import { cleanUser } from '../../helpers/authorization';
import { Monitor } from '../../helpers/monitor';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';
import { QueryConditions } from '../../types/database';

/**
 * Fetches a list of current users.
 * 
 * Admin privilages needed.
 */
export class GetUsersHandler extends AbstractHandler {
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
      // Parse query.
      const {
        offset = '0',
        limit = '',
      } = req.query || {};

      const query = { profilePrivacy: PROFILE_PRIVACY.PUBLIC } as QueryConditions;

      const users = await AbstractHandler._database.users.find(
        query,
        undefined,
        undefined,
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

      res.status(200).send({ users: users.map((user) => (cleanUser(user))) });
    } catch (error) {
      Monitor.log(
        GetUsersHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({ error: MESSAGE_INTERNAL_SERVER_ERROR });
    }
  }
}
