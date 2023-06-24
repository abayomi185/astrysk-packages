/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { ItemFields } from "./itemFields";
import type { BaseItemKind } from "./baseItemKind";
import type { ImageType } from "./imageType";

export type GetLatestMediaParams = {
  parentId?: string;
  fields?: ItemFields[];
  includeItemTypes?: BaseItemKind[];
  isPlayed?: boolean;
  enableImages?: boolean;
  imageTypeLimit?: number;
  enableImageTypes?: ImageType[];
  enableUserData?: boolean;
  limit?: number;
  groupItems?: boolean;
};
