/**
 * Generated by orval v6.17.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */

export type GetNodesSingleHostsResponseResponseData = {
  /** The content of /etc/hosts. */
  data?: string;
  /** Prevent changes if current configuration file has different SHA1 digest. This can be used to prevent concurrent modifications. */
  digest?: string;
};