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
import { QueryUpdate } from '../../types/database';

/**
 * Edits an existing location.
 */
export class EditLocationHandler extends AbstractHandler {
  /**
   * Instantiates a new handler.
   */
  constructor() {
    super(
      REQUEST_TYPE.PUT,
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
            'area',
            'ID',
          ),
        });
        return;
      }

      // Parse request body.
      const {
        name = undefined,
        officiallyNamed = undefined,
        altNames = undefined,
        outdoors = undefined,
        image = undefined,
        country = undefined,
        state = undefined,
        locale = undefined,
        color = undefined,
        hrefs = undefined,
        activities = undefined,
        isPrivate = undefined,
        privateName = undefined,
        privateLocation = undefined,
      } = req.body;

      // Check if the location exists.
      const existing = await AbstractHandler._database.locations.findById(id);

      if (!existing) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
            'location',
            'ID',
            id,
          ),
        });
        return;
      }

      // Is the user allowed to carry out this action?
      if (existing.submitted !== req.user) {
        const user = await AbstractHandler._database.users.findById(req.user);

        if (!user.admin) {
          res.status(403).send({ error: MESSAGE_UNAUTHORIZED_ERROR });
          return;
        }
      }

      // Construct our query.
      const query = {} as QueryUpdate;

      if (name !== undefined) {
        query.name = name;
      }
      if (officiallyNamed !== undefined) {
        query.officiallyNamed = officiallyNamed;
      }
      if (altNames !== undefined) {
        query.altNames = altNames;
      }
      if (outdoors !== undefined) {
        query.outdoors = outdoors;
      }
      if (image !== undefined) {
        query.image = image;
      }
      if (country !== undefined) {
        query.country = country;
      }
      if (state !== undefined) {
        query.state = state;
      }
      if (locale !== undefined) {
        query.locale = locale;
      }
      if (color !== undefined) {
        query.color = color;
      }
      if (hrefs !== undefined) {
        query.hrefs = hrefs;
      }
      if (activities !== undefined) {
        query.activities = activities;
      }
      if (isPrivate !== undefined) {
        query.private = isPrivate;
      }
      if (privateName !== undefined) {
        query.privateName = privateName;
      }
      if (privateLocation !== undefined) {
        query.privateLocation = privateLocation;
      }

      // Make the update.
      await AbstractHandler._database.locations.update(
        { id },
        query,
      );

      res.status(200).send({
        location: {
          ...existing,
          ...query,
        },
      });
    } catch (error) {
      Monitor.log(
        EditLocationHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
