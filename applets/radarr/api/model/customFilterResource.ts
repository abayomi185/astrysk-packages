/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Radarr
 * Radarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { CustomFilterResourceFiltersItem } from "./customFilterResourceFiltersItem";

export interface CustomFilterResource {
  id?: number;
  type?: string | null;
  label?: string | null;
  filters?: CustomFilterResourceFiltersItem[] | null;
}
