/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { Version } from "./version";
import type { UpdateChanges } from "./updateChanges";

export interface UpdateResource {
  id?: number;
  version?: Version;
  branch?: string | null;
  releaseDate?: string;
  fileName?: string | null;
  url?: string | null;
  installed?: boolean;
  installedOn?: string | null;
  installable?: boolean;
  latest?: boolean;
  changes?: UpdateChanges;
  hash?: string | null;
}
