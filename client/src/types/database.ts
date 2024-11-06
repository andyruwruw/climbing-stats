/**
 * Database column types.
 */
export type DatabaseColumnTypes = string
| number
| boolean
| unknown[]
| null
| undefined;

/**
 * Generic database entry.
 */
export interface DatabaseRow {
  /**
   * Database assigned unique identifier.
   */
  _id?: string;

  /**
   * Assigned unique identifier.
   */
  id?: string;
}
