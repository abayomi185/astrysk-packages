import { TabContext } from "@astrysk/types";
import { SeriesResource } from "./api";

export interface SonarrCache {
  [baseURL: string]: {
    [id: number]: SeriesResource;
  };
}

export interface ExtendedSeriesResource extends SeriesResource {
  sonarrContext?: SonarrDetailScreenContext;
  sonarrTabContext?: TabContext;
  sonarrSeasonNumber?: number;
}

// Context may sometimes mean where the route was pushed from,
// otherwise it describes what the pushed route should do.
export enum SonarrDetailScreenContext {
  SeriesDescription = "SeriesDescription",
  AllSeasons = "AllSeasons",
  InteractiveSearch = "InteractiveSearch",
  // SeasonInteractiveSearch = "SeasonInteractiveSearch",
  History = "History",
  // SeasonHistory = "SeasonHistory",
  EditSeries = "EditSeries",
  EpisodesList = "EpisodesList",
  SearchItem = "SearchItem",
  SearchFilter = "SearchFilter",
}

export enum SonarrCommands {
  APPLICATION_UPDATE = "ApplicationUpdate",
  BACKUP = "Backup",
  REFRESH_MONITORED_DOWNLOADS = "RefreshMonitoredDownloads",
  CLEAR_BLOCKLIST = "ClearBlocklist",
  CLEAR_LOGS = "ClearLog",
  CUTOFF_UNMET_EPISODE_SEARCH = "CutoffUnmetEpisodeSearch",
  DELETE_LOG_FILES = "DeleteLogFiles",
  DELETE_UPDATE_LOG_FILES = "DeleteUpdateLogFiles",
  DOWNLOADED_EPSIODES_SCAN = "DownloadedEpisodesScan",
  EPISODE_SEARCH = "EpisodeSearch",
  INTERACTIVE_IMPORT = "ManualImport",
  MISSING_EPISODE_SEARCH = "MissingEpisodeSearch",
  MOVE_SERIES = "MoveSeries",
  REFRESH_SERIES = "RefreshSeries",
  RENAME_FILES = "RenameFiles",
  RENAME_SERIES = "RenameSeries",
  RESET_API_KEY = "ResetApiKey",
  RESET_QUALITY_DEFINITIONS = "ResetQualityDefinitions",
  RSS_SYNC = "RssSync",
  SEASON_SEARCH = "SeasonSearch",
  SERIES_SEARCH = "SeriesSearch",
}

export interface SonarrDetailScreenProps extends Record<string, string> {
  context?: SonarrDetailScreenContext;
  itemId?: string | number;
  tabContext?: TabContext;
  seasonNumber?: number;
  // itemName?: string;
  // itemCacheIndex?: string; // For cache purposes
  // itemData?: BaseItemDto | string;

  // CollectionItem Detail
  searchContext?: SonarrSearchFilterContext;
  [key: string]: any;
}

export enum SonarrSettingsKeys {
  Server = "common:server",
  DeleteCache = "jellyfin:deleteCache",
}

export interface SonarrFilter {
  id: string;
  options: string[];
}

export enum SonarrSearchFilterContext {
  Search = "Search",
}

export interface CalendarData {
  seriesData: SeriesResource;
  title: string;
  seasonNumber: number;
  episodeNumber: number;
  hasFile: boolean;
  timeUtc: string;
  time: string;
}
