// Packages
import { Dictionary } from '@/types';
import {
  FileHandle,
  open,
} from 'node:fs/promises';
import { IS_PM_TIME } from './sanitize';

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
      const row = [] as string[];

      let token = '';
      let inString = false;
      let rowLength = 0;
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
        } else {
          token = token.concat(line[i]);
          rowLength += 1;
        }
      }

      row.push(token);

      if (rowLength) {
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

    const FIND_NUMBERS = /([0-9]+)/g;

    const row = this._rows[index];
    let date = -1;

    for (let i = 0; i < row.length; i += 1) {
      if (this._header[i] === 'date') {
        date = Date.parse(row[i].replace('/', '-'));
        obj.date = date;
      } else if (this._header[i] === 'start' || this._header[i] === 'end') {
        let hour = -1;
        let minutes = -1;

        let match = FIND_NUMBERS.exec(row[i]);
        while (match !== null) {
          console.log(match[0]);
          if (hour === -1) {
            hour = IS_PM_TIME.test(row[i]) ? parseInt(match[0], 10) + 12 : parseInt(match[0], 10);
          } else if (minutes === -1) {
            minutes = parseInt(match[0], 10);
          } else {
            break;
          }

          match = FIND_NUMBERS.exec(row[i]);
        }

        obj[this._header[i]] = date + (hour * 3600000) + (minutes + 60000);
      } else {
        obj[this._header[i]] = row[i];
      }
    }

    return obj;
  }
}
