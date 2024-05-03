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

/**
 * Creates a new crag.
 */
export class CreateCragHandler extends Handler {
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
        name,
        country,
        state,
        officialName = true,
        altNames = [],
        outdoors = false,
        image = '',
        locale = '',
        color = '',
        address = '',
        hrefs = {},
        activities = [],
        isPrivate = false,
        privateName = false,
        privateLocation = false,
        media = [],
      } = req.body;

      // Check parameters.
      if (!name) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('crag', 'Name'),
        });
        return;
      }
      if (!country) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('crag', 'Country'),
        });
        return;
      }
      if (!state) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('crag', 'State'),
        });
        return;
      }

      const existing = await Handler.database.areas.findOne({
        name,
        country,
        state,
      });

      if (existing) {
        res.status(409).send({
          error: MESSAGE_HANDLER_ITEM_EXISTS('Crag', 'name'),
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

      const time = Date.now();

      const inserted = await Handler.database.crags.insert({
        name,
        officialName,
        altNames,
        outdoors,
        image,
        country,
        state,
        locale,
        color,
        address,
        hrefs,
        updated: time,
        submitted: user.username,
        activities,
        private: isPrivate,
        privateName,
        privateLocation,
        media,
      });

      if (!inserted) {
        res.status(500).send({
          error: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      const crag = await Handler.database.crags.findOne({
        name,
        country,
        state,
        updated: time,
      });

      res.status(201).send({
        crag,
      });
    } catch (error) {
      Monitor.log(
        CreateCragHandler,
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
