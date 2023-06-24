/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { ExternalIdInfoType } from './externalIdInfoType';

/**
 * Represents the external id information for serialization to the client.
 */
export interface ExternalIdInfo {
  /** Gets or sets the display name of the external id provider (IE: IMDB, MusicBrainz, etc). */
  Name?: string;
  /** Gets or sets the unique key for this id. This key should be unique across all providers. */
  Key?: string;
  /** Gets or sets the specific media type for this id. This is used to distinguish between the different
external id types for providers with multiple ids.
A null value indicates there is no specific media type associated with the external id, or this is the
default id for the external provider so there is no need to specify a type. */
  Type?: ExternalIdInfoType;
  /** Gets or sets the URL format string. */
  UrlFormatString?: string | null;
}
