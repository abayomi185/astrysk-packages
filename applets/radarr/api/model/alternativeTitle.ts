/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Radarr
 * Radarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { SourceType } from "./sourceType";
import type { Language } from "./language";

export interface AlternativeTitle {
  id?: number;
  sourceType?: SourceType;
  movieMetadataId?: number;
  title?: string | null;
  cleanTitle?: string | null;
  sourceId?: number;
  votes?: number;
  voteCount?: number;
  language?: Language;
}