/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */

export type GetVMFirewallOptionsResponseResponseData = {
  /** Enable DHCP. */
  dhcp?: number;
  /** Enable/disable firewall rules. */
  enable?: number;
  /** Enable default IP filters. This is equivalent to adding an empty ipfilter-net<id> ipset for every interface. Such ipsets implicitly contain sane default restrictions such as restricting IPv6 link local addresses to the one derived from the interface's MAC address. For containers the configured IP addresses will be implicitly added. */
  ipfilter?: number;
  /** Log level for incoming traffic. */
  log_level_in?: string;
  /** Log level for outgoing traffic. */
  log_level_out?: string;
  /** Enable/disable MAC address filter. */
  macfilter?: number;
  /** Enable NDP (Neighbor Discovery Protocol). */
  ndp?: number;
  /** Input policy. */
  policy_in?: string;
  /** Output policy. */
  policy_out?: string;
  /** Allow sending Router Advertisement. */
  radv?: number;
};
