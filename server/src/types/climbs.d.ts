// TYpes
import { DatabaseRow } from './database';

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

<<<<<<< HEAD:server/src/types/climbs.d.ts
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
=======
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

  /**
   * Whether to private the partners.
   */
  privatePartners: boolean;

  /**
   * Whether the session is private.
   */
  private: boolean;

  /**
   * Whether to private the location.
   */
  privateCrag: boolean;

  /**
   * Whether to private details.
   */
  privateDetails: boolean;
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
>>>>>>> refs/remotes/origin/main:server/src/types/tables.d.ts

/**
 * Data related to locations.
 */
<<<<<<< HEAD:server/src/types/climbs.d.ts
export interface Location extends DatabaseRow {
=======
export interface Crag {
  /**
   * Id of the crag.
   */
  _id?: string;

>>>>>>> refs/remotes/origin/main:server/src/types/tables.d.ts
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
<<<<<<< HEAD:server/src/types/climbs.d.ts
export interface Area extends DatabaseRow {
=======
export interface Area {
  /**
   * Id of the area.
   */
  _id?: string;

>>>>>>> refs/remotes/origin/main:server/src/types/tables.d.ts
  /**
   * What crag this area belongs to.
   */
  location: string;

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
<<<<<<< HEAD:server/src/types/climbs.d.ts
 * A rock that has routes on it.
 */
export interface Rock extends DatabaseRow {
  /**
   * Location of this rock.
   */
  location: string;

  /**
   * Sub-area of the rock.
=======
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
>>>>>>> refs/remotes/origin/main:server/src/types/tables.d.ts
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

<<<<<<< HEAD:server/src/types/climbs.d.ts
=======
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
type MediaType = 'image' | 'youtube' | 'instagram' | 'website' | 'drive';

/**
 * A media element.
 */
interface Media {
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
type AttemptStatus = 'attempt'
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

>>>>>>> refs/remotes/origin/main:server/src/types/tables.d.ts
/**
 * Grading of an item.
 */
interface GradeSuggestions {
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
 * Grading of an item.
 */
interface DangerSuggestions {
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
<<<<<<< HEAD:server/src/types/climbs.d.ts
export interface Route extends DatabaseRow {
=======
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
 * User object.
 */
export interface User extends PublicUser {
  /**
   * User's password.
   */
  password: string;

  /**
   * User's email.
   */
  email: string;

  /**
   * Whether the user is an admin.
   */
  admin: boolean;
};

/**
 * Public user object.
 */
export interface PublicUser {
  /**
   * Database ID.
   */
  _id?: string;

>>>>>>> refs/remotes/origin/main:server/src/types/tables.d.ts
  /**
   * Type of climbing activity.
   */
  type: ClimbingActivities;

  /**
   * Crag this route is at.
   */
  location: string;

  /**
<<<<<<< HEAD:server/src/types/climbs.d.ts
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
=======
   * User privacy.
   */
  privacy: PrivacySetting;

  /**
   * Image of user.
>>>>>>> refs/remotes/origin/main:server/src/types/tables.d.ts
   */
  image: string;

  /**
   * External links.
   */
  hrefs: ExternalHref;

  /**
<<<<<<< HEAD:server/src/types/climbs.d.ts
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
=======
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
};

export type PrivacySetting = 'public'
| 'unlisted'
| 'private';

export interface Token {
  /**
   * Token.
   */
  token: string;

  /**
   * User for session.
   */
  user: string;

  /**
   * When this session was created.
   */
  created: number;
>>>>>>> refs/remotes/origin/main:server/src/types/tables.d.ts
}
