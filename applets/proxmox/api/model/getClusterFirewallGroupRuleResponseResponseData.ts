/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */

export type GetClusterFirewallGroupRuleResponseResponseData = {
  action?: string;
  comment?: string;
  dest?: string;
  dport?: string;
  enable?: number;
  "icmp-type"?: string;
  iface?: string;
  ipversion?: number;
  /** Log level for firewall rule */
  log?: string;
  macro?: string;
  pos?: number;
  proto?: string;
  source?: string;
  sport?: string;
  type?: string;
};
