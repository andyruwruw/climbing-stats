// Local Imports
import {
  MESSAGE_HANDLER_ITEM_NOT_FOUND,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_UNAUTHORIZED_ERROR,
} from '../../config/messages';
import {
  AUTHORIZATION_TYPE,
  REQUEST_TYPE,
} from '../../config';
import { AbstractHandler } from '../abstract-handler';
import { Monitor } from '../../helpers/monitor';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';

/**
 * Delete an existing partner.
 */
export class DeletePartnerHandler extends AbstractHandler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.DELETE,
      '/:id',
      AUTHORIZATION_TYPE.REQUIRED,
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
      // Parse path parameters.
      const { id } = req.params || {};

      // Check for all required parameters.
      if (!id) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING(
            'partner',
            'ID',
          ),
        });
        return;
      }

      // Check if the rock exists.
      const existing = await AbstractHandler._database.climbingPartners.findById(id);

      if (!existing) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
            'partner',
            'ID',
            id,
          ),
        });
        return;
      }

      // Check if the user created this or is an admin.
      if (existing.user !== req.user) {
        const user = await AbstractHandler._database.users.findById(req.user);

        if (!user.admin) {
          res.status(403).send({ error: MESSAGE_UNAUTHORIZED_ERROR });
          return;
        }
      }

      // Delete the area.
      const promises = [] as Promise<any>[];

      promises.push(AbstractHandler._database.climbingPartners.delete({ id }));
      promises.push(AbstractHandler._database.sessions.updateMany(
        { partners: id },
        {
          $pull: {
            partners: id,
          },
        },
        false,
      ));
      promises.push(AbstractHandler._database.sessions.updateMany(
        { carpool: id },
        {
          $pull: {
            carpool: id,
          },
        },
        false,
      ));

      await Promise.all(promises);

      res.status(204).send();
    } catch (error) {
      Monitor.log(
        DeletePartnerHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
