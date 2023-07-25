import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { APP_STATE_VERSION, StateTypes } from "@astrysk/stores";
import { SonarrFilter, SonarrSearchFilterContext } from "./types";

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
    name: "jellyfinStore",
    version: APP_STATE_VERSION,
    // storage: createJSONStorage(() => AsyncStorage),
    storage: createJSONStorage(() => MMKVStorageAdapter),
    // storage: MMKVStorageAdapter,
    // Allow only specific state to be persisted
    partialize: (state): SonarrPersistState => {
      return filterPersistState(state);
    },
  })
);

interface SonarrState extends StateTypes.AppletState {
  // userDetails?: AuthenticationResultUser;
  // mediaCache?: JellyfinMediaCache;
  customHeaders?: Record<string, string>;
  // mediaItemSettings?: JellyfinMediaItemSettings;
  searchFilters?: Partial<
    Record<SonarrSearchFilterContext, Record<string, string> | undefined>
  >;
  filterBarOptions?: Partial<Record<SonarrSearchFilterContext, SonarrFilter[]>>;
}

// NOTE: Make sure to add key to jellyfinPersistStateKeys too
interface SonarrPersistState
  extends Pick<SonarrState, "token" | "baseURL" | "customHeaders"> {}

// NOTE: Persist key needs to be added here too
export const sonarrPersistStateKeys = Array.from(
  new Set<keyof SonarrState>(["token", "baseURL", "customHeaders"])
);

const initialAppState: SonarrState = {
  authenticated: false,
  isConfigured: false, // Use this state to configure if not configured
};

const filterPersistState = (state: SonarrState): SonarrPersistState => {
  return Object.keys(state).reduce((result: any, key: string) => {
    if (sonarrPersistStateKeys.includes(key as keyof SonarrState)) {
      result[key] = state[key as keyof SonarrState];
    }
    return result;
  }, {});
};
