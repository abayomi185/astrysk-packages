/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { Field } from "./field";

export interface CustomFormatSpecificationSchema {
  /** @nullable */
  fields?: Field[] | null;
  id?: number;
  /** @nullable */
  implementation?: string | null;
  /** @nullable */
  implementationName?: string | null;
  /** @nullable */
  infoLink?: string | null;
  /** @nullable */
  name?: string | null;
  negate?: boolean;
  /** @nullable */
  presets?: CustomFormatSpecificationSchema[] | null;
  required?: boolean;
}
