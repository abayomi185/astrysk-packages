/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { NameValuePair } from "./nameValuePair";

export interface ListingsProviderInfo {
  Id?: string | null;
  Type?: string | null;
  Username?: string | null;
  Password?: string | null;
  ListingsId?: string | null;
  ZipCode?: string | null;
  Country?: string | null;
  Path?: string | null;
  EnabledTuners?: string[] | null;
  EnableAllTuners?: boolean;
  NewsCategories?: string[] | null;
  SportsCategories?: string[] | null;
  KidsCategories?: string[] | null;
  MovieCategories?: string[] | null;
  ChannelMappings?: NameValuePair[] | null;
  MoviePrefix?: string | null;
  PreferredLanguage?: string | null;
  UserAgent?: string | null;
}
