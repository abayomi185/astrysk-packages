/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Sonarr
 * Sonarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { Language } from "./language";
import type { QualityModel } from "./qualityModel";

export interface EpisodeFileListResource {
  episodeFileIds?: number[] | null;
  languages?: Language[] | null;
  quality?: QualityModel;
  sceneName?: string | null;
  releaseGroup?: string | null;
}
