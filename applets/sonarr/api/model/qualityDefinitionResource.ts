/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Sonarr
 * Sonarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { Quality } from "./quality";

export interface QualityDefinitionResource {
  id?: number;
  quality?: Quality;
  title?: string | null;
  weight?: number;
  minSize?: number | null;
  maxSize?: number | null;
  preferredSize?: number | null;
}