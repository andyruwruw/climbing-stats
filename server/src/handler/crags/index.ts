// Local Imports
import { CreateCragHandler } from './create-crag-handler';
import { DeleteCragHandler } from './delete-crag-handler';
import { EditCragHandler } from './edit-crag-handler';
import { GetCragHandler } from './get-crag-handler';

export default {
  create: CreateCragHandler,
  delete: DeleteCragHandler,
  edit: EditCragHandler,
  get: GetCragHandler,
};
