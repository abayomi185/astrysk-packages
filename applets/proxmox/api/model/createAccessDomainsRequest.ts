/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */

export interface CreateAccessDomainsRequest {
  base_dn?: string;
  bind_dn?: string;
  capath?: string;
  "case-sensitive"?: boolean;
  cert?: string;
  certkey?: string;
  comment?: string;
  default?: boolean;
  domain?: string;
  filter?: string;
  group_classes?: string;
  group_dn?: string;
  group_filter?: string;
  group_name_attr?: string;
  mode?: string;
  password?: string;
  port?: number;
  realm: string;
  secure?: boolean;
  server1?: string;
  server2?: string;
  sslversion?: string;
  sync_attributes?: string;
  "sync-defaults-options"?: string;
  tfa?: string;
  type: string;
  user_attr?: string;
  user_classes?: string;
  verify?: boolean;
}
