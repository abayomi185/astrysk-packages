/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */

/**
 * Enum TaskState.
 */
export type TaskState = (typeof TaskState)[keyof typeof TaskState];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TaskState = {
  Idle: "Idle",
  Cancelling: "Cancelling",
  Running: "Running",
} as const;
