/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Radarr
 * Radarr API docs
 * OpenAPI spec version: 3.0.0
 */

export interface IndexerConfigResource {
  allowHardcodedSubs?: boolean;
  availabilityDelay?: number;
  id?: number;
  maximumSize?: number;
  minimumAge?: number;
  preferIndexerFlags?: boolean;
  retention?: number;
  rssSyncInterval?: number;
  /** @nullable */
  whitelistedHardcodedSubs?: string | null;
}
