/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { BaseItemKind } from "./baseItemKind";

export type GetParams = {
  startIndex?: number;
  limit?: number;
  userId?: string;
  searchTerm: string;
  includeItemTypes?: BaseItemKind[];
  excludeItemTypes?: BaseItemKind[];
  mediaTypes?: string[];
  parentId?: string;
  isMovie?: boolean;
  isSeries?: boolean;
  isNews?: boolean;
  isKids?: boolean;
  isSports?: boolean;
  includePeople?: boolean;
  includeMedia?: boolean;
  includeGenres?: boolean;
  includeStudios?: boolean;
  includeArtists?: boolean;
};
