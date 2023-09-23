/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Radarr
 * Radarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { MovieStatusType } from "./movieStatusType";
import type { MediaCover } from "./mediaCover";
import type { MovieMetadata } from "./movieMetadata";

export interface MovieCollection {
  id?: number;
  title?: string | null;
  cleanTitle?: string | null;
  sortTitle?: string | null;
  tmdbId?: number;
  overview?: string | null;
  monitored?: boolean;
  qualityProfileId?: number;
  rootFolderPath?: string | null;
  searchOnAdd?: boolean;
  minimumAvailability?: MovieStatusType;
  lastInfoSync?: string | null;
  images?: MediaCover[] | null;
  added?: string;
  movies?: MovieMetadata[] | null;
  tags?: number[] | null;
}