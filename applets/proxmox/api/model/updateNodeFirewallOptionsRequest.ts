/**
 * Generated by orval v6.17.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */

export interface UpdateNodeFirewallOptionsRequest {
  delete?: string;
  digest?: string;
  enable?: boolean;
  log_level_in?: string;
  log_level_out?: string;
  log_nf_conntrack?: boolean;
  ndp?: boolean;
  nf_conntrack_allow_invalid?: boolean;
  nf_conntrack_max?: number;
  nf_conntrack_tcp_timeout_established?: number;
  nf_conntrack_tcp_timeout_syn_recv?: number;
  nosmurfs?: boolean;
  protection_synflood?: boolean;
  protection_synflood_burst?: number;
  protection_synflood_rate?: number;
  smurf_log_level?: string;
  tcp_flags_log_level?: string;
  tcpflags?: boolean;
}