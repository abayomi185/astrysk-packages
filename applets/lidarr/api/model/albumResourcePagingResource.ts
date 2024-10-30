/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { PagingResourceFilter } from "./pagingResourceFilter";
import type { AlbumResource } from "./albumResource";
import type { SortDirection } from "./sortDirection";

export interface AlbumResourcePagingResource {
  /** @nullable */
  filters?: PagingResourceFilter[] | null;
  page?: number;
  pageSize?: number;
  /** @nullable */
  records?: AlbumResource[] | null;
  sortDirection?: SortDirection;
  /** @nullable */
  sortKey?: string | null;
  totalRecords?: number;
}
