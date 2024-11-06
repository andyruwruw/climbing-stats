// Local Imports
import {
  getGrade,
  gradeToDifficultyIndex,
  parseGrade,
  simplifyGrade,
} from './grades';
import { filterUnique } from '.';

// Types
import {
  TickSummations,
  TickTracker,
} from '../types/attempts';
import { ClimbingGrade } from '../types/climbs';
import { Dictionary } from '../types';

/**
 * Whether ticks are incomplete.
 *
 * @param {TickSummations | undefined} ticks Tick summation data.
 */
const ticksAreIncomplete = (ticks: TickSummations): boolean => (!ticks
  || !('tickLists' in ticks)
  || !ticks.tickLists);

/**
 * Simplifies ticks by simplified grades.
 *
 * @param {TickTracker[]} ticks Ticks by grade.
 */
const simplifyTickGrades = (ticks: TickTracker[]): TickTracker[] => {
  const simplified = {} as Record<ClimbingGrade, TickTracker>;
  const order = [];

  for (let i = 0; i < ticks.length; i += 1) {
    const tracker = ticks[i] as TickTracker;
    const grade = parseGrade(tracker.grade);

    if (grade) {
      const simplifiedGrade = simplifyGrade(grade);

      if (!(simplifiedGrade in simplified)) {
        simplified[simplifiedGrade as ClimbingGrade] = {
          grade: getGrade(simplifiedGrade),
          attempts: [] as string[],
          ticks: [] as string[],
          flashes: [] as string[],
          onsights: [] as string[],
        } as TickTracker;

        order.push(simplifiedGrade);
      }

      (simplified[simplifiedGrade].attempts as string[]).push(...tracker.attempts);
      (simplified[simplifiedGrade].ticks as string[]).push(...tracker.ticks);
      (simplified[simplifiedGrade].flashes as string[]).push(...tracker.flashes);
      (simplified[simplifiedGrade].onsights as string[]).push(...tracker.onsights);
    }
  }

  const result = [] as TickTracker[];

  for (let i = 0; i < order.length; i += 1) {
    const grade = order[i];
    result.push(simplified[grade]);
  }

  return result;
};

/**
 * Parses a graph friendly list of ticks.
 *
 * @param {TickSummations | undefined} ticks Tick summation data.
 */
export const getSimplifiedBoulderTicksByGrade = (ticks: TickSummations): Dictionary<ClimbingGrade | string | number>[] => {
  if (ticksAreIncomplete(ticks)) {
    return [];
  }

  const { boulder } = ticks.tickLists;

  const simplified = simplifyTickGrades(boulder);

  let max = undefined as number | undefined;

  for (let i = 0; i < simplified.length; i += 1) {
    const tracker = simplified[i];
    const difficulty = gradeToDifficultyIndex(parseGrade(tracker.grade));

    if ((!max
      || difficulty > max)
      && (tracker.ticks.length
      || tracker.flashes.length
      || tracker.onsights.length)) {
      max = difficulty;
    }
  }

  const cleaned = [] as Dictionary<any>[];

  for (let i = 0; i < simplified.length; i += 1) {
    const tracker = simplified[i];
    const grade = parseGrade(tracker.grade);

    if (max && gradeToDifficultyIndex(grade) > max) {
      break;
    }

    if (tracker.ticks.length) {
      cleaned.push({
        grade,
        ticks: filterUnique(tracker.ticks).length,
        status: 'Sent',
      });
    }
    if (tracker.flashes.length || tracker.onsights.length) {
      cleaned.push({
        grade,
        ticks: filterUnique(tracker.flashes).length + filterUnique(tracker.onsights).length,
        status: 'Flash',
      });
    }
  }

  return cleaned;
};

/**
 * Parses a graph friendly list of ticks.
 *
 * @param {TickSummations | undefined} ticks Tick summation data.
 */
export const getSimplifiedBoulderAttemptsByGrade = (ticks: TickSummations): Dictionary<ClimbingGrade | string | number>[] => {
  if (ticksAreIncomplete(ticks)) {
    return [];
  }

  const { boulder } = ticks.tickLists;

  const simplified = simplifyTickGrades(boulder);

  let max = undefined as number | undefined;

  for (let i = 0; i < simplified.length; i += 1) {
    const tracker = simplified[i];
    const difficulty = gradeToDifficultyIndex(parseGrade(tracker.grade));

    if ((!max
      || difficulty > max)
      && (tracker.ticks.length
      || tracker.flashes.length
      || tracker.onsights.length
      || tracker.attempts.length)) {
      max = difficulty;
    }
  }

  const cleaned = [] as Dictionary<any>[];

  for (let i = 0; i < simplified.length; i += 1) {
    const tracker = simplified[i];
    const grade = parseGrade(tracker.grade);

    if (max && gradeToDifficultyIndex(grade) > max) {
      break;
    }

    let sent = [] as string[];

    if (tracker.ticks.length
      || tracker.flashes.length
      || tracker.onsights.length) {
      sent = filterUnique([
        ...tracker.ticks,
        ...tracker.flashes,
        ...tracker.onsights,
      ]);

      cleaned.push({
        grade,
        attempts: sent.length,
        status: 'Sent',
      });
    }
    if (tracker.attempts.length) {
      const filtered = filterUnique(tracker.attempts).filter((value: string): boolean => (!sent.includes(value)));

      cleaned.push({
        grade,
        attempts: filtered.length,
        status: 'Attempted',
      });
    }
  }

  return cleaned;
};
