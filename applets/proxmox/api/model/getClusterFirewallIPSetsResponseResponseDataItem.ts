/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */

export type GetClusterFirewallIPSetsResponseResponseDataItem = {
  comment?: string;
  /** Prevent changes if current configuration file has different SHA1 digest. This can be used to prevent concurrent modifications. */
  digest?: string;
  /** IP set name. */
  name?: string;
};
