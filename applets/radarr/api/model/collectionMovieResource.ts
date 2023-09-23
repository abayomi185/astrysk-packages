/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Radarr
 * Radarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { MediaCover } from "./mediaCover";
import type { Ratings } from "./ratings";

export interface CollectionMovieResource {
  tmdbId?: number;
  imdbId?: string | null;
  title?: string | null;
  cleanTitle?: string | null;
  sortTitle?: string | null;
  overview?: string | null;
  runtime?: number;
  images?: MediaCover[] | null;
  year?: number;
  ratings?: Ratings;
  genres?: string[] | null;
  folder?: string | null;
}