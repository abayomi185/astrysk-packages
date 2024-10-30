/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */

export type GetNodesResponseResponseDataItem = {
  /** CPU utilization. */
  cpu?: number;
  /** Support level. */
  level?: string;
  /** Number of available CPUs. */
  maxcpu?: number;
  /** Number of available memory in bytes. */
  maxmem?: number;
  /** Used memory in bytes. */
  mem?: number;
  /** The cluster node name. */
  node?: string;
  /** The SSL fingerprint for the node certificate. */
  ssl_fingerprint?: string;
  /** Node status. */
  status?: string;
  /** Node uptime in seconds. */
  uptime?: number;
};
