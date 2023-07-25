/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Sonarr
 * Sonarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { SortDirection } from "./sortDirection";
import type { PagingResourceFilter } from "./pagingResourceFilter";
import type { EpisodeResource } from "./episodeResource";

export interface EpisodeResourcePagingResource {
  page?: number;
  pageSize?: number;
  sortKey?: string | null;
  sortDirection?: SortDirection;
  filters?: PagingResourceFilter[] | null;
  totalRecords?: number;
  records?: EpisodeResource[] | null;
}
