/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Radarr
 * Radarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { ExtraFileType } from "./extraFileType";

export interface ExtraFileResource {
  id?: number;
  movieId?: number;
  movieFileId?: number | null;
  relativePath?: string | null;
  extension?: string | null;
  type?: ExtraFileType;
}