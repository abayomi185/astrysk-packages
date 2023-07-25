/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { SortOrder } from "./sortOrder";
import type { ImageType } from "./imageType";
import type { ItemFields } from "./itemFields";

export type GetLiveTvProgramsParams = {
  channelIds?: string[];
  userId?: string;
  minStartDate?: string;
  hasAired?: boolean;
  isAiring?: boolean;
  maxStartDate?: string;
  minEndDate?: string;
  maxEndDate?: string;
  isMovie?: boolean;
  isSeries?: boolean;
  isNews?: boolean;
  isKids?: boolean;
  isSports?: boolean;
  startIndex?: number;
  limit?: number;
  sortBy?: string[];
  sortOrder?: SortOrder[];
  genres?: string[];
  genreIds?: string[];
  enableImages?: boolean;
  imageTypeLimit?: number;
  enableImageTypes?: ImageType[];
  enableUserData?: boolean;
  seriesTimerId?: string;
  librarySeriesId?: string;
  fields?: ItemFields[];
  enableTotalRecordCount?: boolean;
};
