/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { ImageFormat } from "./imageFormat";

export type HeadPersonImageParams = {
  tag?: string;
  format?: ImageFormat;
  maxWidth?: number;
  maxHeight?: number;
  percentPlayed?: number;
  unplayedCount?: number;
  width?: number;
  height?: number;
  quality?: number;
  fillWidth?: number;
  fillHeight?: number;
  cropWhitespace?: boolean;
  addPlayedIndicator?: boolean;
  blur?: number;
  backgroundColor?: string;
  foregroundLayer?: string;
  imageIndex?: number;
};
