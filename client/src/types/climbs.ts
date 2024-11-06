// Types
import { ExternalHref } from '.';
import { DatabaseRow } from './database';

/**
 * Various climbing activities.
 */
export type ClimbingActivities = 'sport'
| 'top-rope'
| 'traditional'
| 'boulder'
| 'followed'
| 'ice'
| 'mixed'
| 'alpine'
| 'aid'
| 'free-solo'
| 'speed'
| 'deep-water-solo'
| 'free-base';

/**
 * Types of grading systems.
 */
export type GradingSystem = 'v-scale'
| 'yosemite-decimal-system'
| 'french'
| 'font'
| 'uiaa'
| 'bmc-traditional-grading'
| 'australian'
| 'circuit-grading'
| 'everything-v3';

/**
 * Various colors for grades.
 */
export type Color = 'Yellow'
| 'Green'
| 'Teal'
| 'Blue'
| 'Purple'
| 'Pink'
| 'Red'
| 'Orange'
| 'White'
| 'Black';

/**
 * Various types of climbing grade strings.
 */
export type ClimbingGrade = 'VB'
| `everything-v3-${number}`
| 'V-Easy'
| `V${number}`
| `V${number}+`
| `V${number}-`
| `V${number}-${number}`
| 'V?'
| `${string}${number}`
| `${string}${number}+`
| `${string}${number}-`
| `${number}.${number}${string}`
| `${number}.${number}${string}/${string}`
| `${number}.${number}`
| `${number}.${number}+`
| `${number}.${number}-`
| `${number}.?`
| 'S'
| 'HS'
| 'VS'
| 'HVS'
| `E${number}`
| `E${number} ${number}${string}`
| `A${number}`
| `A${number}+`
| `A${number}-`
| `A/C${number}`
| `A/C${number}+`
| `A/C${number}-`
| `M${number}`
| `WI ${number}`
| `${string} ${Color}`
| number
| string;

/**
 * Types of rocks that contain routes.
 */
export type RockType = 'boulder' | 'wall';

/**
 * Danger of a route.
 */
export type RouteDanger = ''
| 'PG-13'
| 'R'
| 'X'
| number
| string;

/**
 * Data related to locations.
 */
export interface Location extends DatabaseRow {
  /**
   * Name of the crag.
   */
  name: string;

  /**
   * Is this the official name?
   */
  officiallyNamed: boolean;

  /**
   * Other names this crag is known as.
   */
  altNames: string[];

  /**
   * Whether this location is outdoors.
   */
  outdoors: boolean;

  /**
   * Main image.
   */
  image: string | null;

  /**
   * Country this location is in.
   */
  country: string;

  /**
   * State this location is in.
   */
  state: string;

  /**
   * Locale of this location.
   */
  locale: string;

  /**
   * Color of the location.
   */
  color: string;

  /**
   * Address to crag.
   */
  address: string;

  /**
   * External links.
   */
  hrefs: ExternalHref;

  /**
   * When this location was updated.
   */
  updated: number;

  /**
   * Who submitted this location.
   */
  submitted: string;

  /**
   * What activites are available.
   */
  activities: ClimbingActivities[];

  /**
   * Whether this location contains private data.
   */
  private: boolean;

  /**
   * Whether this location contains private data.
   */
  privateName: boolean;

  /**
   * Whether this location contains private data.
   */
  privateLocation: boolean;

  /**
   * Associated media.
   */
  media: string[];
}

/**
 * A climbing area.
 */
export interface Area extends DatabaseRow {
  /**
   * What location this area belongs to.
   */
  location: string;

  /**
   * Name of the area.
   */
  name: string;

  /**
   * Is this the official name?
   */
  officiallyNamed: boolean;

  /**
   * Other names this area is known as.
   */
  altNames: string[];

  /**
   * Main image of the area.
   */
  image: string;

  /**
   * External links.
   */
  hrefs: ExternalHref;

  /**
   * When this was last updated.
   */
  updated: number;

  /**
   * Id of user that submitted area.
   */
  submitted: string;

  /**
   * Available climbing activities.
   */
  activities: ClimbingActivities[];

  /**
   * Whether this area contains private information.
   */
  private: boolean;

  /**
   * Whether this location contains private data.
   */
  privateName: boolean;

  /**
   * Whether this location contains private data.
   */
  privateLocation: boolean;

  /**
   * Associated media.
   */
  media: string[];
}

/**
 * A rock that has routes on it.
 */
export interface Rock extends DatabaseRow {
  /**
   * Location of this rock.
   */
  location: string;

  /**
   * Sub-area of the rock.
   */
  area: string;

  /**
   * Name of the crag.
   */
  name: string;

  /**
   * Is this the official name?
   */
  officiallyNamed: boolean;

  /**
   * Other names this crag is known as.
   */
  altNames: string[];

  /**
   * What type of rock.
   */
  type: RockType;

  /**
   * Types of climbing activity.
   */
  activities: ClimbingActivities[];

  /**
   * Main image of the area.
   */
  image: string;

  /**
   * External links.
   */
  hrefs: ExternalHref;

  /**
   * When this was last updated.
   */
  updated: number;

  /**
   * Id of user that submitted area.
   */
  submitted: string;

  /**
   * Does this item contain private data?
   */
  private: boolean;

  /**
   * Whether this location contains private data.
   */
  privateName: boolean;

  /**
   * Whether this location contains private data.
   */
  privateLocation: boolean;

  /**
   * Associated media.
   */
  media: string[];
}

/**
 * Grading of an item.
 */
export interface GradeSuggestions {
  /**
   * Individuals.
   */
  [key: string]: ClimbingGrade | undefined;

  /**
   * Mountain Project link.
   */
  mountainProject?: ClimbingGrade;

  /**
   * Website.
   */
  website?: ClimbingGrade;

  /**
   * 8a link.
   */
  eightA?: ClimbingGrade;

  /**
   * Sendage link.
   */
  sendage?: ClimbingGrade;
}

/**
 * Grading of an item.
 */
export interface DangerSuggestions {
  /**
   * Individuals.
   */
  [key: string]: RouteDanger | undefined;

  /**
   * Mountain Project link.
   */
  moutainProject?: RouteDanger;

  /**
   * Website.
   */
  website?: RouteDanger;

  /**
   * 8a link.
   */
  eightA?: RouteDanger;

  /**
   * Sendage link.
   */
  sendage?: RouteDanger;
}

/**
 * A specific climbing route.
 */
export interface Route extends DatabaseRow {
  /**
   * Type of climbing activity.
   */
  type: ClimbingActivities;

  /**
   * Crag this route is at.
   */
  location: string;

  /**
   * Area this route is at.
   */
  area: string;

  /**
   * Rock this route is on.
   */
  rock: string;

  /**
   * Name of the crag.
   */
  name: string;

  /**
   * Is this the official name?
   */
  officiallyNamed: boolean;

  /**
   * Other names this crag is known as.
   */
  altNames: string[];

  /**
   * Main image of item.
   */
  image: string;

  /**
   * External links.
   */
  hrefs: ExternalHref;

  /**
   * Associated media.
   */
  media: string[];

  /**
   * Grade of item.
   */
  grade: GradeSuggestions;

  /**
   * Whether this location contains private data.
   */
  private: boolean;

  /**
   * Whether this location contains private data.
   */
  privateName: boolean;

  /**
   * Whether this location contains private data.
   */
  privateLocation: boolean;

  /**
   * How dangerous the route is.
   */
  danger: DangerSuggestions;

  /**
   * When this route was updated.
   */
  updated: number;

  /**
   * Who submitted this route.
   */
  submitted: string;
}
