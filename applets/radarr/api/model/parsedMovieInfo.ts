/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Radarr
 * Radarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { Language } from "./language";
import type { QualityModel } from "./qualityModel";

export interface ParsedMovieInfo {
  /** @nullable */
  edition?: string | null;
  /** @nullable */
  hardcodedSubs?: string | null;
  /** @nullable */
  imdbId?: string | null;
  /** @nullable */
  languages?: Language[] | null;
  /** @nullable */
  readonly movieTitle?: string | null;
  /** @nullable */
  movieTitles?: string[] | null;
  /** @nullable */
  originalTitle?: string | null;
  /** @nullable */
  readonly primaryMovieTitle?: string | null;
  quality?: QualityModel;
  /** @nullable */
  releaseGroup?: string | null;
  /** @nullable */
  releaseHash?: string | null;
  /** @nullable */
  releaseTitle?: string | null;
  /** @nullable */
  simpleReleaseTitle?: string | null;
  tmdbId?: number;
  year?: number;
}
