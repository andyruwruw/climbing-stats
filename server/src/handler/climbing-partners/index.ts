// Local Imports
import { CreateClimbingPartnerHandler } from './create-climbing-partner-handler';
import { DeleteClimbingPartnerHandler } from './delete-climbing-partner-handler';
import { EditClimbingPartnerHandler } from './edit-climbing-partner-handler';
import { GetClimbingPartnersHandler } from './get-climbing-partners-handler';

export default {
  create: CreateClimbingPartnerHandler,
  delete: DeleteClimbingPartnerHandler,
  edit: EditClimbingPartnerHandler,
  get: GetClimbingPartnersHandler,
};
