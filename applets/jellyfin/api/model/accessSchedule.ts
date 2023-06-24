/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { DynamicDayOfWeek } from './dynamicDayOfWeek';

/**
 * An entity representing a user's access schedule.
 */
export interface AccessSchedule {
  /** Gets the id of this instance. */
  readonly Id?: number;
  /** Gets the id of the associated user. */
  UserId?: string;
  /** Gets or sets the day of week. */
  DayOfWeek?: DynamicDayOfWeek;
  /** Gets or sets the start hour. */
  StartHour?: number;
  /** Gets or sets the end hour. */
  EndHour?: number;
}
