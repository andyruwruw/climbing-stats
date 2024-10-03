// Local Imports
import { MESSAGE_USED_ABSTRACT_CLASS_ERROR } from '../config/messages';

/**
 * Abstract Handler Class Used Error.
 */
class UsedAbstractHandlerError extends Error {
  constructor() {
    super(MESSAGE_USED_ABSTRACT_CLASS_ERROR('Handler'));
  }
}

export default UsedAbstractHandlerError;
