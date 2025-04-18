/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */

/**
 * Create new playlist dto.
 */
export interface CreatePlaylistDto {
  /** Gets or sets item ids to add to the playlist. */
  Ids?: string[];
  /**
   * Gets or sets the media type.
   * @nullable
   */
  MediaType?: string | null;
  /**
   * Gets or sets the name of the new playlist.
   * @nullable
   */
  Name?: string | null;
  /**
   * Gets or sets the user id.
   * @nullable
   */
  UserId?: string | null;
}
