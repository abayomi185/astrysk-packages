/**
 * Generated by orval v6.17.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */

/**
 * Returns an object with a `content` property.
 */
export type GetNodesSingleQemuSingleAgentFilereadResponseResponseData = {
  /** The content of the file, maximum 16777216 */
  content?: string;
  /** If set to 1, the output is truncated and not complete */
  truncated?: number;
};