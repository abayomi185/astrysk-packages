/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { SendToUserType } from "./sendToUserType";

export interface NotificationOption {
  Type?: string | null;
  /** Gets or sets user Ids to not monitor (it's opt out). */
  DisabledMonitorUsers?: string[];
  /** Gets or sets user Ids to send to (if SendToUserMode == Custom). */
  SendToUsers?: string[];
  /** Gets or sets a value indicating whether this MediaBrowser.Model.Notifications.NotificationOption is enabled. */
  Enabled?: boolean;
  /** Gets or sets the disabled services. */
  DisabledServices?: string[];
  /** Gets or sets the send to user mode. */
  SendToUserMode?: SendToUserType;
}
