/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { TagDifference } from "./tagDifference";

export interface RetagTrackResource {
  albumId?: number;
  artistId?: number;
  /** @nullable */
  changes?: TagDifference[] | null;
  id?: number;
  /** @nullable */
  path?: string | null;
  trackFileId?: number;
  /** @nullable */
  trackNumbers?: number[] | null;
}
