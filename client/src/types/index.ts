// Types
import { DatabaseRow } from './database';

/**
 * Server response.
 */
export interface Response<T> {
  /**
   * Data if available.
   */
  [key: string]: T | string | number | null;

  /**
   * Status code.
   */
  status: number;

  /**
   * Error if applicable.
   */
  error: string | null;
}

/**
 * A date string.
 */
export type DateString = `${number}${number}${number}${number}-${number}${number}-${number}${number}`;

/**
 * Basic object type.
 */
export type Dictionary<T> = Record<string, T>;

/**
 * Types of media.
 */
type MediaType = 'image'
| 'youtube'
| 'instagram'
| 'website'
| 'drive';

/**
 * A media element.
 */
export interface Media extends DatabaseRow {
  /**
   * Type of media.
   */
  type: MediaType;

  /**
   * Id of user who made media.
   */
  creator: string;

  /**
   * Link to media.
   */
  href: string;

  /**
   * Caption of media.
   */
  caption?: string;

  /**
   * Associated date.
   */
  date?: number;
}

/**
 * References to href of items.
 */
export interface ExternalHref {
  /**
   * Address to item.
   */
  address?: string;

  /**
   * Mountain Project link.
   */
  moutainProject?: string;

  /**
   * Google Maps link.
   */
  googleMaps?: string;

  /**
   * Website.
   */
  website?: string;

  /**
   * 8a link.
   */
  eightA?: string;

  /**
   * Sendage link.
   */
  sendage?: string;

  /**
   * Raw coordinates.
   */
  coordinates?: string;

  /**
   * Apple maps link.
   */
  appleMaps?: string;

  /**
   * Youtube link.
   */
  youtube?: string;

  /**
   * Vimeo link.
   */
  vimeo?: string;

  /**
   * Instagram link.
   */
  instagram?: string;
}

/**
 * What interval the chart covers.
 */
export type ChartInterval = 'all'
| 'week'
| 'month'
| 'quarter'
| 'year';

/**
 * What cluster the chart entries represent.
 */
export type ChartPeriod = 'daily'
| 'few-days'
| 'weekly'
| 'monthly'
| 'yearly';

/**
 * One timeline entry.
 */
export interface TimelineEntry {
  /**
   * Date of the timeline entry.
   */
  date?: number;
}

/**
 * Timeline entries when standing in for session quantity.
 */
export interface SessionTimelineEntry extends TimelineEntry {
  /**
   * Number of hours.
   */
  hours: number;

  /**
   * Number of sessions.
   */
  sessions: number;
}
