/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */

export interface CloneVMRequest {
  bwlimit?: number;
  description?: string;
  format?: string;
  full?: boolean;
  name?: string;
  newid: number;
  pool?: string;
  snapname?: string;
  storage?: string;
  target?: string;
}
