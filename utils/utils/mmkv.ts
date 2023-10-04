import { MMKV } from "react-native-mmkv";

export const getMMKVStoreForId = (id: string) =>
  new MMKV({
    id: id,
  });

export const getMMKVStorageAdapter = (MMKVStore: MMKV) => ({
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
});
