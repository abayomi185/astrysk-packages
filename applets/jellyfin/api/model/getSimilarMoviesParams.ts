/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { ItemFields } from "./itemFields";

export type GetSimilarMoviesParams = {
  excludeArtistIds?: string[];
  userId?: string;
  limit?: number;
  fields?: ItemFields[];
};
