/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */

/**
 * Class SearchHintResult.
 */
export interface SearchHint {
  /**
   * Gets or sets the album.
   * @nullable
   */
  Album?: string | null;
  /**
   * Gets or sets the album artist.
   * @nullable
   */
  AlbumArtist?: string | null;
  AlbumId?: string;
  /**
   * Gets or sets the artists.
   * @nullable
   */
  Artists?: string[] | null;
  /**
   * Gets or sets the backdrop image item identifier.
   * @nullable
   */
  BackdropImageItemId?: string | null;
  /**
   * Gets or sets the backdrop image tag.
   * @nullable
   */
  BackdropImageTag?: string | null;
  /** Gets or sets the channel identifier. */
  ChannelId?: string;
  /**
   * Gets or sets the name of the channel.
   * @nullable
   */
  ChannelName?: string | null;
  /** @nullable */
  EndDate?: string | null;
  /**
   * Gets or sets the episode count.
   * @nullable
   */
  EpisodeCount?: number | null;
  Id?: string;
  /**
   * Gets or sets the index number.
   * @nullable
   */
  IndexNumber?: number | null;
  /** @nullable */
  IsFolder?: boolean | null;
  /** Gets or sets the item id. */
  ItemId?: string;
  /**
   * Gets or sets the matched term.
   * @nullable
   */
  MatchedTerm?: string | null;
  /**
   * Gets or sets the type of the media.
   * @nullable
   */
  MediaType?: string | null;
  /**
   * Gets or sets the name.
   * @nullable
   */
  Name?: string | null;
  /**
   * Gets or sets the parent index number.
   * @nullable
   */
  ParentIndexNumber?: number | null;
  /**
   * Gets or sets the primary image aspect ratio.
   * @nullable
   */
  PrimaryImageAspectRatio?: number | null;
  /**
   * Gets or sets the image tag.
   * @nullable
   */
  PrimaryImageTag?: string | null;
  /**
   * Gets or sets the production year.
   * @nullable
   */
  ProductionYear?: number | null;
  /**
   * Gets or sets the run time ticks.
   * @nullable
   */
  RunTimeTicks?: number | null;
  /**
   * Gets or sets the series.
   * @nullable
   */
  Series?: string | null;
  /**
   * Gets or sets the song count.
   * @nullable
   */
  SongCount?: number | null;
  /** @nullable */
  StartDate?: string | null;
  /** @nullable */
  Status?: string | null;
  /**
   * Gets or sets the thumb image item identifier.
   * @nullable
   */
  ThumbImageItemId?: string | null;
  /**
   * Gets or sets the thumb image tag.
   * @nullable
   */
  ThumbImageTag?: string | null;
  /**
   * Gets or sets the type.
   * @nullable
   */
  Type?: string | null;
}
