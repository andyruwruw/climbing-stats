// Local Imports
import {
  CHART_PERIOD,
  MILLISECONDS_IN_DAY,
  MILLISECONDS_IN_YEAR
} from '../config';

// Types
import {
  ChartPeriod,
  Dictionary,
  SessionTimelineEntry,
} from '../types';
import { Session } from '../types/sessions';

/**
 * Turns a chart period into a numerical value.
 *
 * @param {ChartPeriod} period What cluster the chart entries represent.
 * @returns {number} Milliseconds in the period.
 */
export const getPeriodDurationInMilliseconds = (period: ChartPeriod): number => {
  switch (period) {
    case CHART_PERIOD.FEW_DAYS:
      return MILLISECONDS_IN_DAY * 3;
    case CHART_PERIOD.WEEKLY:
      return MILLISECONDS_IN_DAY * 7;
    case CHART_PERIOD.MONTHLY:
      return MILLISECONDS_IN_YEAR / 12;
    case CHART_PERIOD.YEARLY:
      return MILLISECONDS_IN_YEAR;
    default:
      return MILLISECONDS_IN_DAY;
  }
}

/**
 * Adds a session to the timeline.
 *
 * @param {SessionTimelineEntry[]} timeline The timeline so far.
 * @param {number} start Start of the timeline.
 * @param {ChartPeriod} period What cluster the chart entries represent.
 * @param {Session} session The session to add.
 * @returns {void}
 */
export const addSessionToTimeline = (
  timeline: SessionTimelineEntry[],
  start: number,
  period: ChartPeriod,
  session: Session,
): void => {
  if (!session || !session.date || session.date === -1) {
    return;
  }

  const date = session.date;
  const index = Math.floor((date - start) / getPeriodDurationInMilliseconds(period));

  while (timeline.length < index + 1) {
    timeline.push({
      date: start + (MILLISECONDS_IN_DAY * (timeline.length - 1)),
      hours: 0,
      sessions: 0,
    });
  }

  timeline[index].sessions += 1;
  timeline[index].hours += session.duration;
}

/**
 * Adds a session to the location timeline.
 *
 * @param {SessionTimelineEntry[]} timeline The timeline so far.
 * @param {number} start Start of the timeline.
 * @param {ChartPeriod} period What cluster the chart entries represent.
 * @param {Session} session The session to add.
 * @param {Dictionary<boolean> | null} [map = null] Map of locations.
 * @returns {void}
 */
export const addSessionToLocationTimeline = (
  timeline: Dictionary<SessionTimelineEntry | number>[],
  start: number,
  period: ChartPeriod,
  session: Session,
  map = null as Dictionary<boolean> | null,
): void => {
  if (!session
    || !session.date
    || session.date === -1
    || !session.location) {
    return;
  }

  const date = session.date;
  const index = Math.floor((date - start) / getPeriodDurationInMilliseconds(period));

  while (timeline.length < index + 1) {
    timeline.push({ date: start + (MILLISECONDS_IN_DAY * (timeline.length - 1)) } as Dictionary<SessionTimelineEntry | number>);
  }

  const location = session.location;

  if (location in timeline[index]) {
    timeline[index][location] = {
      hours: 0,
      sessions: 0,
    } as SessionTimelineEntry;
  }

  if (map && !(location in map)) {
    map[location] = true;
  }

  (timeline[index][location] as SessionTimelineEntry).sessions += 1;
  (timeline[index][location] as SessionTimelineEntry).hours += session.duration;
}

/**
 * Adds a session to the partner timeline.
 *
 * @param {SessionTimelineEntry[]} timeline The timeline so far.
 * @param {number} start Start of the timeline.
 * @param {ChartPeriod} period What cluster the chart entries represent.
 * @param {Session} session The session to add.
 * @param {Dictionary<boolean> | null} [map = null] Map of partners.
 * @returns {void}
 */
export const addSessionToPartnerTimeline = (
  timeline: Dictionary<SessionTimelineEntry | number>[],
  start: number,
  period: ChartPeriod,
  session: Session,
  map = null as Dictionary<boolean> | null,
): void => {
  if (!session
    || !session.date
    || session.date === -1
    || !session.partners
    || !session.partners.length) {
    return;
  }

  const date = session.date;
  const index = Math.floor((date - start) / getPeriodDurationInMilliseconds(period));

  while (timeline.length < index + 1) {
    timeline.push({ date: start + (MILLISECONDS_IN_DAY * (timeline.length - 1)) } as Dictionary<SessionTimelineEntry | number>);
  }

  const partners = session.partners;

  for (let i = 0; i < partners.length; i += 1) {
    const partner = partners[i];

    if (partner in timeline[index]) {
      timeline[index][partner] = {
        hours: 0,
        sessions: 0,
      } as SessionTimelineEntry;
    }

    if (map && !(partner in map)) {
      map[partner] = true;
    }

    (timeline[index][partner] as SessionTimelineEntry).sessions += 1;
    (timeline[index][partner] as SessionTimelineEntry).hours += session.duration;
  }
}
