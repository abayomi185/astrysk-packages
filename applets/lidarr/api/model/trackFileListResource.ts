/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { QualityModel } from "./qualityModel";

export interface TrackFileListResource {
  trackFileIds?: number[] | null;
  quality?: QualityModel;
  sceneName?: string | null;
  releaseGroup?: string | null;
}