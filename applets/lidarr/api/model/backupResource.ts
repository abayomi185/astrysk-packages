/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { BackupType } from "./backupType";

export interface BackupResource {
  id?: number;
  name?: string | null;
  path?: string | null;
  type?: BackupType;
  size?: number;
  time?: string;
}
