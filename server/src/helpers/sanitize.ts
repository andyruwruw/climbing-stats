// Local Imports
import {
  ANNOTATION_INTERVAL,
  ANNOTATION_STYLE,
  STUDY_DESCRIPTOR_TYPE,
  STUDY_SOUND_TYPE,
} from '../config';

// Regex.
const IS_AUDIO = /\.(?:wav|mp3)$/i;

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
 * Tests if an array of StudyAnnotationStyles contains a valid value.
 *
 * @param {any[]} values Values in question.
 * @returns {boolean} Whether the array contains a valid value.
 */
export const containsAValidStudyAnnotationStyle = (values: any[]): boolean => {
  for (let i = 0; i < values.length; i += 1) {
    if (isStudyAnnotationStyle(values[i])) {
      return true;
    }
  }
  return false;
};

/**
 * Tests if a value is a valid StudyAnnotationStyle.
 *
 * @param {any} value Value in quesiton.
 * @returns {boolean} Whether a value is a valid StudyAnnotationStyle.
 */
export const isStudyAnnotationStyle = (value: any): boolean => {
  if (typeof value !== 'object') {
    return false;
  }

  if (!('style' in value) || !(Object.values(ANNOTATION_STYLE).includes(value.style))) {
    return false;
  }

  if (!('priority' in value) || typeof value.priority !== 'number') {
    return false;
  }

  if (!('order' in value) || typeof value.order !== 'number') {
    return false;
  }

  if (!('instances' in value) || typeof value.instances !== 'number') {
    return false;
  }

  return true;
};

/**
 * Tests if an array of StudyAnnotationIntervals contains a valid value.
 *
 * @param {any[]} values Values in question.
 * @returns {boolean} Whether the array contains a valid value.
 */
export const containsAValidStudyAnnotationInterval = (values: any[]): boolean => {
  for (let i = 0; i < values.length; i += 1) {
    if (isStudyAnnotationInterval(values[i])) {
      return true;
    }
  }
  return false;
};

/**
 * Tests if a value is a valid StudyAnnotationInterval.
 *
 * @param {any} value Value in quesiton.
 * @returns Whether a value is a valid StudyAnnotationInterval.
 */
export const isStudyAnnotationInterval = (value: any): boolean => {
  if (typeof value !== 'object') {
    return false;
  }

  if (!('interval' in value) || !(Object.values(ANNOTATION_INTERVAL).includes(value.interval))) {
    return false;
  }

  if (!('priority' in value) || typeof value.priority !== 'number') {
    return false;
  }

  if (!('order' in value) || typeof value.order !== 'number') {
    return false;
  }

  if (!('instances' in value) || typeof value.instances !== 'number') {
    return false;
  }

  return true;
};

/**
 * Tests if an array of StudyDescriptors contains a valid value.
 *
 * @param {any[]} values Values in question.
 * @returns {boolean} Whether the array contains a valid value.
 */
export const containsAValidStudyDescriptor = (values: any[]): boolean => {
  for (let i = 0; i < values.length; i += 1) {
    if (isStudyDescriptor(values[i])) {
      return true;
    }
  }
  return false;
};

/**
 * Tests if a value is a valid StudyDescriptor.
 *
 * @param {any} value Value in quesiton.
 * @returns Whether a value is a valid StudyDescriptor.
 */
export const isStudyDescriptor = (value: any): boolean => {
  if (typeof value !== 'object') {
    return false;
  }

  if (!('type' in value) || !(Object.values(STUDY_DESCRIPTOR_TYPE).includes(value.type))) {
    return false;
  }

  if (!('id' in value) || typeof value.id !== 'string') {
    return false;
  }

  if (!('order' in value) || typeof value.order !== 'number') {
    return false;
  }

  if (!('priority' in value) || typeof value.priority !== 'number') {
    return false;
  }

  return true;
};

/**
 * Tests if an array of StudySounds contains a valid value.
 *
 * @param {any[]} values Values in question.
 * @returns {boolean} Whether the array contains a valid value.
 */
export const containsAValidStudySound = (values: any[]): boolean => {
  for (let i = 0; i < values.length; i += 1) {
    if (isStudySound(values[i])) {
      return true;
    }
  }
  return false;
};

/**
 * Tests if a value is a valid StudySound.
 *
 * @param {any} value Value in quesiton.
 * @returns Whether a value is a valid StudySound.
 */
export const isStudySound = (value: any): boolean => {
  if (typeof value !== 'object') {
    return false;
  }

  if (!('type' in value) || !(Object.values(STUDY_SOUND_TYPE).includes(value.type))) {
    return false;
  }

  if (!('id' in value) || typeof value.id !== 'string') {
    return false;
  }

  if (!('order' in value) || typeof value.order !== 'number') {
    return false;
  }

  if (!('priority' in value) || typeof value.priority !== 'number') {
    return false;
  }

  return true;
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
