/**
 * Generated by orval v6.17.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */

export interface UpdateVMFirewallOptionsRequest {
  delete?: string;
  dhcp?: boolean;
  digest?: string;
  enable?: boolean;
  ipfilter?: boolean;
  log_level_in?: string;
  log_level_out?: string;
  macfilter?: boolean;
  ndp?: boolean;
  policy_in?: string;
  policy_out?: string;
  radv?: boolean;
}