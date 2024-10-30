/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { BoxSetInfoProviderIds } from "./boxSetInfoProviderIds";

export interface BoxSetInfo {
  /** @nullable */
  IndexNumber?: number | null;
  IsAutomated?: boolean;
  /**
   * Gets or sets the metadata country code.
   * @nullable
   */
  MetadataCountryCode?: string | null;
  /**
   * Gets or sets the metadata language.
   * @nullable
   */
  MetadataLanguage?: string | null;
  /**
   * Gets or sets the name.
   * @nullable
   */
  Name?: string | null;
  /**
   * Gets or sets the original title.
   * @nullable
   */
  OriginalTitle?: string | null;
  /** @nullable */
  ParentIndexNumber?: number | null;
  /**
   * Gets or sets the path.
   * @nullable
   */
  Path?: string | null;
  /** @nullable */
  PremiereDate?: string | null;
  /**
   * Gets or sets the provider ids.
   * @nullable
   */
  ProviderIds?: BoxSetInfoProviderIds;
  /**
   * Gets or sets the year.
   * @nullable
   */
  Year?: number | null;
}
