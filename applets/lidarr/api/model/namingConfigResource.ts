/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */

export interface NamingConfigResource {
  id?: number;
  renameTracks?: boolean;
  replaceIllegalCharacters?: boolean;
  colonReplacementFormat?: number;
  standardTrackFormat?: string | null;
  multiDiscTrackFormat?: string | null;
  artistFolderFormat?: string | null;
  includeArtistName?: boolean;
  includeAlbumTitle?: boolean;
  includeQuality?: boolean;
  replaceSpaces?: boolean;
  separator?: string | null;
  numberStyle?: string | null;
}