/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */

export interface CreateClusterSDNZoneRequest {
  bridge?: string;
  controller?: string;
  "dp-id"?: number;
  mtu?: number;
  nodes?: string;
  peers?: string;
  tag?: number;
  type: string;
  "vlan-protocol"?: string;
  "vrf-vxlan"?: number;
  zone: string;
}
