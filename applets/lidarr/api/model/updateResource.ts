/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { UpdateChanges } from "./updateChanges";
import type { Version } from "./version";

export interface UpdateResource {
  /** @nullable */
  branch?: string | null;
  changes?: UpdateChanges;
  /** @nullable */
  fileName?: string | null;
  /** @nullable */
  hash?: string | null;
  id?: number;
  installable?: boolean;
  installed?: boolean;
  /** @nullable */
  installedOn?: string | null;
  latest?: boolean;
  releaseDate?: string;
  /** @nullable */
  url?: string | null;
  version?: Version;
}
