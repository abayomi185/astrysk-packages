/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Sonarr
 * Sonarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { EpisodeHistoryEventType } from "./episodeHistoryEventType";

export type GetApiV3HistorySinceParams = {
  date?: string;
  eventType?: EpisodeHistoryEventType;
  includeSeries?: boolean;
  includeEpisode?: boolean;
};
