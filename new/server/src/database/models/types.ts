export enum AttemptStatus {
  ATTEMPT = 'attempt',
  HUNG = 'hung',
  FLASH = 'flash',
  SEND = 'send',
  DAY_FLASH = 'day-flash',
  ONSIGHT = 'onsight',
  PROJECT = 'project',
  TOUCH = 'touch',
  UNKNOWN = 'unknown'
}

export enum Protection {
  PADS = 'pads',
  BOLTS = 'bolts',
  TOP_ROPE = 'top-rope',
  TRADITIONAL = 'traditional',
  NONE = 'none',
  WATER = 'water',
  PARACHUTE = 'parachute',
  NET = 'net'
}

export enum ClimbingActivities {
  SPORT = 'sport',
  TOP_ROPE = 'top-rope',
  TRADITIONAL = 'traditional',
  BOULDER = 'boulder',
  FOLLOWED = 'followed',
  ICE = 'ice',
  MIXED = 'mixed',
  ALPINE = 'alpine',
  AID = 'aid',
  FREE_SOLO = 'free-solo',
  SPEED = 'speed',
  DEEP_WATER_SOLO = 'deep-water-solo',
  FREE_BASE = 'free-base'
}

export enum GradingSystem {
  V_SCALE = 'v-scale',
  YDS = 'yosemite-decimal-system',
  FRENCH = 'french',
  FONT = 'font',
  UIAA = 'uiaa',
  BMC = 'bmc-traditional-grading',
  AUSTRALIAN = 'australian',
  CIRCUIT = 'circuit-grading',
  EVERYTHING_V3 = 'everything-v3'
}

export enum Privacy {
  PRIVATE = 'private',
  PUBLIC = 'public',
  UNLISTED = 'unlisted'
}

export enum Gender {
  MAN = 'man',
  WOMAN = 'woman',
  NON_BINARY = 'non-binary',
  AGENDER = 'agender',
  UNKNOWN = 'unknown'
}

export type ClimbingGrade = string;
export type RouteDanger = '' | 'PG-13' | 'R' | 'X' | string;

export interface ExternalHref {
  mountainProject?: string;
  website?: string;
  eightA?: string;
  sendage?: string;
  [key: string]: string | undefined;
}

export interface GradeSuggestions {
  mountainProject?: ClimbingGrade;
  website?: ClimbingGrade;
  eightA?: ClimbingGrade;
  sendage?: ClimbingGrade;
  [key: string]: ClimbingGrade | undefined;
}

export interface DangerSuggestions {
  mountainProject?: RouteDanger;
  website?: RouteDanger;
  eightA?: RouteDanger;
  sendage?: RouteDanger;
  [key: string]: RouteDanger | undefined;
} 
