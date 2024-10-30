/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { SelectOption } from "./selectOption";
import type { FieldValue } from "./fieldValue";

export interface Field {
  advanced?: boolean;
  /** @nullable */
  helpLink?: string | null;
  /** @nullable */
  helpText?: string | null;
  /** @nullable */
  helpTextWarning?: string | null;
  /** @nullable */
  hidden?: string | null;
  isFloat?: boolean;
  /** @nullable */
  label?: string | null;
  /** @nullable */
  name?: string | null;
  order?: number;
  /** @nullable */
  placeholder?: string | null;
  /** @nullable */
  section?: string | null;
  /** @nullable */
  selectOptions?: SelectOption[] | null;
  /** @nullable */
  selectOptionsProviderAction?: string | null;
  /** @nullable */
  type?: string | null;
  /** @nullable */
  unit?: string | null;
  /** @nullable */
  value?: FieldValue;
}
