/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */

/**
 * Validate path object.
 */
export interface ValidatePathDto {
  /**
   * Gets or sets is path file.
   * @nullable
   */
  IsFile?: boolean | null;
  /**
   * Gets or sets the path.
   * @nullable
   */
  Path?: string | null;
  /** Gets or sets a value indicating whether validate if path is writable. */
  ValidateWritable?: boolean;
}
