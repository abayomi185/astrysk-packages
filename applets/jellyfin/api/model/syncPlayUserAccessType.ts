/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */

/**
 * Enum SyncPlayUserAccessType.
 */
export type SyncPlayUserAccessType =
  (typeof SyncPlayUserAccessType)[keyof typeof SyncPlayUserAccessType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SyncPlayUserAccessType = {
  CreateAndJoinGroups: "CreateAndJoinGroups",
  JoinGroups: "JoinGroups",
  None: "None",
} as const;
