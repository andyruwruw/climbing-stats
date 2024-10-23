// Packages
import {
  Chart,
  ChartType,
} from 'chart.js';

// Local Imports
import { ChartConfig as ChartConfigClass } from './config';
import { ChartData as ChartDataClass } from './data';
import { ChartOptions as ChartOptionsClass } from './options';

/**
 * Creates a new chart.js chart.
 */
export const createChart = (
  canvas: HTMLCanvasElement,
  type = 'line' as ChartType,
  data = new ChartDataClass(),
  options = new ChartOptionsClass(),
): Chart => {
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  const config = new ChartConfigClass(
    type,
    data,
    options,
  );

  return new Chart(
    context,
    config.export(),
  );
};
