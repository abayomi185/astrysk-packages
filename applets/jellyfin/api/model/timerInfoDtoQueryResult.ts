/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { TimerInfoDto } from "./timerInfoDto";

export interface TimerInfoDtoQueryResult {
  /** Gets or sets the items. */
  Items?: TimerInfoDto[] | null;
  /** Gets or sets the total number of records available. */
  TotalRecordCount?: number;
  /** Gets or sets the index of the first record in Items. */
  StartIndex?: number;
}
