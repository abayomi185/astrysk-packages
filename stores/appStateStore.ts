import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { persist, StorageValue } from "zustand/middleware";
// import PersistentAppStore from "@stores/persistentStore"; // Previous implementation
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistAppState, AppState } from "./types";

export const APP_STATE_VERSION = 0;

const MMKVStore = new MMKV({
  id: "appStateStore",
});

const useAppStateStore = create<AppState>()(
  persist((_set, _get) => initialAppState, {
    name: "appStateStore",
    version: APP_STATE_VERSION,
    // storage: createJSONStorage(() => AsyncStorage),
    // This allows for use with a Set by manually stringifying it before storing
    storage: {
      getItem: async (name: string) => {
        // const data = await AsyncStorage.getItem(name);
        const data = MMKVStore.getString(name);
        if (data === undefined) return null;
        const appState = JSON.parse(data) as StorageValue<AppState>;
        return {
          version: APP_STATE_VERSION,
          state: {
            ...appState.state,
            componentsLoading: new Set(appState.state.componentsLoading),
          },
        };
      },
      setItem: async (name: string, value) => {
        const data: StorageValue<AppState> = {
          version: value.version,
          state: {
            ...value.state,
            // @ts-ignore
            // Custom stringify for componentsLoading Set
            componentsLoading: Array.from(
              (value.state.componentsLoading as Set<string>) ?? new Set()
            ),
          },
        };
        // await AsyncStorage.setItem(name, JSON.stringify(data));
        MMKVStore.set(name, JSON.stringify(data));
      },
      removeItem: async (name: string) => {
        // await AsyncStorage.removeItem(name);
        MMKVStore.delete(name);
      },
    },
    // Allow only specific state to be persisted
    partialize: (state): PersistAppState => {
      const { showSpinner, ...rest } = state;
      return { ...rest };
    },
  })
);

const initialAppState: AppState = {
  applets: {},
  otherApplets: [],
  defaultApplet: undefined,
  activeApplet: undefined,
  votedApplets: {},
  showSpinner: false,
  componentsLoading: new Set(),
};

export default useAppStateStore;
