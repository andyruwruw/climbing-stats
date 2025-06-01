import { ServerRequest, ServerResponse } from '../../types';
import { AbstractHandler } from '../abstract-handler';
import { REQUEST_TYPE, AUTHORIZATION_TYPE } from '../../config';
import { validateEmail } from '../../helpers/validation';
import { generateToken, verifyPassword } from '../../helpers/auth';
import { BadRequestError } from '../../errors/bad-request-error';
import { UnauthorizedError } from '../../errors/unauthorized-error';

interface LoginRequestBody {
  email: string;
  password: string;
}

export class LoginHandler extends AbstractHandler {
  constructor() {
    super(
      REQUEST_TYPE.POST,
      '/login',
      AUTHORIZATION_TYPE.NONE,
    );
  }

  async execute(req: ServerRequest, res: ServerResponse): Promise<void> {
    const { email, password } = req.body as LoginRequestBody;

    // Validate input
    if (!email || !password) {
      throw new BadRequestError('Missing required fields');
    }

    // Validate email format
    if (!validateEmail(email)) {
      throw new BadRequestError('Invalid email format');
    }

    // Find user
    const user = await AbstractHandler.getDatabase().findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Verify password
    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Generate token
    const token = generateToken(user);

    res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  }
} 