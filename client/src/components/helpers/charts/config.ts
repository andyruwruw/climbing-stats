// Packages
import {
  ChartConfiguration,
  ChartType,
} from 'chart.js';

// Local Imports
import { ChartData } from './data';
import { ChartOptions } from './options';

/**
 * Configuration for chart.js.
 */
export class ChartConfig {
  /**
   * Chart chart.js type.
   *
   * @type {ChartType}
   */
  _type: ChartType = 'line' as ChartType;

  /**
   * Chart data.
   */
  _data: ChartData = new ChartData();

  /**
   * Other options.
   */
  _options: ChartOptions = new ChartOptions();

  constructor(
    type = undefined as undefined | ChartType,
    data = undefined as undefined | ChartData,
    options = undefined as undefined | ChartOptions,
  ) {
    this._type = type ? type as ChartType : 'line';
    this._data = data ? data as ChartData : new ChartData();
    this._options = options ? options as ChartOptions : new ChartOptions();
  }

  /**
   * Exports to object used by chart.js.
   *
   * @returns {ChartConfiguration} Chart configuration.
   */
  export(): ChartConfiguration {
    return {
      type: this._type,
      data: this._data.export(),
      options: this._options.export(),
    };
  }
}
