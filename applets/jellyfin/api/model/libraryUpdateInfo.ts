/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */

/**
 * Class LibraryUpdateInfo.
 */
export interface LibraryUpdateInfo {
  CollectionFolders?: string[];
  /** Gets or sets the folders added to. */
  FoldersAddedTo?: string[];
  /** Gets or sets the folders removed from. */
  FoldersRemovedFrom?: string[];
  readonly IsEmpty?: boolean;
  /** Gets or sets the items added. */
  ItemsAdded?: string[];
  /** Gets or sets the items removed. */
  ItemsRemoved?: string[];
  /** Gets or sets the items updated. */
  ItemsUpdated?: string[];
}
