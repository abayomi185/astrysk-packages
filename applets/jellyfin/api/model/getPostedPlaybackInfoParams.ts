/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */

export type GetPostedPlaybackInfoParams = {
  userId?: string;
  maxStreamingBitrate?: number;
  startTimeTicks?: number;
  audioStreamIndex?: number;
  subtitleStreamIndex?: number;
  maxAudioChannels?: number;
  mediaSourceId?: string;
  liveStreamId?: string;
  autoOpenLiveStream?: boolean;
  enableDirectPlay?: boolean;
  enableDirectStream?: boolean;
  enableTranscoding?: boolean;
  allowVideoStreamCopy?: boolean;
  allowAudioStreamCopy?: boolean;
};
