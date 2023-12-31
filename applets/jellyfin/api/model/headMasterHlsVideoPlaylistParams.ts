/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { SubtitleDeliveryMethod } from "./subtitleDeliveryMethod";
import type { EncodingContext } from "./encodingContext";

export type HeadMasterHlsVideoPlaylistParams = {
  static?: boolean;
  params?: string;
  tag?: string;
  deviceProfileId?: string;
  playSessionId?: string;
  segmentContainer?: string;
  segmentLength?: number;
  minSegments?: number;
  mediaSourceId: string;
  deviceId?: string;
  audioCodec?: string;
  enableAutoStreamCopy?: boolean;
  allowVideoStreamCopy?: boolean;
  allowAudioStreamCopy?: boolean;
  breakOnNonKeyFrames?: boolean;
  audioSampleRate?: number;
  maxAudioBitDepth?: number;
  audioBitRate?: number;
  audioChannels?: number;
  maxAudioChannels?: number;
  profile?: string;
  level?: string;
  framerate?: number;
  maxFramerate?: number;
  copyTimestamps?: boolean;
  startTimeTicks?: number;
  width?: number;
  height?: number;
  maxWidth?: number;
  maxHeight?: number;
  videoBitRate?: number;
  subtitleStreamIndex?: number;
  subtitleMethod?: SubtitleDeliveryMethod;
  maxRefFrames?: number;
  maxVideoBitDepth?: number;
  requireAvc?: boolean;
  deInterlace?: boolean;
  requireNonAnamorphic?: boolean;
  transcodingMaxAudioChannels?: number;
  cpuCoreLimit?: number;
  liveStreamId?: string;
  enableMpegtsM2TsMode?: boolean;
  videoCodec?: string;
  subtitleCodec?: string;
  transcodeReasons?: string;
  audioStreamIndex?: number;
  videoStreamIndex?: number;
  context?: EncodingContext;
  streamOptions?: { [key: string]: string | null };
  enableAdaptiveBitrateStreaming?: boolean;
};
