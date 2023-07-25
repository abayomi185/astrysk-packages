/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { ItemFilter } from "./itemFilter";
import type { ItemFields } from "./itemFields";

export type GetLatestChannelItemsParams = {
  userId?: string;
  startIndex?: number;
  limit?: number;
  filters?: ItemFilter[];
  fields?: ItemFields[];
  channelIds?: string[];
};
