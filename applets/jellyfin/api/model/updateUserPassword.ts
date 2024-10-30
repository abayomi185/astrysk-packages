/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */

/**
 * The update user password request body.
 */
export interface UpdateUserPassword {
  /**
   * Gets or sets the current sha1-hashed password.
   * @nullable
   */
  CurrentPassword?: string | null;
  /**
   * Gets or sets the current plain text password.
   * @nullable
   */
  CurrentPw?: string | null;
  /**
   * Gets or sets the new plain text password.
   * @nullable
   */
  NewPw?: string | null;
  /** Gets or sets a value indicating whether to reset the password. */
  ResetPassword?: boolean;
}
