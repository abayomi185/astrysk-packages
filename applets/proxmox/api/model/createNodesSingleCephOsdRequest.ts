/**
 * Generated by orval v6.17.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */

export interface CreateNodesSingleCephOsdRequest {
  "crush-device-class"?: string;
  db_dev?: string;
  db_size?: number;
  dev: string;
  encrypted?: boolean;
  wal_dev?: string;
  wal_size?: number;
}
