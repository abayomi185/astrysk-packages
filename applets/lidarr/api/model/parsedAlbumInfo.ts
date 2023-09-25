/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { ArtistTitleInfo } from "./artistTitleInfo";
import type { QualityModel } from "./qualityModel";

export interface ParsedAlbumInfo {
  albumTitle?: string | null;
  artistName?: string | null;
  artistTitleInfo?: ArtistTitleInfo;
  quality?: QualityModel;
  releaseDate?: string | null;
  discography?: boolean;
  discographyStart?: number;
  discographyEnd?: number;
  releaseGroup?: string | null;
  releaseHash?: string | null;
  releaseVersion?: string | null;
  releaseTitle?: string | null;
}
