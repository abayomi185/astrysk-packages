import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { APP_STATE_VERSION, StateTypes } from "@astrysk/stores";
import {
  SonarrSeriesCache,
  SonarrFilter,
  SonarrSearchFilterContext,
  SonarrEpisodeCache,
  SonarrEpisodeFileCache,
  SonarrFilterKind,
  SonarrFilterKindValue,
} from "./types";
import { filterPersistState } from "@astrysk/utils";
import {
  LanguageProfileResource,
  QualityProfileResource,
  SeriesResource,
} from "./api";

const MMKVStore = new MMKV({
  id: "sonarr",
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

export const useSonarrStore = create<SonarrState>()(
  persist((_set, _get) => initialAppState, {
    name: "sonarrStore",
    version: APP_STATE_VERSION,
    storage: createJSONStorage(() => MMKVStorageAdapter),
    // Allow only specific state to be persisted
    partialize: (state): SonarrPersistState => {
      return filterPersistState<SonarrState, SonarrPersistState>(
        state,
        sonarrPersistStateKeys
      );
    },
  })
);

interface SonarrState extends StateTypes.AppletState {
  // Main cache
  sonarrSeriesCache?: SonarrSeriesCache;
  sonarrEpisodeCache?: SonarrEpisodeCache;
  sonarrEpisodeFileCache?: SonarrEpisodeFileCache;
  // Other
  sonarrQualityProfiles?: QualityProfileResource[];
  sonarrLanguageProfiles?: LanguageProfileResource[];
  customHeaders?: Record<string, string>;
  // mediaItemSettings?: JellyfinMediaItemSettings;
  searchFilters?: Partial<
    Record<
      SonarrSearchFilterContext,
      Record<SonarrFilterKind, SonarrFilterKindValue> | undefined
    >
  >;
  filterBarOptions?: Partial<Record<SonarrSearchFilterContext, SonarrFilter[]>>;
}

// NOTE: Make sure to add key to jellyfinPersistStateKeys too
interface SonarrPersistState
  extends Pick<SonarrState, "baseURL" | "token" | "customHeaders"> {}

// NOTE: Persist key needs to be added here too
export const sonarrPersistStateKeys = Array.from(
  new Set<keyof SonarrState>(["baseURL", "token", "customHeaders"])
);

const initialAppState: SonarrState = {
  authenticated: false, // Not sure this is needed anymore
  isConfigured: false, // Use this state to configure if not configured
};
