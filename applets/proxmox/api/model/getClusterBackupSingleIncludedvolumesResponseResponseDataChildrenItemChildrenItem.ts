/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * ProxMox VE API
 * ProxMox VE API
 * OpenAPI spec version: 2.0
 */

export type GetClusterBackupSingleIncludedvolumesResponseResponseDataChildrenItemChildrenItem =
  {
    /** Configuration key of the volume. */
    id?: string;
    /** Whether the volume is included in the backup or not. */
    included?: number;
    /** Name of the volume. */
    name?: string;
    /** The reason why the volume is included (or excluded). */
    reason?: string;
  };
