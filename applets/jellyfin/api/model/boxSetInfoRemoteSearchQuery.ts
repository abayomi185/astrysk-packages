/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { BoxSetInfoRemoteSearchQuerySearchInfo } from './boxSetInfoRemoteSearchQuerySearchInfo';

export interface BoxSetInfoRemoteSearchQuery {
  SearchInfo?: BoxSetInfoRemoteSearchQuerySearchInfo;
  ItemId?: string;
  /** Gets or sets the provider name to search within if set. */
  SearchProviderName?: string | null;
  /** Gets or sets a value indicating whether disabled providers should be included. */
  IncludeDisabledProviders?: boolean;
}
