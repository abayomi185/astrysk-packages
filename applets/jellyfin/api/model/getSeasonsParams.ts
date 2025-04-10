/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { ItemFields } from "./itemFields";
import type { ImageType } from "./imageType";

export type GetSeasonsParams = {
  /**
   * The user id.
   */
  userId?: string;
  /**
   * Optional. Specify additional fields of information to return in the output. This allows multiple, comma delimited. Options: Budget, Chapters, DateCreated, Genres, HomePageUrl, IndexOptions, MediaStreams, Overview, ParentId, Path, People, ProviderIds, PrimaryImageAspectRatio, Revenue, SortName, Studios, Taglines, TrailerUrls.
   */
  fields?: ItemFields[];
  /**
   * Optional. Filter by special season.
   */
  isSpecialSeason?: boolean;
  /**
   * Optional. Filter by items that are missing episodes or not.
   */
  isMissing?: boolean;
  /**
   * Optional. Return items that are siblings of a supplied item.
   */
  adjacentTo?: string;
  /**
   * Optional. Include image information in output.
   */
  enableImages?: boolean;
  /**
   * Optional. The max number of images to return, per image type.
   */
  imageTypeLimit?: number;
  /**
   * Optional. The image types to include in the output.
   */
  enableImageTypes?: ImageType[];
  /**
   * Optional. Include user data.
   */
  enableUserData?: boolean;
};
