/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Radarr
 * Radarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { MovieStatusType } from "./movieStatusType";
import type { ApplyTags } from "./applyTags";

export interface MovieEditorResource {
  movieIds?: number[] | null;
  monitored?: boolean | null;
  qualityProfileId?: number | null;
  minimumAvailability?: MovieStatusType;
  rootFolderPath?: string | null;
  tags?: number[] | null;
  applyTags?: ApplyTags;
  moveFiles?: boolean;
  deleteFiles?: boolean;
  addImportExclusion?: boolean;
}
