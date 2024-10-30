/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */
import type { GetCurrentVMStatusResponseResponseDataHa } from "./getCurrentVMStatusResponseResponseDataHa";

export type GetCurrentVMStatusResponseResponseData = {
  /** Qemu GuestAgent enabled in config. */
  agent?: number;
  /** Maximum usable CPUs. */
  cpus?: number;
  /** HA manager service status. */
  ha?: GetCurrentVMStatusResponseResponseDataHa;
  /** The current config lock, if any. */
  lock?: string;
  /** Root disk size in bytes. */
  maxdisk?: number;
  /** Maximum memory in bytes. */
  maxmem?: number;
  /** VM name. */
  name?: string;
  /** PID of running qemu process. */
  pid?: number;
  /** Qemu QMP agent status. */
  qmpstatus?: string;
  /** Qemu VGA configuration supports spice. */
  spice?: number;
  /** Qemu process status. */
  status?: string;
  /** The current configured tags, if any */
  tags?: string;
  /** Uptime. */
  uptime?: number;
  /** The (unique) ID of the VM. */
  vmid?: number;
};
