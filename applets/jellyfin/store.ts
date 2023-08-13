import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { APP_STATE_VERSION, StateTypes } from "@astrysk/stores";
import { AuthenticationResultUser } from "./api";
import {
  JellyfinFilter,
  JellyfinFilterKind,
  JellyfinFilterKindValue,
  JellyfinMediaCache,
  JellyfinMediaItemSettings,
  JellyfinSearchFilterContext,
} from "./types";
import { filterPersistState } from "@astrysk/utils";

const MMKVStore = new MMKV({
  id: "jellyfinStore",
});

const MMKVStorageAdapter = {
  getItem: async (key: string) => {
    const value = MMKVStore.getString(key);
    return value ?? null;
  },
  setItem: async (key: string, value: string) => {
    MMKVStore.set(key, value);
  },
  removeItem: async (key: string) => {
    MMKVStore.delete(key);
  },
};

export const useJellyfinStore = create<JellyfinState>()(
  persist((_set, _get) => initialAppState, {
    name: "jellyfinStore",
    version: APP_STATE_VERSION,
    // storage: createJSONStorage(() => AsyncStorage),
    storage: createJSONStorage(() => MMKVStorageAdapter),
    // storage: MMKVStorageAdapter,
    // Allow only specific state to be persisted
    partialize: (state): JellyfinPersistState => {
      return filterPersistState<JellyfinState, JellyfinPersistState>(
        state,
        jellyfinPersistStateKeys
      );
    },
  })
);

interface JellyfinState extends StateTypes.AppletState {
  userDetails?: AuthenticationResultUser;
  mediaCache?: JellyfinMediaCache;
  // defaultSubtitleLanguage?: string;
  mediaItemSettings?: JellyfinMediaItemSettings;
  customHeaders?: Record<string, string>;
  searchFilters?: Partial<
    Record<
      JellyfinSearchFilterContext,
      Record<JellyfinFilterKind, JellyfinFilterKindValue> | undefined
    >
  >;
  filterBarOptions?: Partial<
    Record<JellyfinSearchFilterContext, JellyfinFilter[]>
  >;
}

// NOTE: Make sure to add key to jellyfinPersistStateKeys too
interface JellyfinPersistState
  extends Pick<
    JellyfinState,
    | "baseURL"
    | "token"
    | "userDetails"
    | "mediaCache"
    | "mediaItemSettings"
    | "customHeaders"
  > {}

// NOTE: Persist key needs to be added here too
export const jellyfinPersistStateKeys = Array.from(
  new Set<keyof JellyfinState>([
    "baseURL",
    "token",
    "userDetails",
    "mediaCache",
    "mediaItemSettings",
    "customHeaders",
  ])
);

const initialAppState: JellyfinState = {
  authenticated: false,
  isConfigured: false, // Use this state to configure if not configured
};
