/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { HealthCheckResult } from "./healthCheckResult";
import type { HttpUri } from "./httpUri";

export interface HealthResource {
  id?: number;
  source?: string | null;
  type?: HealthCheckResult;
  message?: string | null;
  wikiUrl?: HttpUri;
}
