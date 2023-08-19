import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { APP_STATE_VERSION, StateTypes } from "@astrysk/stores";
import {
  RadarrMovieCache,
  RadarrFilter,
  RadarrSearchFilterContext,
  RadarrFilterKind,
  RadarrFilterKindValue,
  RadarrMovieFileCache,
} from "./types";
import { filterPersistState } from "@astrysk/utils";
import { LanguageResource, QualityProfileResource } from "./api";

const MMKVStore = new MMKV({
  id: "radarr",
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

export const useRadarrStore = create<RadarrState>()(
  persist((_set, _get) => initialAppState, {
    name: "radarrStore",
    version: APP_STATE_VERSION,
    storage: createJSONStorage(() => MMKVStorageAdapter),
    // Allow only specific state to be persisted
    partialize: (state): RadarrPersistState => {
      return filterPersistState<RadarrState, RadarrPersistState>(
        state,
        radarrPersistStateKeys
      );
    },
  })
);

interface RadarrState extends StateTypes.AppletState {
  // Main cache
  radarrMovieCache?: RadarrMovieCache;
  radarrMovieFileCache?: RadarrMovieFileCache;
  radarrRootFolderCache?: string[];
  // Other
  radarrQualityProfiles?: QualityProfileResource[];
  radarrLanguageProfiles?: LanguageResource[];
  customHeaders?: Record<string, string>;
  // mediaItemSettings?: JellyfinMediaItemSettings;
  searchFilters?: Partial<
    Record<
      RadarrSearchFilterContext,
      Record<RadarrFilterKind, RadarrFilterKindValue> | undefined
    >
  >;
  filterBarOptions?: Partial<Record<RadarrSearchFilterContext, RadarrFilter[]>>;
}

// NOTE: Make sure to add key to jellyfinPersistStateKeys too
interface RadarrPersistState
  extends Pick<RadarrState, "baseURL" | "token" | "customHeaders"> {}

// NOTE: Persist key needs to be added here too
export const radarrPersistStateKeys = Array.from(
  new Set<keyof RadarrState>(["baseURL", "token", "customHeaders"])
);

const initialAppState: RadarrState = {
  authenticated: false, // Not sure this is needed anymore
  isConfigured: false, // Use this state to configure if not configured
};
