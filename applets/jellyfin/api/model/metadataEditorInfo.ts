/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { NameValuePair } from "./nameValuePair";
import type { CountryInfo } from "./countryInfo";
import type { CultureDto } from "./cultureDto";
import type { ExternalIdInfo } from "./externalIdInfo";
import type { ParentalRating } from "./parentalRating";

export interface MetadataEditorInfo {
  /** @nullable */
  ContentType?: string | null;
  ContentTypeOptions?: NameValuePair[];
  Countries?: CountryInfo[];
  Cultures?: CultureDto[];
  ExternalIdInfos?: ExternalIdInfo[];
  ParentalRatingOptions?: ParentalRating[];
}
