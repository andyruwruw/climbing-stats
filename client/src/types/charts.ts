import { ClimbingGrade } from './climbs';

/**
 * Types of chart.js charts.
 */
export type ChartType = 'line'
| 'area'
| 'bollinger'
| 'bar'
| 'horizontal-bar'
| 'dot'
| 'geo'
| 'geo-sphere'
| 'usa'
| 'ticks'
| 'calendar'
| 'contour'
| 'density'
| 'tree';

export interface TickPlotEntry {
  grade: ClimbingGrade;

  index: number;

  attempt: number;

  hung: number;

  flash: number;

  send: number;

  dayFlash: number;

  onsight: number;

  project: number;

  touch: number;

  unknown: number;
}
