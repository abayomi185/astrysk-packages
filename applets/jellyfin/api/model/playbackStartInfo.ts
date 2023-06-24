/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { PlaybackStartInfoItem } from './playbackStartInfoItem';
import type { PlayMethod } from './playMethod';
import type { RepeatMode } from './repeatMode';
import type { QueueItem } from './queueItem';

/**
 * Class PlaybackStartInfo.
 */
export interface PlaybackStartInfo {
  /** Gets or sets a value indicating whether this instance can seek. */
  CanSeek?: boolean;
  /** Gets or sets the item. */
  Item?: PlaybackStartInfoItem;
  /** Gets or sets the item identifier. */
  ItemId?: string;
  /** Gets or sets the session id. */
  SessionId?: string | null;
  /** Gets or sets the media version identifier. */
  MediaSourceId?: string | null;
  /** Gets or sets the index of the audio stream. */
  AudioStreamIndex?: number | null;
  /** Gets or sets the index of the subtitle stream. */
  SubtitleStreamIndex?: number | null;
  /** Gets or sets a value indicating whether this instance is paused. */
  IsPaused?: boolean;
  /** Gets or sets a value indicating whether this instance is muted. */
  IsMuted?: boolean;
  /** Gets or sets the position ticks. */
  PositionTicks?: number | null;
  PlaybackStartTimeTicks?: number | null;
  /** Gets or sets the volume level. */
  VolumeLevel?: number | null;
  Brightness?: number | null;
  AspectRatio?: string | null;
  /** Gets or sets the play method. */
  PlayMethod?: PlayMethod;
  /** Gets or sets the live stream identifier. */
  LiveStreamId?: string | null;
  /** Gets or sets the play session identifier. */
  PlaySessionId?: string | null;
  /** Gets or sets the repeat mode. */
  RepeatMode?: RepeatMode;
  NowPlayingQueue?: QueueItem[] | null;
  PlaylistItemId?: string | null;
}
