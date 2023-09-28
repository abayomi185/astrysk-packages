import { TabContext } from "@astrysk/types";
import {
  ReleaseResource,
  ArtistResource,
  AlbumResource,
  MetadataResource,
} from "./api";
import { FilterOrder } from "@astrysk/types";

export interface LidarrArtistCache {
  [id: number]: ArtistResource;
}
export interface LidarrAlbumCache {
  [id: number]: AlbumResource;
}

// export interface ExtendedMovieResource extends MovieResource {
//   radarrContext?: RadarrDetailScreenContext;
//   radarrTabContext?: TabContext;
// }

// export interface ExtendedReleaseResource extends ReleaseResource {
//   language?: Record<string, string>;
// }

// export interface RadarrAgendaList {
//   title: string;
//   data: Partial<MovieResource>[];
//   [key: string]: any;
// }

// Context may sometimes mean where the route was pushed from,
// otherwise it describes what the pushed route should do.
export enum LidarrDetailScreenContext {
  // MovieDescription = "MovieDescription",
  InteractiveSearch = "InteractiveSearch",
  History = "History",
  // EditMovie = "EditMovie",
  // AddMovie = "AddMovie",
  // MovieItem = "EpisodeItem",
  // SearchItem = "SearchItem",
  // SearchFilter = "SearchFilter",
}

export enum LidarrCommands {
  APPLICATION_UPDATE = "ApplicationUpdate",
  BACKUP = "Backup",
  REFRESH_MONITORED_DOWNLOADS = "RefreshMonitoredDownloads",
  CLEAR_BLOCKLIST = "ClearBlocklist",
  CLEAR_LOGS = "ClearLog",
  CUTOFF_UNMET_ALBUM_SEARCH = "CutoffUnmetAlbumSearch",
  DELETE_LOG_FILES = "DeleteLogFiles",
  DELETE_UPDATE_LOG_FILES = "DeleteUpdateLogFiles",
  DOWNLOADED_ALBUMS_SCAN = "DownloadedAlbumsScan",
  ALBUM_SEARCH = "AlbumSearch",
  INTERACTIVE_IMPORT = "ManualImport",
  MISSING_ALBUM_SEARCH = "MissingAlbumSearch",
  MOVE_ARTIST = "MoveArtist",
  REFRESH_ARTIST = "RefreshArtist",
  RENAME_FILES = "RenameFiles",
  RENAME_ARTIST = "RenameArtist",
  RESCAN_FOLDERS = "RescanFolders",
  RETAG_FILES = "RetagFiles",
  RETAG_ARTIST = "RetagArtist",
  RESET_API_KEY = "ResetApiKey",
  RESET_QUALITY_DEFINITIONS = "ResetQualityDefinitions",
  RSS_SYNC = "RssSync",
  SEASON_SEARCH = "AlbumSearch",
  ARTIST_SEARCH = "ArtistSearch",
}

export interface LidarrDetailScreenProps extends Record<string, string> {
  context?: LidarrDetailScreenContext;
  itemId?: string | number;
  tabContext?: TabContext;
  // seasonNumber?: number;
  // episodeId?: number;
  // episodeNumber?: number;
  // imdbId?: string;
  // CollectionItem Detail
  searchContext?: LidarrSearchFilterContext;
  [key: string]: any;
}

export enum LidarrSettingsKeys {
  Server = "common:server",
  DeleteCache = "radarr:deleteCache",
}

export interface LidarrFilterOption {
  value: string;
  supportsOrderBy?: boolean;
}

export interface LidarrFilter {
  id: string;
  options: LidarrFilterOption[];
}

export enum LidarrSearchFilterContext {
  Search = "Search",
}

export enum LidarrInteractiveSearchContext {
  Movie = "Movie",
}

export interface CalendarData {
  // movieData: MovieResource;
  title: string;
  hasFile: boolean;
  // inCinemas: string;
}

export type LidarrFilterKind = string;
export interface LidarrFilterKindValue {
  value?: string;
  order?: FilterOrder;
}
