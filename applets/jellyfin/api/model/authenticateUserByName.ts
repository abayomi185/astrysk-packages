/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */

/**
 * The authenticate user by name request body.
 */
export interface AuthenticateUserByName {
  /** Gets or sets the username. */
  Username?: string | null;
  /** Gets or sets the plain text password. */
  Pw?: string | null;
  /**
   * Gets or sets the sha1-hashed password.
   * @deprecated
   */
  Password?: string | null;
}
