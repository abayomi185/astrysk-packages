/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Radarr
 * Radarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { MovieStatusType } from "./movieStatusType";

export interface CollectionUpdateResource {
  collectionIds?: number[] | null;
  monitored?: boolean | null;
  monitorMovies?: boolean | null;
  qualityProfileId?: number | null;
  rootFolderPath?: string | null;
  minimumAvailability?: MovieStatusType;
}
