/**
 * Generated by orval v6.17.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */

export type GetVMConfigPendingResponseResponseDataItem = {
  /** Indicates a pending delete request if present and not 0. The value 2 indicates a force-delete request. */
  delete?: number;
  /** Configuration option name. */
  key?: string;
  /** Pending value. */
  pending?: string;
  /** Current value. */
  value?: string;
};
