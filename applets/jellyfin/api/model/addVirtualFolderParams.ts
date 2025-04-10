/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { CollectionTypeOptions } from "./collectionTypeOptions";

export type AddVirtualFolderParams = {
  /**
   * The name of the virtual folder.
   */
  name?: string;
  /**
   * The type of the collection.
   */
  collectionType?: CollectionTypeOptions;
  /**
   * The paths of the virtual folder.
   */
  paths?: string[];
  /**
   * Whether to refresh the library.
   */
  refreshLibrary?: boolean;
};
