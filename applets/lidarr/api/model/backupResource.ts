/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { BackupType } from "./backupType";

export interface BackupResource {
  id?: number;
  /** @nullable */
  name?: string | null;
  /** @nullable */
  path?: string | null;
  size?: number;
  time?: string;
  type?: BackupType;
}
