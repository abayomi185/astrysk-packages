/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { Quality } from "./quality";

export interface QualityProfileQualityItem {
  allowed?: boolean;
  id?: number;
  /** @nullable */
  items?: QualityProfileQualityItem[] | null;
  /** @nullable */
  name?: string | null;
  quality?: Quality;
}
