/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Sonarr
 * Sonarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { EpisodeResource } from "./episodeResource";
import type { QualityModel } from "./qualityModel";
import type { Language } from "./language";
import type { Rejection } from "./rejection";

export interface ManualImportReprocessResource {
  id?: number;
  path?: string | null;
  seriesId?: number;
  seasonNumber?: number | null;
  episodes?: EpisodeResource[] | null;
  episodeIds?: number[] | null;
  quality?: QualityModel;
  languages?: Language[] | null;
  releaseGroup?: string | null;
  downloadId?: string | null;
  rejections?: Rejection[] | null;
}
