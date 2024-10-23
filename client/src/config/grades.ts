// Types
import {
  ClimbingGrade,
  Dictionary,
  GradingSystem,
} from '../types';

/**
 * Various grading systems for routes.
 */
export const GRADING_SYSTEMS = {
  V_SCALE: 'v-scale',
  YOSEMITE_DECIMAL_SYSTEM: 'yosemite-decimal-system',
  FRENCH: 'french',
  FONT: 'font',
  UIAA: 'uiaa',
  BMC_TRADITIONAL_GRADING: 'bmc-traditional-grading',
  AUSTRALIAN: 'australian',
  CIRCUIT_GRADING: 'circuit-grading',
  EVERYTHING_V3: 'everything-v3',
} as Dictionary<GradingSystem>;

/**
 * French route grades in order.
 */
export const FRENCH_ROUTE_GRADES = [
  '2-',
  '2',
  '3',
  '3+',
  '4a',
  '4b',
  '4c',
  '5a',
  '5b',
  '5c',
  '6a',
  '6a+',
  '6b',
  '6b+',
  '6c',
  '6c+',
  '7a',
  '7a+',
  '7b',
  '7b+',
  '7c',
  '7c+',
  '8a',
  '8a+',
  '8b',
  '8b+',
  '8c',
  '8c+',
  '9a',
  '9a+',
  '9b',
  '9b+',
  '9c',
  '?',
] as ClimbingGrade[];

/**
 * Just the simple french grades.
 */
export const FRENCH_ROUTE_SIMPLE_GRADES = [
  '2-',
  '2',
  '3',
  '4a',
  '4b',
  '4c',
  '5a',
  '5b',
  '5c',
  '6a',
  '6b',
  '6c',
  '7a',
  '7b',
  '7c',
  '8a',
  '8b',
  '8c',
  '9a',
  '9b',
  '9c',
  '?',
] as ClimbingGrade[];

/**
 * Simplification of french grades.
 */
export const FRENCH_ROUTE_GRADE_SIMPLIFICATION = {
  '2-': '2',
  2: '2',
  3: '3',
  '3+': '3',
  '4a': '4a',
  '4b': '4b',
  '4c': '4c',
  '5a': '5a',
  '5b': '5b',
  '5c': '5c',
  '6a': '6a',
  '6a+': '6a',
  '6b': '6b',
  '6b+': '6b',
  '6c': '6c',
  '6c+': '6c',
  '7a': '7a',
  '7a+': '7a',
  '7b': '7b',
  '7b+': '7b',
  '7c': '7c',
  '7c+': '7c',
  '8a': '8a',
  '8a+': '8a',
  '8b': '8b',
  '8b+': '8b',
  '8c': '8c',
  '8c+': '8c',
  '9a': '9a',
  '9a+': '9a',
  '9b': '9b',
  '9b+': '9b',
  '9c': '9c',
  '?': '?',
} as Record<ClimbingGrade, ClimbingGrade>;

/**
 * Yosemite decimal system route grades in order.
 */
export const YOSEMITE_DECIMAL_SYSTEM_ROUTE_GRADES = [
  '5',
  '5.1',
  '5.2',
  '5.3',
  '5.4',
  '5.5',
  '5.6',
  '5.7',
  '5.7+',
  '5.8-',
  '5.8',
  '5.8+',
  '5.9-',
  '5.9',
  '5.9+',
  '5.10a',
  '5.10-',
  '5.10a/b',
  '5.10b',
  '5.10',
  '5.10b/c',
  '5.10c',
  '5.10+',
  '5.10c/d',
  '5.10d',
  '5.11a',
  '5.11-',
  '5.11a/b',
  '5.11b',
  '5.11',
  '5.11b/c',
  '5.11c',
  '5.11+',
  '5.11c/d',
  '5.11d',
  '5.12a',
  '5.12-',
  '5.12a/b',
  '5.12b',
  '5.12',
  '5.12b/c',
  '5.12c',
  '5.12+',
  '5.12c/d',
  '5.12d',
  '5.13a',
  '5.13-',
  '5.13a/b',
  '5.13b',
  '5.13',
  '5.13b/c',
  '5.13c',
  '5.13+',
  '5.13c/d',
  '5.13d',
  '5.14a',
  '5.14-',
  '5.14a/b',
  '5.14b',
  '5.14',
  '5.14b/c',
  '5.14c',
  '5.14+',
  '5.14c/d',
  '5.14d',
  '5.15a',
  '5.15-',
  '5.15a/b',
  '5.15b',
  '5.15',
  '5.15b/c',
  '5.15c',
  '5.15+',
  '5.15c/d',
  '5.15d',
  '5.?',
] as ClimbingGrade[];

/**
 * Just the simple yosemite decimal system grades.
 */
export const YOSEMITE_DECIMAL_SYSTEM_ROUTE_SIMPLE_GRADES = [
  '5',
  '5.1',
  '5.2',
  '5.3',
  '5.4',
  '5.5',
  '5.6',
  '5.7',
  '5.8',
  '5.9',
  '5.10-',
  '5.10+',
  '5.11-',
  '5.11+',
  '5.12-',
  '5.12+',
  '5.13-',
  '5.13+',
  '5.14-',
  '5.14+',
  '5.15-',
  '5.15+',
  '5.?',
] as ClimbingGrade[];

/**
 * Simplification of yosemite decimal system.
 */
export const YOSEMITE_DECIMAL_SYSTEM_ROUTE_GRADE_SIMPLIFICATION = {
  5: '5',
  5.1: '5.1',
  5.2: '5.2',
  5.3: '5.3',
  5.4: '5.4',
  5.5: '5.5',
  5.6: '5.6',
  5.7: '5.7',
  '5.7+': '5.7',
  '5.8-': '5.8',
  5.8: '5.8',
  '5.8+': '5.8',
  '5.9-': '5.9',
  5.9: '5.9',
  '5.9+': '5.9',
  '5.10a': '5.10-',
  '5.10-': '5.10-',
  '5.10a/b': '5.10-',
  '5.10b': '5.10-',
  '5.10': '5.10-',
  '5.10b/c': '5.10+',
  '5.10c': '5.10+',
  '5.10+': '5.10+',
  '5.10c/d': '5.10+',
  '5.10d': '5.10+',
  '5.11a': '5.11-',
  '5.11-': '5.11-',
  '5.11a/b': '5.11-',
  '5.11b': '5.11-',
  5.11: '5.11-',
  '5.11b/c': '5.11+',
  '5.11c': '5.11+',
  '5.11+': '5.11+',
  '5.11c/d': '5.11+',
  '5.11d': '5.11+',
  '5.12a': '5.12-',
  '5.12-': '5.12-',
  '5.12a/b': '5.12-',
  '5.12b': '5.12-',
  5.12: '5.12-',
  '5.12b/c': '5.12-',
  '5.12c': '5.12+',
  '5.12+': '5.12+',
  '5.12c/d': '5.12+',
  '5.12d': '5.12+',
  '5.13a': '5.13-',
  '5.13-': '5.13-',
  '5.13a/b': '5.13-',
  '5.13b': '5.13-',
  5.13: '5.13-',
  '5.13b/c': '5.13+',
  '5.13c': '5.13+',
  '5.13+': '5.13+',
  '5.13c/d': '5.13+',
  '5.13d': '5.13+',
  '5.14a': '5.14-',
  '5.14-': '5.14-',
  '5.14a/b': '5.14-',
  '5.14b': '5.14-',
  5.14: '5.14-',
  '5.14b/c': '5.14+',
  '5.14c': '5.14+',
  '5.14+': '5.14+',
  '5.14c/d': '5.14+',
  '5.14d': '5.14+',
  '5.15a': '5.15-',
  '5.15-': '5.15-',
  '5.15a/b': '5.15-',
  '5.15b': '5.15-',
  5.15: '5.15-',
  '5.15b/c': '5.15-',
  '5.15c': '5.15+',
  '5.15+': '5.15+',
  '5.15c/d': '5.15+',
  '5.15d': '5.15+',
  '5.?': '5.15+',
} as Record<ClimbingGrade, ClimbingGrade>;

/**
 * Font boulder grades in order.
 */
export const FONT_BOULDER_GRADES = [
  '3',
  '4-',
  '4',
  '4+',
  '5-',
  '5',
  '5+',
  '6a',
  '6a+',
  '6b',
  '6b+',
  '6c',
  '6c+',
  '7a',
  '7a+',
  '7b',
  '7b+',
  '7c',
  '7c+',
  '8a',
  '8a+',
  '8b',
  '8b+',
  '8c',
  '8c+',
  '9a',
] as ClimbingGrade[];

/**
 * Just the simple font grades.
 */
export const FONT_BOULDER_SIMPLE_GRADES = [
  '3',
  '4',
  '5',
  '6a',
  '6b',
  '6c',
  '7a',
  '7b',
  '7c',
  '8a',
  '8b',
  '8c',
  '9a',
] as ClimbingGrade[];

/**
 * Simplification of font grades.
 */
export const FONT_BOULDER_GRADE_SIMPLIFICATION = {
  3: '3',
  '4-': '4',
  4: '4',
  '4+': '4',
  '5-': '5',
  5: '5',
  '5+': '5',
  '6a': '6a',
  '6a+': '6a',
  '6b': '6b',
  '6b+': '6b',
  '6c': '6c',
  '6c+': '6c',
  '7a': '7a',
  '7a+': '7a',
  '7b': '7b',
  '7b+': '7b',
  '7c': '7c',
  '7c+': '7c',
  '8a': '8a',
  '8a+': '8a',
  '8b': '8b',
  '8b+': '8b',
  '8c': '8c',
  '8c+': '8c',
  '9a': '9a',
} as Record<ClimbingGrade, ClimbingGrade>;

/**
 * V-Scale boulder grades in order.
 */
export const V_SCALE_GRADES = [
  'V-Easy',
  'V0-',
  'V0',
  'V0+',
  'V0-1',
  'V1-',
  'V1',
  'V1+',
  'V1-2',
  'V2-',
  'V2',
  'V2+',
  'V2-3',
  'V3-',
  'V3',
  'V3+',
  'V3-4',
  'V4-',
  'V4',
  'V4+',
  'V4-5',
  'V5-',
  'V5',
  'V5+',
  'V5-6',
  'V6-',
  'V6',
  'V6+',
  'V6-7',
  'V7-',
  'V7',
  'V7+',
  'V7-8',
  'V8-',
  'V8',
  'V8+',
  'V8-9',
  'V9-',
  'V9',
  'V9+',
  'V9-10',
  'V10-',
  'V10',
  'V10+',
  'V10-11',
  'V11-',
  'V11',
  'V11+',
  'V11-12',
  'V12-',
  'V12',
  'V12+',
  'V12-13',
  'V13-',
  'V13',
  'V13+',
  'V13-14',
  'V14-',
  'V14',
  'V14+',
  'V14-15',
  'V15-',
  'V15',
  'V15+',
  'V15-16',
  'V16-',
  'V16',
  'V16+',
  'V16-17',
  'V17-',
  'V17',
] as ClimbingGrade[];

/**
 * Just the simple V-Scale grades.
 */
export const V_SCALE_SIMPLE_GRADES = [
  'V-Easy',
  'V0',
  'V1',
  'V2',
  'V3',
  'V4',
  'V5',
  'V6',
  'V7',
  'V8',
  'V9',
  'V10',
  'V11',
  'V12',
  'V13',
  'V14',
  'V15',
  'V16',
  'V17',
] as ClimbingGrade[];

/**
 * Simplification of V-Grades.
 */
export const V_SCALE_GRADE_SIMPLIFICATION = {
  VB: 'V-Easy',
  'V-easy': 'V-Easy',
  'V-Easy': 'V-Easy',
  'V0-': 'V0',
  V0: 'V0',
  'V0+': 'V0',
  'V0-1': 'V0',
  'V1-': 'V1',
  V1: 'V1',
  'V1+': 'V1',
  'V1-2': 'V1',
  'V2-': 'V2',
  V2: 'V2',
  'V2+': 'V2',
  'V2-3': 'V2',
  'V3-': 'V3',
  V3: 'V3',
  'V3+': 'V3',
  'V3-4': 'V3',
  'V4-': 'V4',
  V4: 'V4',
  'V4+': 'V4',
  'V4-5': 'V4',
  'V5-': 'V5',
  V5: 'V5',
  'V5+': 'V5',
  'V5-6': 'V5',
  'V6-': 'V6',
  V6: 'V6',
  'V6+': 'V6',
  'V6-7': 'V6',
  'V7-': 'V7',
  V7: 'V7',
  'V7+': 'V7',
  'V7-8': 'V7',
  'V8-': 'V8',
  V8: 'V8',
  'V8+': 'V8',
  'V8-9': 'V8',
  'V9-': 'V9',
  V9: 'V9',
  'V9+': 'V9',
  'V9-10': 'V9',
  'V10-': 'V10',
  V10: 'V10',
  'V10+': 'V10',
  'V10-11': 'V10',
  'V11-': 'V11',
  V11: 'V11',
  'V11+': 'V11',
  'V11-12': 'V11',
  'V12-': 'V12',
  V12: 'V12',
  'V12+': 'V12',
  'V12-13': 'V12',
  'V13-': 'V13',
  V13: 'V13',
  'V13+': 'V13',
  'V13-14': 'V13',
  'V14-': 'V14',
  V14: 'V14',
  'V14+': 'V14',
  'V14-15': 'V14',
  'V15-': 'V15',
  V15: 'V15',
  'V15+': 'V15',
  'V15-16': 'V15',
  'V16-': 'V16',
  V16: 'V16',
  'V16+': 'V16',
  'V16-17': 'V16',
  'V17-': 'V17',
  V17: 'V17',
} as Record<ClimbingGrade, ClimbingGrade>;

/**
 * Climbing grades and conversions in order.
 */
export const CLIMBING_GRADES = [
  {
    french: '?',
    'yosemite-decimal-system': '5.?',
    font: '?',
    'v-scale': 'V?',
  },
  {
    french: '2-',
    'yosemite-decimal-system': '5',
  },
  {
    french: '2',
    'yosemite-decimal-system': '5.1',
  },
  {
    french: '3',
    'yosemite-decimal-system': '5.2',
    font: '3',
    'v-scale': 'V-Easy',
  },
  {
    french: '3+',
    'yosemite-decimal-system': '5.3',
  },
  {
    french: '4a',
    'yosemite-decimal-system': '5.4',
    font: '4-',
    'v-scale': 'V0-',
  },
  {
    french: '4b',
    'yosemite-decimal-system': '5.5',
    font: '4',
    'v-scale': 'V0',
  },
  {
    font: '4+',
    'v-scale': 'V0',
  },
  {
    french: '4c',
    'yosemite-decimal-system': '5.6',
    font: '4+',
    'v-scale': 'V0+',
  },
  {
    font: '4+',
    'v-scale': 'V0-1',
  },
  {
    french: '5a',
    'yosemite-decimal-system': '5.7',
    font: '5-',
    'v-scale': 'V1-',
  },
  {
    french: '5a',
    'yosemite-decimal-system': '5.7+',
  },
  {
    french: '5b',
    'yosemite-decimal-system': '5.8-',
    font: '5',
    'v-scale': 'V1',
  },
  {
    french: '5b',
    'yosemite-decimal-system': '5.8',
    font: '5',
    'v-scale': 'V1+',
  },
  {
    french: '5b',
    'yosemite-decimal-system': '5.8+',
    font: '5',
    'v-scale': 'V1-2',
  },
  {
    french: '5c',
    'yosemite-decimal-system': '5.9-',
    font: '5+',
    'v-scale': 'V2-',
  },
  {
    french: '5c',
    'yosemite-decimal-system': '5.9',
    font: '5+',
    'v-scale': 'V2',
  },
  {
    french: '5c',
    'yosemite-decimal-system': '5.9+',
    font: '5+',
    'v-scale': 'V2+',
  },
  {
    font: '5+',
    'v-scale': 'V2-3',
  },
  {
    french: '6a',
    'yosemite-decimal-system': '5.10a',
    font: '6a',
    'v-scale': 'V3-',
  },
  {
    french: '6a',
    'yosemite-decimal-system': '5.10-',
    font: '6a',
    'v-scale': 'V3',
  },
  {
    french: '6a+',
    'yosemite-decimal-system': '5.10a/b',
    font: '6a+',
    'v-scale': 'V3+',
  },
  {
    french: '6a+',
    'yosemite-decimal-system': '5.10b',
    font: '6a+',
    'v-scale': 'V3-4',
  },
  {
    french: '6b',
    'yosemite-decimal-system': '5.10',
    font: '6b',
    'v-scale': 'V4-',
  },
  {
    french: '6b',
    'yosemite-decimal-system': '5.10b/c',
    font: '6b',
    'v-scale': 'V4',
  },
  {
    french: '6b',
    'yosemite-decimal-system': '5.10c',
  },
  {
    french: '6b+',
    'yosemite-decimal-system': '5.10+',
    font: '6b+',
    'v-scale': 'V4+',
  },
  {
    french: '6b+',
    'yosemite-decimal-system': '5.10c/d',
    font: '6b+',
    'v-scale': 'V4-5',
  },
  {
    french: '6b+',
    'yosemite-decimal-system': '5.10d',
  },
  {
    french: '6c',
    'yosemite-decimal-system': '5.11a',
    font: '6c',
    'v-scale': 'V5-',
  },
  {
    french: '6c',
    'yosemite-decimal-system': '5.11-',
    font: '6c',
    'v-scale': 'V5',
  },
  {
    french: '6c',
    'yosemite-decimal-system': '5.11a/b',
  },
  {
    french: '6c',
    'yosemite-decimal-system': '5.11b',
  },
  {
    french: '6c+',
    'yosemite-decimal-system': '5.11',
    font: '6c+',
    'v-scale': 'V5+',
  },
  {
    french: '6c+',
    'yosemite-decimal-system': '5.11b/c',
    font: '6c+',
    'v-scale': 'V5-6',
  },
  {
    french: '6c+',
    'yosemite-decimal-system': '5.11c',
  },
  {
    french: '7a',
    'yosemite-decimal-system': '5.11+',
    font: '7a',
    'v-scale': 'V6-',
  },
  {
    french: '7a',
    'yosemite-decimal-system': '5.11c/d',
    font: '7a',
    'v-scale': 'V6',
  },
  {
    french: '7a',
    'yosemite-decimal-system': '5.11d',
    font: '7a',
    'v-scale': 'V6+',
  },
  {
    french: '7a+',
    'yosemite-decimal-system': '5.12a',
    font: '7a+',
    'v-scale': 'V6-7',
  },
  {
    french: '7a+',
    'yosemite-decimal-system': '5.12-',
    font: '7a+',
    'v-scale': 'V7-',
  },
  {
    font: '7a+',
    'v-scale': 'V7',
  },
  {
    font: '7a+',
    'v-scale': 'V7+',
  },
  {
    french: '7b',
    'yosemite-decimal-system': '5.12a/b',
    font: '7b',
    'v-scale': 'V7-8',
  },
  {
    french: '7b',
    'yosemite-decimal-system': '5.12b',
    font: '7b',
    'v-scale': 'V8-',
  },
  {
    font: '7b',
    'v-scale': 'V8',
  },
  {
    french: '7b+',
    'yosemite-decimal-system': '5.12',
    font: '7b+',
    'v-scale': 'V8+',
  },
  {
    french: '7b+',
    'yosemite-decimal-system': '5.12b/c',
    font: '7b+',
    'v-scale': 'V8-9',
  },
  {
    french: '7b+',
    'yosemite-decimal-system': '5.12c',
  },
  {
    french: '7c',
    'yosemite-decimal-system': '5.12+',
    font: '7c',
    'v-scale': 'V9-',
  },
  {
    french: '7c',
    'yosemite-decimal-system': '5.12c/d',
    font: '7c',
    'v-scale': 'V9',
  },
  {
    french: '7c',
    'yosemite-decimal-system': '5.12d',
    font: '7c',
    'v-scale': 'V9+',
  },
  {
    french: '7c+',
    'yosemite-decimal-system': '5.13a',
    font: '7c+',
    'v-scale': 'V9-10',
  },
  {
    french: '7c+',
    'yosemite-decimal-system': '5.13-',
    font: '7c+',
    'v-scale': 'V10-',
  },
  {
    font: '7c+',
    'v-scale': 'V10',
  },
  {
    font: '7c+',
    'v-scale': 'V10+',
  },
  {
    french: '8a',
    'yosemite-decimal-system': '5.13a/b',
    font: '8a',
    'v-scale': 'V10-11',
  },
  {
    french: '8a',
    'yosemite-decimal-system': '5.13b',
    font: '8a',
    'v-scale': 'V11-',
  },
  {
    french: '8a',
    'yosemite-decimal-system': '5.13',
    font: '8a',
    'v-scale': 'V11',
  },
  {
    font: '8a',
    'v-scale': 'V11+',
  },
  {
    french: '8a+',
    'yosemite-decimal-system': '.13b/c',
    font: '8a+',
    'v-scale': 'V11-12',
  },
  {
    french: '8a+',
    'yosemite-decimal-system': '5.13c',
    font: '8a+',
    'v-scale': 'V12-',
  },
  {
    font: '8a+',
    'v-scale': 'V12',
  },
  {
    font: '8a+',
    'v-scale': 'V12+',
  },
  {
    french: '8b',
    'yosemite-decimal-system': '5.13+',
    font: '8b',
    'v-scale': 'V12-13',
  },
  {
    french: '8b',
    'yosemite-decimal-system': '5.13c/d',
    font: '8b',
    'v-scale': 'V13-',
  },
  {
    french: '8b',
    'yosemite-decimal-system': '5.13d',
    font: '8b',
    'v-scale': 'V13',
  },
  {
    font: '8b',
    'v-scale': 'V13+',
  },
  {
    french: '8b+',
    'yosemite-decimal-system': '5.14a',
    font: '8b+',
    'v-scale': 'V13-14',
  },
  {
    french: '8b+',
    'yosemite-decimal-system': '5.14-',
    font: '8b+',
    'v-scale': 'V14-',
  },
  {
    font: '8b+',
    'v-scale': 'V14',
  },
  {
    font: '8b+',
    'v-scale': 'V14+',
  },
  {
    french: '8c',
    'yosemite-decimal-system': '5.14a/b',
    font: '8c',
    'v-scale': 'V14-15',
  },
  {
    french: '8c',
    'yosemite-decimal-system': '5.14b',
    font: '8c',
    'v-scale': 'V15-',
  },
  {
    font: '8c',
    'v-scale': 'V15',
  },
  {
    font: '8c',
    'v-scale': 'V15+',
  },
  {
    french: '8c+',
    'yosemite-decimal-system': '5.14',
    font: '8c+',
    'v-scale': 'V15-16',
  },
  {
    french: '8c+',
    'yosemite-decimal-system': '5.14b/c',
    font: '8c+',
    'v-scale': 'V16-',
  },
  {
    french: '8c+',
    'yosemite-decimal-system': '5.14c',
    font: '8c+',
    'v-scale': 'V16',
  },
  {
    font: '8c+',
    'v-scale': 'V16+',
  },
  {
    french: '9a',
    'yosemite-decimal-system': '5.14+',
    font: '9a',
    'v-scale': 'V16-17',
  },
  {
    french: '9a',
    'yosemite-decimal-system': '5.14c/d',
    font: '9a',
    'v-scale': 'V17-',
  },
  {
    french: '9a',
    'yosemite-decimal-system': '5.14d',
    font: '9a',
    'v-scale': 'V17',
  },
  {
    french: '9a+',
    'yosemite-decimal-system': '5.15a',
  },
  {
    french: '9a+',
    'yosemite-decimal-system': '5.15-',
  },
  {
    french: '9a+',
    'yosemite-decimal-system': '5.15a/b',
  },
  {
    french: '9b',
    'yosemite-decimal-system': '5.15b',
  },
  {
    french: '9b',
    'yosemite-decimal-system': '5.15',
  },
  {
    french: '9b+',
    'yosemite-decimal-system': '5.15c',
  },
  {
    french: '9b+',
    'yosemite-decimal-system': '5.15+',
  },
  {
    french: '9c',
    'yosemite-decimal-system': '5.15c/d',
  },
  {
    french: '9c',
    'yosemite-decimal-system': '5.15d',
  },
] as Dictionary<ClimbingGrade>[];
