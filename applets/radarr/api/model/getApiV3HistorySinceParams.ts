/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Radarr
 * Radarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { MovieHistoryEventType } from "./movieHistoryEventType";

export type GetApiV3HistorySinceParams = {
  date?: string;
  eventType?: MovieHistoryEventType;
  includeMovie?: boolean;
};
