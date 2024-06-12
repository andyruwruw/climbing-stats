// Local Imports
import {
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_NO_PERMISSION,
} from '../../config/messages';
import { validate } from '../../helpers/authentication';
import { Monitor } from '../../helpers/monitor';
import { Handler } from '../handler';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';
import { ClimbingPartner } from '../../types/tables';

/**
 * Ends a user's session.
 */
export class GetClimbingPartnersHandler extends Handler {
  /**
   * Executes the handler.
   *
   * @param {ServerRequest} req Request for handler.
   * @param {ServerResponse} res Response to request.
   */
  async execute(
    req: ServerRequest,
    res: ServerResponse,
  ): Promise<void> {
    try {
      // Verify current user session.
      const userPromise = validate(
        req,
        Handler.database,
      );

      const { username } = req.query;

      const user = await userPromise;

      if (username && user.username !== username) {
        const subject = await Handler.database.users.findOne({ username });

        if (subject.privacy === 'private') {
          res.status(400).send({
            error: MESSAGE_NO_PERMISSION,
          });
          return;
        }
      }

      const partners = await Handler.database.climbingPartners.find({
        user: username ? username : user.username,
      });

      const censored = partners.map((partner: ClimbingPartner) => (Handler.applyPartnerPrivacy(
        partner,
        user,
      )));

      res.status(200).send({
        partners: censored,
      });
    } catch (error) {
      Monitor.log(
        GetClimbingPartnersHandler,
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
