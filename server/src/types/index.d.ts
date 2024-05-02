/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Request,
  Response,
} from 'express';
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

/**
 * Depends on implementation.
 */
export type ServerRequest = Request | VercelRequest;

/**
 * Depends on implementation.
 */
export type ServerResponse = Response | VercelResponse;

/**
 * General record with string keys.
 */
export type Dictionary<T> = Record<string, T>;
