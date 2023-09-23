/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Radarr
 * Radarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { Language } from "./language";
import type { QualityModel } from "./qualityModel";
import type { CustomFormatResource } from "./customFormatResource";
import type { MovieHistoryEventType } from "./movieHistoryEventType";
import type { HistoryResourceData } from "./historyResourceData";
import type { MovieResource } from "./movieResource";

export interface HistoryResource {
  id?: number;
  movieId?: number;
  sourceTitle?: string | null;
  languages?: Language[] | null;
  quality?: QualityModel;
  customFormats?: CustomFormatResource[] | null;
  customFormatScore?: number;
  qualityCutoffNotMet?: boolean;
  date?: string;
  downloadId?: string | null;
  eventType?: MovieHistoryEventType;
  data?: HistoryResourceData;
  movie?: MovieResource;
}