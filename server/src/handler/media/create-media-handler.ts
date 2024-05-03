// Local Imports
import {
  MESSAGE_HANDLER_ITEM_EXISTS,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import { validate } from '../../helpers/authentication';
import { Monitor } from '../../helpers/monitor';
import { Handler } from '../handler';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../../types';
import { MediaType } from '../../types/tables';

/**
 * Ends a user's session.
 */
export class CreateMediaHandler extends Handler {
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
        type,
        href,
        caption = '',
        date = Date.now(),
      } = req.body;

      // Check parameters.
      if (!type) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('media', 'Type'),
        });
        return;
      }
      if (!href) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('media', 'Link'),
        });
        return;
      }

      const existing = await Handler.database.media.findOne({
        href,
      });

      if (existing) {
        res.status(409).send({
          error: MESSAGE_HANDLER_ITEM_EXISTS('Media', 'link'),
        });
        return;
      }

      const user = await userPromise;

      if (!user) {
        res.status(401).send({
          error: MESSAGE_UNAUTHORIZED,
        });
        return;
      }

      const inserted = await Handler.database.media.insert({
        type: type as MediaType,
        creator: user.username,
        href,
        caption,
        date,
      });

      if (!inserted) {
        res.status(500).send({
          error: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      const media = await Handler.database.media.findOne({ href });

      res.status(201).send({
        media,
      });
    } catch (error) {
      Monitor.log(
        CreateMediaHandler,
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
