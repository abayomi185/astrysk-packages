/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Radarr
 * Radarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { QualityModel } from "./qualityModel";
import type { CustomFormatResource } from "./customFormatResource";
import type { Language } from "./language";
import type { DownloadProtocol } from "./downloadProtocol";

export interface ReleaseResource {
  id?: number;
  guid?: string | null;
  quality?: QualityModel;
  customFormats?: CustomFormatResource[] | null;
  customFormatScore?: number;
  qualityWeight?: number;
  age?: number;
  ageHours?: number;
  ageMinutes?: number;
  size?: number;
  indexerId?: number;
  indexer?: string | null;
  releaseGroup?: string | null;
  subGroup?: string | null;
  releaseHash?: string | null;
  title?: string | null;
  sceneSource?: boolean;
  movieTitles?: string[] | null;
  languages?: Language[] | null;
  approved?: boolean;
  temporarilyRejected?: boolean;
  rejected?: boolean;
  tmdbId?: number;
  imdbId?: number;
  rejections?: string[] | null;
  publishDate?: string;
  commentUrl?: string | null;
  downloadUrl?: string | null;
  infoUrl?: string | null;
  downloadAllowed?: boolean;
  releaseWeight?: number;
  indexerFlags?: string[] | null;
  edition?: string | null;
  magnetUrl?: string | null;
  infoHash?: string | null;
  seeders?: number | null;
  leechers?: number | null;
  protocol?: DownloadProtocol;
  movieId?: number | null;
}
