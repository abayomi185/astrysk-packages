/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */

/**
 * An enum that represents a day of the week, weekdays, weekends, or all days.
 */
export type DynamicDayOfWeek =
  (typeof DynamicDayOfWeek)[keyof typeof DynamicDayOfWeek];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const DynamicDayOfWeek = {
  Sunday: "Sunday",
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Saturday: "Saturday",
  Everyday: "Everyday",
  Weekday: "Weekday",
  Weekend: "Weekend",
} as const;
