/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Sonarr
 * Sonarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { Field } from "./field";
import type { ProviderMessage } from "./providerMessage";
import type { DownloadProtocol } from "./downloadProtocol";

export interface DownloadClientResource {
  id?: number;
  name?: string | null;
  fields?: Field[] | null;
  implementationName?: string | null;
  implementation?: string | null;
  configContract?: string | null;
  infoLink?: string | null;
  message?: ProviderMessage;
  tags?: number[] | null;
  presets?: DownloadClientResource[] | null;
  enable?: boolean;
  protocol?: DownloadProtocol;
  priority?: number;
  removeCompletedDownloads?: boolean;
  removeFailedDownloads?: boolean;
}
