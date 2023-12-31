/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { DeviceInfo } from "./deviceInfo";

export interface DeviceInfoQueryResult {
  /** Gets or sets the items. */
  Items?: DeviceInfo[] | null;
  /** Gets or sets the total number of records available. */
  TotalRecordCount?: number;
  /** Gets or sets the index of the first record in Items. */
  StartIndex?: number;
}
