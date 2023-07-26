/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Sonarr
 * Sonarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { FieldValue } from "./fieldValue";
import type { SelectOption } from "./selectOption";
import type { PrivacyLevel } from "./privacyLevel";

export interface Field {
  order?: number;
  name?: string | null;
  label?: string | null;
  unit?: string | null;
  helpText?: string | null;
  helpTextWarning?: string | null;
  helpLink?: string | null;
  value?: FieldValue;
  type?: string | null;
  advanced?: boolean;
  selectOptions?: SelectOption[] | null;
  selectOptionsProviderAction?: string | null;
  section?: string | null;
  hidden?: string | null;
  privacy?: PrivacyLevel;
  placeholder?: string | null;
}