/**
 * Generated by orval v6.17.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */
import type { GetNodesSingleDisksLvmResponseResponseDataChildrenItemChildrenItem } from "./getNodesSingleDisksLvmResponseResponseDataChildrenItemChildrenItem";

export type GetNodesSingleDisksLvmResponseResponseDataChildrenItem = {
  /** The underlying physical volumes */
  children?: GetNodesSingleDisksLvmResponseResponseDataChildrenItemChildrenItem[];
  /** The free bytes in the volume group */
  free?: number;
  leaf?: number;
  /** The name of the volume group */
  name?: string;
  /** The size of the volume group in bytes */
  size?: number;
};
