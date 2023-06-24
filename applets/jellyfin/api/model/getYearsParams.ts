/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { SortOrder } from './sortOrder';
import type { ItemFields } from './itemFields';
import type { BaseItemKind } from './baseItemKind';
import type { ImageType } from './imageType';

export type GetYearsParams = { startIndex?: number; limit?: number; sortOrder?: SortOrder[]; parentId?: string; fields?: ItemFields[]; excludeItemTypes?: BaseItemKind[]; includeItemTypes?: BaseItemKind[]; mediaTypes?: string[]; sortBy?: string[]; enableUserData?: boolean; imageTypeLimit?: number; enableImageTypes?: ImageType[]; userId?: string; recursive?: boolean; enableImages?: boolean };
