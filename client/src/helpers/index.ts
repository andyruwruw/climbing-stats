/**
 * Filters out unique items.
 *
 * @param {any[]} list List to filter out.
 * @returns {any[]} Filtered list.
 */
export const filterUnique = (list: any[]): any[] => (list.filter((
  value: any,
  index: number,
  array: any[],
): boolean => (array.indexOf(value) === index)));
