/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { ArtistResource } from "./artistResource";
import type { AlbumResource } from "./albumResource";
import type { TrackResource } from "./trackResource";
import type { QualityModel } from "./qualityModel";
import type { Rejection } from "./rejection";
import type { ParsedTrackInfo } from "./parsedTrackInfo";

export interface ManualImportResource {
  id?: number;
  path?: string | null;
  name?: string | null;
  size?: number;
  artist?: ArtistResource;
  album?: AlbumResource;
  albumReleaseId?: number;
  tracks?: TrackResource[] | null;
  quality?: QualityModel;
  releaseGroup?: string | null;
  qualityWeight?: number;
  downloadId?: string | null;
  rejections?: Rejection[] | null;
  audioTags?: ParsedTrackInfo;
  additionalFile?: boolean;
  replaceExistingFiles?: boolean;
  disableReleaseSwitching?: boolean;
}
