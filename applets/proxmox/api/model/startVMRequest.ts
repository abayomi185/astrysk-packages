/**
 * Generated by orval v6.17.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */

export interface StartVMRequest {
  "force-cpu"?: string;
  machine?: string;
  migratedfrom?: string;
  migration_network?: string;
  migration_type?: string;
  skiplock?: boolean;
  stateuri?: string;
  targetstorage?: string;
  timeout?: number;
}
