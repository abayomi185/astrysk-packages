/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Radarr
 * Radarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { RuntimeMode } from "./runtimeMode";
import type { DatabaseType } from "./databaseType";
import type { Version } from "./version";
import type { AuthenticationType } from "./authenticationType";
import type { UpdateMechanism } from "./updateMechanism";

export interface SystemResource {
  appName?: string | null;
  instanceName?: string | null;
  version?: string | null;
  buildTime?: string;
  isDebug?: boolean;
  isProduction?: boolean;
  isAdmin?: boolean;
  isUserInteractive?: boolean;
  startupPath?: string | null;
  appData?: string | null;
  osName?: string | null;
  osVersion?: string | null;
  isNetCore?: boolean;
  isLinux?: boolean;
  isOsx?: boolean;
  isWindows?: boolean;
  isDocker?: boolean;
  mode?: RuntimeMode;
  branch?: string | null;
  databaseType?: DatabaseType;
  databaseVersion?: Version;
  authentication?: AuthenticationType;
  migrationVersion?: number;
  urlBase?: string | null;
  runtimeVersion?: Version;
  runtimeName?: string | null;
  startTime?: string;
  packageVersion?: string | null;
  packageAuthor?: string | null;
  packageUpdateMechanism?: UpdateMechanism;
  packageUpdateMechanismMessage?: string | null;
}
