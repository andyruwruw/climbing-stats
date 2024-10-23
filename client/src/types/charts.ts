// Packages
import {
  Scriptable,
  ScriptableContext,
} from 'chart.js';

// Local Imports
import { DateString } from '.';

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

/**
 * Types of labels for a dataset.
 */
export type DataLabelType = 'percents'
| 'week'
| 'year'
| 'month'
| 'date';

/**
 * Point data with X and Y.
 */
export interface CartesianPoint {
  /**
   * X coordinate of the point.
   */
  x: number | string | DateString;

  /**
   * Y coordinate of the point.
   */
  y: number;
}

/**
 * Data points.
 */
export type RawDataset = number[] | CartesianPoint[] | Record<string, number>;

/**
 * Dataset data for Chart.js
 */
export interface DatasetExport {
  /**
   * Background color of the canvas.
   */
  backgroundColor: string | CanvasGradient;

  /**
   * Chart border color.
   */
  borderColor: string;

  /**
   * Chart border width.
   */
  borderWidth: number;

  /**
   * Cubic interpolation mode.
   */
  cubicInterpolationMode: Scriptable<'default' | 'monotone', ScriptableContext<'line'>>;

  /**
   * Chart data.
   */
  data: CartesianPoint[];

  /**
   * Whether to fill the area under the line.
   */
  fill: boolean;

  /**
   * Label of the dataset.
   */
  label: string;

  /**
   * Tension the line should hold.
   */
  tension: number;

  /**
   * Chart point background color.
   */
  pointBackgroundColor: string;

  /**
   * Chart point border width.
   */
  pointBorderWidth: number;

  /**
   * Chart point hit radius.
   */
  pointHitRadius: number;

  /**
   * Chart point hover background color.
   */
  pointHoverBackgroundColor: string;

  /**
   * Chart point hover border color.
   */
  pointHoverBorderColor: string;

  /**
   * Chart point hover radius.
   */
  pointHoverRadius: number;

  /**
   * Chart point radius.
   */
  pointRadius: number;
}
