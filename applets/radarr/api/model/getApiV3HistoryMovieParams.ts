/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Radarr
 * Radarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { MovieHistoryEventType } from "./movieHistoryEventType";

export type GetApiV3HistoryMovieParams = {
  movieId?: number;
  eventType?: MovieHistoryEventType;
  includeMovie?: boolean;
};
