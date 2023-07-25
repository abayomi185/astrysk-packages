/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { VersionInfo } from "./versionInfo";

/**
 * Class PackageInfo.
 */
export interface PackageInfo {
  /** Gets or sets the name. */
  name?: string;
  /** Gets or sets a long description of the plugin containing features or helpful explanations. */
  description?: string;
  /** Gets or sets a short overview of what the plugin does. */
  overview?: string;
  /** Gets or sets the owner. */
  owner?: string;
  /** Gets or sets the category. */
  category?: string;
  /** Gets or sets the guid of the assembly associated with this plugin.
This is used to identify the proper item for automatic updates. */
  guid?: string;
  /** Gets or sets the versions. */
  versions?: VersionInfo[];
  /** Gets or sets the image url for the package. */
  imageUrl?: string | null;
}
