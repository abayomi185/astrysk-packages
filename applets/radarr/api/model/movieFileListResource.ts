/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Radarr
 * Radarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { Language } from "./language";
import type { QualityModel } from "./qualityModel";

export interface MovieFileListResource {
  movieFileIds?: number[] | null;
  languages?: Language[] | null;
  quality?: QualityModel;
  edition?: string | null;
  releaseGroup?: string | null;
  sceneName?: string | null;
  indexerFlags?: number | null;
}