/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */

export type CommandStatus = (typeof CommandStatus)[keyof typeof CommandStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CommandStatus = {
  queued: "queued",
  started: "started",
  completed: "completed",
  failed: "failed",
  aborted: "aborted",
  cancelled: "cancelled",
  orphaned: "orphaned",
} as const;
