// Local Imports
import { CLIMBING_ACTIVITY } from '@/config';
import {
  CLIMBING_GRADES,
  FONT_BOULDER_GRADE_SIMPLIFICATION,
  FONT_BOULDER_GRADES,
  FONT_BOULDER_SIMPLE_GRADES,
  FRENCH_ROUTE_GRADE_SIMPLIFICATION,
  FRENCH_ROUTE_GRADES,
  FRENCH_ROUTE_SIMPLE_GRADES,
  GRADING_SYSTEMS,
  V_SCALE_GRADE_SIMPLIFICATION,
  V_SCALE_GRADES,
  V_SCALE_SIMPLE_GRADES,
  YOSEMITE_DECIMAL_SYSTEM_ROUTE_GRADE_SIMPLIFICATION,
  YOSEMITE_DECIMAL_SYSTEM_ROUTE_GRADES,
  YOSEMITE_DECIMAL_SYSTEM_ROUTE_SIMPLE_GRADES,
} from '../config/grades';

// Types
import {
  ClimbingActivities,
  ClimbingGrade,
  GradingSystem,
} from '../types/climbs';
import { TickPyramidEntry } from '../types/attempts';
import { TickPlotEntry } from '../types/charts';
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
export const getFullGradeObject = (
  grade: ClimbingGrade | number,
  system = undefined as GradingSystem | undefined,
): Dictionary<ClimbingGrade> => {
  if (typeof grade === 'number') {
    return CLIMBING_GRADES[grade];
  }
  return CLIMBING_GRADES[gradeToDifficultyIndex(
    grade,
    system,
  )];
};

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
 * Returns the list of simplified grades for a system.
 *
 * @param {GradingSystem} system Grading system to retrieve.
 * @returns {ClimbingGrade[]} List of simplified grades.
 */
export const getSimplifiedGradeList = (system: GradingSystem | undefined = 'font'): ClimbingGrade[] => {
  if (system === GRADING_SYSTEMS.V_SCALE) {
    return V_SCALE_SIMPLE_GRADES;
  } if (system === GRADING_SYSTEMS.FONT) {
    return FONT_BOULDER_SIMPLE_GRADES;
  } if (system === GRADING_SYSTEMS.YOSEMITE_DECIMAL_SYSTEM) {
    return YOSEMITE_DECIMAL_SYSTEM_ROUTE_SIMPLE_GRADES;
  } if (system === GRADING_SYSTEMS.FRENCH) {
    return FRENCH_ROUTE_SIMPLE_GRADES;
  }
  return [] as ClimbingGrade[];
};

/**
 *
 *
 *
 *
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

/**
 * Simplifies the tick list.
 *
 * @param {TickPyramidEntry[]} data
 * @param {GradingSystem} system
 * @param {ClimbingActivities[]} acitivites
 * @returns {TickPlotEntry[]}
 */
export const simplifyTickList = (
  data: TickPyramidEntry[],
  system: GradingSystem,
  acitivites: ClimbingActivities[],
): TickPlotEntry[] => {
  const result = [] as TickPlotEntry[];

  const gradeList = getSimplifiedGradeList(system);

  for (let i = 0; i < data.length; i += 1) {
    const entry = data[i];

    const simpleGrade = simplifyGrade(
      parseGrade(
        entry.grade,
        system,
      ),
      system,
    );

    const index = gradeList.findIndex((grade) => (grade === simpleGrade));

    while (result.length < index + 1) {
      const entryIndex = result.length;
      const entryGrade = gradeList[entryIndex];

      result.push({
        grade: entryGrade,
        index: entryIndex,
        attempt: 0,
        hung: 0,
        flash: 0,
        send: 0,
        dayFlash: 0,
        onsight: 0,
        project: 0,
        touch: 0,
        unknown: 0,
      });
    }

    for (let j = 0; j < acitivites.length; j += 1) {
      const activity = acitivites[j];

      if (activity in entry.activities) {
        if ('attempt' in entry.activities[activity]) {
          result[index].attempt += entry.activities[activity].attempt;
        }
        if ('hung' in entry.activities[activity]) {
          result[index].hung += entry.activities[activity].hung;
        }
        if ('flash' in entry.activities[activity]) {
          result[index].flash += entry.activities[activity].flash;
        }
        if ('send' in entry.activities[activity]) {
          result[index].send += entry.activities[activity].send;
        }
        if ('day-flash' in entry.activities[activity]) {
          result[index].dayFlash += entry.activities[activity]['day-flash'];
        }
        if ('onsight' in entry.activities[activity]) {
          result[index].onsight += entry.activities[activity].onsight;
        }
        if ('project' in entry.activities[activity]) {
          result[index].project += entry.activities[activity].project;
        }
        if ('touch' in entry.activities[activity]) {
          result[index].touch += entry.activities[activity].touch;
        }
        if ('unknown' in entry.activities[activity]) {
          result[index].unknown += entry.activities[activity].unknown;
        }
      }
    }
  }

  return result;
};
