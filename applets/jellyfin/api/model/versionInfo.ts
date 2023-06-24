/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */

/**
 * Defines the MediaBrowser.Model.Updates.VersionInfo class.
 */
export interface VersionInfo {
  /** Gets or sets the version. */
  version?: string;
  /** Gets the version as a System.Version. */
  readonly VersionNumber?: string;
  /** Gets or sets the changelog for this version. */
  changelog?: string | null;
  /** Gets or sets the ABI that this version was built against. */
  targetAbi?: string | null;
  /** Gets or sets the source URL. */
  sourceUrl?: string | null;
  /** Gets or sets a checksum for the binary. */
  checksum?: string | null;
  /** Gets or sets a timestamp of when the binary was built. */
  timestamp?: string | null;
  /** Gets or sets the repository name. */
  repositoryName?: string;
  /** Gets or sets the repository url. */
  repositoryUrl?: string;
}
