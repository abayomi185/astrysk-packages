/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { VirtualFolderInfoCollectionType } from "./virtualFolderInfoCollectionType";
import type { VirtualFolderInfoLibraryOptions } from "./virtualFolderInfoLibraryOptions";

/**
 * Used to hold information about a user's list of configured virtual folders.
 */
export interface VirtualFolderInfo {
  /**
   * Gets or sets the type of the collection.
   * @nullable
   */
  CollectionType?: VirtualFolderInfoCollectionType;
  /**
   * Gets or sets the item identifier.
   * @nullable
   */
  ItemId?: string | null;
  /** @nullable */
  LibraryOptions?: VirtualFolderInfoLibraryOptions;
  /**
   * Gets or sets the locations.
   * @nullable
   */
  Locations?: string[] | null;
  /**
   * Gets or sets the name.
   * @nullable
   */
  Name?: string | null;
  /**
   * Gets or sets the primary image item identifier.
   * @nullable
   */
  PrimaryImageItemId?: string | null;
  /** @nullable */
  RefreshProgress?: number | null;
  /** @nullable */
  RefreshStatus?: string | null;
}
