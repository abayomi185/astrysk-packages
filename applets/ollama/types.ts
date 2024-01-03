import { TabContext } from "@astrysk/types";
import { FilterOrder } from "@astrysk/types";
import { ListLocalModels200ModelsItem } from "./api";
import { IMessage } from "react-native-gifted-chat";

export interface OllamaCache {
  models?: Record<string, ListLocalModels200ModelsItem>;
}

export interface OllamaConversation extends IMessage {
  name?: string;
  message?: {
    content?: string;
    role?: string;
    image?: string[];
  };
}

export interface OllamaAdvancedOptions {
  template?: string;
  options?: Record<string, number | string>;
}

export interface OllamaConversationHistory {
  [key: string]: {
    name?: string;
    model?: string;
    modelName?: string;
    conversation: OllamaConversation[];
    conversationLength: number;
    lastUpdated?: string;
    advancedOptions?: OllamaAdvancedOptions;
  };
}

export type OllamaModelDetails = Pick<
  ListLocalModels200ModelsItem,
  "name" | "digest"
>;

export interface OllamaConversationHistoryDetailItems {
  conversationId: string;
  model: string;
  modelName?: string;
  name?: string;
  conversationLength?: number;
  lastUpdated?: string;
}

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
  SelectText = "SelectText",
  EditText = "EditText",
  History = "History",
  HistoryItem = "HistoryItem",
  HomePreview = "HomePreview",
  DetailPreview = "DetailPreview",
  ModelPreview = "ModelPreview",
  AdvancedOptions = "AdvancedOptions",
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
  conversationId?: string;
  context?: OllamaDetailScreenContext;
  otherParams?: OllamaModelDetails;
  options?: OllamaFilterOption[];
}

export enum OllamaSearchFilterContext {
  Search = "Search",
  Conversation = "Conversation",
  SelectText = "SelectText",
  ModelPreview = "ModelPreview",
  NONE = "NONE",
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
