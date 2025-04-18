/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { ImageType } from "./imageType";
import type { ItemFields } from "./itemFields";
import type { SortOrder } from "./sortOrder";

/**
 * Get programs dto.
 */
export interface GetProgramsDto {
  /** Gets or sets the channels to return guide information for. */
  ChannelIds?: string[];
  /**
   * Gets or sets include image information in output.
Optional.
   * @nullable
   */
  EnableImages?: boolean | null;
  /** Gets or sets the image types to include in the output.
Optional. */
  EnableImageTypes?: ImageType[];
  /** Gets or sets a value indicating whether retrieve total record count. */
  EnableTotalRecordCount?: boolean;
  /**
   * Gets or sets include user data.
Optional.
   * @nullable
   */
  EnableUserData?: boolean | null;
  /** Gets or sets specify additional fields of information to return in the output. This allows multiple, comma delimited. Options: Budget, Chapters, DateCreated, Genres, HomePageUrl, IndexOptions, MediaStreams, Overview, ParentId, Path, People, ProviderIds, PrimaryImageAspectRatio, Revenue, SortName, Studios, Taglines.
Optional. */
  Fields?: ItemFields[];
  /** Gets or sets the genre ids to return guide information for. */
  GenreIds?: string[];
  /** Gets or sets the genres to return guide information for. */
  Genres?: string[];
  /**
   * Gets or sets filter by programs that have completed airing, or not.
Optional.
   * @nullable
   */
  HasAired?: boolean | null;
  /**
   * Gets or sets the max number of images to return, per image type.
Optional.
   * @nullable
   */
  ImageTypeLimit?: number | null;
  /**
   * Gets or sets filter by programs that are currently airing, or not.
Optional.
   * @nullable
   */
  IsAiring?: boolean | null;
  /**
   * Gets or sets filter for kids.
Optional.
   * @nullable
   */
  IsKids?: boolean | null;
  /**
   * Gets or sets filter for movies.
Optional.
   * @nullable
   */
  IsMovie?: boolean | null;
  /**
   * Gets or sets filter for news.
Optional.
   * @nullable
   */
  IsNews?: boolean | null;
  /**
   * Gets or sets filter for series.
Optional.
   * @nullable
   */
  IsSeries?: boolean | null;
  /**
   * Gets or sets filter for sports.
Optional.
   * @nullable
   */
  IsSports?: boolean | null;
  /** Gets or sets filter by library series id.
Optional. */
  LibrarySeriesId?: string;
  /**
   * Gets or sets the maximum number of records to return.
Optional.
   * @nullable
   */
  Limit?: number | null;
  /**
   * Gets or sets the maximum premiere end date.
Optional.
   * @nullable
   */
  MaxEndDate?: string | null;
  /**
   * Gets or sets the maximum premiere start date.
Optional.
   * @nullable
   */
  MaxStartDate?: string | null;
  /**
   * Gets or sets the minimum premiere end date.
Optional.
   * @nullable
   */
  MinEndDate?: string | null;
  /**
   * Gets or sets the minimum premiere start date.
Optional.
   * @nullable
   */
  MinStartDate?: string | null;
  /**
   * Gets or sets filter by series timer id.
Optional.
   * @nullable
   */
  SeriesTimerId?: string | null;
  /** Gets or sets specify one or more sort orders, comma delimited. Options: Name, StartDate.
Optional. */
  SortBy?: string[];
  /** Gets or sets sort Order - Ascending,Descending. */
  SortOrder?: SortOrder[];
  /**
   * Gets or sets the record index to start at. All items with a lower index will be dropped from the results.
Optional.
   * @nullable
   */
  StartIndex?: number | null;
  /** Gets or sets optional. Filter by user id. */
  UserId?: string;
}
