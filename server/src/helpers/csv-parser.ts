// Packages
import {
  FileHandle,
  open,
} from 'node:fs/promises';

// Local Imports
import {
  parseAttemptStatus,
  parseDate,
  parseProtection,
  parseSentOfStatus,
  parseTime
} from './sanitize';
import { CLIMBING_ACTIVITY } from '../config';

// Types
import { Dictionary } from '../types';

/**
 * Aids in the reading and parsing of CSV files.
 */
export class CsvParser {
  /**
   * Path to CSV.
   */
  protected _path: string;

  /**
   * File data.
   */
  protected _file: FileHandle | null;

  /**
   * Header of CSV.
   */
  protected _header = [] as string[];

  /**
   * Maps the header.
   */
  protected _headerMap = {} as Dictionary<number>;

  /**
   * Columns with no header.
   */
  protected _disabledColumns = [] as number[];

  /**
   * File data as array.
   */
  protected _rows = [] as string[][];

  /**
   * Instantiates a new CSV parser.
   *
   * @param {string} path Path to CSV.
   * @param {BufferEncoding} encoding File encoding.
   */
  constructor(path: string) {
    this._path = path;
  }

  /**
   * Reads the file.
   */
  async read(): Promise<void> {
    this._file = await open(this._path); 

    let headerFound = true;

    for await (const line of this._file.readLines()) {
      const row = this._parseLine(line);

      if (row.join('').length > 2) {
        if (headerFound) {
          for (let j = 0; j < row.length; j += 1) {
            const sanitized = row[j].replace(' / ', '-').replace(' ', '-').replace('.', '').toLowerCase();
  
            if (!sanitized.length) {
              this._disabledColumns.push(j);
            } else {
              this._header.push(sanitized);
              this._headerMap[sanitized] = j;
            }
          }
  
          headerFound = false;
        } else {
          this._rows.push(row);
        }
      }
    }
  }

  /**
   * Retrieves object row.
   *
   * @param {number} index Row to retrieve.
   * @returns {Dictionary<any>} Row as an object.
   */
  at(index: number): Dictionary<any> {
    return this._rowToObj(index);
  }

  /**
   * Retrieves the length of the table.
   *
   * @returns {number} Length of the table.
   */
  length(): number {
    return this._rows.length;
  }

  /**
   * Parses a comma separated line.
   *
   * @param {string} line Unparsed line. 
   * @returns {string[]} Row values comma separated.
   */
  protected _parseLine(line: string): string[] {
    const row = [] as string[];

    let token = '';
    let inString = false;
    let realRows = 0;

    for (let i = 0; i < line.length; i += 1) {
      if (line[i] === '"') {
        inString = !inString;
      } else if (line[i] === ',' && !inString) {
        if (!this._disabledColumns.includes(realRows)) {
          row.push(token);
        }
        
        token = '';
        realRows += 1;
      } else if (token !== '' || line[i] !== ' ') {
        token = token.concat(line[i]);
      }
    }

    row.push(token);

    return row;
  }

  /**
   * Retrieves a row as an object.
   *
   * @param {number} index Row to retrieve.
   * @returns {Dictionary<any>} Row as an object.
   */
  protected _rowToObj(index: number): Dictionary<any> {
    const obj = {} as Dictionary<any>;

    if (index < 0 || index >= this._rows.length) {
      return obj;
    }

    const row = this._rows[index];
    const date = -1;

    for (let i = 0; i < row.length; i += 1) {
      if (this._header[i] === 'date') {
        obj.date = parseDate(row[i]);
      } else if (this._header[i] === 'start' || this._header[i] === 'end') {
        obj[this._header[i]] = date + parseTime(row[i]);
      } else if (this._header[i] === 'duration' || this._header[i] === 'driving') {
        const duration = parseTime(row[i]);
        obj[this._header[i]] = duration;

        if (this._header[i] === 'duration'
          && 'end' in obj
          && 'start' in obj
          && obj.end !== obj.start + duration) {
          obj.end = obj.start + duration;
        }
      } else if (this._header[i] === 'b') {
        obj.bouldering = (row[i] === 'B');
      } else if (this._header[i] === 'r') {
        obj.ropes = (row[i] === 'R');
      } else if (this._header[i] === 'o') {
        obj.outdoors = (row[i] === 'O')
      } else if (this._header[i] === 'subarea') {
        if (row[i] == '-') {
          obj.subarea = [];
        } else {
          obj.subarea = row[i].split(',');

          for (let j = 0; j < obj.subarea.length; j += 1) {
            if (obj.subarea[j][0] === ' ') {
              obj.subarea[j] = obj.subarea[j].substring(1);
            }
          }
        }
      } else if ([
        'outdoor-max',
        'indoor-max',
        'act-cal',
        'tot-cal',
        'avg-h',
        'low-h',
        'hi-h',
      ].includes(this._header[i])) {
        if (!isNaN(parseInt(row[i], 10))) {
          obj[this._header[i]] = parseInt(row[i], 10);
        } else {
          obj[this._header[i]] = [
            'outdoor-max',
            'indoor-max',
          ].includes(this._header[i]) ? 0 : -1;
        }
      } else if (this._header[i] === 'partners' || this._header[i] === 'driving-with') {
        if (!row[i].length) {
          obj[this._header[i]] = [];
        } else {
          obj[this._header[i]] = row[i].split(',');
        }
      } else if (this._header[i] === 'type'
        && (row[i] === 'Route'
        || row[i] === 'Boulder')) {
        obj[this._header[i]] = row[i] === 'Route' ? CLIMBING_ACTIVITY.SPORT : CLIMBING_ACTIVITY.BOULDER;
      } else if (this._header[i] === 'danger' && row[i] === '-') {
        obj[this._header[i]] = '';
      } else if (this._header[i] === 'a') {
        if (isNaN(parseInt(row[i], 10))) {
          obj[this._header[i]] = 0;
        } else {
          obj[this._header[i]] = parseInt(row[i], 10);
        }
      } else if (row[i] === '-') {
        obj[this._header[i]] = '';
      } else if (this._header[i] === 'protection') {
        obj[this._header[i]] = parseProtection(row[i]);
      } else if (this._header[i] === 'status') {
        obj[this._header[i]] = parseAttemptStatus(row[i]);
        obj.sent = parseSentOfStatus(row[i]);
      } else {
        obj[this._header[i]] = row[i];
      }
    }

    return obj;
  }
}
