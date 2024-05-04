// Local Imports
import { CreateMediaHandler } from './create-media-handler';
import { DeleteMediaHandler } from './delete-media-handler';
import { EditMediaHandler } from './edit-media-handler';
import { GetMediaHandler } from './get-media-handler';

export default {
  create: CreateMediaHandler,
  delete: DeleteMediaHandler,
  edit: EditMediaHandler,
  get: GetMediaHandler,
};
