/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { QualityModel } from "./qualityModel";
import type { Rejection } from "./rejection";
import type { TrackResource } from "./trackResource";

export interface ManualImportUpdateResource {
  additionalFile?: boolean;
  /** @nullable */
  albumId?: number | null;
  /** @nullable */
  albumReleaseId?: number | null;
  /** @nullable */
  artistId?: number | null;
  disableReleaseSwitching?: boolean;
  /** @nullable */
  downloadId?: string | null;
  id?: number;
  /** @nullable */
  name?: string | null;
  /** @nullable */
  path?: string | null;
  quality?: QualityModel;
  /** @nullable */
  rejections?: Rejection[] | null;
  /** @nullable */
  releaseGroup?: string | null;
  replaceExistingFiles?: boolean;
  /** @nullable */
  trackIds?: number[] | null;
  /** @nullable */
  tracks?: TrackResource[] | null;
}
