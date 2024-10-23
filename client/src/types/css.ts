// Packages
import { PropType } from 'vue';

// Types
import { Dictionary } from './index';

/**
 * Basic number value color.
 */
export type ColorInt = number;

/**
 * Hex color value.
 */
export type Hex = string;

/**
 * Hex alpha color value.
 */
export type Hexa = string;

/**
 * CSS color value.
 */
export type Color = string | number | Dictionary<never>;

/**
 * Number value.
 */
export type NumberOrNumberString = PropType<string | number | undefined>;

/**
 * Vue class data object.
 */
export type ClassesData = ClassesDataObject | (ClassesDataObject | string)[];

/**
 * 3D vector color.
 */
export type XYZ = [
  number,
  number,
  number,
];

/**
 * 3-axis system.
 */
export type LAB = [
  number,
  number,
  number,
];

/**
 * Hue, saturation, value color.
 */
export type HSV = {
  h: number;
  s: number;
  v: number;
};

/**
 * Hue, saturation, value, alpha color.
 */
export type HSVA = HSV & { a: number };

/**
 * RGB color.
 */
export type RGB = {
  r: number;
  g: number;
  b: number;
};

/**
 * RGB alpha color.
 */
export type RGBA = RGB & { a: number };

/**
 * Hue, saturation, light color.
 */
export type HSL = {
  h: number;
  s: number;
  l: number;
};

/**
 * Hue, saturation, light and alpha color.
 */
export type HSLA = HSL & { a: number };

/**
 * Vue class dynamic classes object.
 */
export interface ClassesDataObject {
  [key: string]: boolean;
}
