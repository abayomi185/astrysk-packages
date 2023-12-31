/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { ImageType } from "./imageType";
import type { ItemFields } from "./itemFields";

export type GetRecommendedProgramsParams = {
  userId?: string;
  limit?: number;
  isAiring?: boolean;
  hasAired?: boolean;
  isSeries?: boolean;
  isMovie?: boolean;
  isNews?: boolean;
  isKids?: boolean;
  isSports?: boolean;
  enableImages?: boolean;
  imageTypeLimit?: number;
  enableImageTypes?: ImageType[];
  genreIds?: string[];
  fields?: ItemFields[];
  enableUserData?: boolean;
  enableTotalRecordCount?: boolean;
};
