/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */

export type MetadataRefreshMode =
  (typeof MetadataRefreshMode)[keyof typeof MetadataRefreshMode];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const MetadataRefreshMode = {
  None: "None",
  ValidationOnly: "ValidationOnly",
  Default: "Default",
  FullRefresh: "FullRefresh",
} as const;
