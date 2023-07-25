/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Sonarr
 * Sonarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { ParsedEpisodeInfo } from "./parsedEpisodeInfo";
import type { SeriesResource } from "./seriesResource";
import type { EpisodeResource } from "./episodeResource";

export interface ParseResource {
  id?: number;
  title?: string | null;
  parsedEpisodeInfo?: ParsedEpisodeInfo;
  series?: SeriesResource;
  episodes?: EpisodeResource[] | null;
}
