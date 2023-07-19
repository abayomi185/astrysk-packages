import {
  BaseItemDto,
  BaseItemDtoQueryResult,
  BaseItemKind,
  SearchHint,
} from "./api";

export interface JellyfinAuthConfig {
  baseURL: string;
  token: string;
}

// For Tanstack Query
export interface QueryCache<T> {
  data: T;
  datetime?: Date;
}

// WARN: On Jellyfin disconnect, delete cache
export interface JellyfinMediaCache {
  [serverId: string]: {
    resumeMediaCache?: QueryCache<BaseItemDtoQueryResult>;
    latestMediaCache?: QueryCache<BaseItemDto[]>;
    nextUpMediaCache?: QueryCache<BaseItemDtoQueryResult>;
    viewsMediaCache?: QueryCache<BaseItemDto[]>;
    seriesMediaCache?: Record<string, QueryCache<BaseItemDto>>;
    episodesMediaCache?: Record<string, QueryCache<BaseItemDto[]>>;
    movieMediaCache?: Record<string, QueryCache<BaseItemDto>>;
    searchSuggestionsMediaCache?: QueryCache<BaseItemDto[]>;
    searchMediaCache?: QueryCache<SearchHint[]>;
  };
}

export interface JellyfinMediaItemSettings {
  [itemId: string]: {
    [key in JellyfinMediaItemSettingsType]?: string;
  };
}

// Context may sometimes mean where the route was pushed from,
// otherwise it describes what the pushed route should do.
export enum JellyfinDetailScreenContext {
  NextUp = "NextUp",
  RecentlyAdded = "RecentlyAdded",
  Views = "Views",
  // Detail
  MovieDetail = "MovieDetail",
  SeriesDetail = "SeriesDetail",
  // Description
  MovieDescription = "MovieDescription",
  SeriesDescription = "SeriesDescription",
  // More Detail
  EpisodeMoreDetail = "EpisodeMoreDetail",
  MovieMoreDetail = "MovieMoreDetail",
  // Filter
  SearchSuggestionItem = "SearchSuggestionItem",
  SearchItem = "SearchItem",
  SearchFilter = "SearchFilter",
  // Settings
  SettingsOption = "SettingsOption",
}

export interface JellyfinDetailScreenProps extends Record<string, string> {
  context?: JellyfinDetailScreenContext;
  itemType?: BaseItemKind;
  itemId?: string;
  itemName?: string;
  itemCacheIndex?: string; // For cache purposes
  itemData?: BaseItemDto | string;

  // For EpisodeMoreDetail
  episodeId?: string;
  [key: string]: any;
}

export enum JellyfinSettingsKeys {
  User = "common:user",
  Server = "common:server",
  PlayerOptions = "jellyfin:playerOptions",
  DeleteCache = "jellyfin:deleteCache",
  DeleteMediaSettings = "jellyfin:deleteMediaSettings",
  AudioLanguage = "jellyfin:audioLanguage",
  DefaultAudioLanguage = "jellyfin:defaultAudioLanguage",
  SubtitleLanguage = "jellyfin:subtitleLanguage",
  DefaultSubtitleLanguage = "jellyfin:defaultSubtitleLanguage",
}

export interface JellyfinMediaItemSettingsProps {
  settingsOptionId?: string;
  settingsOptionType?: JellyfinMediaItemSettingsType;
}
export enum JellyfinMediaItemSettingsType {
  Audio = "audio",
  Subtitle = "subtitle",
}

export interface JellyfinFilter {
  id: string;
  options: string[];
}

// type AuthModalProps = Record<string, string> & {
//   applet: string;
// };
// interface AuthModalProps extends Record<string, string> {
//   applet: string;
// }
