/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { BaseItemDto } from "./baseItemDto";

export interface BaseItemDtoQueryResult {
  /**
   * Gets or sets the items.
   * @nullable
   */
  Items?: BaseItemDto[] | null;
  /** Gets or sets the index of the first record in Items. */
  StartIndex?: number;
  /** Gets or sets the total number of records available. */
  TotalRecordCount?: number;
}
