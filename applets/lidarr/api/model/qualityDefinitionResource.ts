/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { Quality } from "./quality";

export interface QualityDefinitionResource {
  id?: number;
  /** @nullable */
  maxSize?: number | null;
  /** @nullable */
  minSize?: number | null;
  quality?: Quality;
  /** @nullable */
  title?: string | null;
  weight?: number;
}
