/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { NameValuePair } from "./nameValuePair";
import type { ImageSavingConvention } from "./imageSavingConvention";
import type { MetadataOptions } from "./metadataOptions";
import type { PathSubstitution } from "./pathSubstitution";
import type { RepositoryInfo } from "./repositoryInfo";

/**
 * Represents the server configuration.
 */
export interface ServerConfiguration {
  /**
   * Gets or sets the number of days we should retain activity logs.
   * @nullable
   */
  ActivityLogRetentionDays?: number | null;
  /** Gets or sets a value indicating whether clients should be allowed to upload logs. */
  AllowClientLogUpload?: boolean;
  /**
   * Gets or sets the cache path.
   * @nullable
   */
  CachePath?: string | null;
  CodecsUsed?: string[];
  ContentTypes?: NameValuePair[];
  /** Gets or sets the cors hosts. */
  CorsHosts?: string[];
  DisableLiveTvChannelUserDataName?: boolean;
  DisplaySpecialsWithinSeasons?: boolean;
  /** Gets or sets a value indicating whether [enable case sensitive item ids]. */
  EnableCaseSensitiveItemIds?: boolean;
  EnableExternalContentInSuggestions?: boolean;
  EnableFolderView?: boolean;
  EnableGroupingIntoCollections?: boolean;
  /** Gets or sets a value indicating whether to enable prometheus metrics exporting. */
  EnableMetrics?: boolean;
  EnableNormalizedItemByNameIds?: boolean;
  /** Gets or sets a value indicating whether slow server responses should be logged as a warning. */
  EnableSlowResponseWarning?: boolean;
  ImageExtractionTimeoutMs?: number;
  /** Gets or sets the image saving convention. */
  ImageSavingConvention?: ImageSavingConvention;
  /** Gets or sets a value indicating whether this instance is port authorized. */
  IsPortAuthorized?: boolean;
  /** Gets or sets a value indicating whether this instance is first run. */
  IsStartupWizardCompleted?: boolean;
  /** Gets or sets the how many metadata refreshes can run concurrently. */
  LibraryMetadataRefreshConcurrency?: number;
  /** Gets or sets the delay in seconds that we will wait after a file system change to try and discover what has been added/removed
Some delay is necessary with some items because their creation is not atomic.  It involves the creation of several
different directories and files. */
  LibraryMonitorDelay?: number;
  /** Gets or sets the how the library scan fans out. */
  LibraryScanFanoutConcurrency?: number;
  /** Gets or sets the number of days we should retain log files. */
  LogFileRetentionDays?: number;
  /** Gets or sets the remaining minutes of a book that can be played while still saving playstate. If this percentage is crossed playstate will be reset to the beginning and the item will be marked watched. */
  MaxAudiobookResume?: number;
  /** Gets or sets the maximum percentage of an item that can be played while still saving playstate. If this percentage is crossed playstate will be reset to the beginning and the item will be marked watched. */
  MaxResumePct?: number;
  /** Gets or sets the metadata country code. */
  MetadataCountryCode?: string;
  MetadataNetworkPath?: string;
  MetadataOptions?: MetadataOptions[];
  /** Gets or sets the metadata path. */
  MetadataPath?: string;
  /** Gets or sets the minimum minutes of a book that must be played in order for playstate to be updated. */
  MinAudiobookResume?: number;
  /** Gets or sets the minimum duration that an item must have in order to be eligible for playstate updates.. */
  MinResumeDurationSeconds?: number;
  /** Gets or sets the minimum percentage of an item that must be played in order for playstate to be updated. */
  MinResumePct?: number;
  PathSubstitutions?: PathSubstitution[];
  PluginRepositories?: RepositoryInfo[];
  /** Gets or sets the preferred metadata language. */
  PreferredMetadataLanguage?: string;
  /**
   * Gets or sets the last known version that was ran using the configuration.
   * @nullable
   */
  PreviousVersion?: string | null;
  /**
   * Gets or sets the stringified PreviousVersion to be stored/loaded,
because System.Version itself isn't xml-serializable.
   * @nullable
   */
  PreviousVersionStr?: string | null;
  /** Gets or sets a value indicating whether quick connect is available for use on this server. */
  QuickConnectAvailable?: boolean;
  RemoteClientBitrateLimit?: number;
  /** Gets or sets a value indicating whether older plugins should automatically be deleted from the plugin folder. */
  RemoveOldPlugins?: boolean;
  SaveMetadataHidden?: boolean;
  ServerName?: string;
  SkipDeserializationForBasicTypes?: boolean;
  /** Gets or sets the threshold for the slow response time warning in ms. */
  SlowResponseThresholdMs?: number;
  /** Gets or sets characters to be removed from strings to create a sort name. */
  SortRemoveCharacters?: string[];
  /** Gets or sets words to be removed from strings to create a sort name. */
  SortRemoveWords?: string[];
  /** Gets or sets characters to be replaced with a ' ' in strings to create a sort name. */
  SortReplaceCharacters?: string[];
  UICulture?: string;
}
