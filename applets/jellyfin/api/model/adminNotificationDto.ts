/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { AdminNotificationDtoNotificationLevel } from './adminNotificationDtoNotificationLevel';

/**
 * The admin notification dto.
 */
export interface AdminNotificationDto {
  /** Gets or sets the notification name. */
  Name?: string | null;
  /** Gets or sets the notification description. */
  Description?: string | null;
  /** Gets or sets the notification level. */
  NotificationLevel?: AdminNotificationDtoNotificationLevel;
  /** Gets or sets the notification url. */
  Url?: string | null;
}
