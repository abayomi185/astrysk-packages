/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */

export type StopEncodingProcessParams = {
  /**
   * The device id of the client requesting. Used to stop encoding processes when needed.
   */
  deviceId: string;
  /**
   * The play session id.
   */
  playSessionId: string;
};
