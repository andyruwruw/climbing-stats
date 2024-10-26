// Local Imports
import { AbstractRouter } from '../abstract-router';
import { CreatePartnerHandler } from './create-partner-handler';
import { DeletePartnerHandler } from './delete-partner-handler';
import { EditPartnerHandler } from './edit-partner-handler';
import { GetPartnerHandler } from './get-partner-handler';
import { GetPartnersHandler } from './get-partners-handler';

/**
 * Partner routes.
 */
export class PartnerRoutes extends AbstractRouter {
  /**
   * Instantiates an router wrapper.
   */
  constructor() {
    super('/partners');
  }

  /**
   * Initializes all routes.
   * 
   * @returns {void}
   */
  _initialize(): void {
    this._routes.push(new CreatePartnerHandler());
    this._routes.push(new DeletePartnerHandler());
    this._routes.push(new EditPartnerHandler());
    this._routes.push(new GetPartnerHandler());
    this._routes.push(new GetPartnersHandler());
  }
}
