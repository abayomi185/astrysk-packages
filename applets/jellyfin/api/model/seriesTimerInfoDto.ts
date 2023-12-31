/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { KeepUntil } from "./keepUntil";
import type { DayOfWeek } from "./dayOfWeek";
import type { SeriesTimerInfoDtoDayPattern } from "./seriesTimerInfoDtoDayPattern";
import type { SeriesTimerInfoDtoImageTags } from "./seriesTimerInfoDtoImageTags";

/**
 * Class SeriesTimerInfoDto.
 */
export interface SeriesTimerInfoDto {
  /** Gets or sets the Id of the recording. */
  Id?: string | null;
  Type?: string | null;
  /** Gets or sets the server identifier. */
  ServerId?: string | null;
  /** Gets or sets the external identifier. */
  ExternalId?: string | null;
  /** Gets or sets the channel id of the recording. */
  ChannelId?: string;
  /** Gets or sets the external channel identifier. */
  ExternalChannelId?: string | null;
  /** Gets or sets the channel name of the recording. */
  ChannelName?: string | null;
  ChannelPrimaryImageTag?: string | null;
  /** Gets or sets the program identifier. */
  ProgramId?: string | null;
  /** Gets or sets the external program identifier. */
  ExternalProgramId?: string | null;
  /** Gets or sets the name of the recording. */
  Name?: string | null;
  /** Gets or sets the description of the recording. */
  Overview?: string | null;
  /** Gets or sets the start date of the recording, in UTC. */
  StartDate?: string;
  /** Gets or sets the end date of the recording, in UTC. */
  EndDate?: string;
  /** Gets or sets the name of the service. */
  ServiceName?: string | null;
  /** Gets or sets the priority. */
  Priority?: number;
  /** Gets or sets the pre padding seconds. */
  PrePaddingSeconds?: number;
  /** Gets or sets the post padding seconds. */
  PostPaddingSeconds?: number;
  /** Gets or sets a value indicating whether this instance is pre padding required. */
  IsPrePaddingRequired?: boolean;
  /** Gets or sets the Id of the Parent that has a backdrop if the item does not have one. */
  ParentBackdropItemId?: string | null;
  /** Gets or sets the parent backdrop image tags. */
  ParentBackdropImageTags?: string[] | null;
  /** Gets or sets a value indicating whether this instance is post padding required. */
  IsPostPaddingRequired?: boolean;
  KeepUntil?: KeepUntil;
  /** Gets or sets a value indicating whether [record any time]. */
  RecordAnyTime?: boolean;
  SkipEpisodesInLibrary?: boolean;
  /** Gets or sets a value indicating whether [record any channel]. */
  RecordAnyChannel?: boolean;
  KeepUpTo?: number;
  /** Gets or sets a value indicating whether [record new only]. */
  RecordNewOnly?: boolean;
  /** Gets or sets the days. */
  Days?: DayOfWeek[] | null;
  /** Gets or sets the day pattern. */
  DayPattern?: SeriesTimerInfoDtoDayPattern;
  /** Gets or sets the image tags. */
  ImageTags?: SeriesTimerInfoDtoImageTags;
  /** Gets or sets the parent thumb item id. */
  ParentThumbItemId?: string | null;
  /** Gets or sets the parent thumb image tag. */
  ParentThumbImageTag?: string | null;
  /** Gets or sets the parent primary image item identifier. */
  ParentPrimaryImageItemId?: string | null;
  /** Gets or sets the parent primary image tag. */
  ParentPrimaryImageTag?: string | null;
}
