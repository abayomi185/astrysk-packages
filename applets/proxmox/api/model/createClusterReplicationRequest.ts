/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */

export interface CreateClusterReplicationRequest {
  comment?: string;
  disable?: boolean;
  id: string;
  rate?: number;
  remove_job?: string;
  schedule?: string;
  source?: string;
  target: string;
  type: string;
}
