/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { ItemFields } from "./itemFields";
import type { ImageType } from "./imageType";
import type { BaseItemKind } from "./baseItemKind";

export type GetResumeItemsParams = {
  startIndex?: number;
  limit?: number;
  searchTerm?: string;
  parentId?: string;
  fields?: ItemFields[];
  mediaTypes?: string[];
  enableUserData?: boolean;
  imageTypeLimit?: number;
  enableImageTypes?: ImageType[];
  excludeItemTypes?: BaseItemKind[];
  includeItemTypes?: BaseItemKind[];
  enableTotalRecordCount?: boolean;
  enableImages?: boolean;
  excludeActiveSessions?: boolean;
};
