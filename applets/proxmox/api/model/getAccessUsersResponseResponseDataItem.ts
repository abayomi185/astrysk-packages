/**
 * Generated by orval v6.17.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */
import type { GetAccessUsersResponseResponseDataItemTokensItem } from "./getAccessUsersResponseResponseDataItemTokensItem";

export type GetAccessUsersResponseResponseDataItem = {
  comment?: string;
  email?: string;
  /** Enable the account (default). You can set this to '0' to disable the account */
  enable?: number;
  /** Account expiration date (seconds since epoch). '0' means no expiration date. */
  expire?: number;
  firstname?: string;
  groups?: string;
  /** Keys for two factor auth (yubico). */
  keys?: string;
  lastname?: string;
  tokens?: GetAccessUsersResponseResponseDataItemTokensItem[];
  /** User ID */
  userid?: string;
};
