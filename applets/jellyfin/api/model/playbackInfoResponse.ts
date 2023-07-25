/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { MediaSourceInfo } from "./mediaSourceInfo";
import type { PlaybackInfoResponseErrorCode } from "./playbackInfoResponseErrorCode";

/**
 * Class PlaybackInfoResponse.
 */
export interface PlaybackInfoResponse {
  /** Gets or sets the media sources. */
  MediaSources?: MediaSourceInfo[];
  /** Gets or sets the play session identifier. */
  PlaySessionId?: string | null;
  /** Gets or sets the error code. */
  ErrorCode?: PlaybackInfoResponseErrorCode;
}
