/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { ProperDownloadTypes } from "./properDownloadTypes";
import type { FileDateType } from "./fileDateType";
import type { RescanAfterRefreshType } from "./rescanAfterRefreshType";
import type { AllowFingerprinting } from "./allowFingerprinting";

export interface MediaManagementConfigResource {
  id?: number;
  autoUnmonitorPreviouslyDownloadedTracks?: boolean;
  recycleBin?: string | null;
  recycleBinCleanupDays?: number;
  downloadPropersAndRepacks?: ProperDownloadTypes;
  createEmptyArtistFolders?: boolean;
  deleteEmptyFolders?: boolean;
  fileDate?: FileDateType;
  watchLibraryForChanges?: boolean;
  rescanAfterRefresh?: RescanAfterRefreshType;
  allowFingerprinting?: AllowFingerprinting;
  setPermissionsLinux?: boolean;
  chmodFolder?: string | null;
  chownGroup?: string | null;
  skipFreeSpaceCheckWhenImporting?: boolean;
  minimumFreeSpaceWhenImporting?: number;
  copyUsingHardlinks?: boolean;
  importExtraFiles?: boolean;
  extraFileExtensions?: string | null;
}
