/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Sonarr
 * Sonarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { AlternateTitleResource } from "./alternateTitleResource";
import type { SeriesStatusType } from "./seriesStatusType";
import type { MediaCover } from "./mediaCover";
import type { Language } from "./language";
import type { SeasonResource } from "./seasonResource";
import type { SeriesTypes } from "./seriesTypes";
import type { AddSeriesOptions } from "./addSeriesOptions";
import type { Ratings } from "./ratings";
import type { SeriesStatisticsResource } from "./seriesStatisticsResource";

export interface SeriesResource {
  id?: number;
  title?: string | null;
  alternateTitles?: AlternateTitleResource[] | null;
  sortTitle?: string | null;
  status?: SeriesStatusType;
  readonly ended?: boolean;
  profileName?: string | null;
  overview?: string | null;
  nextAiring?: string | null;
  previousAiring?: string | null;
  network?: string | null;
  airTime?: string | null;
  images?: MediaCover[] | null;
  originalLanguage?: Language;
  remotePoster?: string | null;
  seasons?: SeasonResource[] | null;
  year?: number;
  path?: string | null;
  qualityProfileId?: number;
  seasonFolder?: boolean;
  monitored?: boolean;
  useSceneNumbering?: boolean;
  runtime?: number;
  tvdbId?: number;
  tvRageId?: number;
  tvMazeId?: number;
  firstAired?: string | null;
  seriesType?: SeriesTypes;
  cleanTitle?: string | null;
  imdbId?: string | null;
  titleSlug?: string | null;
  rootFolderPath?: string | null;
  folder?: string | null;
  certification?: string | null;
  genres?: string[] | null;
  tags?: number[] | null;
  added?: string;
  addOptions?: AddSeriesOptions;
  ratings?: Ratings;
  statistics?: SeriesStatisticsResource;
  episodesChanged?: boolean | null;
  /** @deprecated */
  readonly languageProfileId?: number;
}
