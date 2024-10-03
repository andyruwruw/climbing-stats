// Local Imports
import { GetLoginSessionHandler } from './get-login-session-handler';
import { RegisterUserHandler } from './register-user-handler';
import { DeleteUserHandler } from './delete-user-handler';
import { LogoutUserHandler } from './logout-user-handler';
import { LoginUserHandler } from './login-user-hander';
import { GetUsersHandler } from './get-users-handler';
import { GetUserHandler } from './get-user-handler';
import { AbstractRouter } from '../abstract-router';

/**
 * User routes.
 */
export class UserRoutes extends AbstractRouter {
  /**
   * Instantiates an router wrapper.
   */
  constructor() {
    super('/users');
  }

  /**
   * Initializes all routes.
   * 
   * @returns {void}
   */
  _initialize(): void {
    this._routes.push(new DeleteUserHandler());
    this._routes.push(new GetLoginSessionHandler());
    this._routes.push(new GetUserHandler());
    this._routes.push(new GetUsersHandler());
    this._routes.push(new LoginUserHandler());
    this._routes.push(new LogoutUserHandler());
    this._routes.push(new RegisterUserHandler());
  }
}
