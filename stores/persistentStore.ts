import { MMKV } from "react-native-mmkv";
// import create from "zustand";
// import { StateStorage, PersistStorage, StorageValue } from "zustand/middleware";
import { PersistStorage, StorageValue } from "zustand/middleware";
import { APP_STATE_VERSION } from "./appStateStore";
import { AppState } from "./types";

// import RNFS from 'react-native-fs';
// const USER_DIRECTORY = `${RNFS.DocumentDirectoryPath}/mmkv/`;

const mmkvStore = new MMKV({
  id: "app-state-store",
  // path: '${USER_DIRECTORY}/global_store',
});

// const secretStore = new MMKV({
//   id: 'secrets-store',
//   path: '${USER_DIRECTORY}/appStateStore',
//   // encryptionKey: '!fin-app-secret!',
// });

// const PersistentAppStore: PersistStorage<IAppState> = {
// const PersistentAppStore: StateStorage = {
//   getItem: (name: string) => {
//     const value = globalStore.getString(name);
//     // const value = Object(globalStore.toJSON())[name];
//     // const value = JSON.parse(globalStore.getString(name) as string);
//     return value ?? null;
//   },
//   setItem: (name: string, value: string) => {
//     return globalStore.set(name, value);
//     // return globalStore.set(name, JSON.stringify(value));
//     // return {state: , version:APP_STATE_VERSION}
//   },
//   removeItem: (name: string) => {
//     return globalStore.delete(name);
//   },
// };

// export default PersistentAppStore;

// // WARN: Not using AsyncStorage - using MMKV
// import AsyncStorage from "@react-native-async-storage/async-storage";
//
// const PersistentAppStateStore: PersistStorage<AppState> = {
//   getItem: async (name: string) => {
//     // const data = await AsyncStorage.getItem(name);
//     const data = mmkvStore.getString(name);
//     if (data === undefined) return null;
//     const appState = JSON.parse(data) as AppState;
//     return {
//       state: {
//         ...appState,
//         componentsLoading: new Set(appState.componentsLoading),
//       },
//       version: APP_STATE_VERSION,
//     } as StorageValue<AppState>;
//   },
//   setItem: async (name: string, value: StorageValue<AppState>) => {
//     // const data await AsyncStorage.setItem(name, value)
//     const data: StorageValue<AppState> = {
//       ...value,
//       state: {
//         ...value.state,
//         // @ts-ignore
//         // Custom stringify for componentsLoading Set
//         componentsLoading: Array.from(value.state.componentsLoading),
//       },
//     };
//     await AsyncStorage.setItem(name, JSON.stringify(data));
//   },
//   removeItem: async (name: string) => {
//     await AsyncStorage.removeItem(name);
//   },
// };
