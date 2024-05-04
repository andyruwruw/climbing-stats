// Local Imports
import {
  MESSAGE_HANDLER_ITEM_DOES_NOT_EXIST,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import { validate } from '../../helpers/authentication';
import { Monitor } from '../../helpers/monitor';
import { Handler } from '../handler';

// Types
import {
  Dictionary,
  ServerRequest,
  ServerResponse,
} from '../../types';
import { DatabaseColumnTypes } from '../../types/database';

/**
 * Ends a user's session.
 */
export class EditClimbingPartnerHandler extends Handler {
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

      const {
        id,
        firstName = undefined,
        lastName = undefined,
        isPrivate = undefined,
        privateName = undefined,
      } = req.body;

      // Check parameters.
      if (!id) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('climbing partner', 'ID'),
        });
        return;
      }

      const partner = await Handler.database.climbingPartners.findById(id as string);

      if (!partner) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_DOES_NOT_EXIST('Partner', 'ID'),
        });
        return;
      }

      const user = await userPromise;

      if (!user.admin && user.username !== partner.user) {
        res.status(401).send({
          error: MESSAGE_UNAUTHORIZED,
        });
        return;
      }

      const update = {} as Dictionary<DatabaseColumnTypes>;

      if (firstName !== undefined) {
        update.firstName = firstName;
      }
      if (lastName !== undefined) {
        update.lastName = lastName;
      }
      if (isPrivate !== undefined) {
        update.private = isPrivate;
      }
      if (privateName !== undefined) {
        update.privateName = isPrivate;
      }

      const updated = await Handler.database.climbingPartners.update(
        {
          _id: id,
        },
        update,
      );

      if (!updated) {
        res.status(500).send({
          error: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      res.status(200).send({
        partner: {
          ...partner,
          ...update,
        },
      });
    } catch (error) {
      Monitor.log(
        EditClimbingPartnerHandler,
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
