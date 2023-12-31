/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { ProfileFormatItem } from "./profileFormatItem";
import type { QualityProfileQualityItem } from "./qualityProfileQualityItem";

export interface QualityProfile {
  id?: number;
  name?: string | null;
  upgradeAllowed?: boolean;
  cutoff?: number;
  minFormatScore?: number;
  cutoffFormatScore?: number;
  formatItems?: ProfileFormatItem[] | null;
  items?: QualityProfileQualityItem[] | null;
}
