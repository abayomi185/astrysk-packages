/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */

export type GetNodesSingleCpuResponseResponseDataItem = {
  /** True if this is a custom CPU model. */
  custom?: number;
  /** Name of the CPU model. Identifies it for subsequent API calls. Prefixed with 'custom-' for custom models. */
  name?: string;
  /** CPU vendor visible to the guest when this model is selected. Vendor of 'reported-model' in case of custom models. */
  vendor?: string;
};
