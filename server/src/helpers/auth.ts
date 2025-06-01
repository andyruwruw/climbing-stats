import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const SALT_ROUNDS = 10;

/**
 * Generates a JWT token for a user.
 * 
 * @param user User to generate token for
 * @returns JWT token
 */
export function generateToken(user: User): string {
  return jwt.sign(
    { 
      userId: user.id,
      email: user.email
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

/**
 * Verifies a JWT token.
 * 
 * @param token Token to verify
 * @returns Decoded token payload
 */
export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}

/**
 * Hashes a password.
 * 
 * @param password Password to hash
 * @returns Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verifies a password against a hash.
 * 
 * @param password Password to verify
 * @param hash Hash to verify against
 * @returns Whether password matches hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
} 