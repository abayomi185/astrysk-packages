/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */

export type CreateAccessUsersSingleTokenSingleResponseResponseDataInfo = {
  comment?: string;
  /** API token expiration date (seconds since epoch). '0' means no expiration date. */
  expire?: number;
  /** Restrict API token privileges with separate ACLs (default), or give full privileges of corresponding user. */
  privsep?: number;
};
