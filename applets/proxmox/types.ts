import { TabContext } from "@astrysk/types";
import { FilterOrder } from "@astrysk/types";
import { GetClusterResourcesResponseResponseDataItem } from "./api";

export interface ProxmoxCache {
  clusterResources?: {
    [id: string]: GetClusterResourcesResponseResponseDataItem;
  };
}

export interface ExtendedGetClusterResourcesResponseResponseDataItem
  extends GetClusterResourcesResponseResponseDataItem {
  proxmoxContext?: ProxmoxDetailScreenContext;
  proxmoxTabContext?: TabContext;
}

// Context may sometimes mean where the route was pushed from,
// otherwise it describes what the pushed route should do.
export enum ProxmoxDetailScreenContext {
  SeriesDescription = "SeriesDescription",
  SearchItem = "SearchItem",
  SearchFilter = "SearchFilter",
}

export interface ProxmoxDetailScreenProps extends Record<string, string> {
  context?: any;
  itemId?: string | number;
  tabContext?: TabContext;
  seasonNumber?: number;
  episodeId?: number;
  episodeNumber?: number;
  tvdbId?: number;
  // CollectionItem Detail
  searchContext?: ProxmoxSearchFilterContext;
  [key: string]: any;
}

export enum ProxmoxSettingsKeys {
  Server = "common:server",
  DeleteCache = "proxmox:deleteCache",
}

export interface ProxmoxFilterOption {
  value: string;
  supportsOrderBy?: boolean;
}

export interface ProxmoxFilter {
  id: string;
  options: ProxmoxFilterOption[];
}

export enum ProxmoxSearchFilterContext {
  Search = "Search",
}

export type ProxmoxFilterKind = string;
export interface ProxmoxFilterKindValue {
  value?: string;
  order?: FilterOrder;
}
