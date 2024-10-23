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
 * Generic database entry.
 */
export interface DatabaseRow {
  /**
   * Database assigned unique identifier.
   */
  _id?: string;

  /**
   * Assigned unique identifier.
   */
  id?: string;
}

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
 * Tick status.
 */
export type AttemptStatus = 'attempt'
| 'hung'
| 'flash'
| 'send'
| 'day-flash'
| 'onsight'
| 'project'
| 'touch'
| 'unknown';

/**
 * Protection types.
 */
export type Protection = 'pads'
| 'bolts'
| 'top-rope'
| 'traditional'
| 'none'
| 'water'
| 'parachute'
| 'net';

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
 * An attempt on a route.
 */
export interface Tick extends DatabaseRow {
  /**
   * Unique identifier of the owner of the tick.
   */
  user: string;

  /**
   * Route in question.
   */
  route: string;

  /**
   * Type of activity.
   */
  type: ClimbingActivities;

  /**
   * Completion.
   */
  status: AttemptStatus;

  /**
   * Does this count as a send.
   */
  sent: boolean;

  /**
   * What kind of protection was used.
   */
  protection: Protection;

  /**
   * Date attempted.
   */
  date: number;

  /**
   * Description of the attempt.
   */
  description: string;

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
   * Suggested grade.
   */
  grade: ClimbingGrade;
}

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
   * Name of the location.
   */
  name: string;

  /**
   * Is this the official name?
   */
  officiallyNamed: boolean;

  /**
   * Other names this location is known as.
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
  private: string;

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
   * Location this route is at.
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

/**
 * Represents a sesion.
 */
export interface Session extends DatabaseRow {
  /**
   * Unique identifier of the owner of this session.
   */
  user: string;

  /**
   * Where this session was.
   */
  location: string;

  /**
   * Areas time was spent.
   */
  areas: string[];

  /**
   * Whether this area is outdoors.
   */
  outdoors: boolean;

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
   * Description of the session.
   */
  description: string;

   /**
   * How the climber felt.
   */
  felt: number;

  /**
   * Partners climbed with.
   */
  partners: string[];

  /**
   * Active calories.
   */
  activeCal: number;

  /**
   * Total calories burned.
   */
  totalCal: number;

  /**
   * Average heartrate.
   */
  heart: number;

  /**
   * Lowest heart rate reached.
   */
  lowHeart: number;

  /**
   * Highest heart rate reached.
   */
  highHeart: number;

  /**
   * Who was carpooled with.
   */
  carpool: string[];

  /**
   * Length of drive.
   */
  drive: number;

  /**
   * Associated media.
   */
  media: string[];

  /**
   * Max item sent.
   */
  sent: ClimbingGrade[];
}

/**
 * Gender options.
 */
export type Gender = 'man'
| 'woman'
| 'non-binary'
| 'agender'
| 'unknown';

/**
 * Privacy types.
 */
export type Privacy = 'private'
| 'public'
| 'unlisted';

/**
 * Database user element.
 */
export interface User extends DatabaseRow {
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

  /**
   * User's age.
   */
  age: number;

  /**
   * User's gender.
   */
  gender: Gender;

  /**
   * User's locale.
   */
  locale: string;

  /**
   * User's state.
   */
  state: string;

  /**
   * User country.
   */
  country: string;

  /**
   * When this user was created.
   */
  created: number;

  /**
   * Imaginary points.
   */
  points: number;

  /**
   * Whether this user is an admin.
   */
  admin: boolean;

  /**
   * Privacy of viewing their profile.
   */
  profilePrivacy: Privacy;

  /**
   * Privacy of viewing their locale.
   */
  localePrivacy: Privacy;

  /**
   * Privacy of viewing their age.
   */
  agePrivacy: Privacy;

  /**
   * Privacy of viewing their ticks.
   */
  ticksPrivacy: Privacy;

  /**
   * Privacy of viewing their sessions.
   */
  sessionsPrivacy: Privacy;

  /**
   * Privacy of viewing their partners.
   */
  partnersPrivacy: Privacy;

  /**
   * Privacy of viewing their pyramid.
   */
  pyramidPrivacy: Privacy;

  /**
   * Privacy of viewing their map.
   */
  mapPrivacy: Privacy;
}

/**
 * Someone you climb with.
 */
export interface ClimbingPartner extends DatabaseRow {
  /**
   * User this climbing partner climbs with.
   */
  user: string;

  /**
   * Climbing partner's first name.
   */
  first: string;

  /**
   * Climbing partner's last name.
   */
  last: string;

  /**
   * Rank comparing hours.
   */
  hoursRank: number;

  /**
   * Hours climbed with.
   */
  hours: number;

  /**
   * How much they're ahead of the next.
   */
  hoursBy: number;

  /**
   * Rank comparing outdoor hours.
   */
  outdoorHoursRank: number;

  /**
   * Outdoor hours climbed with.
   */
  outdoorHours: number;

  /**
   * Rank comparing sessions.
   */
  sessionsRank: number;

  /**
   * Total number of sessions.
   */
  sessions: number;

  /**
   * Rank comparing outdoor sessions.
   */
  outdoorSessionsRank: number;

  /**
   * Total number of outdoor sessions.
   */
  outdoorSessions: number;

  /**
   * Percent time outside.
   */
  outdoorPercent: number;

  /**
   * First session logged.
   */
  met: string;

  /**
   * Date of fisst session together.
   */
  metDate: number;

  /**
   * Where they rank in hours driven.
   */
  droveRank: number;

  /**
   * Hours driven together.
   */
  drove: number;

  /**
   * Whether to hide this person's name.
   */
  hide: boolean;
}

/**
 * Router page names.
 */
export type RouterPageName = 'landing'
| 'home'
| 'profile'
| 'location'
| 'session'
| 'route'
| '404'
| '';

/**
 * Overall session data.
 */
export interface SessionSummations {
  /**
   * Number of sessions.
   */
  sessions: number;

  /**
   * Starting date of climbing.
   */
  start: number;

  /**
   * First session.
   */
  startSession: string;

  /**
   * Number of days climbed.
   */
  days: number;

  /**
   * Number of hours climbed.
   */
  hours: number;

  /**
   * Hours per day since start.
   */
  hoursPerDay: number;

  /**
   * Longest rest between sessions.
   */
  longestRest: number;

  /**
   * Number of indoor hours.
   */
  indoorHours: number;

  /**
   * Number of indoor sessions.
   */
  indoorSessions: number;

  /**
   * Number of outdoor hours.
   */
  outdoorHours: number;

  /**
   * Number of outdoor sessions.
   */
  outdoorSessions: number;

  /**
   * Indoor hours climbed per outdoor hours.
   */
  indoorPerOutdoor: number;
}

/**
 * Overall tick data.
 */
export interface TickSummations {
  /**
   * Total number of unique climbs attempted.
   */
  uniqueClimbs: number;

  /**
   * Total climbs attempted.
   */
  totalClimbs: number;

  /**
   * Total number of unique boulders attempted.
   */
  uniqueBoulder: number;

  /**
   * Total boulders attempted.
   */
  totalBoulders: number;

  /**
   * Total number of unique routes attempted.
   */
  uniqueRoutes: number;

  /**
   * Total routes attempted.
   */
  totalRoutes: number;

  /**
   * Log of ticks, flashes, onsights and attempts at each grade.
   */
  tickLists: Record<ClimbingActivities, TickTracker[]>,

  /**
   * Logs of session counters for each route.
   */
  routeSessions: Dictionary<SessionCounter>,
}

/**
 * Counts sessions on projects.
 */
export interface SessionCounter {
  /**
   * Unique identifier of the route.
   */
  id: string,

  /**
   * First session date on the route.
   */
  first: number,

  /**
   * Last session date on the route.
   */
  last: number,

  /**
   * Total number of sessions on the route.
   */
  total: number,
}

/**
 * Tracks routes ticks.
 */
export interface TickTracker {
  /**
   * Grade this entry is for.
   */
  grade: ClimbingGrade | Dictionary<ClimbingGrade>;

  /**
   * Tick unique identifiers for attempts on this grade.
   */
  attempts: string[];

  /**
   * Route unique identifiers of unique climbs sent.
   */
  ticks: string[];

  /**
   * Route unique identifiers of unique climbs flashed.
   */
  flashes: string[];

  /**
   * Route unique identifiers of unique climbs onsight.
   */
  onsights: string[];
}
