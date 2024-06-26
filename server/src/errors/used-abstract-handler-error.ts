// Local Imports
import { MESSAGE_USED_ABSTRACT_HANDLER_ERROR } from '../config/messages';

/**
 * Abstract Handler Class Used Error.
 */
class UsedAbstractHandlerError extends Error {
  constructor() {
    super(MESSAGE_USED_ABSTRACT_HANDLER_ERROR);
  }
}

export default UsedAbstractHandlerError;
