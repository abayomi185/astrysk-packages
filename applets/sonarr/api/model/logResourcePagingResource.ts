/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Sonarr
 * Sonarr API docs
 * OpenAPI spec version: 3.0.0
 */
import type { PagingResourceFilter } from "./pagingResourceFilter";
import type { LogResource } from "./logResource";
import type { SortDirection } from "./sortDirection";

export interface LogResourcePagingResource {
  /** @nullable */
  filters?: PagingResourceFilter[] | null;
  page?: number;
  pageSize?: number;
  /** @nullable */
  records?: LogResource[] | null;
  sortDirection?: SortDirection;
  /** @nullable */
  sortKey?: string | null;
  totalRecords?: number;
}
