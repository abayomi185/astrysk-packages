/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { DeviceProfileIdentification } from "./deviceProfileIdentification";
import type { XmlAttribute } from "./xmlAttribute";
import type { DirectPlayProfile } from "./directPlayProfile";
import type { TranscodingProfile } from "./transcodingProfile";
import type { ContainerProfile } from "./containerProfile";
import type { CodecProfile } from "./codecProfile";
import type { ResponseProfile } from "./responseProfile";
import type { SubtitleProfile } from "./subtitleProfile";

/**
 * A MediaBrowser.Model.Dlna.DeviceProfile represents a set of metadata which determines which content a certain device is able to play.
<br />
Specifically, it defines the supported <see cref="P:MediaBrowser.Model.Dlna.DeviceProfile.ContainerProfiles">containers</see> and
<see cref="P:MediaBrowser.Model.Dlna.DeviceProfile.CodecProfiles">codecs</see> (video and/or audio, including codec profiles and levels)
the device is able to direct play (without transcoding or remuxing),
as well as which <see cref="P:MediaBrowser.Model.Dlna.DeviceProfile.TranscodingProfiles">containers/codecs to transcode to</see> in case it isn't.
 */
export interface DeviceProfile {
  /** Gets or sets the name of this device profile. */
  Name?: string | null;
  /** Gets or sets the Id. */
  Id?: string | null;
  /** Gets or sets the Identification. */
  Identification?: DeviceProfileIdentification;
  /** Gets or sets the friendly name of the device profile, which can be shown to users. */
  FriendlyName?: string | null;
  /** Gets or sets the manufacturer of the device which this profile represents. */
  Manufacturer?: string | null;
  /** Gets or sets an url for the manufacturer of the device which this profile represents. */
  ManufacturerUrl?: string | null;
  /** Gets or sets the model name of the device which this profile represents. */
  ModelName?: string | null;
  /** Gets or sets the model description of the device which this profile represents. */
  ModelDescription?: string | null;
  /** Gets or sets the model number of the device which this profile represents. */
  ModelNumber?: string | null;
  /** Gets or sets the ModelUrl. */
  ModelUrl?: string | null;
  /** Gets or sets the serial number of the device which this profile represents. */
  SerialNumber?: string | null;
  /** Gets or sets a value indicating whether EnableAlbumArtInDidl. */
  EnableAlbumArtInDidl?: boolean;
  /** Gets or sets a value indicating whether EnableSingleAlbumArtLimit. */
  EnableSingleAlbumArtLimit?: boolean;
  /** Gets or sets a value indicating whether EnableSingleSubtitleLimit. */
  EnableSingleSubtitleLimit?: boolean;
  /** Gets or sets the SupportedMediaTypes. */
  SupportedMediaTypes?: string;
  /** Gets or sets the UserId. */
  UserId?: string | null;
  /** Gets or sets the AlbumArtPn. */
  AlbumArtPn?: string | null;
  /** Gets or sets the MaxAlbumArtWidth. */
  MaxAlbumArtWidth?: number | null;
  /** Gets or sets the MaxAlbumArtHeight. */
  MaxAlbumArtHeight?: number | null;
  /** Gets or sets the maximum allowed width of embedded icons. */
  MaxIconWidth?: number | null;
  /** Gets or sets the maximum allowed height of embedded icons. */
  MaxIconHeight?: number | null;
  /** Gets or sets the maximum allowed bitrate for all streamed content. */
  MaxStreamingBitrate?: number | null;
  /** Gets or sets the maximum allowed bitrate for statically streamed content (= direct played files). */
  MaxStaticBitrate?: number | null;
  /** Gets or sets the maximum allowed bitrate for transcoded music streams. */
  MusicStreamingTranscodingBitrate?: number | null;
  /** Gets or sets the maximum allowed bitrate for statically streamed (= direct played) music files. */
  MaxStaticMusicBitrate?: number | null;
  /** Gets or sets the content of the aggregationFlags element in the urn:schemas-sonycom:av namespace. */
  SonyAggregationFlags?: string | null;
  /** Gets or sets the ProtocolInfo. */
  ProtocolInfo?: string | null;
  /** Gets or sets the TimelineOffsetSeconds. */
  TimelineOffsetSeconds?: number;
  /** Gets or sets a value indicating whether RequiresPlainVideoItems. */
  RequiresPlainVideoItems?: boolean;
  /** Gets or sets a value indicating whether RequiresPlainFolders. */
  RequiresPlainFolders?: boolean;
  /** Gets or sets a value indicating whether EnableMSMediaReceiverRegistrar. */
  EnableMSMediaReceiverRegistrar?: boolean;
  /** Gets or sets a value indicating whether IgnoreTranscodeByteRangeRequests. */
  IgnoreTranscodeByteRangeRequests?: boolean;
  /** Gets or sets the XmlRootAttributes. */
  XmlRootAttributes?: XmlAttribute[];
  /** Gets or sets the direct play profiles. */
  DirectPlayProfiles?: DirectPlayProfile[];
  /** Gets or sets the transcoding profiles. */
  TranscodingProfiles?: TranscodingProfile[];
  /** Gets or sets the container profiles. */
  ContainerProfiles?: ContainerProfile[];
  /** Gets or sets the codec profiles. */
  CodecProfiles?: CodecProfile[];
  /** Gets or sets the ResponseProfiles. */
  ResponseProfiles?: ResponseProfile[];
  /** Gets or sets the subtitle profiles. */
  SubtitleProfiles?: SubtitleProfile[];
}
