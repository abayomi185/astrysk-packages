/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { RemoteSearchResultProviderIds } from "./remoteSearchResultProviderIds";
import type { RemoteSearchResultAlbumArtist } from "./remoteSearchResultAlbumArtist";

export interface RemoteSearchResult {
  /** Gets or sets the name. */
  Name?: string | null;
  /** Gets or sets the provider ids. */
  ProviderIds?: RemoteSearchResultProviderIds;
  /** Gets or sets the year. */
  ProductionYear?: number | null;
  IndexNumber?: number | null;
  IndexNumberEnd?: number | null;
  ParentIndexNumber?: number | null;
  PremiereDate?: string | null;
  ImageUrl?: string | null;
  SearchProviderName?: string | null;
  Overview?: string | null;
  AlbumArtist?: RemoteSearchResultAlbumArtist;
  Artists?: RemoteSearchResult[] | null;
}
