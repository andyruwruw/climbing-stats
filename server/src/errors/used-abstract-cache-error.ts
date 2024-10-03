// Local Imports
import { MESSAGE_USED_ABSTRACT_CLASS_ERROR } from '../config/messages';

/**
 * Abstract Cache Class Used Error.
 */
class UsedAbstractCacheError extends Error {
  constructor() {
    super(MESSAGE_USED_ABSTRACT_CLASS_ERROR('Cache'));
  }
}

export default UsedAbstractCacheError;
