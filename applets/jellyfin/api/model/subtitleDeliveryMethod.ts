/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */

/**
 * Delivery method to use during playback of a specific subtitle format.
 */
export type SubtitleDeliveryMethod = typeof SubtitleDeliveryMethod[keyof typeof SubtitleDeliveryMethod];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SubtitleDeliveryMethod = {
  Encode: 'Encode',
  Embed: 'Embed',
  External: 'External',
  Hls: 'Hls',
  Drop: 'Drop',
} as const;
