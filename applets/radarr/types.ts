import { TabContext } from "@astrysk/types";
import { ReleaseResource, MovieResource, MovieFileResource } from "./api";
import { FilterOrder } from "@astrysk/types";

export interface RadarrMovieCache {
  [id: number]: MovieResource;
}
export interface RadarrMovieFileCache {
  [id: number]: MovieFileResource;
}

export interface ExtendedMovieResource extends MovieResource {
  radarrContext?: RadarrDetailScreenContext;
  radarrTabContext?: TabContext;
}

export interface ExtendedReleaseResource extends ReleaseResource {
  language?: Record<string, string>;
}

export interface RadarrAgendaList {
  title: string;
  data: Partial<MovieResource>[];
  [key: string]: any;
}

export enum ToastModalProviderKey {
  Persists = "PERSISTS",
  Movie = "Movie",
}

// Context may sometimes mean where the route was pushed from,
// otherwise it describes what the pushed route should do.
export enum RadarrDetailScreenContext {
  MovieDescription = "MovieDescription",
  InteractiveSearch = "InteractiveSearch",
  History = "History",
  EditMovie = "EditMovie",
  AddMovie = "AddMovie",
  MovieItem = "EpisodeItem",
  SearchItem = "SearchItem",
  SearchFilter = "SearchFilter",
}

export enum RadarrCommands {
  APPLICATION_UPDATE = "ApplicationUpdate",
  BACKUP = "Backup",
  REFRESH_MONITORED_DOWNLOADS = "RefreshMonitoredDownloads",
  CLEAR_BLOCKLIST = "ClearBlocklist",
  CLEAR_LOGS = "ClearLog",
  CUTOFF_UNMET_MOVIES_SEARCH = "CutoffUnmetMoviesSearch",
  DELETE_LOG_FILES = "DeleteLogFiles",
  DELETE_UPDATE_LOG_FILES = "DeleteUpdateLogFiles",
  DOWNLOADED_MOVIES_SCAN = "DownloadedMoviesScan",
  INTERACTIVE_IMPORT = "ManualImport",
  MISSING_MOVIES_SEARCH = "MissingMoviesSearch",
  MOVE_MOVIE = "MoveMovie",
  REFRESH_COLLECTIONS = "RefreshCollections",
  REFRESH_MOVIE = "RefreshMovie",
  RENAME_FILES = "RenameFiles",
  RENAME_MOVIE = "RenameMovie",
  RESET_API_KEY = "ResetApiKey",
  RESET_QUALITY_DEFINITIONS = "ResetQualityDefinitions",
  RSS_SYNC = "RssSync",
  MOVIE_SEARCH = "MoviesSearch",
  IMPORT_LIST_SYNC = "ImportListSync",
}

export interface RadarrDetailScreenProps extends Record<string, string> {
  context?: RadarrDetailScreenContext;
  itemId?: string | number;
  tabContext?: TabContext;
  seasonNumber?: number;
  episodeId?: number;
  episodeNumber?: number;
  imdbId?: string;
  // CollectionItem Detail
  searchContext?: RadarrSearchFilterContext;
  [key: string]: any;
}

export enum RadarrSettingsKeys {
  Server = "common:server",
  DeleteCache = "radarr:deleteCache",
}

export interface RadarrFilterOption {
  value: string;
  supportsOrderBy?: boolean;
}

export interface RadarrFilter {
  id: string;
  options: RadarrFilterOption[];
}

export enum RadarrSearchFilterContext {
  Search = "Search",
}

export enum RadarrInteractiveSearchContext {
  Movie = "Movie",
}

export interface CalendarData {
  movieData: MovieResource;
  title: string;
  hasFile: boolean;
  inCinemas: string;
}

export type RadarrFilterKind = string;
export interface RadarrFilterKindValue {
  value?: string;
  order?: FilterOrder;
}
