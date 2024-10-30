/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Radarr
 * Radarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { Field } from "./field";
import type { ProviderMessage } from "./providerMessage";

export interface NotificationResource {
  /** @nullable */
  configContract?: string | null;
  /** @nullable */
  fields?: Field[] | null;
  id?: number;
  /** @nullable */
  implementation?: string | null;
  /** @nullable */
  implementationName?: string | null;
  includeHealthWarnings?: boolean;
  /** @nullable */
  infoLink?: string | null;
  /** @nullable */
  link?: string | null;
  message?: ProviderMessage;
  /** @nullable */
  name?: string | null;
  onApplicationUpdate?: boolean;
  onDownload?: boolean;
  onGrab?: boolean;
  onHealthIssue?: boolean;
  onHealthRestored?: boolean;
  onManualInteractionRequired?: boolean;
  onMovieAdded?: boolean;
  onMovieDelete?: boolean;
  onMovieFileDelete?: boolean;
  onMovieFileDeleteForUpgrade?: boolean;
  onRename?: boolean;
  onUpgrade?: boolean;
  /** @nullable */
  presets?: NotificationResource[] | null;
  supportsOnApplicationUpdate?: boolean;
  supportsOnDownload?: boolean;
  supportsOnGrab?: boolean;
  supportsOnHealthIssue?: boolean;
  supportsOnHealthRestored?: boolean;
  supportsOnManualInteractionRequired?: boolean;
  supportsOnMovieAdded?: boolean;
  supportsOnMovieDelete?: boolean;
  supportsOnMovieFileDelete?: boolean;
  supportsOnMovieFileDeleteForUpgrade?: boolean;
  supportsOnRename?: boolean;
  supportsOnUpgrade?: boolean;
  /** @nullable */
  tags?: number[] | null;
  /** @nullable */
  testCommand?: string | null;
}
