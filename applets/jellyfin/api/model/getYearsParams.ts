/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { SortOrder } from "./sortOrder";
import type { ItemFields } from "./itemFields";
import type { BaseItemKind } from "./baseItemKind";
import type { ImageType } from "./imageType";

export type GetYearsParams = {
  /**
   * Skips over a given number of items within the results. Use for paging.
   */
  startIndex?: number;
  /**
   * Optional. The maximum number of records to return.
   */
  limit?: number;
  /**
   * Sort Order - Ascending,Descending.
   */
  sortOrder?: SortOrder[];
  /**
   * Specify this to localize the search to a specific item or folder. Omit to use the root.
   */
  parentId?: string;
  /**
   * Optional. Specify additional fields of information to return in the output.
   */
  fields?: ItemFields[];
  /**
   * Optional. If specified, results will be excluded based on item type. This allows multiple, comma delimited.
   */
  excludeItemTypes?: BaseItemKind[];
  /**
   * Optional. If specified, results will be included based on item type. This allows multiple, comma delimited.
   */
  includeItemTypes?: BaseItemKind[];
  /**
   * Optional. Filter by MediaType. Allows multiple, comma delimited.
   */
  mediaTypes?: string[];
  /**
   * Optional. Specify one or more sort orders, comma delimited. Options: Album, AlbumArtist, Artist, Budget, CommunityRating, CriticRating, DateCreated, DatePlayed, PlayCount, PremiereDate, ProductionYear, SortName, Random, Revenue, Runtime.
   */
  sortBy?: string[];
  /**
   * Optional. Include user data.
   */
  enableUserData?: boolean;
  /**
   * Optional. The max number of images to return, per image type.
   */
  imageTypeLimit?: number;
  /**
   * Optional. The image types to include in the output.
   */
  enableImageTypes?: ImageType[];
  /**
   * User Id.
   */
  userId?: string;
  /**
   * Search recursively.
   */
  recursive?: boolean;
  /**
   * Optional. Include image information in output.
   */
  enableImages?: boolean;
};
