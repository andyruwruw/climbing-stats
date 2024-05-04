// Local Imports
import { CreateSessionHandler } from './create-session-handler';
import { DeleteSessionHandler } from './delete-session-handler';
import { EditSessionHandler } from './edit-session-handler';
import { GetSessionHandler } from './get-session-handler';
import { GetSessionsHandler } from './get-sessions-handler'

export default {
  create: CreateSessionHandler,
  delete: DeleteSessionHandler,
  edit: EditSessionHandler,
  get: GetSessionHandler,
  gets: GetSessionsHandler
};
