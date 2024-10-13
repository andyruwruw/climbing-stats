// Local Imports

// Regex.
const IS_AUDIO = /\.(?:wav|mp3)$/i;

export const FIND_NUMBERS = /([0-9]+)/g;

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
