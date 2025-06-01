import { AbstractRouter } from '../abstract-router';
import { RegisterHandler } from './register';
import { LoginHandler } from './login';
import { RefreshTokenHandler } from './refresh';

export class AuthRouter extends AbstractRouter {
  constructor() {
    super('/auth');
  }

  _initialize(): void {
    this._routes.push(
      new RegisterHandler(),
      new LoginHandler(),
      new RefreshTokenHandler()
    );
  }
} 