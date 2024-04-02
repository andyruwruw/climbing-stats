/**
 * Basic object.
 */
export type Dictionary<T> = Record<string, T>;

/**
 * References to href of items.
 */
interface ExternalHref {
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
 * User object.
 */
export interface User {
  /**
   * User's username.
   */
  username: string;

  /**
   * Display name.
   */
  displayName: string;

  /**
   * Image of user.
   */
  image: string;

  /**
   * External HREFs.
   */
  hrefs: ExternalHref;
}
