/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Radarr
 * Radarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { CustomFormatResource } from "./customFormatResource";
import type { Language } from "./language";
import type { DownloadProtocol } from "./downloadProtocol";
import type { QualityModel } from "./qualityModel";

export interface ReleaseResource {
  age?: number;
  ageHours?: number;
  ageMinutes?: number;
  approved?: boolean;
  /** @nullable */
  commentUrl?: string | null;
  /** @nullable */
  customFormats?: CustomFormatResource[] | null;
  customFormatScore?: number;
  downloadAllowed?: boolean;
  /** @nullable */
  downloadUrl?: string | null;
  /** @nullable */
  edition?: string | null;
  /** @nullable */
  guid?: string | null;
  id?: number;
  imdbId?: number;
  /** @nullable */
  indexer?: string | null;
  /** @nullable */
  indexerFlags?: string[] | null;
  indexerId?: number;
  /** @nullable */
  infoHash?: string | null;
  /** @nullable */
  infoUrl?: string | null;
  /** @nullable */
  languages?: Language[] | null;
  /** @nullable */
  leechers?: number | null;
  /** @nullable */
  magnetUrl?: string | null;
  /** @nullable */
  movieId?: number | null;
  /** @nullable */
  movieTitles?: string[] | null;
  protocol?: DownloadProtocol;
  publishDate?: string;
  quality?: QualityModel;
  qualityWeight?: number;
  rejected?: boolean;
  /** @nullable */
  rejections?: string[] | null;
  /** @nullable */
  releaseGroup?: string | null;
  /** @nullable */
  releaseHash?: string | null;
  releaseWeight?: number;
  sceneSource?: boolean;
  /** @nullable */
  seeders?: number | null;
  size?: number;
  /** @nullable */
  subGroup?: string | null;
  temporarilyRejected?: boolean;
  /** @nullable */
  title?: string | null;
  tmdbId?: number;
}
