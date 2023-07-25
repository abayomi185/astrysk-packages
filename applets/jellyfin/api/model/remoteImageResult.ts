/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { RemoteImageInfo } from "./remoteImageInfo";

/**
 * Class RemoteImageResult.
 */
export interface RemoteImageResult {
  /** Gets or sets the images. */
  Images?: RemoteImageInfo[] | null;
  /** Gets or sets the total record count. */
  TotalRecordCount?: number;
  /** Gets or sets the providers. */
  Providers?: string[] | null;
}
