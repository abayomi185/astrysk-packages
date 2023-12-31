/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */

/**
 * Create new playlist dto.
 */
export interface CreatePlaylistDto {
  /** Gets or sets the name of the new playlist. */
  Name?: string | null;
  /** Gets or sets item ids to add to the playlist. */
  Ids?: string[];
  /** Gets or sets the user id. */
  UserId?: string | null;
  /** Gets or sets the media type. */
  MediaType?: string | null;
}
