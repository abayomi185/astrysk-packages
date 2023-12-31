/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { LiveTvServiceStatus } from "./liveTvServiceStatus";

/**
 * Class ServiceInfo.
 */
export interface LiveTvServiceInfo {
  /** Gets or sets the name. */
  Name?: string | null;
  /** Gets or sets the home page URL. */
  HomePageUrl?: string | null;
  /** Gets or sets the status. */
  Status?: LiveTvServiceStatus;
  /** Gets or sets the status message. */
  StatusMessage?: string | null;
  /** Gets or sets the version. */
  Version?: string | null;
  /** Gets or sets a value indicating whether this instance has update available. */
  HasUpdateAvailable?: boolean;
  /** Gets or sets a value indicating whether this instance is visible. */
  IsVisible?: boolean;
  Tuners?: string[] | null;
}
