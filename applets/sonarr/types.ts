// Context may sometimes mean where the route was pushed from,
// otherwise it describes what the pushed route should do.
export enum SonarrDetailScreenContext {}
// NextUp = "NextUp",
// RecentlyAdded = "RecentlyAdded",
// Views = "Views",
// // Detail
// MovieDetail = "MovieDetail",
// SeriesDetail = "SeriesDetail",
// // Description
// MovieDescription = "MovieDescription",
// SeriesDescription = "SeriesDescription",
// // More Detail
// EpisodeMoreDetail = "EpisodeMoreDetail",
// MovieMoreDetail = "MovieMoreDetail",
// // Filter
// SearchSuggestionItem = "SearchSuggestionItem",
// SearchItem = "SearchItem",
// SearchFilter = "SearchFilter",
// CollectionItem = "CollectionItem",
// // Settings
// SettingsOption = "SettingsOption",

export interface SonarrDetailScreenProps extends Record<string, string> {
  context?: SonarrDetailScreenContext;
  // itemType?: BaseItemKind;
  itemId?: string;
  itemName?: string;
  itemCacheIndex?: string; // For cache purposes
  // itemData?: BaseItemDto | string;

  // For EpisodeMoreDetail
  episodeId?: string;

  // CollectionItem Detail
  searchContext?: SonarrSearchFilterContext;
  [key: string]: any;
}

export enum SonarrSearchFilterContext {
  Search = "Search",
}
