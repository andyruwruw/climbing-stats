/**
 * Error thrown when request conflicts with existing data.
 */
export class ConflictError extends Error {
  /**
   * HTTP status code.
   */
  statusCode = 409;

  /**
   * Creates a new ConflictError.
   * 
   * @param message Error message
   */
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
} 