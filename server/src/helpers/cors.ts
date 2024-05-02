// Local Imports
import { Environment } from './environment';

// Packages
import {
  ServerRequest,
  ServerResponse,
} from '../types';

/**
 * Does CORS stuff.
 *
 * @param {ServerRequest} req Incoming request.
 * @param {ServerResponse} res Outgoing response.
 */
export const handleCors = (
  req: ServerRequest,
  res: ServerResponse,
): void => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    Environment.getOrigin(),
  );
  res.setHeader(
    'Access-Control-Allow-Credentials',
    'true',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
};
