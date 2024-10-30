/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { AddAlbumOptions } from "./addAlbumOptions";
import type { ArtistResource } from "./artistResource";
import type { MediaCover } from "./mediaCover";
import type { Links } from "./links";
import type { MediumResource } from "./mediumResource";
import type { Ratings } from "./ratings";
import type { AlbumReleaseResource } from "./albumReleaseResource";
import type { AlbumStatisticsResource } from "./albumStatisticsResource";

export interface AlbumResource {
  addOptions?: AddAlbumOptions;
  /** @nullable */
  albumType?: string | null;
  anyReleaseOk?: boolean;
  artist?: ArtistResource;
  artistId?: number;
  /** @nullable */
  disambiguation?: string | null;
  duration?: number;
  /** @nullable */
  foreignAlbumId?: string | null;
  /** @nullable */
  genres?: string[] | null;
  grabbed?: boolean;
  id?: number;
  /** @nullable */
  images?: MediaCover[] | null;
  /** @nullable */
  links?: Links[] | null;
  /** @nullable */
  media?: MediumResource[] | null;
  readonly mediumCount?: number;
  monitored?: boolean;
  /** @nullable */
  overview?: string | null;
  profileId?: number;
  ratings?: Ratings;
  /** @nullable */
  releaseDate?: string | null;
  /** @nullable */
  releases?: AlbumReleaseResource[] | null;
  /** @nullable */
  remoteCover?: string | null;
  /** @nullable */
  secondaryTypes?: string[] | null;
  statistics?: AlbumStatisticsResource;
  /** @nullable */
  title?: string | null;
}
