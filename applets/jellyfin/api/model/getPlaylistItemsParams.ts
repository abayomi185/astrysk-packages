/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { ItemFields } from "./itemFields";
import type { ImageType } from "./imageType";

export type GetPlaylistItemsParams = {
  /**
   * User id.
   */
  userId: string;
  /**
   * Optional. The record index to start at. All items with a lower index will be dropped from the results.
   */
  startIndex?: number;
  /**
   * Optional. The maximum number of records to return.
   */
  limit?: number;
  /**
   * Optional. Specify additional fields of information to return in the output.
   */
  fields?: ItemFields[];
  /**
   * Optional. Include image information in output.
   */
  enableImages?: boolean;
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
};
