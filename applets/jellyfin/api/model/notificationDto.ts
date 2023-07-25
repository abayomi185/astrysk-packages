/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { NotificationLevel } from "./notificationLevel";

/**
 * The notification DTO.
 */
export interface NotificationDto {
  /** Gets or sets the notification ID. Defaults to an empty string. */
  Id?: string;
  /** Gets or sets the notification's user ID. Defaults to an empty string. */
  UserId?: string;
  /** Gets or sets the notification date. */
  Date?: string;
  /** Gets or sets a value indicating whether the notification has been read. Defaults to false. */
  IsRead?: boolean;
  /** Gets or sets the notification's name. Defaults to an empty string. */
  Name?: string;
  /** Gets or sets the notification's description. Defaults to an empty string. */
  Description?: string;
  /** Gets or sets the notification's URL. Defaults to an empty string. */
  Url?: string;
  /** Gets or sets the notification level. */
  Level?: NotificationLevel;
}
