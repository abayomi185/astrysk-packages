/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Radarr
 * Radarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { AuthenticationType } from "./authenticationType";
import type { CertificateValidationType } from "./certificateValidationType";
import type { ProxyType } from "./proxyType";
import type { UpdateMechanism } from "./updateMechanism";

export interface HostConfigResource {
  analyticsEnabled?: boolean;
  /** @nullable */
  apiKey?: string | null;
  /** @nullable */
  applicationUrl?: string | null;
  authenticationMethod?: AuthenticationType;
  /** @nullable */
  backupFolder?: string | null;
  backupInterval?: number;
  backupRetention?: number;
  /** @nullable */
  bindAddress?: string | null;
  /** @nullable */
  branch?: string | null;
  certificateValidation?: CertificateValidationType;
  /** @nullable */
  consoleLogLevel?: string | null;
  enableSsl?: boolean;
  id?: number;
  /** @nullable */
  instanceName?: string | null;
  launchBrowser?: boolean;
  /** @nullable */
  logLevel?: string | null;
  /** @nullable */
  password?: string | null;
  port?: number;
  /** @nullable */
  proxyBypassFilter?: string | null;
  proxyBypassLocalAddresses?: boolean;
  proxyEnabled?: boolean;
  /** @nullable */
  proxyHostname?: string | null;
  /** @nullable */
  proxyPassword?: string | null;
  proxyPort?: number;
  proxyType?: ProxyType;
  /** @nullable */
  proxyUsername?: string | null;
  /** @nullable */
  sslCertPassword?: string | null;
  /** @nullable */
  sslCertPath?: string | null;
  sslPort?: number;
  updateAutomatically?: boolean;
  updateMechanism?: UpdateMechanism;
  /** @nullable */
  updateScriptPath?: string | null;
  /** @nullable */
  urlBase?: string | null;
  /** @nullable */
  username?: string | null;
}
