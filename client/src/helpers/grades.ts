// Local Imports
import {
  CLIMBING_GRADES,
  FONT_BOULDER_GRADE_SIMPLIFICATION,
  FONT_BOULDER_GRADES,
  FRENCH_ROUTE_GRADE_SIMPLIFICATION,
  FRENCH_ROUTE_GRADES,
  GRADING_SYSTEMS,
  V_SCALE_GRADE_SIMPLIFICATION,
  V_SCALE_GRADES,
  YOSEMITE_DECIMAL_SYSTEM_ROUTE_GRADE_SIMPLIFICATION,
  YOSEMITE_DECIMAL_SYSTEM_ROUTE_GRADES,
} from '../config/grades';

// Types
import {
  ClimbingGrade,
  GradingSystem,
} from '../types/climbs';
import { Dictionary } from '../types';

/**
 * Whether a value is a grading system.
 *
 * @param {string} value Possible grading system value.
 * @returns {boolean} Whether the value is a grading system.
 */
export const isGradingSystem = (value: string): boolean => ((Object.values(GRADING_SYSTEMS) as string[]).includes(value));

/**
 * Retrieves grade object for a given grade.
 *
 * @param {ClimbingGrade} grade Grade to find.
 * @param {GradingSystem} system Grading system to use.
 * @returns {Dictionary<ClimbingGrade>} Grade object for grade.
 */
export const getGrade = (
  grade: ClimbingGrade,
  system = undefined as GradingSystem | undefined,
): Dictionary<ClimbingGrade> => (CLIMBING_GRADES[gradeToDifficultyIndex(
  grade,
  system,
)]);

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
};

/**
 * Parses a grade from either an object or string.
 *
 * @param {ClimbingGrade | Dictionary<ClimbingGrade>} grade Grade object or string.
 * @param {GradingSystem} [system = GRADING_SYSTEMS.V_SCALE] Grading system.
 * @returns {ClimbingGrade} Parsed grade.
 */
export const parseGrade = (
  grade: ClimbingGrade | Dictionary<ClimbingGrade>,
  system = GRADING_SYSTEMS.V_SCALE as GradingSystem,
): ClimbingGrade => {
  if (typeof grade === 'object') {
    if (Object.keys(grade).length
      && isGradingSystem(Object.keys(grade)[0])
      && system in grade) {
      return grade[system];
    } if ('mountainProject' in grade) {
      return grade.mountainProject;
    } if ('eightA' in grade) {
      return grade.mountainProject;
    } if ('sendage' in grade) {
      return grade.mountainProject;
    }
    return grade[Object.keys(grade)[0]];
  }
  return grade;
};

/**
 * Returns the simplified version of a grade.
 *
 * @param {ClimbingGrade} grade Climbing grade to simplify.
 * @param {GradingSystem | undefined} [system = undefined] Grading system.
 * @returns {ClimbingGrade} Simplified climbing grade.
 */
export const simplifyGrade = (
  grade: ClimbingGrade,
  system = undefined as GradingSystem | undefined,
): ClimbingGrade => {
  if ((!system
    && V_SCALE_GRADES.includes(grade))
    || system === GRADING_SYSTEMS.V_SCALE) {
    return V_SCALE_GRADE_SIMPLIFICATION[grade];
  } if ((!system
    && FONT_BOULDER_GRADES.includes(grade))
    || system === GRADING_SYSTEMS.FONT) {
    return FONT_BOULDER_GRADE_SIMPLIFICATION[grade];
  } if ((!system
    && YOSEMITE_DECIMAL_SYSTEM_ROUTE_GRADES.includes(grade))
    || system === GRADING_SYSTEMS.YOSEMITE_DECIMAL_SYSTEM) {
    return YOSEMITE_DECIMAL_SYSTEM_ROUTE_GRADE_SIMPLIFICATION[grade];
  } if ((!system
    && FRENCH_ROUTE_GRADES.includes(grade))
    || system === GRADING_SYSTEMS.FRENCH) {
    return FRENCH_ROUTE_GRADE_SIMPLIFICATION[grade];
  }
  return '?' as ClimbingGrade;
};
