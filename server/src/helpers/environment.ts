// Packages
import * as dotenv from 'dotenv';

// Local Imports
import {
  DEVELOPMENT_URL,
  PRODUCTION_URL,
} from '../config';

// Setting up DotEnv
dotenv.config();

/**
 * Static methods for retrieving environment variables.
 * 
 * @static
 */
export class Environment {
  /**
   * Pregenerated secret.
   *
   * @type {string}
   * @access private
   */
  private static _generateSecret = (Math.random() + 1).toString(36).substring(7);

  /**
   * Pregenerated state.
   *
   * @type {string}
   * @access private
   */
  private static _generateState = (Math.random() + 1).toString(36).substring(7);

  /**
   * Retrieves name of database to use.
   *
   * @default 'development'
   * @returns {string} Name of database.
   */
  static getDatabaseName(): string {
    return process.env.DATABASE_NAME as string || 'development';
  }
  
  /**
   * Retrieves password for connecting with database if needed.
   *
   * @default ''
   * @returns {string} Password for connecting with database if needed.
   */
  static getDatabasePassword(): string {
    return process.env.DATABASE_PASSWORD as string || '';
  }

  /**
   * Retrieves URL for connecting with database if needed.
   *
   * @default 'mongodb://localhost:27017/'
   * @returns {string} URL for connecting with database if needed.
   */
  static getDatabaseUrl(): string {
    return process.env.DATABASE_URL as string || 'mongodb://localhost:27017/';
  }

  /**
   * Retrieves username for connecting with database if needed.
   *
   * @default 'server'
   * @returns {string} Username for connecting with database if needed.
   */
  static getDatabaseUser(): string {
    return process.env.DATABASE_USER as string || 'server';
  }

  /**
   * Retrieves type of database to use.
   *
   * @default 'cache'
   * @returns {string} Type of database to use.
   */
  static getDatabaseType(): string {
    return process.env.DATABASE_TYPE || 'cache';
  }

  /**
   * Returns origin URL depending on environment.
   *
   * @default DEVELOPMENT_URL
   * @returns {string} Origin URL.
   */
  static getOrigin(): string {
    if (process.env.ORIGIN_URL && process.env.ORIGIN_URL.length) {
      return process.env.ORIGIN_URL;
    }
    if (process.env.ENVIRONMENT === 'production') {
      return PRODUCTION_URL;
    }
    return DEVELOPMENT_URL;
  }

  /**
   * Retrieves server secret.
   *
   * @default Environment._generateSecret
   * @returns {string} Server secret.
   */
  static getSecret(): string {
    return process.env.SECRET as string || Environment._generateSecret;
  }

  /**
   * Whether log layer DEBUG is enabled.
   *
   * @default false
   * @returns {boolean} Whether log layer DEBUG is enabled.
   */
  static isDebugLayerEnabled(): boolean {
    return process.env.ENABLE_DEBUG_LAYER === 'true';
  }

  /**
   * Whether log layer PROGRESS is enabled.
   *
   * @default false
   * @returns {boolean} Whether log layer PROGRESS is enabled.
   */
  static isProgressLayerEnabled(): boolean {
    return process.env.ENABLE_PROGRESS_LAYER === 'true';
  }

  /**
   * Whether log layer SUCCESS is enabled.
   *
   * @default false
   * @returns {boolean} Whether log layer SUCCESS is enabled.
   */
  static isSuccessLayerEnabled(): boolean {
    return process.env.ENABLE_SUCCESS_LAYER === 'true';
  }

  /**
   * Whether log layer UPDATE is enabled.
   *
   * @default false
   * @returns {boolean} Whether log layer UPDATE is enabled.
   */
  static isUpdateLayerEnabled(): boolean {
    return process.env.ENABLE_UPDATE_LAYER === 'true';
  }

  /**
   * Whether log layer WARNING is enabled.
   *
   * @default false
   * @returns {boolean} Whether log layer WARNING is enabled.
   */
  static isWarningLayerEnabled(): boolean {
    return process.env.ENABLE_WARNING_LAYER === 'true';
  }
}
