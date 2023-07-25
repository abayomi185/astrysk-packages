/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { MediaProtocol } from "./mediaProtocol";
import type { MediaSourceInfoEncoderProtocol } from "./mediaSourceInfoEncoderProtocol";
import type { MediaSourceType } from "./mediaSourceType";
import type { MediaSourceInfoVideoType } from "./mediaSourceInfoVideoType";
import type { MediaSourceInfoIsoType } from "./mediaSourceInfoIsoType";
import type { MediaSourceInfoVideo3DFormat } from "./mediaSourceInfoVideo3DFormat";
import type { MediaStream } from "./mediaStream";
import type { MediaAttachment } from "./mediaAttachment";
import type { MediaSourceInfoTimestamp } from "./mediaSourceInfoTimestamp";
import type { MediaSourceInfoRequiredHttpHeaders } from "./mediaSourceInfoRequiredHttpHeaders";

export interface MediaSourceInfo {
  Protocol?: MediaProtocol;
  Id?: string | null;
  Path?: string | null;
  EncoderPath?: string | null;
  EncoderProtocol?: MediaSourceInfoEncoderProtocol;
  Type?: MediaSourceType;
  Container?: string | null;
  Size?: number | null;
  Name?: string | null;
  /** Gets or sets a value indicating whether the media is remote.
Differentiate internet url vs local network. */
  IsRemote?: boolean;
  ETag?: string | null;
  RunTimeTicks?: number | null;
  ReadAtNativeFramerate?: boolean;
  IgnoreDts?: boolean;
  IgnoreIndex?: boolean;
  GenPtsInput?: boolean;
  SupportsTranscoding?: boolean;
  SupportsDirectStream?: boolean;
  SupportsDirectPlay?: boolean;
  IsInfiniteStream?: boolean;
  RequiresOpening?: boolean;
  OpenToken?: string | null;
  RequiresClosing?: boolean;
  LiveStreamId?: string | null;
  BufferMs?: number | null;
  RequiresLooping?: boolean;
  SupportsProbing?: boolean;
  VideoType?: MediaSourceInfoVideoType;
  IsoType?: MediaSourceInfoIsoType;
  Video3DFormat?: MediaSourceInfoVideo3DFormat;
  MediaStreams?: MediaStream[] | null;
  MediaAttachments?: MediaAttachment[] | null;
  Formats?: string[] | null;
  Bitrate?: number | null;
  Timestamp?: MediaSourceInfoTimestamp;
  RequiredHttpHeaders?: MediaSourceInfoRequiredHttpHeaders;
  TranscodingUrl?: string | null;
  TranscodingSubProtocol?: string | null;
  TranscodingContainer?: string | null;
  AnalyzeDurationMs?: number | null;
  DefaultAudioStreamIndex?: number | null;
  DefaultSubtitleStreamIndex?: number | null;
}
