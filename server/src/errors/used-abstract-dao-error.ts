// Local Imports
import { MESSAGE_USED_ABSTRACT_CLASS_ERROR } from '../config/messages';

/**
 * Abstract Data Access Object Class Used Error.
 */
class UsedAbstractDaoError extends Error {
  constructor() {
    super(MESSAGE_USED_ABSTRACT_CLASS_ERROR('Data Access Object'));
  }
}

export default UsedAbstractDaoError;