/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Sonarr
 * Sonarr API docs
 * OpenAPI spec version: 3.0.0
 */

export type TrackedDownloadState =
  (typeof TrackedDownloadState)[keyof typeof TrackedDownloadState];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TrackedDownloadState = {
  downloading: "downloading",
  importPending: "importPending",
  importing: "importing",
  imported: "imported",
  failedPending: "failedPending",
  failed: "failed",
  ignored: "ignored",
} as const;
