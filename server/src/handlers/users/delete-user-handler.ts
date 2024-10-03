// Local Imports
import {
  MESSAGE_HANDLER_ITEM_NOT_FOUND,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_UNAUTHORIZED_ERROR,
} from '../../config/messages';
import {
  AUTHORIZATION_TYPE,

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
            'user',
            'ID',
          ),
        });
        return;
      }

      // If not admin and not their account.
      if (id !== req.user) {
        const requesting = await AbstractHandler._database.users.findById(req.user);

        if (!requesting.admin) {
          res.status(403).send({ error: MESSAGE_UNAUTHORIZED_ERROR });
          return;
        }
      }

      // Check if the user exists.
      const existing = await AbstractHandler._database.users.findById(id);

      if (!existing) {
        res.status(404).send({
          error: MESSAGE_HANDLER_ITEM_NOT_FOUND(
            'user',
            'ID',
            id,
          ),
        });
        return;
      }

      // Delete all user data.
      const promises = [] as Promise<any>[];

      promises.push(AbstractHandler._database.users.deleteById(id));
      promises.push(AbstractHandler._database.sessions.delete({ user: id }));
      promises.push(AbstractHandler._database.ticks.delete({ user: id }));
      promises.push(AbstractHandler._database.climbingPartners.delete({ user: id }));
      promises.push(AbstractHandler._database.tokens.delete({ user: id }));

      await Promise.all(promises);

      res.status(204).send();
    } catch (error) {
      Monitor.log(
        DeleteUserHandler,
        `${error}`,
        Monitor.Layer.WARNING,
      );

      res.status(500).send({ error: MESSAGE_INTERNAL_SERVER_ERROR });
    }
  }
}
