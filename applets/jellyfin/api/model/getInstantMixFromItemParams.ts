/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { ItemFields } from "./itemFields";
import type { ImageType } from "./imageType";

export type GetInstantMixFromItemParams = {
  userId?: string;
  limit?: number;
  fields?: ItemFields[];
  enableImages?: boolean;
  enableUserData?: boolean;
  imageTypeLimit?: number;
  enableImageTypes?: ImageType[];
};
