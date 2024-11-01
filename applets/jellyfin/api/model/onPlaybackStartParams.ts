/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { PlayMethod } from "./playMethod";

export type OnPlaybackStartParams = {
  /**
   * The id of the MediaSource.
   */
  mediaSourceId?: string;
  /**
   * The audio stream index.
   */
  audioStreamIndex?: number;
  /**
   * The subtitle stream index.
   */
  subtitleStreamIndex?: number;
  /**
   * The play method.
   */
  playMethod?: PlayMethod;
  /**
   * The live stream id.
   */
  liveStreamId?: string;
  /**
   * The play session id.
   */
  playSessionId?: string;
  /**
   * Indicates if the client can seek.
   */
  canSeek?: boolean;
};
