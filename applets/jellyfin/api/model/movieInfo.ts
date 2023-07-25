/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { MovieInfoProviderIds } from "./movieInfoProviderIds";

export interface MovieInfo {
  /** Gets or sets the name. */
  Name?: string | null;
  /** Gets or sets the original title. */
  OriginalTitle?: string | null;
  /** Gets or sets the path. */
  Path?: string | null;
  /** Gets or sets the metadata language. */
  MetadataLanguage?: string | null;
  /** Gets or sets the metadata country code. */
  MetadataCountryCode?: string | null;
  /** Gets or sets the provider ids. */
  ProviderIds?: MovieInfoProviderIds;
  /** Gets or sets the year. */
  Year?: number | null;
  IndexNumber?: number | null;
  ParentIndexNumber?: number | null;
  PremiereDate?: string | null;
  IsAutomated?: boolean;
}
