/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Sonarr
 * Sonarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { QualityProfileQualityItemResource } from "./qualityProfileQualityItemResource";
import type { ProfileFormatItemResource } from "./profileFormatItemResource";

export interface QualityProfileResource {
  id?: number;
  name?: string | null;
  upgradeAllowed?: boolean;
  cutoff?: number;
  items?: QualityProfileQualityItemResource[] | null;
  minFormatScore?: number;
  cutoffFormatScore?: number;
  formatItems?: ProfileFormatItemResource[] | null;
}