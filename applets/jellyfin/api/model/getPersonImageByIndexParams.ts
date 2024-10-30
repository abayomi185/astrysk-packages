/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { ImageFormat } from "./imageFormat";

export type GetPersonImageByIndexParams = {
  /**
   * Optional. Supply the cache tag from the item object to receive strong caching headers.
   */
  tag?: string;
  /**
   * Determines the output format of the image - original,gif,jpg,png.
   */
  format?: ImageFormat;
  /**
   * The maximum image width to return.
   */
  maxWidth?: number;
  /**
   * The maximum image height to return.
   */
  maxHeight?: number;
  /**
   * Optional. Percent to render for the percent played overlay.
   */
  percentPlayed?: number;
  /**
   * Optional. Unplayed count overlay to render.
   */
  unplayedCount?: number;
  /**
   * The fixed image width to return.
   */
  width?: number;
  /**
   * The fixed image height to return.
   */
  height?: number;
  /**
   * Optional. Quality setting, from 0-100. Defaults to 90 and should suffice in most cases.
   */
  quality?: number;
  /**
   * Width of box to fill.
   */
  fillWidth?: number;
  /**
   * Height of box to fill.
   */
  fillHeight?: number;
  /**
   * Optional. Specify if whitespace should be cropped out of the image. True/False. If unspecified, whitespace will be cropped from logos and clear art.
   * @deprecated
   */
  cropWhitespace?: boolean;
  /**
   * Optional. Add a played indicator.
   */
  addPlayedIndicator?: boolean;
  /**
   * Optional. Blur image.
   */
  blur?: number;
  /**
   * Optional. Apply a background color for transparent images.
   */
  backgroundColor?: string;
  /**
   * Optional. Apply a foreground layer on top of the image.
   */
  foregroundLayer?: string;
};
