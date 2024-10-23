/**
 * Generates a positional ending for a number.
 *
 * @param {number} value Number to generate ending for.
 * @returns {string} Positional ending.
 */
export const generatePositionalEnding = (value: number): string => {
  const lastDigit = value % 10;

  if (lastDigit === 1) {
    return 'st';
  } if (lastDigit === 2) {
    return 'nd';
  } if (lastDigit === 3) {
    return 'rd';
  }

  return 'th';
};

/**
 * Regex to find date strings.
 */
export const DATE_STRING = /^\d{1,4}[-/]+\d{1,2}[-/]+\d{1,4}$/;
