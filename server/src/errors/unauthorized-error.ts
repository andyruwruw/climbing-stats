/**
 * Error thrown when request lacks valid authentication.
 */
export class UnauthorizedError extends Error {
  /**
   * HTTP status code.
   */
  statusCode = 401;

  /**
   * Creates a new UnauthorizedError.
   * 
   * @param message Error message
   */
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
} 