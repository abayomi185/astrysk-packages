/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { GroupUpdateType } from "./groupUpdateType";

/**
 * Class GroupUpdate.
 */
export interface ObjectGroupUpdate {
  /** Gets the group identifier. */
  GroupId?: string;
  /** Gets the update type. */
  Type?: GroupUpdateType;
  /** Gets the update data. */
  Data?: unknown;
}
