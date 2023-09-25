/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { ArtistTitleInfo } from "./artistTitleInfo";
import type { IsoCountry } from "./isoCountry";
import type { TimeSpan } from "./timeSpan";
import type { QualityModel } from "./qualityModel";
import type { MediaInfoModel } from "./mediaInfoModel";

export interface ParsedTrackInfo {
  title?: string | null;
  cleanTitle?: string | null;
  artistTitle?: string | null;
  albumTitle?: string | null;
  artistTitleInfo?: ArtistTitleInfo;
  artistMBId?: string | null;
  albumMBId?: string | null;
  releaseMBId?: string | null;
  recordingMBId?: string | null;
  trackMBId?: string | null;
  discNumber?: number;
  discCount?: number;
  country?: IsoCountry;
  year?: number;
  label?: string | null;
  catalogNumber?: string | null;
  disambiguation?: string | null;
  duration?: TimeSpan;
  quality?: QualityModel;
  mediaInfo?: MediaInfoModel;
  trackNumbers?: number[] | null;
  releaseGroup?: string | null;
  releaseHash?: string | null;
}
