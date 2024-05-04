// Local Imports
import { CreateRouteHandler } from './create-route-handler';
import { DeleteRouteHandler } from './delete-route-handler';
import { EditRouteHandler } from './edit-route-handler';
import { GetRouteHandler } from './get-route-handler';

export default {
  create: CreateRouteHandler,
  delete: DeleteRouteHandler,
  edit: EditRouteHandler,
  get: GetRouteHandler,
};
