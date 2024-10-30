/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */

export type RecordingStatus =
  (typeof RecordingStatus)[keyof typeof RecordingStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RecordingStatus = {
  New: "New",
  InProgress: "InProgress",
  Completed: "Completed",
  Cancelled: "Cancelled",
  ConflictedOk: "ConflictedOk",
  ConflictedNotOk: "ConflictedNotOk",
  Error: "Error",
} as const;
