// Packages
import moment from 'moment';

// Local Imports
import {
  MILLISECONDS_IN_DAY,
  MILLISECONDS_IN_HOUR,
  MILLISECONDS_IN_MINUTE,
  MILLISECONDS_IN_MONTH,
  MILLISECONDS_IN_SECOND,
  MILLISECONDS_IN_YEAR,
} from '../config';

/**
 * Formats a number with commas at thousand's place.
 *
 * @param {number} value Value to be formatted.
 * @returns {string} Value as a formatted string.
 */
export const numberWithCommas = (value: number): string => (value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));

/**
 * Formats a date to a string.
 *
 * @param {number} value Date value.
 * @returns {string} Readable date string.
 */
export const dateString = (value: number): string => (moment(value).format('MMMM Do YYYY'));

/**
 * Formats a date to a string.
 *
 * @param {number} value Date value.
 * @returns {string} Readable date string.
 */
export const dateStringSimple = (value: number): string => (moment(value).format('MM/DD/YY'));

/**
 * Formats a duration.
 *
 * @param {number} start Date value.
 * @param {number} end Date value.
 * @returns {string} Readable date string.
 */
export const durationString = (
  start: number,
  end: number,
): string => {
  const duration = moment(end).diff(moment(start));
  return moment.utc(duration).format('HH:mm:ss');
};

/**
 * Figures out time between two dates.
 *
 * @param {number} start Starting date.
 * @param {number} end Date ending with.
 * @param {boolean} years Show years.
 * @param {boolean} months Show months.
 * @param {boolean} days Show days.
 * @param {boolean} hours Show hours.
 * @param {boolean} minutes Show minutes.
 * @param {boolean} seconds Show seconds.
 * @returns {string} Years, Months, Days, Hours, Seconds
 */
export const daysSince = (
  start: number,
  end = Date.now(),
  years = true,
  months = true,
  days = true,
  hours = true,
  minutes = true,
  seconds = true,
): string => {
  const duration = moment.duration(moment(end).diff(moment(start)));

  const result = [];
  let remainder = 0;

  if (years && duration.years()) {
    result.push(`${numberWithCommas(duration.years())} Years`);
  } else if (!years && duration.years()) {
    remainder += duration.years() * MILLISECONDS_IN_YEAR;
  }

  if (months && duration.months()) {
    const value = duration.months() + Math.floor(remainder / MILLISECONDS_IN_MONTH);
    remainder -= Math.floor(remainder / MILLISECONDS_IN_MONTH) * MILLISECONDS_IN_MONTH;

    result.push(`${numberWithCommas(value)} Months`);
  } else if (!months && duration.months()) {
    remainder += duration.months() * MILLISECONDS_IN_MONTH;
  }

  if (days && (duration.days() || remainder)) {
    const value = duration.days() + Math.floor(remainder / MILLISECONDS_IN_DAY);
    remainder -= Math.floor(remainder / MILLISECONDS_IN_DAY) * MILLISECONDS_IN_DAY;

    result.push(`${numberWithCommas(value)} Days`);
  } else if (!days && duration.days()) {
    remainder += duration.days() * MILLISECONDS_IN_DAY;
  }

  if (hours && (duration.hours() || remainder)) {
    const value = duration.hours() + Math.floor(remainder / MILLISECONDS_IN_HOUR);
    remainder -= Math.floor(remainder / MILLISECONDS_IN_HOUR) * MILLISECONDS_IN_HOUR;

    result.push(`${numberWithCommas(value)} Hours`);
  } else if (!hours && duration.hours()) {
    remainder += duration.hours() * MILLISECONDS_IN_HOUR;
  }

  if (minutes && (duration.minutes() || remainder)) {
    const value = duration.minutes() + Math.floor(remainder / MILLISECONDS_IN_MINUTE);
    remainder -= Math.floor(remainder / MILLISECONDS_IN_MINUTE) * MILLISECONDS_IN_MINUTE;

    result.push(`${numberWithCommas(value)} Minutes`);
  } else if (!minutes && duration.minutes()) {
    remainder += duration.minutes() * MILLISECONDS_IN_MINUTE;
  }

  if (seconds && (duration.seconds() || remainder)) {
    const value = duration.seconds() + Math.floor(remainder / MILLISECONDS_IN_SECOND);

    result.push(`${numberWithCommas(value)} Seconds`);
  }

  return result.join(', ');
};
