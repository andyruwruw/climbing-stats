// Local Imports
import {
  ATTEMPT_STATUS,
  CLIMBING_PROTECTION,
} from '../config';
import {
  CLIMBING_GRADES,
  FONT_BOULDER_GRADES,
  FRENCH_ROUTE_GRADES,
  GRADING_SYSTEMS,
  V_SCALE_GRADES,
  YOSEMITE_DECIMAL_SYSTEM_ROUTE_GRADES,
} from '../config/grades';

// Types
import {
  AttemptStatus,
  Protection,
} from '../types/attempts';
import {
  ClimbingGrade,
  GradingSystem,
} from '../types/climbs';

// Regex.
const IS_AUDIO = /\.(?:wav|mp3)$/i;
export const FIND_NUMBERS = /([0-9]+)/;
export const FIND_HOURS_AND_MINUTES = /([0-9]+):([0-9]+):([0-9]+)[\sAPM]*/;
export const IS_PM_TIME = /PM/g;

/**
 * Sanitizes a number value.
 *
 * @param {string} value Parameter value.
 * @param {number} defaultValue Default value.
 * @param {number} max Max value.
 * @param {number} min Min value.
 * @returns {number} Result.
 */
export const sanitizeNumber = (
  value: string = '',
  defaultValue: number = 0,
  max: number | undefined = undefined,
  min: number | undefined = undefined,
): number => {
  // If it is NaN.
  if (isNaN(parseInt(
    value as string,
    10,
  ))) {
    return defaultValue;
  }

  // Parse the number.
  const number = parseInt(
    value,
    10,
  );

  // If it's greater than max.
  if (max !== undefined && number > max) {
    return max;
  }

  // If it's less than min.
  if (min !== undefined && number < min) {
    return min;
  }

  return number;
};

/**
 * Whether a file is an audio file.
 *
 * @param {string} name Name of the file.
 * @returns {boolean} Whether a file is an audio file.
 */
export const isAudioFile = (name: string): boolean => {
  return IS_AUDIO.test(name);
};

/**
 * Parses a date string.
 *
 * @param {string} date Date as a string. 
 * @returns {number} Date converted to milliseconds.
 */
export const parseDate = (date: string): number => {
  return Date.parse(date.replace('/', '-'));
}

/**
 * Parses a time string.
 *
 * @param {string} time Time as a string. 
 * @returns {number} Time converted to milliseconds.
 */
export const parseTime = (time: string): number => {
  if (!time.length) {
    return 0;
  }

  let hour = 0;
  let minutes = 0;
  let seconds = 0;

  const match = FIND_HOURS_AND_MINUTES.exec(time);

  if (match && match.length > 3) {
    hour = IS_PM_TIME.test(time) ? parseInt(match[1], 10) + 12 : parseInt(match[1], 10);
    minutes = parseInt(match[2], 10);
    seconds = parseInt(match[3], 10);

    return (hour * 3600000) + (minutes + 60000) + (seconds * 1000);
  }

  return 0;
}

/**
 * Parses protection values to return a standardized protection.
 *
 * @param {string} value Protection value. 
 * @returns {Protection} Standardized protection.
 */
export const parseProtection = (value: string): Protection => {
  switch (value) {
    case 'Pads':
    case CLIMBING_PROTECTION.PADS:
      return CLIMBING_PROTECTION.PADS;
    case 'Bolts':
    case CLIMBING_PROTECTION.BOLTS:
      return CLIMBING_PROTECTION.BOLTS;
    case 'TR':
    case CLIMBING_PROTECTION.TOP_ROPE:
      return CLIMBING_PROTECTION.TOP_ROPE;
    case 'Water':
    case CLIMBING_PROTECTION.WATER:
      return CLIMBING_PROTECTION.WATER;
    case 'None':
    case CLIMBING_PROTECTION.NONE:
    default:
      return CLIMBING_PROTECTION.NONE;
  }
}

/**
 * Parses attempt status values to return a standardized attempt status value.
 *
 * @param {string} value Attempt status value. 
 * @returns {AttemptStatus} Attempt status value.
 */
export const parseAttemptStatus = (value: string): AttemptStatus => {
  switch (value) {
    case 'Sent':
    case 'Lead':
    case 'Top Roped':
    case 'Followed':
    case 'Trad. Lead':
    case 'Trad. Followed':
    case 'Trad. Cleaned':
    case 'Aid':
    case 'Trad. Simul':
    case ATTEMPT_STATUS.SEND:
      return ATTEMPT_STATUS.SEND;
    case 'Hung':
    case ATTEMPT_STATUS.HUNG:
      return ATTEMPT_STATUS.HUNG;
    case 'Flash':
    case ATTEMPT_STATUS.FLASH:
      return ATTEMPT_STATUS.FLASH;
    case 'Day Flash':
    case ATTEMPT_STATUS.DAY_FLASH:
      return ATTEMPT_STATUS.DAY_FLASH;
    case 'Onsight':
    case ATTEMPT_STATUS.ONSIGHT:
      return ATTEMPT_STATUS.ONSIGHT;
    case 'Touched':
    case ATTEMPT_STATUS.TOUCH:
      return ATTEMPT_STATUS.TOUCH;
    case 'Attempt':
    case ATTEMPT_STATUS.ATTEMPT:
    default:
      return ATTEMPT_STATUS.ATTEMPT;
  }
}

/**
 * Dictates if something counts a send.
 * 
 * @param {string} value Attempt status value.
 * @returns {boolean} Whether this is a send.
 */
export const parseSentOfStatus = (value: string): boolean => {
  switch (value) {
    case 'Sent':
    case ATTEMPT_STATUS.SEND:
    case 'Flash':
    case ATTEMPT_STATUS.FLASH:
    case 'Day Flash':
    case ATTEMPT_STATUS.DAY_FLASH:
    case 'Onsight':
    case ATTEMPT_STATUS.ONSIGHT:
    case 'Lead':
    case 'Trad. Lead':
    case 'Followed':
    case 'Trad. Followed':
    case 'Trad. Cleaned':
    case 'Aid':
    case 'Trad. Simul':
      return true;
    case 'Touched':
    case ATTEMPT_STATUS.TOUCH:
    case 'Attempt':
    case ATTEMPT_STATUS.ATTEMPT:
    case 'Hung':
    case ATTEMPT_STATUS.HUNG:
    case 'Top Roped':
    default:
      return false;
  }
}

/**
 * Shifts a grade into a difficulty number.
 *
 * @param {ClimbingGrade} grade Grade to convert.
 * @param {GradingSystem} system Specify the grading system.
 * @returns {number} Numerical value of grade.
 */
export const gradeToDifficultyIndex = (
  grade: ClimbingGrade,
  system = undefined as GradingSystem | undefined,
): number => {
  for (let i = 0; i < CLIMBING_GRADES.length; i += 1) {
    if ((grade === CLIMBING_GRADES[i].french && (system === GRADING_SYSTEMS.FRENCH || system === undefined))
      || (grade === CLIMBING_GRADES[i]['yosemite-decimal-system'] && (system === GRADING_SYSTEMS.YOSEMITE_DECIMAL_SYSTEM || system === undefined))
      || (grade === CLIMBING_GRADES[i].font && (system === GRADING_SYSTEMS.FONT || system === undefined))
      || (grade === CLIMBING_GRADES[i]['v-scale'] && (system === GRADING_SYSTEMS.V_SCALE || system === undefined))) {
      return i;
    }
  }
  return 0;
}

/**
 * Converts a grade to a different system.
 *
 * @param {ClimbingGrade} grade Climbing grade to convert.
 * @param {GradingSystem} system Grading system to convert it to. 
 */
export const convertGrade = (
  grade: ClimbingGrade,
  system: GradingSystem,
): ClimbingGrade => {
  // If it already is the grading system.
  if ((system === GRADING_SYSTEMS.FRENCH
    && FRENCH_ROUTE_GRADES.includes(grade))
    || (system === GRADING_SYSTEMS.YOSEMITE_DECIMAL_SYSTEM
    && YOSEMITE_DECIMAL_SYSTEM_ROUTE_GRADES.includes(grade))
    || (system === GRADING_SYSTEMS.FONT
    && FONT_BOULDER_GRADES.includes(grade))
    || (system === GRADING_SYSTEMS.V_SCALE
    && V_SCALE_GRADES.includes(grade))) {
    return grade;
  }

  let index = gradeToDifficultyIndex(
    grade,
    system,
  );

  while (index >= 0 || CLIMBING_GRADES[index]) {
    if (system in CLIMBING_GRADES[index]) {
      return CLIMBING_GRADES[index][system];
    }

    if (index === 0) {
      return '?';
    }

    index -= 1;
  }

  return '?';
}
