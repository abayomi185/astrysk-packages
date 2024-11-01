/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */

/**
 * This exists simply to identify a set of known commands.
 */
export type GeneralCommandType =
  (typeof GeneralCommandType)[keyof typeof GeneralCommandType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GeneralCommandType = {
  MoveUp: "MoveUp",
  MoveDown: "MoveDown",
  MoveLeft: "MoveLeft",
  MoveRight: "MoveRight",
  PageUp: "PageUp",
  PageDown: "PageDown",
  PreviousLetter: "PreviousLetter",
  NextLetter: "NextLetter",
  ToggleOsd: "ToggleOsd",
  ToggleContextMenu: "ToggleContextMenu",
  Select: "Select",
  Back: "Back",
  TakeScreenshot: "TakeScreenshot",
  SendKey: "SendKey",
  SendString: "SendString",
  GoHome: "GoHome",
  GoToSettings: "GoToSettings",
  VolumeUp: "VolumeUp",
  VolumeDown: "VolumeDown",
  Mute: "Mute",
  Unmute: "Unmute",
  ToggleMute: "ToggleMute",
  SetVolume: "SetVolume",
  SetAudioStreamIndex: "SetAudioStreamIndex",
  SetSubtitleStreamIndex: "SetSubtitleStreamIndex",
  ToggleFullscreen: "ToggleFullscreen",
  DisplayContent: "DisplayContent",
  GoToSearch: "GoToSearch",
  DisplayMessage: "DisplayMessage",
  SetRepeatMode: "SetRepeatMode",
  ChannelUp: "ChannelUp",
  ChannelDown: "ChannelDown",
  Guide: "Guide",
  ToggleStats: "ToggleStats",
  PlayMediaSource: "PlayMediaSource",
  PlayTrailers: "PlayTrailers",
  SetShuffleQueue: "SetShuffleQueue",
  PlayState: "PlayState",
  PlayNext: "PlayNext",
  ToggleOsdMenu: "ToggleOsdMenu",
  Play: "Play",
  SetMaxStreamingBitrate: "SetMaxStreamingBitrate",
} as const;
