// Local Imports
import { MESSAGE_USED_ABSTRACT_CLASS_ERROR } from '../config/messages';

/**
 * Abstract Database Class Used Error.
 */
class UsedAbstractDatabaseError extends Error {
  constructor() {
    super(MESSAGE_USED_ABSTRACT_CLASS_ERROR('Database'));
  }
}

export default UsedAbstractDatabaseError;
