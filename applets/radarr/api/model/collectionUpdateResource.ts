/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Radarr
 * Radarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { MovieStatusType } from "./movieStatusType";

export interface CollectionUpdateResource {
  /** @nullable */
  collectionIds?: number[] | null;
  minimumAvailability?: MovieStatusType;
  /** @nullable */
  monitored?: boolean | null;
  /** @nullable */
  monitorMovies?: boolean | null;
  /** @nullable */
  qualityProfileId?: number | null;
  /** @nullable */
  rootFolderPath?: string | null;
}
