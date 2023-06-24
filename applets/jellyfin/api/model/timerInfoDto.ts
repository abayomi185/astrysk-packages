/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { KeepUntil } from './keepUntil';
import type { RecordingStatus } from './recordingStatus';
import type { TimerInfoDtoProgramInfo } from './timerInfoDtoProgramInfo';

export interface TimerInfoDto {
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
  /** Gets or sets the status. */
  Status?: RecordingStatus;
  /** Gets or sets the series timer identifier. */
  SeriesTimerId?: string | null;
  /** Gets or sets the external series timer identifier. */
  ExternalSeriesTimerId?: string | null;
  /** Gets or sets the run time ticks. */
  RunTimeTicks?: number | null;
  /** Gets or sets the program information. */
  ProgramInfo?: TimerInfoDtoProgramInfo;
}
