/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Sonarr
 * Sonarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { ProperDownloadTypes } from "./properDownloadTypes";
import type { FileDateType } from "./fileDateType";
import type { RescanAfterRefreshType } from "./rescanAfterRefreshType";
import type { EpisodeTitleRequiredType } from "./episodeTitleRequiredType";

export interface MediaManagementConfigResource {
  id?: number;
  autoUnmonitorPreviouslyDownloadedEpisodes?: boolean;
  recycleBin?: string | null;
  recycleBinCleanupDays?: number;
  downloadPropersAndRepacks?: ProperDownloadTypes;
  createEmptySeriesFolders?: boolean;
  deleteEmptyFolders?: boolean;
  fileDate?: FileDateType;
  rescanAfterRefresh?: RescanAfterRefreshType;
  setPermissionsLinux?: boolean;
  chmodFolder?: string | null;
  chownGroup?: string | null;
  episodeTitleRequired?: EpisodeTitleRequiredType;
  skipFreeSpaceCheckWhenImporting?: boolean;
  minimumFreeSpaceWhenImporting?: number;
  copyUsingHardlinks?: boolean;
  useScriptImport?: boolean;
  scriptImportPath?: string | null;
  importExtraFiles?: boolean;
  extraFileExtensions?: string | null;
  enableMediaInfo?: boolean;
}