/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { InstallationInfo } from "./installationInfo";
import type { FFmpegLocation } from "./fFmpegLocation";
import type { Architecture } from "./architecture";

/**
 * Class SystemInfo.
 */
export interface SystemInfo {
  /** Gets or sets the local address. */
  LocalAddress?: string | null;
  /** Gets or sets the name of the server. */
  ServerName?: string | null;
  /** Gets or sets the server version. */
  Version?: string | null;
  /** Gets or sets the product name. This is the AssemblyProduct name. */
  ProductName?: string | null;
  /** Gets or sets the operating system. */
  OperatingSystem?: string | null;
  /** Gets or sets the id. */
  Id?: string | null;
  /** Gets or sets a value indicating whether the startup wizard is completed. */
  StartupWizardCompleted?: boolean | null;
  /** Gets or sets the display name of the operating system. */
  OperatingSystemDisplayName?: string | null;
  /** Gets or sets the package name. */
  PackageName?: string | null;
  /** Gets or sets a value indicating whether this instance has pending restart. */
  HasPendingRestart?: boolean;
  IsShuttingDown?: boolean;
  /** Gets or sets a value indicating whether [supports library monitor]. */
  SupportsLibraryMonitor?: boolean;
  /** Gets or sets the web socket port number. */
  WebSocketPortNumber?: number;
  /** Gets or sets the completed installations. */
  CompletedInstallations?: InstallationInfo[] | null;
  /** Gets or sets a value indicating whether this instance can self restart. */
  CanSelfRestart?: boolean;
  CanLaunchWebBrowser?: boolean;
  /** Gets or sets the program data path. */
  ProgramDataPath?: string | null;
  /** Gets or sets the web UI resources path. */
  WebPath?: string | null;
  /** Gets or sets the items by name path. */
  ItemsByNamePath?: string | null;
  /** Gets or sets the cache path. */
  CachePath?: string | null;
  /** Gets or sets the log path. */
  LogPath?: string | null;
  /** Gets or sets the internal metadata path. */
  InternalMetadataPath?: string | null;
  /** Gets or sets the transcode path. */
  TranscodingTempPath?: string | null;
  /**
   * Gets or sets a value indicating whether this instance has update available.
   * @deprecated
   */
  HasUpdateAvailable?: boolean;
  /**
   * Enum describing the location of the FFmpeg tool.
   * @deprecated
   */
  EncoderLocation?: FFmpegLocation;
  SystemArchitecture?: Architecture;
}
