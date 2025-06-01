/**
 * Error thrown when request is malformed or invalid.
 */
export class BadRequestError extends Error {
  /**
   * HTTP status code.
   */
  statusCode = 400;

  /**
   * Creates a new BadRequestError.
   * 
   * @param message Error message
   */
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
  }
} 