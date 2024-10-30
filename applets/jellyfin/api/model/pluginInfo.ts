/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { PluginStatus } from "./pluginStatus";

/**
 * This is a serializable stub class that is used by the api to provide information about installed plugins.
 */
export interface PluginInfo {
  /** Gets or sets a value indicating whether the plugin can be uninstalled. */
  CanUninstall?: boolean;
  /**
   * Gets or sets the name of the configuration file.
   * @nullable
   */
  ConfigurationFileName?: string | null;
  /** Gets or sets the description. */
  Description?: string;
  /** Gets or sets a value indicating whether this plugin has a valid image. */
  HasImage?: boolean;
  /** Gets or sets the unique id. */
  Id?: string;
  /** Gets or sets the name. */
  Name?: string;
  /** Gets or sets a value indicating the status of the plugin. */
  Status?: PluginStatus;
  /** Gets or sets the version. */
  Version?: string;
}
