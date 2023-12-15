import { TabContext } from "@astrysk/types";
import { FilterOrder } from "@astrysk/types";

export interface OllamaCache {}
export interface OllamaConversationCache {}

export interface ExtendedListLocalModels200ModelsItem
  extends ListLocalModels200ModelsItem {
  ollamaContext: OllamaDetailScreenContext;
  ollamaTabContext: TabContext;
}

// Context may sometimes mean where the route was pushed from,
// otherwise it describes what the pushed route should do.
export enum OllamaDetailScreenContext {
  SearchItem = "SearchItem",
  SearchFilter = "SearchFilter",
}

export interface OllamaDetailScreenProps extends Record<string, string> {
  context?: any;
  itemId?: string | number;
  tabContext?: TabContext;
  seasonNumber?: number;
  episodeId?: number;
  episodeNumber?: number;
  tvdbId?: number;
  // CollectionItem Detail
  searchContext?: OllamaSearchFilterContext;
  [key: string]: any;
}

export enum OllamaSettingsKeys {
  Server = "common:server",
  DeleteCache = "proxmox:deleteCache",
}

export interface OllamaFilterOption {
  value: string;
  supportsOrderBy?: boolean;
}

export interface OllamaFilter {
  id: string;
  options: OllamaFilterOption[];
}

export enum OllamaSearchFilterContext {
  Search = "Search",
}

export type OllamaFilterKind = string;
export interface OllamaFilterKindValue {
  value?: string;
  order?: FilterOrder;
}

export enum OllamaListContext {
  Options = "Options",
  Metrics = "Metrics",
}
