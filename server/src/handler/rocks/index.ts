// Local Imports
import { CreateRockHandler } from './create-rock-handler';
import { DeleteRockHandler } from './delete-rock-handler';
import { EditRockHandler } from './edit-rock-handler';
import { GetRockHandler } from './get-rock-handler';

export default {
  create: CreateRockHandler,
  delete: DeleteRockHandler,
  edit: EditRockHandler,
  get: GetRockHandler,
};
