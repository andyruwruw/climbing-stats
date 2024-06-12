/**
 * Basic object.
 */
export type Dictionary<T> = Record<string, T>;

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
| `${string}${number}`
| `${string}${number}+`
| `${string}${number}-`
| `${number}.${number}${string}`
| `${number}.${number}`
| `${number}.${number}+`
| `${number}.${number}-`
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
 * Various climbing activities.
 */
export type ClimbingActivities = 'sport'
| 'lead'
| 'top-rope'
| 'traditional'
| 'boulder'
| 'multi-pitch'
| 'ice'
| 'mixed'
| 'alpine'
| 'aid'
| 'free-solo'
| 'speed'
| '';

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

export type Danger = 'G'
| 'PG'
| 'PG-13'
| 'R'
| 'X'
| '';

/**
 * Represents a sesion.
 */
export interface Session {
  /**
   * ID of the session.
   */
  _id?: string;

  /**
   * Id of the user's whose session this is.
   */
  user: string;

  /**
   * Id of the crag the session was at.
   */
  crag: string;

  /**
   * Crag areas.
   */
  areas: string[];

  /**
   * Date of the session.
   */
  date: number;

  /**
   * Starting time of the session.
   */
  start: number;

  /**
   * End of the session.
   */
  end: number;

  /**
   * Duration of the session.
   */
  duration: number;

  /**
   * What activites were done.
   */
  activities: ClimbingActivities[];

  /**
   * Whether this session is outdoors.
   */
  outdoors: boolean;

  /**
   * How the climber felt.
   */
  felt: number;

  /**
   * Description of the session.
   */
  description: string;

  /**
   * Partners climbed with.
   */
  partners: string[];

  /**
   * Associated media.
   */
  media: string[];

  /**
   * Next session.
   */
  last: string;

  /**
   * Last session.
   */
  next: string;

  /**
   * Max grade for each activity.
   */
  max: ClimbingGrade[];
}

/**
 * Partner climbed with.
 */
export interface ClimbingPartner {
  /**
   * Database ID.
   */
  _id?: string;

  /**
   * Who this partner belongs to.
   */
  user: string;

  /**
   * Partner first name.
   */
  firstName: string;

  /**
   * Partner last name.
   */
  lastName: string;

  /**
   * Whether to display this partner.
   */
  private: boolean;

  /**
   * Whether to display this partner.
   */
  privateName: boolean;

  /**
   * Total number of hours.
   */
  hours: number;

  /**
   * Total number of sessions.
   */
  sessions: number;

  /**
   * Outdoor hours.
   */
  outdoorHours: number;

  /**
   * Outdoor sessions.
   */
  outdoorSessions: number;

  /**
   * Session first logged.
   */
  met: string;

  /**
   * Next in the list.
   */
  next: string;
}

/**
 * Data related to locations.
 */
export interface Crag {
  /**
   * Id of the crag.
   */
  _id?: string;

  /**
   * Name of the crag.
   */
  name: string;

  /**
   * Is this the official name?
   */
  officialName: boolean;

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
  image: string;

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
export interface Area {
  /**
   * Id of the area.
   */
  _id?: string;

  /**
   * What crag this area belongs to.
   */
  crag: string;

  /**
   * Name of the area.
   */
  name: string;

  /**
   * Is this the official name?
   */
  officialName: boolean;

  /**
   * Alternative names of the area.
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
   * Whether this area contains private inforomation.
   */
  private: boolean;

  /**
   * Whether this location contains private data.
   */
  privateName: boolean;

  /**
   * Associated media.
   */
  media: string[];
}

/**
 * Types of rocks that contain routes.
 */
export type RockType = 'boulder' | 'wall' | '';

/**
 * A rock that has routes on it.
 */
export interface Rock {
  /**
   * Database ID.
   */
  _id?: string;

  /**
   * Crag this rock is in.
   */
  crag: string;

  /**
   * Area this rock is in.
   */
  area: string;

  /**
   * What type of rock.
   */
  type: RockType;

  /**
   * Types of climbing activity.
   */
  activities: ClimbingActivities[];

  /**
   * Name of the route.
   */
  name: string;

  /**
   * Is this the official name?
   */
  officialName: boolean;

  /**
   * Alternative names of the area.
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
   * Does this item contain private data?
   */
  private: string;

  /**
   * Whether this location contains private data.
   */
  privateName: boolean;

  /**
   * Associated media.
   */
  media: string[];
}

export interface Route {
  /**
   * Route ID.
   */
  _id?: string;

  /**
   * Type of climbing activity.
   */
  type: ClimbingActivities;

  /**
   * Crag this route is at.
   */
  crag: string;

  /**
   * Area this route is at.
   */
  area: string;

  /**
   * User that submitted.
   */
  submitted: string;

  /**
   * Rock this route is on.
   */
  rock: string;

  /**
   * Name of the route.
   */
  name: string;

  /**
   * Is this the official name?
   */
  officialName: boolean;

  /**
   * Alternative names of the area.
   */
  altNames: string[];

  /**
   * Main image of item.
   */
  image: string;

  /**
   * Associated media.
   */
  media: string[];

  /**
   * Links.
   */
  hrefs: ExternalHref;

  /**
   * How dangerous is this.
   */
  danger: Danger;

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
   * When this was updated.
   */
  updated: number;
}

/**
 * An attempt on a route.
 */
export interface Tick {
  /**
   * Id of the tick.
   */
  _id?: string;

  /**
   * User making the tick.
   */
  user: string;

  /**
   * Date attempted.
   */
  date: number;

  /**
   * Type of activity.
   */
  type: ClimbingActivities;

  /**
   * Route in question.
   */
  route: string;

  /**
   * Description of the attempt.
   */
  description: string;

  /**
   * Completion.
   */
  status: AttemptStatus;

  /**
   * Attempts made.
   */
  attempts: number;

  /**
   * Times sent.
   */
  laps: number;

  /**
   * Associated media.
   */
  media: string[];

  /**
   * Whether to feature on profile.
   */
  feature: boolean;

  /**
   * Given rating.
   */
  rating: number;

  /**
   * Suggested grade.
   */
  gradeSuggestion: ClimbingGrade;
}

/**
 * Types of media.
 */
export type MediaType = 'image' | 'youtube' | 'instagram' | 'website' | 'drive';

/**
 * A media element.
 */
export interface Media {
  /**
   * Id of media.
   */
  _id?: string;

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
 * Tick status.
 */
export type AttemptStatus = 'attempt'
| 'top-roped'
| 'lead'
| 'trad'
| 'hung'
| 'flash'
| 'send'
| 'day-flash'
| 'onsight'
| 'ice'
| 'mixed'
| 'free-soloed'
| 'project'
| 'touch'
| 'unknown';

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
  moutainProject?: ClimbingGrade;

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
 * Public user object.
 */
export interface User {
  /**
   * Database ID.
   */
  _id?: string;

  /**
   * User's username.
   */
  username: string;

  /**
   * Display name.
   */
  displayName: string;

  /**
   * User privacy.
   */
  privacy: PrivacySetting;

  /**
   * Image of user.
   */
  image: string;

  /**
   * External HREFs.
   */
  hrefs: ExternalHref;

  /**
   * User height.
   */
  height: number;

  /**
   * User weight.
   */
  weight: number;

  /**
   * When the user started climbing.
   */
  started: number;

  /**
   * When they created an account.
   */
  created: number;

  /**
   * User activities.
   */
  activities: ClimbingActivities[];

  /**
   * User max grade.
   */
  max: ClimbingGrade[];

  /**
   * User birthday.
   */
  born: number;

  /**
   * Where is home.
   */
  home: string;
}

export type PrivacySetting = 'public'
| 'unlisted'
| 'private';
