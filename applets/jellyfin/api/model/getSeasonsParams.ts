/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { ItemFields } from "./itemFields";
import type { ImageType } from "./imageType";

export type GetSeasonsParams = {
  userId?: string;
  fields?: ItemFields[];
  isSpecialSeason?: boolean;
  isMissing?: boolean;
  adjacentTo?: string;
  enableImages?: boolean;
  imageTypeLimit?: number;
  enableImageTypes?: ImageType[];
  enableUserData?: boolean;
};
