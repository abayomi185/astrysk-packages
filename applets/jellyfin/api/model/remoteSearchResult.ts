/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { RemoteSearchResultAlbumArtist } from "./remoteSearchResultAlbumArtist";
import type { RemoteSearchResultProviderIds } from "./remoteSearchResultProviderIds";

export interface RemoteSearchResult {
  /** @nullable */
  AlbumArtist?: RemoteSearchResultAlbumArtist;
  /** @nullable */
  Artists?: RemoteSearchResult[] | null;
  /** @nullable */
  ImageUrl?: string | null;
  /** @nullable */
  IndexNumber?: number | null;
  /** @nullable */
  IndexNumberEnd?: number | null;
  /**
   * Gets or sets the name.
   * @nullable
   */
  Name?: string | null;
  /** @nullable */
  Overview?: string | null;
  /** @nullable */
  ParentIndexNumber?: number | null;
  /** @nullable */
  PremiereDate?: string | null;
  /**
   * Gets or sets the year.
   * @nullable
   */
  ProductionYear?: number | null;
  /**
   * Gets or sets the provider ids.
   * @nullable
   */
  ProviderIds?: RemoteSearchResultProviderIds;
  /** @nullable */
  SearchProviderName?: string | null;
}
