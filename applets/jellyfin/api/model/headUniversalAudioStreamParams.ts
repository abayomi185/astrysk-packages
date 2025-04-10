/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */

export type HeadUniversalAudioStreamParams = {
  /**
   * Optional. The audio container.
   */
  container?: string[];
  /**
   * The media version id, if playing an alternate version.
   */
  mediaSourceId?: string;
  /**
   * The device id of the client requesting. Used to stop encoding processes when needed.
   */
  deviceId?: string;
  /**
   * Optional. The user id.
   */
  userId?: string;
  /**
   * Optional. The audio codec to transcode to.
   */
  audioCodec?: string;
  /**
   * Optional. The maximum number of audio channels.
   */
  maxAudioChannels?: number;
  /**
   * Optional. The number of how many audio channels to transcode to.
   */
  transcodingAudioChannels?: number;
  /**
   * Optional. The maximum streaming bitrate.
   */
  maxStreamingBitrate?: number;
  /**
   * Optional. Specify an audio bitrate to encode to, e.g. 128000. If omitted this will be left to encoder defaults.
   */
  audioBitRate?: number;
  /**
   * Optional. Specify a starting offset, in ticks. 1 tick = 10000 ms.
   */
  startTimeTicks?: number;
  /**
   * Optional. The container to transcode to.
   */
  transcodingContainer?: string;
  /**
   * Optional. The transcoding protocol.
   */
  transcodingProtocol?: string;
  /**
   * Optional. The maximum audio sample rate.
   */
  maxAudioSampleRate?: number;
  /**
   * Optional. The maximum audio bit depth.
   */
  maxAudioBitDepth?: number;
  /**
   * Optional. Whether to enable remote media.
   */
  enableRemoteMedia?: boolean;
  /**
   * Optional. Whether to break on non key frames.
   */
  breakOnNonKeyFrames?: boolean;
  /**
   * Whether to enable redirection. Defaults to true.
   */
  enableRedirection?: boolean;
};
