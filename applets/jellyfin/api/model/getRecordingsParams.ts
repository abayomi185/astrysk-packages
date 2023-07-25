/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { RecordingStatus } from "./recordingStatus";
import type { ImageType } from "./imageType";
import type { ItemFields } from "./itemFields";

export type GetRecordingsParams = {
  channelId?: string;
  userId?: string;
  startIndex?: number;
  limit?: number;
  status?: RecordingStatus;
  isInProgress?: boolean;
  seriesTimerId?: string;
  enableImages?: boolean;
  imageTypeLimit?: number;
  enableImageTypes?: ImageType[];
  fields?: ItemFields[];
  enableUserData?: boolean;
  isMovie?: boolean;
  isSeries?: boolean;
  isKids?: boolean;
  isSports?: boolean;
  isNews?: boolean;
  isLibraryItem?: boolean;
  enableTotalRecordCount?: boolean;
};
