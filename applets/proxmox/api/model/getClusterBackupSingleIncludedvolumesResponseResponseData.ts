/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */
import type { GetClusterBackupSingleIncludedvolumesResponseResponseDataChildrenItem } from "./getClusterBackupSingleIncludedvolumesResponseResponseDataChildrenItem";

/**
 * Root node of the tree object. Children represent guests, grandchildren represent volumes of that guest.
 */
export type GetClusterBackupSingleIncludedvolumesResponseResponseData = {
  children?: GetClusterBackupSingleIncludedvolumesResponseResponseDataChildrenItem[];
};
