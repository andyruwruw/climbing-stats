// Local Imports
import { CreateAreaHandler } from './create-area-handler';
import { DeleteAreaHandler } from './delete-area-handler';
import { EditAreaHandler } from './edit-area-handler';
import { GetAreaHandler } from './get-area-handler';

export default {
  create: CreateAreaHandler,
  delete: DeleteAreaHandler,
  edit: EditAreaHandler,
  get: GetAreaHandler,
};
