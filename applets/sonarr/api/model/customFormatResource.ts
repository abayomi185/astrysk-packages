/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Sonarr
 * Sonarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { CustomFormatSpecificationSchema } from "./customFormatSpecificationSchema";

export interface CustomFormatResource {
  id?: number;
  name?: string | null;
  includeCustomFormatWhenRenaming?: boolean | null;
  specifications?: CustomFormatSpecificationSchema[] | null;
}
