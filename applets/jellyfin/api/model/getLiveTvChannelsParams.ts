/**
 * Generated by orval v6.11.1 🍺
 * Do not edit manually.
 * Jellyfin API
 * OpenAPI spec version: 10.8.8
 */
import type { ChannelType } from './channelType';
import type { ImageType } from './imageType';
import type { ItemFields } from './itemFields';
import type { SortOrder } from './sortOrder';

export type GetLiveTvChannelsParams = { type?: ChannelType; userId?: string; startIndex?: number; isMovie?: boolean; isSeries?: boolean; isNews?: boolean; isKids?: boolean; isSports?: boolean; limit?: number; isFavorite?: boolean; isLiked?: boolean; isDisliked?: boolean; enableImages?: boolean; imageTypeLimit?: number; enableImageTypes?: ImageType[]; fields?: ItemFields[]; enableUserData?: boolean; sortBy?: string[]; sortOrder?: SortOrder; enableFavoriteSorting?: boolean; addCurrentProgram?: boolean };
