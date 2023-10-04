/**
 * Generated by orval v6.17.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */
import type { GetNodesSingleLxcSingleStatusCurrentResponseResponseDataHa } from "./getNodesSingleLxcSingleStatusCurrentResponseResponseDataHa";

export type GetNodesSingleLxcSingleStatusCurrentResponseResponseData = {
  /** Maximum usable CPUs. */
  cpus?: number;
  /** HA manager service status. */
  ha?: GetNodesSingleLxcSingleStatusCurrentResponseResponseDataHa;
  /** The current config lock, if any. */
  lock?: string;
  /** Root disk size in bytes. */
  maxdisk?: number;
  /** Maximum memory in bytes. */
  maxmem?: number;
  /** Maximum SWAP memory in bytes. */
  maxswap?: number;
  /** Container name. */
  name?: string;
  /** LXC Container status. */
  status?: string;
  /** The current configured tags, if any. */
  tags?: string;
  /** Uptime. */
  uptime?: number;
  /** The (unique) ID of the VM. */
  vmid?: number;
};