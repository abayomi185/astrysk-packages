/**
 * Generated by orval v6.17.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */

export type GetNodesSingleQemuSingleAgentExecstatusResponseResponseData = {
  /** stderr of the process */
  "err-data"?: string;
  /** true if stderr was not fully captured */
  "err-truncated"?: number;
  /** process exit code if it was normally terminated. */
  exitcode?: number;
  /** Tells if the given command has exited yet. */
  exited?: number;
  /** stdout of the process */
  "out-data"?: string;
  /** true if stdout was not fully captured */
  "out-truncated"?: number;
  /** signal number or exception code if the process was abnormally terminated. */
  signal?: number;
};
