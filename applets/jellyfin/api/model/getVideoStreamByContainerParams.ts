/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { SubtitleDeliveryMethod } from "./subtitleDeliveryMethod";
import type { EncodingContext } from "./encodingContext";

export type GetVideoStreamByContainerParams = {
  /**
   * Optional. If true, the original file will be streamed statically without any encoding. Use either no url extension or the original file extension. true/false.
   */
  static?: boolean;
  /**
   * The streaming parameters.
   */
  params?: string;
  /**
   * The tag.
   */
  tag?: string;
  /**
   * Optional. The dlna device profile id to utilize.
   */
  deviceProfileId?: string;
  /**
   * The play session id.
   */
  playSessionId?: string;
  /**
   * The segment container.
   */
  segmentContainer?: string;
  /**
   * The segment length.
   */
  segmentLength?: number;
  /**
   * The minimum number of segments.
   */
  minSegments?: number;
  /**
   * The media version id, if playing an alternate version.
   */
  mediaSourceId?: string;
  /**
   * The device id of the client requesting. Used to stop encoding processes when needed.
   */
  deviceId?: string;
  /**
   * Optional. Specify a audio codec to encode to, e.g. mp3. If omitted the server will auto-select using the url's extension. Options: aac, mp3, vorbis, wma.
   */
  audioCodec?: string;
  /**
   * Whether or not to allow automatic stream copy if requested values match the original source. Defaults to true.
   */
  enableAutoStreamCopy?: boolean;
  /**
   * Whether or not to allow copying of the video stream url.
   */
  allowVideoStreamCopy?: boolean;
  /**
   * Whether or not to allow copying of the audio stream url.
   */
  allowAudioStreamCopy?: boolean;
  /**
   * Optional. Whether to break on non key frames.
   */
  breakOnNonKeyFrames?: boolean;
  /**
   * Optional. Specify a specific audio sample rate, e.g. 44100.
   */
  audioSampleRate?: number;
  /**
   * Optional. The maximum audio bit depth.
   */
  maxAudioBitDepth?: number;
  /**
   * Optional. Specify an audio bitrate to encode to, e.g. 128000. If omitted this will be left to encoder defaults.
   */
  audioBitRate?: number;
  /**
   * Optional. Specify a specific number of audio channels to encode to, e.g. 2.
   */
  audioChannels?: number;
  /**
   * Optional. Specify a maximum number of audio channels to encode to, e.g. 2.
   */
  maxAudioChannels?: number;
  /**
   * Optional. Specify a specific an encoder profile (varies by encoder), e.g. main, baseline, high.
   */
  profile?: string;
  /**
   * Optional. Specify a level for the encoder profile (varies by encoder), e.g. 3, 3.1.
   */
  level?: string;
  /**
   * Optional. A specific video framerate to encode to, e.g. 23.976. Generally this should be omitted unless the device has specific requirements.
   */
  framerate?: number;
  /**
   * Optional. A specific maximum video framerate to encode to, e.g. 23.976. Generally this should be omitted unless the device has specific requirements.
   */
  maxFramerate?: number;
  /**
   * Whether or not to copy timestamps when transcoding with an offset. Defaults to false.
   */
  copyTimestamps?: boolean;
  /**
   * Optional. Specify a starting offset, in ticks. 1 tick = 10000 ms.
   */
  startTimeTicks?: number;
  /**
   * Optional. The fixed horizontal resolution of the encoded video.
   */
  width?: number;
  /**
   * Optional. The fixed vertical resolution of the encoded video.
   */
  height?: number;
  /**
   * Optional. The maximum horizontal resolution of the encoded video.
   */
  maxWidth?: number;
  /**
   * Optional. The maximum vertical resolution of the encoded video.
   */
  maxHeight?: number;
  /**
   * Optional. Specify a video bitrate to encode to, e.g. 500000. If omitted this will be left to encoder defaults.
   */
  videoBitRate?: number;
  /**
   * Optional. The index of the subtitle stream to use. If omitted no subtitles will be used.
   */
  subtitleStreamIndex?: number;
  /**
   * Optional. Specify the subtitle delivery method.
   */
  subtitleMethod?: SubtitleDeliveryMethod;
  /**
   * Optional.
   */
  maxRefFrames?: number;
  /**
   * Optional. The maximum video bit depth.
   */
  maxVideoBitDepth?: number;
  /**
   * Optional. Whether to require avc.
   */
  requireAvc?: boolean;
  /**
   * Optional. Whether to deinterlace the video.
   */
  deInterlace?: boolean;
  /**
   * Optional. Whether to require a non anamorphic stream.
   */
  requireNonAnamorphic?: boolean;
  /**
   * Optional. The maximum number of audio channels to transcode.
   */
  transcodingMaxAudioChannels?: number;
  /**
   * Optional. The limit of how many cpu cores to use.
   */
  cpuCoreLimit?: number;
  /**
   * The live stream id.
   */
  liveStreamId?: string;
  /**
   * Optional. Whether to enable the MpegtsM2Ts mode.
   */
  enableMpegtsM2TsMode?: boolean;
  /**
   * Optional. Specify a video codec to encode to, e.g. h264. If omitted the server will auto-select using the url's extension. Options: h265, h264, mpeg4, theora, vp8, vp9, vpx (deprecated), wmv.
   */
  videoCodec?: string;
  /**
   * Optional. Specify a subtitle codec to encode to.
   */
  subtitleCodec?: string;
  /**
   * Optional. The transcoding reason.
   */
  transcodeReasons?: string;
  /**
   * Optional. The index of the audio stream to use. If omitted the first audio stream will be used.
   */
  audioStreamIndex?: number;
  /**
   * Optional. The index of the video stream to use. If omitted the first video stream will be used.
   */
  videoStreamIndex?: number;
  /**
   * Optional. The MediaBrowser.Model.Dlna.EncodingContext.
   */
  context?: EncodingContext;
  /**
   * Optional. The streaming options.
   */
  streamOptions?: { [key: string]: string | null };
};
