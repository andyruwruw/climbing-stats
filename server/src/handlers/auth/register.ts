import { ServerRequest, ServerResponse } from '../../types';
import { AbstractHandler } from '../abstract-handler';
import { REQUEST_TYPE, AUTHORIZATION_TYPE } from '../../config';
import { validateEmail, validatePassword, validateUsername } from '../../helpers/validation';
import { generateToken } from '../../helpers/auth';
import { BadRequestError } from '../../errors/bad-request-error';
import { ConflictError } from '../../errors/conflict-error';

interface RegisterRequestBody {
  username: string;
  email: string;
  password: string;
}

export class RegisterHandler extends AbstractHandler {
  constructor() {
    super(
      REQUEST_TYPE.POST,
      '/register',
      AUTHORIZATION_TYPE.NONE,
    );
  }

  async execute(req: ServerRequest, res: ServerResponse): Promise<void> {
    const { username, email, password } = req.body as RegisterRequestBody;

    // Validate input
    if (!username || !email || !password) {
      throw new BadRequestError('Missing required fields');
    }

    // Validate format
    if (!validateUsername(username)) {
      throw new BadRequestError('Invalid username format');
    }
    if (!validateEmail(email)) {
      throw new BadRequestError('Invalid email format');
    }
    if (!validatePassword(password)) {
      throw new BadRequestError('Invalid password format');
    }

    // Check if user exists
    const existingUser = await AbstractHandler.getDatabase().findUserByEmail(email);
    if (existingUser) {
      throw new ConflictError('Email already registered');
    }

    const existingUsername = await AbstractHandler.getDatabase().findUserByUsername(username);
    if (existingUsername) {
      throw new ConflictError('Username already taken');
    }

    // Create user
    const user = await AbstractHandler.getDatabase().createUser({
      username,
      email,
      password,
      preferences: {
        defaultClimbingType: 'boulder',
        defaultLocation: '',
        gradeSystem: {
          boulder: 'V',
          sport: 'YDS',
          trad: 'YDS'
        }
      }
    });

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      token
    });
  }
} 