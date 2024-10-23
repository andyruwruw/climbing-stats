// Packages
import {
  BubbleDataPoint,
  ChartData as ChartDataInterface,
  ChartDataset,
  ChartTypeRegistry,
  Point,
} from 'chart.js';

// Local Imports
import { ChartDataset as CustomChartDataset } from './dataset';
import { generatePositionalEnding } from '..';

// Types
import { DataLabelType } from '../../../types/charts';

/**
 * Data for chart.js.
 */
export class ChartData {
  /**
   * Type of labels.
   *
   * @type {DataLabelType}
   */
  _labelType: DataLabelType = 'percents';

  /**
   * Labels associated with the data.
   */
  _labels: string[] = [];

  /**
   * Datasets for chart.
   */
  _datasets: CustomChartDataset[] = [];

  constructor(
    datasets: CustomChartDataset[] = [],
    labelType: DataLabelType = 'percents',
  ) {
    this._datasets = datasets;
    this._labelType = labelType;
  }

  /**
   * Gets labels, generates them if needed.
   *
   * @returns {string[]} Labels.
   */
  _retrieveLabels(): string[] {
    if (!this._labels.length) {
      this._labels = [] as string[];

      if (this._labelType === 'percents') {
        this._generatePercentLabels();
      }
    }

    return this._labels;
  }

  /**
   * Sets labels as dates.
   */
  _generateDateLabels(): void {
    let dataset: CustomChartDataset | undefined;

    for (let i = 0; i < this._datasets.length; i += 1) {
      if (!dataset || this._datasets[i].size() > dataset.size()) {
        dataset = this._datasets[i];
      }
    }

    if (!dataset) {
      return;
    }

    for (let i = 0; i < dataset.size(); i += 1) {
      const point = dataset.get(i);

      if (!point) {
        this._labels.push('Unknown');
        // eslint-disable-next-line no-continue
        continue;
      }

      const date = new Date(point.x);

      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();

      if (this._labelType === 'week') {
        const week = Math.floor(date.getDate() / 7) + 1;
        const positional = generatePositionalEnding(week);

        this._labels.push(`${week}${positional} week of ${month} ${year}`);
      } else if (this._labelType === 'month') {
        this._labels.push(`${month} ${year}`);
      } else if (this._labelType === 'year') {
        this._labels.push(`${year}`);
      } else {
        this._labels.push(`${month} ${date.getDate()}, ${year}`);
      }
    }
  }

  /**
   * Sets labels as percentages.
   */
  _generatePercentLabels(): void {
    for (let i = 0; i < this._largestSize(); i += 1) {
      const percent = Math.round((i / this._largestSize()) * 100);
      this._labels.push(`${percent}%`);
    }
  }

  /**
   * Finds the largest dataset.
   *
   * @returns {number} Largest dataset length.
   */
  _largestSize(): number {
    let largest = 0;

    this._datasets.forEach((dataset) => {
      if (dataset._data.length > largest) {
        largest = dataset._data.length;
      }
    });

    return largest;
  }

  /**
   * Exports to object used by chart.js.
   *
   * @returns {ChartConfiguration} Chart data.
   */
  export(): ChartDataInterface {
    return {
      labels: this._retrieveLabels(),
      datasets: this._datasets.map((dataset) => dataset.export()) as ChartDataset<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[]>[],
    };
  }

  /**
   * Retrieves earliest date in data.
   *
   * @returns {Date | null} Earliest date in data.
   */
  getEarliestDate(): Date | null {
    let earliest = null as Date | null;

    for (let i = 0; i < this._datasets.length; i += 1) {
      for (let j = 0; j < this._datasets[i].size(); j += 1) {
        const item = this._datasets[i].get(j);

        const date = new Date(item?.x || 0);

        if (!earliest || date.getTime() < earliest.getTime()) {
          earliest = date;
        }
      }
    }

    return earliest || null;
  }

  /**
   * Retrieves latest date in data.
   *
   * @returns {Date | null} Latest date in data.
   */
  getLatestDate(): Date | null {
    let latest = null as Date | null;

    for (let i = 0; i < this._datasets.length; i += 1) {
      for (let j = 0; j < this._datasets[i].size(); j += 1) {
        const item = this._datasets[i].get(j);

        const date = new Date(item?.x || 0);

        if (!latest || date.getTime() > latest.getTime()) {
          latest = date;
        }
      }
    }

    return latest || null;
  }

  /**
   * Gets the span of years in the data.
   *
   * @returns {number} Span of years.
   */
  getYearSpan(): number {
    let earliest = null as Date | null;
    let latest = null as Date | null;

    for (let i = 0; i < this._datasets.length; i += 1) {
      for (let j = 0; j < this._datasets[i].size(); j += 1) {
        const item = this._datasets[i].get(j);

        const date = new Date(item?.x || 0);

        if (!earliest || date.getTime() < earliest.getTime()) {
          earliest = date;
        }
        if (!latest || date.getTime() < latest.getTime()) {
          latest = date;
        }
      }
    }

    return (latest?.getFullYear() || 0) - (earliest?.getFullYear() || 0);
  }
}
