/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Radarr
 * Radarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { CustomFormatResource } from "./customFormatResource";
import type { Language } from "./language";
import type { MovieResource } from "./movieResource";
import type { QualityModel } from "./qualityModel";
import type { Rejection } from "./rejection";

export interface ManualImportResource {
  /** @nullable */
  customFormats?: CustomFormatResource[] | null;
  /** @nullable */
  downloadId?: string | null;
  /** @nullable */
  folderName?: string | null;
  id?: number;
  /** @nullable */
  languages?: Language[] | null;
  movie?: MovieResource;
  /** @nullable */
  name?: string | null;
  /** @nullable */
  path?: string | null;
  quality?: QualityModel;
  qualityWeight?: number;
  /** @nullable */
  rejections?: Rejection[] | null;
  /** @nullable */
  relativePath?: string | null;
  /** @nullable */
  releaseGroup?: string | null;
  size?: number;
}
