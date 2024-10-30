/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */

/**
 * The authenticate user by name request body.
 */
export interface AuthenticateUserByName {
  /**
   * Gets or sets the sha1-hashed password.
   * @deprecated
   * @nullable
   */
  Password?: string | null;
  /**
   * Gets or sets the plain text password.
   * @nullable
   */
  Pw?: string | null;
  /**
   * Gets or sets the username.
   * @nullable
   */
  Username?: string | null;
}
