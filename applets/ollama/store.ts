import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { APP_STATE_VERSION, StateTypes } from "@astrysk/stores";
import {
  OllamaCache,
  OllamaConversation,
  OllamaConversationHistory,
  OllamaFilter,
  OllamaFilterKind,
  OllamaFilterKindValue,
  OllamaSearchFilterContext,
} from "./types";
import {
  filterPersistState,
  getMMKVStorageAdapter,
  getMMKVStoreForId,
} from "@astrysk/utils";
import { ViewType } from "@astrysk/types";

const OLLAMA = "ollama";
const ollamaMMKVStore = getMMKVStoreForId(OLLAMA);

export const useOllamaStore = create<OllamaState>()(
  persist((_set, _get) => initialAppState, {
    name: `${OLLAMA}Store`,
    version: APP_STATE_VERSION,
    storage: createJSONStorage(() => getMMKVStorageAdapter(ollamaMMKVStore)),
    // Allow only specific state to be persisted
    partialize: (state): OllamaPersistState => {
      return filterPersistState<OllamaState, OllamaPersistState>(
        state,
        ollamaPersistStateKeys
      );
    },
  })
);

interface OllamaState extends StateTypes.AppletState {
  userRealm?: string;
  tokenId?: string;
  // Main cache
  ollamaCache?: OllamaCache;
  ollamaConversationHistory?: OllamaConversationHistory;
  ollamaConversationIdOverride?: string;
  ollamaConversationIsRequesting?: boolean;
  ollamaSelectTextCache?: string[];
  // Editing text
  ollamaEditTextCache?: string;
  ollamaAfterEditTextCache?: string;
  editTextId?: string | null;
  // Other
  customHeaders?: Record<string, string>;
  // mediaItemSettings?: JellyfinMediaItemSettings;
  searchFilters?: Partial<
    Record<
      OllamaSearchFilterContext,
      Record<OllamaFilterKind, OllamaFilterKindValue> | undefined
    >
  >;
  filterBarOptions?: Partial<Record<OllamaSearchFilterContext, OllamaFilter[]>>;
}

// NOTE: Make sure to add key to ollamaPersistStateKeys too
interface OllamaPersistState
  extends Pick<
    OllamaState,
    | "baseURL"
    | "token"
    | "customHeaders"
    | "ollamaConversationHistory"
    | "ollamaCache"
  > {}

// NOTE: Persist key needs to be added here too
export const ollamaPersistStateKeys = Array.from(
  new Set<keyof OllamaState>([
    "baseURL",
    "token",
    "customHeaders",
    "ollamaConversationHistory",
    "ollamaCache",
  ])
);

const initialAppState: OllamaState = {
  authenticated: false, // Not sure this is needed anymore
  isConfigured: false, // Use this state to configure if not configured
  viewType: ViewType.Grid,
};
