/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { MovieInfoRemoteSearchQuerySearchInfo } from "./movieInfoRemoteSearchQuerySearchInfo";

export interface MovieInfoRemoteSearchQuery {
  /** Gets or sets a value indicating whether disabled providers should be included. */
  IncludeDisabledProviders?: boolean;
  ItemId?: string;
  /** @nullable */
  SearchInfo?: MovieInfoRemoteSearchQuerySearchInfo;
  /**
   * Gets or sets the provider name to search within if set.
   * @nullable
   */
  SearchProviderName?: string | null;
}
