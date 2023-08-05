import { SeriesResource } from "./api";

export interface SonarrCache {
  [baseURL: string]: {
    seriesCache: SeriesResource[];
  };
}

// Context may sometimes mean where the route was pushed from,
// otherwise it describes what the pushed route should do.
export enum SonarrDetailScreenContext {
  // NextUp = "NextUp",
  // RecentlyAdded = "RecentlyAdded",
  // Views = "Views",
  // // Detail
  // MovieDetail = "MovieDetail",
  // SeriesDetail = "SeriesDetail",
  // // Description
  // MovieDescription = "MovieDescription",
  SeriesDescription = "SeriesDescription",
  AllSeasons = "AllSeasons",
  // // More Detail
  // EpisodeMoreDetail = "EpisodeMoreDetail",
  // MovieMoreDetail = "MovieMoreDetail",
  // // Filter
  // SearchSuggestionItem = "SearchSuggestionItem",
  SearchItem = "SearchItem",
  SearchFilter = "SearchFilter",
  // CollectionItem = "CollectionItem",
  // // Settings
  // SettingsOption = "SettingsOption",
}

export interface SonarrDetailScreenProps extends Record<string, string> {
  context?: SonarrDetailScreenContext;
  // itemType?: BaseItemKind;
  itemId?: string | number;
  itemName?: string;
  itemCacheIndex?: string; // For cache purposes
  // itemData?: BaseItemDto | string;

  // For EpisodeMoreDetail
  episodeId?: string;

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
