/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Sonarr
 * Sonarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { MonitorTypes } from "./monitorTypes";

export interface AddSeriesOptions {
  ignoreEpisodesWithFiles?: boolean;
  ignoreEpisodesWithoutFiles?: boolean;
  monitor?: MonitorTypes;
  searchForMissingEpisodes?: boolean;
  searchForCutoffUnmetEpisodes?: boolean;
}
