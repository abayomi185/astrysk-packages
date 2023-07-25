/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Sonarr
 * Sonarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { SeriesResource } from "./seriesResource";
import type { EpisodeResource } from "./episodeResource";
import type { QualityModel } from "./qualityModel";
import type { Language } from "./language";
import type { CustomFormatResource } from "./customFormatResource";
import type { Rejection } from "./rejection";

export interface ManualImportResource {
  id?: number;
  path?: string | null;
  relativePath?: string | null;
  folderName?: string | null;
  name?: string | null;
  size?: number;
  series?: SeriesResource;
  seasonNumber?: number | null;
  episodes?: EpisodeResource[] | null;
  episodeFileId?: number | null;
  releaseGroup?: string | null;
  quality?: QualityModel;
  languages?: Language[] | null;
  qualityWeight?: number;
  downloadId?: string | null;
  customFormats?: CustomFormatResource[] | null;
  rejections?: Rejection[] | null;
}
