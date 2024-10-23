// Packages
import { ChartOptions as ChartOptionsInterface } from 'chart.js';

// Types
import { Dictionary } from '../../../types';
import { RGBA } from '../../../types/css';

/**
 * Options for chart.js.
 */
export class ChartOptions {
  /**
   * Tick name callback for X axis.
   */
  _callbackXTicks = null as ((
    value: string | number,
    index: number,
    ticks: string[]
  ) => string) | null;

  /**
   * Tick name callback for Y axis.
   */
  _callbackYTicks = null as ((
    value: string | number,
    index: number,
    ticks: string[]
  ) => string) | null;

  /**
   * Whether to display the X border.
   *
   * @type {boolean}
   */
  _displayXBorder = false;

  /**
   * Whether to display the Y border.
   *
   * @type {boolean}
   */
  _displayYBorder = false;

  /**
   * Whether to display the X grid.
   *
   * @type {boolean}
   */
  _displayXGrid = false;

  /**
   * Whether to display the Y grid.
   *
   * @type {boolean}
   */
  _displayYGrid = false;

  /**
   * Whether to display the legend.
   *
   * @type {boolean}
   */
  _displayLegend = false;

  /**
   * Whether to maintain the aspect ratio.
   *
   * @type {boolean}
   */
  _maintainAspectRatio = false;

  /**
   * Maximum X value.
   *
   * @type {number | undefined}
   */
  _maxX: number | undefined = undefined;

  /**
   * Maximum Y value.
   *
   * @type {number | undefined}
   */
  _maxY: number | undefined = undefined;

  /**
   * Minimum X value.
   *
   * @type {number | undefined}
   */
  _minX: number | undefined = undefined;

  /**
   * Minimum Y value.
   *
   * @type {number | undefined}
   */
  _minY: number | undefined = undefined;

  /**
   * Padding layout option for top.
   *
   * @type {number}
   */
  _paddingTop = 0;

  /**
   * Padding layout option for bottom.
   *
   * @type {number}
   */
  _paddingBottom = 0;

  /**
   * Padding layout option for left.
   *
   * @type {number}
   */
  _paddingLeft = 12;

  /**
   * Padding layout option for right.
   *
   * @type {number}
   */
  _paddingRight = 12;

  /**
   * Whether the chart is responsive.
   *
   * @type {boolean}
   */
  _responsive = true;

  /**
   * Color of X axis ticks.
   *
   * @type {RGBA | undefined}
   */
  _tickXColor = {
    r: 93,
    g: 108,
    b: 118,
    a: 255,
  } as RGBA;

  /**
   * Color of Y axis ticks.
   *
   * @type {RGBA | undefined}
   */
  _tickYColor = {
    r: 93,
    g: 108,
    b: 118,
    a: 255,
  } as RGBA;

  /**
   * Font size of X axis ticks.
   *
   * @type {number}
   */
  _tickXFontSize = 12;

  /**
   * Font size of Y axis ticks.
   *
   * @type {number}
   */
  _tickYFontSize = 12;

  /**
   * Font weight of X axis ticks.
   *
   * @type {number}
   */
  _tickXFontWeight = 500;

  /**
   * Font weight of Y axis ticks.
   *
   * @type {number}
   */
  _tickYFontWeight = 500;

  /**
   * Whether to include bounds in X axis ticks.
   *
   * @type {boolean}
   */
  _tickXIncludeBounds = true;

  /**
   * Whether to include bounds in Y axis ticks.
   *
   * @type {boolean}
   */
  _tickYIncludeBounds = true;

  /**
   * Major X ticks enabled.
   *
   * @type {boolean}
   */
  _tickXMajorEnabled = true;

  /**
   * Major Y ticks enabled.
   *
   * @type {boolean}
   */
  _tickYMajorEnabled = true;

  /**
   * Maximum number of X axis ticks.
   *
   * @type {number | undefined}
   */
  _tickXMaxLimit = undefined as number | undefined;

  /**
   * Maximum number of Y axis ticks.
   *
   * @type {number | undefined}
   */
  _tickYMaxLimit = undefined as number | undefined;

  /**
   * Generates layout as an object.
   *
   * @returns {Dictionary<Dictionary<number>>} Layout configuration.
   */
  _getLayout(): Dictionary<Dictionary<number>> {
    return {
      padding: {
        left: this._paddingLeft,
        right: this._paddingRight,
        bottom: this._paddingBottom,
        top: this._paddingTop,
      },
    };
  }

  /**
   * Generates plugins as an object.
   *
   * @returns {Dictionary<Dictionary<boolean>>} Plugin configuration.
   */
  _getPlugins(): Dictionary<Dictionary<boolean>> {
    return {
      legend: {
        display: this._displayLegend,
      },
    };
  }

  /**
   * Generates scales as an object.
   *
   * @returns {Dictionary<Dictionary<any>>} Scales configuration.
   */
  _getScales(): Dictionary<Dictionary<any>> {
    return {
      x: this._getXScales(),
      y: this._getYScales(),
    };
  }

  /**
   * Generates X scales as an object.
   *
   * @returns {Dictionary<Dictionary<any>>} X scales configuration.
   */
  _getXScales(): Dictionary<Dictionary<any>> {
    const data = {
      grid: {
        display: this._displayXGrid,
      },
      border: {
        display: this._displayXBorder,
      },
      ticks: {
        font: {
          size: this._tickXFontSize,
          weight: this._tickXFontWeight,
        },
        includeBounds: true,
      },
    } as Dictionary<any>;

    if (this._maxX !== undefined) {
      data.max = this._maxX;
    }
    if (this._minX !== undefined) {
      data.min = this._minX;
    }
    if (this._tickXColor !== undefined) {
      data.ticks.color = `#${this._tickXColor.r.toString(16)}${this._tickXColor.g.toString(16)}${this._tickXColor.b.toString(16)}${this._tickXColor.a.toString(16)}`;
    }
    if (this._tickXMaxLimit !== undefined) {
      data.ticks.maxTicksLimit = this._tickXMaxLimit;
    }
    if (this._callbackXTicks !== null) {
      data.ticks.callback = this._callbackXTicks;
    }

    return data;
  }

  /**
   * Generates Y scales as an object.
   *
   * @returns {Dictionary<Dictionary<any>>} Y scales configuration.
   */
  _getYScales(): Dictionary<Dictionary<any>> {
    const data = {
      grid: {
        display: this._displayYGrid,
      },
      border: {
        display: this._displayYBorder,
      },
      ticks: {
        font: {
          size: this._tickYFontSize,
          weight: this._tickYFontWeight,
        },
        includeBounds: true,
      },
    } as Dictionary<any>;

    if (this._maxY !== undefined) {
      data.max = this._maxY;
    }
    if (this._minY !== undefined) {
      data.min = this._minY;
    }
    if (this._tickYColor !== undefined) {
      data.ticks.color = `#${this._tickYColor.r.toString(16)}${this._tickYColor.g.toString(16)}${this._tickYColor.b.toString(16)}${this._tickYColor.a.toString(16)}`;
    }
    if (this._tickYMaxLimit !== undefined) {
      data.ticks.maxTicksLimit = this._tickYMaxLimit;
    }
    if (this._callbackYTicks !== null) {
      data.ticks.callback = this._callbackYTicks;
    }

    return data;
  }

  /**
   * Exports to object used by chart.js.
   *
   * @returns {ChartOptionsInterface} Chart options.
   */
  export(): ChartOptionsInterface {
    return {
      layout: this._getLayout(),
      plugins: this._getPlugins(),
      maintainAspectRatio: this._maintainAspectRatio,
      responsive: this._responsive,
      scales: this._getScales(),
    };
  }

  /**
   * Sets callback for X tick labels.
   *
   * @param {((value: string | number, index: number, ticks: string[]) => string) | null} callbackXTicks Callback function.
   */
  setCallbackXTicks(callbackXTicks: ((
    value: string | number,
    index: number,
    ticks: string[]
  ) => string) | null): void {
    this._callbackXTicks = callbackXTicks;
  }

  /**
   * Sets callback for Y tick labels.
   *
   * @param {((value: string | number, index: number, ticks: string[]) => string) | null} callbackYTicks Callback function.
   */
  setCallbackYTicks(callbackYTicks: ((
    value: string | number,
    index: number,
    ticks: string[]
  ) => string) | null): void {
    this._callbackYTicks = callbackYTicks;
  }

  /**
   * Sets max X value.
   *
   * @param {number | undefined} maxX Max X value.
   */
  setMaxX(maxX: number | undefined): void {
    this._maxX = maxX;
  }

  /**
   * Sets max Y value.
   *
   * @param {number | undefined} maxY Max Y value.
   */
  setMaxY(maxY: number | undefined): void {
    this._maxY = maxY;
  }

  /**
   * Sets min X value.
   *
   * @param {number | undefined} minX Min X value.
   */
  setMinX(minX: number | undefined): void {
    this._minX = minX;
  }

  /**
   * Sets min Y value.
   *
   * @param {number | undefined} minY Min Y value.
   */
  setMinY(minY: number | undefined): void {
    this._minY = minY;
  }

  /**
   * Sets max X ticks limit.
   *
   * @param {number | undefined} tickXMaxLimit Max X ticks.
   */
  setTickXMaxLimit(tickXMaxLimit: number | undefined): void {
    this._tickXMaxLimit = tickXMaxLimit;
  }

  /**
   * Sets max Y ticks limit.
   *
   * @param {number | undefined} tickYMaxLimit Max Y ticks.
   */
  setTickYMaxLimit(tickYMaxLimit: number | undefined): void {
    this._tickYMaxLimit = tickYMaxLimit;
  }
}
