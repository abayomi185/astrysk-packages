/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Sonarr
 * Sonarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { SeriesTypes } from "./seriesTypes";
import type { ApplyTags } from "./applyTags";

export interface SeriesEditorResource {
  seriesIds?: number[] | null;
  monitored?: boolean | null;
  qualityProfileId?: number | null;
  seriesType?: SeriesTypes;
  seasonFolder?: boolean | null;
  rootFolderPath?: string | null;
  tags?: number[] | null;
  applyTags?: ApplyTags;
  moveFiles?: boolean;
  deleteFiles?: boolean;
  addImportListExclusion?: boolean;
}
