/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */
import type { GetClusterAcmeAccountSingleResponseResponseDataAccount } from "./getClusterAcmeAccountSingleResponseResponseDataAccount";

export type GetClusterAcmeAccountSingleResponseResponseData = {
  account?: GetClusterAcmeAccountSingleResponseResponseDataAccount;
  /** URL of ACME CA directory endpoint. */
  directory?: string;
  location?: string;
  tos?: string;
};
