/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Radarr
 * Radarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { MediaCover } from "./mediaCover";
import type { MovieStatusType } from "./movieStatusType";
import type { CollectionMovieResource } from "./collectionMovieResource";

export interface CollectionResource {
  id?: number;
  /** @nullable */
  images?: MediaCover[] | null;
  minimumAvailability?: MovieStatusType;
  missingMovies?: number;
  monitored?: boolean;
  /** @nullable */
  movies?: CollectionMovieResource[] | null;
  /** @nullable */
  overview?: string | null;
  qualityProfileId?: number;
  /** @nullable */
  rootFolderPath?: string | null;
  searchOnAdd?: boolean;
  /** @nullable */
  sortTitle?: string | null;
  /** @nullable */
  tags?: number[] | null;
  /** @nullable */
  title?: string | null;
  tmdbId?: number;
}
