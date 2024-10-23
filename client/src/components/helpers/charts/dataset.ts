// Packages
import {
  Scriptable,
  ScriptableContext,
} from 'chart.js';

// Types
import {
  CartesianPoint,
  DatasetExport,
  RawDataset,
} from '../../../types/charts';
import { RGBA } from '../../../types/css';

export class ChartDataset {
  /**
   * Override background color.
   *
   * @type {string | CanvasGradient}
   */
  _backgroundColor: string | CanvasGradient | undefined = undefined;

  /**
   * Override border color.
   *
   * @type {string}
   */
  _borderColor: string | undefined = undefined;

  /**
   * Width of the line.
   *
   * @type {number}
   */
  _borderWidth = 1;

  /**
   * Canvas element.
   *
   * @type {HTMLCanvasElement}
   */
  _canvas: HTMLCanvasElement;

  /**
   * Color of the dataset.
   *
   * @type {string}
   */
  _color = {
    r: 255,
    g: 0,
    b: 0,
    a: 255,
  } as RGBA;

  /**
   * Cubic interpolation.
   *
   * @type {string}
   */
  _cubicInterpolationMode = 'monotone';

  /**
   * Chart data.
   *
   * @type {CartesianPoint[]}
   */
  _data: CartesianPoint[];

  /**
   * Whether to fill area under line.
   *
   * @type {boolean}
   */
  _fill = true;

  /**
   * Label for the dataset.
   *
   * @type {string}
   */
  _label = 'Unnamed Dataset';

  /**
   * Line tension.
   *
   * @type {number}
   */
  _tension = 0.2;

  /**
   * Override point background color.
   *
   * @type {string}
   */
  _pointBackgroundColor: string | undefined = undefined;

  /**
   * Width of the point border.
   *
   * @type {number}
   */
  _pointBorderWidth = 0;

  /**
   * Radius of the hit detection area.
   *
   * @type {number}
   */
  _pointHitRadius = 8;

  /**
   * Override point hover background color.
   *
   * @type {string}
   */
  _pointHoverBackgroundColor: string | undefined = undefined;

  /**
   * Override point hover border color.
   *
   * @type {string}
   */
  _pointHoverBorderColor: string | undefined = undefined;

  /**
   * Radius of the point hover area.
   *
   * @type {number}
   */
  _pointHoverRadius = 2;

  /**
   * Radius of the point.
   *
   * @type {number}
   */
  _pointRadius = 0;

  constructor(
    canvas: HTMLCanvasElement,
    data: RawDataset,
  ) {
    this._canvas = canvas;
    this._data = ChartDataset._standardizeData(data);
  }

  /**
   * Turns color object into hex.
   *
   * @returns {string} Color hex value.
   */
  _colorAsHex(): string {
    return `#${this._color.r.toString(16)}${this._color.g.toString(16)}${this._color.b.toString(16)}`;
  }

  /**
   * Turns color object into hex.
   *
   * @returns {string} Color hex value.
   */
  _colorAsHexWithAlpha(): string {
    return `${this._colorAsHex()}${this._color.a.toString(16)}`;
  }

  /**
   * Retrieves overridden background color.
   *
   * @returns {string | CanvasGradient | undefined} Background color.
   */
  _getBackgroundColor(): string | CanvasGradient | undefined {
    return this._backgroundColor;
  }

  /**
   * Retrieves canvas context from canvas element.
   *
   * @returns {CanvasRenderingContext2D} Canvas context.
   */
  _getContext(): CanvasRenderingContext2D {
    return this._canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  /**
   * Resolves background if overridden or generates gradient.
   *
   * @returns {string | CanvasGradient} Background color.
   */
  _resolveBackgroundColor(): string | CanvasGradient {
    if (this._backgroundColor) {
      return this._backgroundColor;
    }

    const gradient = this._getContext().createLinearGradient(
      0,
      0,
      0,
      this._canvas.height,
    );
    gradient.addColorStop(
      0,
      `${this._colorAsHex()}${this._color.a === 255 ? 'aa' : this._color.a.toString(16)}}`,
    );
    gradient.addColorStop(
      1,
      `${this._colorAsHex()}00`,
    );

    return gradient;
  }

  /**
   * Resolves border if overridden or generates color.
   *
   * @returns {string} Border color.
   */
  _resolveBorderColor(): string {
    if (this._borderColor) {
      return this._borderColor;
    }

    return this._colorAsHexWithAlpha();
  }

  /**
   * Resolves point background if overridden or generates color.
   *
   * @returns {string} Point background color.
   */
  _resolvePointBackgroundColor(): string {
    if (this._pointBackgroundColor) {
      return this._pointBackgroundColor;
    }

    return `${this._colorAsHex()}00`;
  }

  /**
   * Resolves point hover background if overridden or generates color.
   *
   * @returns {string} Point hover background color.
   */
  _resolvePointHoverBackgroundColor(): string {
    if (this._pointHoverBackgroundColor) {
      return this._pointHoverBackgroundColor;
    }

    return '#ffffff';
  }

  /**
   * Resolves point hover border if overridden or generates color.
   *
   * @returns {string} Point hover border color.
   */
  _resolvePointHoverBorderColor(): string {
    if (this._pointHoverBorderColor) {
      return this._pointHoverBorderColor;
    }

    return '#ffffff';
  }

  /**
   * Sets overridden background color.
   *
   * @param {string | CanvasGradient} color Background color.
   */
  setBackgroundColor(color: string | CanvasGradient): void {
    this._backgroundColor = color;
  }

  /**
   * Sets color.
   *
   * @param {RGBA} color Color.
   */
  setColor(color: RGBA): void {
    if (!color
      || 'r' in color === false
      || 'g' in color === false
      || 'b' in color === false
      || 'a' in color === false) {
      this._color = {
        r: 255,
        g: 0,
        b: 0,
        a: 255,
      } as RGBA;
      return;
    }

    this._color = color;
  }

  /**
   * Standardizes data into a set of cartesian points.
   *
   * @param {RawDataset} data Any form of data.
   * @returns {CartesianPoint[]} Data as cartesian points.
   */
  static _standardizeData(data: RawDataset): CartesianPoint[] {
    if (data instanceof Array) {
      if (!data.length) {
        return [] as CartesianPoint[];
      }

      if (typeof data[0] === 'number') {
        return data.map((value, index) => ({
          x: index,
          y: value,
        } as CartesianPoint));
      }
      if ('x' in data[0] && 'y' in data[0]) {
        return data as CartesianPoint[];
      }
    }
    if (typeof data === 'object') {
      if (!Object.keys(data).length) {
        return [] as CartesianPoint[];
      }

      const keys = Object.keys(data);
      const points = [] as CartesianPoint[];

      for (let i = 0; i < keys.length; i += 1) {
        const value = (data as Record<string, number>)[keys[i]];

        if (typeof value === 'number') {
          points.push({
            x: keys[i],
            y: value,
          } as CartesianPoint);
        }
      }
      return points;
    }
    return [] as CartesianPoint[];
  }

  /**
   * Returns object representation of the dataset.
   *
   * @returns {DatasetExport} Object representation of the dataset.
   */
  export(): DatasetExport {
    return {
      backgroundColor: this._resolveBackgroundColor(),
      borderColor: this._resolveBorderColor(),
      borderWidth: this._borderWidth,
      cubicInterpolationMode: this._cubicInterpolationMode as Scriptable<'default' | 'monotone', ScriptableContext<'line'>>,
      data: this._data,
      fill: this._fill,
      pointBackgroundColor: this._resolvePointBackgroundColor(),
      label: this._label,
      tension: this._tension,
      pointBorderWidth: this._pointBorderWidth,
      pointHitRadius: this._pointHitRadius,
      pointHoverBackgroundColor: this._resolvePointHoverBackgroundColor(),
      pointHoverBorderColor: this._resolvePointHoverBorderColor(),
      pointHoverRadius: this._pointHoverRadius,
      pointRadius: this._pointRadius,
    } as DatasetExport;
  }

  /**
   * Retrieves the dataset point.
   *
   * @returns {string} Dataset point.
   */
  get(index: number) {
    if (index < 0 || index >= this._data.length) {
      return null;
    }

    return this._data[index];
  }

  /**
   * Size of the dataset.
   *
   * @returns {number} Datset size.
   */
  size(): number {
    return this._data.length;
  }
}
