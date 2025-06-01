import { ServerRequest, ServerResponse } from '../../types';
import { AbstractHandler } from '../abstract-handler';
import { REQUEST_TYPE, AUTHORIZATION_TYPE } from '../../config';
import { generateToken, verifyToken } from '../../helpers/auth';
import { UnauthorizedError } from '../../errors/unauthorized-error';

export class RefreshTokenHandler extends AbstractHandler {
  constructor() {
    super(
      REQUEST_TYPE.POST,
      '/refresh',
      AUTHORIZATION_TYPE.REQUIRED,
    );
  }

  async execute(req: ServerRequest, res: ServerResponse): Promise<void> {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Invalid token format');
    }

    const token = authHeader.split(' ')[1];
    
    try {
      // Verify existing token
      const decoded = verifyToken(token);
      
      // Get fresh user data
      const user = await AbstractHandler.getDatabase().findUserById(decoded.userId);
      if (!user) {
        throw new UnauthorizedError('User not found');
      }

      // Generate new token
      const newToken = generateToken(user);

      res.status(200).json({
        token: newToken
      });
    } catch (error) {
      throw new UnauthorizedError('Invalid or expired token');
    }
  }
} 