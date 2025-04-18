/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Radarr
 * Radarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { ProperDownloadTypes } from "./properDownloadTypes";
import type { FileDateType } from "./fileDateType";
import type { RescanAfterRefreshType } from "./rescanAfterRefreshType";

export interface MediaManagementConfigResource {
  autoRenameFolders?: boolean;
  autoUnmonitorPreviouslyDownloadedMovies?: boolean;
  /** @nullable */
  chmodFolder?: string | null;
  /** @nullable */
  chownGroup?: string | null;
  copyUsingHardlinks?: boolean;
  createEmptyMovieFolders?: boolean;
  deleteEmptyFolders?: boolean;
  downloadPropersAndRepacks?: ProperDownloadTypes;
  enableMediaInfo?: boolean;
  /** @nullable */
  extraFileExtensions?: string | null;
  fileDate?: FileDateType;
  id?: number;
  importExtraFiles?: boolean;
  minimumFreeSpaceWhenImporting?: number;
  pathsDefaultStatic?: boolean;
  /** @nullable */
  recycleBin?: string | null;
  recycleBinCleanupDays?: number;
  rescanAfterRefresh?: RescanAfterRefreshType;
  /** @nullable */
  scriptImportPath?: string | null;
  setPermissionsLinux?: boolean;
  skipFreeSpaceCheckWhenImporting?: boolean;
  useScriptImport?: boolean;
}
