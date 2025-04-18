/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Sonarr
 * Sonarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { AddSeriesOptions } from "./addSeriesOptions";
import type { AlternateTitleResource } from "./alternateTitleResource";
import type { MediaCover } from "./mediaCover";
import type { Language } from "./language";
import type { Ratings } from "./ratings";
import type { SeasonResource } from "./seasonResource";
import type { SeriesTypes } from "./seriesTypes";
import type { SeriesStatisticsResource } from "./seriesStatisticsResource";
import type { SeriesStatusType } from "./seriesStatusType";

export interface SeriesResource {
  added?: string;
  addOptions?: AddSeriesOptions;
  /** @nullable */
  airTime?: string | null;
  /** @nullable */
  alternateTitles?: AlternateTitleResource[] | null;
  /** @nullable */
  certification?: string | null;
  /** @nullable */
  cleanTitle?: string | null;
  readonly ended?: boolean;
  /** @nullable */
  episodesChanged?: boolean | null;
  /** @nullable */
  firstAired?: string | null;
  /** @nullable */
  folder?: string | null;
  /** @nullable */
  genres?: string[] | null;
  id?: number;
  /** @nullable */
  images?: MediaCover[] | null;
  /** @nullable */
  imdbId?: string | null;
  /** @deprecated */
  readonly languageProfileId?: number;
  monitored?: boolean;
  /** @nullable */
  network?: string | null;
  /** @nullable */
  nextAiring?: string | null;
  originalLanguage?: Language;
  /** @nullable */
  overview?: string | null;
  /** @nullable */
  path?: string | null;
  /** @nullable */
  previousAiring?: string | null;
  /** @nullable */
  profileName?: string | null;
  qualityProfileId?: number;
  ratings?: Ratings;
  /** @nullable */
  remotePoster?: string | null;
  /** @nullable */
  rootFolderPath?: string | null;
  runtime?: number;
  seasonFolder?: boolean;
  /** @nullable */
  seasons?: SeasonResource[] | null;
  seriesType?: SeriesTypes;
  /** @nullable */
  sortTitle?: string | null;
  statistics?: SeriesStatisticsResource;
  status?: SeriesStatusType;
  /** @nullable */
  tags?: number[] | null;
  /** @nullable */
  title?: string | null;
  /** @nullable */
  titleSlug?: string | null;
  tvdbId?: number;
  tvMazeId?: number;
  tvRageId?: number;
  useSceneNumbering?: boolean;
  year?: number;
}
