/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { ProfileConditionType } from "./profileConditionType";
import type { ProfileConditionValue } from "./profileConditionValue";

export interface ProfileCondition {
  Condition?: ProfileConditionType;
  IsRequired?: boolean;
  Property?: ProfileConditionValue;
  /** @nullable */
  Value?: string | null;
}
