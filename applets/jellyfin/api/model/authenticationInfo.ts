/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */

export interface AuthenticationInfo {
  /**
   * Gets or sets the access token.
   * @nullable
   */
  AccessToken?: string | null;
  /**
   * Gets or sets the name of the application.
   * @nullable
   */
  AppName?: string | null;
  /**
   * Gets or sets the application version.
   * @nullable
   */
  AppVersion?: string | null;
  /** Gets or sets the date created. */
  DateCreated?: string;
  DateLastActivity?: string;
  /**
   * Gets or sets the date revoked.
   * @nullable
   */
  DateRevoked?: string | null;
  /**
   * Gets or sets the device identifier.
   * @nullable
   */
  DeviceId?: string | null;
  /**
   * Gets or sets the name of the device.
   * @nullable
   */
  DeviceName?: string | null;
  /** Gets or sets the identifier. */
  Id?: number;
  /** Gets or sets a value indicating whether this instance is active. */
  IsActive?: boolean;
  /** Gets or sets the user identifier. */
  UserId?: string;
  /** @nullable */
  UserName?: string | null;
}
