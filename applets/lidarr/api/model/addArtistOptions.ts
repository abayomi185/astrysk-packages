/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { MonitorTypes } from "./monitorTypes";

export interface AddArtistOptions {
  monitor?: MonitorTypes;
  albumsToMonitor?: string[] | null;
  monitored?: boolean;
  searchForMissingAlbums?: boolean;
}