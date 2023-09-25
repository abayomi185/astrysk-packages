import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { APP_STATE_VERSION, StateTypes } from "@astrysk/stores";
import { LidarrFilter, LidarrFilterKind, LidarrFilterKindValue, LidarrSearchFilterContext } from "./types";
import { filterPersistState } from "@astrysk/utils";
import { LanguageResource, QualityProfileResource } from "./api";
import { ViewType } from "@astrysk/types";

const MMKVStore = new MMKV({
  id: "lidarr",
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

export const useLidarrStore = create<LidarrState>()(
  persist((_set, _get) => initialAppState, {
    name: "lidarrStore",
    version: APP_STATE_VERSION,
    storage: createJSONStorage(() => MMKVStorageAdapter),
    // Allow only specific state to be persisted
    partialize: (state): LidarrPersistState => {
      return filterPersistState<LidarrState, LidarrPersistState>(
        state,
        lidarrPersistStateKeys
      );
    },
  })
);

interface LidarrState extends StateTypes.AppletState {
  // Main cache
  // lidarrMusicCache?: LidarrMovieCache;
  // lidarrMusicFileCache?: LidarrMovieFileCache;
  // Other
  lidarrQualityProfiles?: QualityProfileResource[];
  lidarrLanguageProfiles?: LanguageResource[];
  customHeaders?: Record<string, string>;
  searchFilters?: Partial<
    Record<
      LidarrSearchFilterContext,
      Record<LidarrFilterKind, LidarrFilterKindValue> | undefined
    >
  >;
  filterBarOptions?: Partial<Record<LidarrSearchFilterContext, LidarrFilter[]>>;
}

// NOTE: Make sure to add key to jellyfinPersistStateKeys too
interface LidarrPersistState
  extends Pick<
    LidarrState,
    "baseURL" | "token" | "customHeaders" | "viewType"
  > { }

// NOTE: Persist key needs to be added here too
export const lidarrPersistStateKeys = Array.from(
  new Set<keyof LidarrState>(["baseURL", "token", "customHeaders", "viewType"])
);

const initialAppState: LidarrState = {
  authenticated: false, // Not sure this is needed anymore
  isConfigured: false, // Use this state to configure if not configured
  viewType: ViewType.Grid,
};
