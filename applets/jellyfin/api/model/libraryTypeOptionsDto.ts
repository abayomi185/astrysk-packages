/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { ImageOption } from "./imageOption";
import type { LibraryOptionInfoDto } from "./libraryOptionInfoDto";
import type { ImageType } from "./imageType";

/**
 * Library type options dto.
 */
export interface LibraryTypeOptionsDto {
  /** Gets or sets the default image options. */
  DefaultImageOptions?: ImageOption[];
  /** Gets or sets the image fetchers. */
  ImageFetchers?: LibraryOptionInfoDto[];
  /** Gets or sets the metadata fetchers. */
  MetadataFetchers?: LibraryOptionInfoDto[];
  /** Gets or sets the supported image types. */
  SupportedImageTypes?: ImageType[];
  /**
   * Gets or sets the type.
   * @nullable
   */
  Type?: string | null;
}
