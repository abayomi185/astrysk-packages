/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */

export type TranscodeReason =
  (typeof TranscodeReason)[keyof typeof TranscodeReason];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TranscodeReason = {
  ContainerNotSupported: "ContainerNotSupported",
  VideoCodecNotSupported: "VideoCodecNotSupported",
  AudioCodecNotSupported: "AudioCodecNotSupported",
  SubtitleCodecNotSupported: "SubtitleCodecNotSupported",
  AudioIsExternal: "AudioIsExternal",
  SecondaryAudioNotSupported: "SecondaryAudioNotSupported",
  VideoProfileNotSupported: "VideoProfileNotSupported",
  VideoLevelNotSupported: "VideoLevelNotSupported",
  VideoResolutionNotSupported: "VideoResolutionNotSupported",
  VideoBitDepthNotSupported: "VideoBitDepthNotSupported",
  VideoFramerateNotSupported: "VideoFramerateNotSupported",
  RefFramesNotSupported: "RefFramesNotSupported",
  AnamorphicVideoNotSupported: "AnamorphicVideoNotSupported",
  InterlacedVideoNotSupported: "InterlacedVideoNotSupported",
  AudioChannelsNotSupported: "AudioChannelsNotSupported",
  AudioProfileNotSupported: "AudioProfileNotSupported",
  AudioSampleRateNotSupported: "AudioSampleRateNotSupported",
  AudioBitDepthNotSupported: "AudioBitDepthNotSupported",
  ContainerBitrateExceedsLimit: "ContainerBitrateExceedsLimit",
  VideoBitrateNotSupported: "VideoBitrateNotSupported",
  AudioBitrateNotSupported: "AudioBitrateNotSupported",
  UnknownVideoStreamInfo: "UnknownVideoStreamInfo",
  UnknownAudioStreamInfo: "UnknownAudioStreamInfo",
  DirectPlayError: "DirectPlayError",
  VideoRangeTypeNotSupported: "VideoRangeTypeNotSupported",
} as const;
