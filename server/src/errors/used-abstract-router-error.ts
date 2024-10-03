// Local Imports
import { MESSAGE_USED_ABSTRACT_CLASS_ERROR } from '../config/messages';

/**
 * Abstract Router Class Used Error.
 */
class UsedAbstractRouterError extends Error {
  constructor() {
    super(MESSAGE_USED_ABSTRACT_CLASS_ERROR('Router'));
  }
}

export default UsedAbstractRouterError;
