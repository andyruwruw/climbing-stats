// Local Imports
import { CreateTickHandler } from './create-tick-handler';
import { DeleteTickHandler } from './delete-tick-handler';
import { EditTickHandler } from './edit-tick-handler';
import { GetTickHandler } from './get-tick-handler';
import { GetTicksHandler } from './get-ticks-handler'

export default {
  create: CreateTickHandler,
  delete: DeleteTickHandler,
  edit: EditTickHandler,
  get: GetTickHandler,
  gets: GetTicksHandler
};
