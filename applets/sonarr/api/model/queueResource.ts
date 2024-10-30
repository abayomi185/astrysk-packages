/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Sonarr
 * Sonarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { CustomFormatResource } from "./customFormatResource";
import type { EpisodeResource } from "./episodeResource";
import type { Language } from "./language";
import type { DownloadProtocol } from "./downloadProtocol";
import type { QualityModel } from "./qualityModel";
import type { SeriesResource } from "./seriesResource";
import type { TrackedDownloadStatusMessage } from "./trackedDownloadStatusMessage";
import type { TimeSpan } from "./timeSpan";
import type { TrackedDownloadState } from "./trackedDownloadState";
import type { TrackedDownloadStatus } from "./trackedDownloadStatus";

export interface QueueResource {
  /** @nullable */
  customFormats?: CustomFormatResource[] | null;
  /** @nullable */
  downloadClient?: string | null;
  /** @nullable */
  downloadId?: string | null;
  episode?: EpisodeResource;
  episodeHasFile?: boolean;
  /** @nullable */
  episodeId?: number | null;
  /** @nullable */
  errorMessage?: string | null;
  /** @nullable */
  estimatedCompletionTime?: string | null;
  id?: number;
  /** @nullable */
  indexer?: string | null;
  /** @nullable */
  languages?: Language[] | null;
  /** @nullable */
  outputPath?: string | null;
  protocol?: DownloadProtocol;
  quality?: QualityModel;
  /** @nullable */
  seasonNumber?: number | null;
  series?: SeriesResource;
  /** @nullable */
  seriesId?: number | null;
  size?: number;
  sizeleft?: number;
  /** @nullable */
  status?: string | null;
  /** @nullable */
  statusMessages?: TrackedDownloadStatusMessage[] | null;
  timeleft?: TimeSpan;
  /** @nullable */
  title?: string | null;
  trackedDownloadState?: TrackedDownloadState;
  trackedDownloadStatus?: TrackedDownloadStatus;
}
