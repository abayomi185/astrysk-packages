import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { APP_STATE_VERSION, StateTypes } from "@astrysk/stores";
import {
  ProxmoxFilter,
  ProxmoxFilterKind,
  ProxmoxFilterKindValue,
  ProxmoxSearchFilterContext,
} from "./types";
import {
  filterPersistState,
  getMMKVStorageAdapter,
  getMMKVStoreForId,
} from "@astrysk/utils";
import { ViewType } from "@astrysk/types";

const PROXMOX = "proxmox";
const proxmoxMMKVStore = getMMKVStoreForId(PROXMOX);

export const useProxmoxStore = create<ProxmoxState>()(
  persist((_set, _get) => initialAppState, {
    name: `${PROXMOX}Store`,
    version: APP_STATE_VERSION,
    storage: createJSONStorage(() => getMMKVStorageAdapter(proxmoxMMKVStore)),
    // Allow only specific state to be persisted
    partialize: (state): ProxmoxPersistState => {
      return filterPersistState<ProxmoxState, ProxmoxPersistState>(
        state,
        proxmoxPersistStateKeys
      );
    },
  })
);

interface ProxmoxState extends StateTypes.AppletState {
  userRealm?: string;
  tokenId?: string;
  // Main cache
  // proxmoxCache?: ProxmoxCache;
  // Other
  customHeaders?: Record<string, string>;
  // mediaItemSettings?: JellyfinMediaItemSettings;
  searchFilters?: Partial<
    Record<
      ProxmoxSearchFilterContext,
      Record<ProxmoxFilterKind, ProxmoxFilterKindValue> | undefined
    >
  >;
  filterBarOptions?: Partial<
    Record<ProxmoxSearchFilterContext, ProxmoxFilter[]>
  >;
}

// NOTE: Make sure to add key to proxmoxPersistStateKeys too
interface ProxmoxPersistState
  extends Pick<
    ProxmoxState,
    "baseURL" | "token" | "tokenId" | "userRealm" | "customHeaders"
  > {}

// NOTE: Persist key needs to be added here too
export const proxmoxPersistStateKeys = Array.from(
  new Set<keyof ProxmoxState>([
    "baseURL",
    "token",
    "tokenId",
    "userRealm",
    "customHeaders",
  ])
);

const initialAppState: ProxmoxState = {
  authenticated: false, // Not sure this is needed anymore
  isConfigured: false, // Use this state to configure if not configured
  viewType: ViewType.Grid,
};
