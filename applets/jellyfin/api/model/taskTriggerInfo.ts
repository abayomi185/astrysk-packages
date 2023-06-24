/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { TaskTriggerInfoDayOfWeek } from './taskTriggerInfoDayOfWeek';

/**
 * Class TaskTriggerInfo.
 */
export interface TaskTriggerInfo {
  /** Gets or sets the type. */
  Type?: string | null;
  /** Gets or sets the time of day. */
  TimeOfDayTicks?: number | null;
  /** Gets or sets the interval. */
  IntervalTicks?: number | null;
  /** Gets or sets the day of week. */
  DayOfWeek?: TaskTriggerInfoDayOfWeek;
  /** Gets or sets the maximum runtime ticks. */
  MaxRuntimeTicks?: number | null;
}
