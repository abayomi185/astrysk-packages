import React, { Suspense } from "react";
import { useLocalSearchParams } from "expo-router";

import { useJellyfinStore } from "../store";
import {
  JellyfinDetailScreenContext,
  JellyfinDetailScreenProps,
} from "../types";
import { BaseItemDto, BaseItemKind } from "../api";
import JellyfinSeriesDetail from "../components/detail/seriesDetail";
import JellyfinMovieDetail from "../components/detail/movieDetail";
import JellyfinCollectionFolderDetail from "../components/detail/collectionFolderDetail";
import JellyfinMediaNotSupported from "../components/detail/mediaNotSupported";

const JellyfinDetail: React.FC = () => {
  const params = useLocalSearchParams() as JellyfinDetailScreenProps;

  const userId = useJellyfinStore.getState().userDetails?.Id as string;
  const serverId = useJellyfinStore.getState().userDetails?.ServerId as string;

  const itemData = React.useMemo(() => {
    if (params.context === JellyfinDetailScreenContext.NextUp) {
      return useJellyfinStore.getState().mediaCache?.[serverId]
        ?.nextUpMediaCache?.data?.Items?.[Number(params.itemCacheIndex)];
    }

    if (params.context === JellyfinDetailScreenContext.RecentlyAdded) {
      return useJellyfinStore.getState().mediaCache?.[serverId]
        ?.latestMediaCache?.data?.[Number(params.itemCacheIndex)];
    }

    if (params.context === JellyfinDetailScreenContext.Views) {
      return useJellyfinStore.getState().mediaCache?.[serverId]?.viewsMediaCache
        ?.data?.[Number(params.itemCacheIndex)];
    }

    if (params.context === JellyfinDetailScreenContext.SearchSuggestionItem) {
      return useJellyfinStore.getState().mediaCache?.[serverId]
        ?.searchSuggestionsMediaCache?.data?.[Number(params.itemCacheIndex)];
    }

    if (params.context === JellyfinDetailScreenContext.SearchItem) {
      return useJellyfinStore.getState().mediaCache?.[serverId]
        ?.searchMediaCache?.data?.[
        Number(params.itemCacheIndex)
      ] as BaseItemDto;
    }

    if (params.context === JellyfinDetailScreenContext.CollectionItem) {
      return useJellyfinStore.getState().mediaCache?.[serverId]
        ?.collectionMediaCache?.data?.[Number(params.itemCacheIndex)];
    }
  }, []);

  const getComponentToRender = () => {
    if (
      itemData?.Type === BaseItemKind.Episode ||
      itemData?.Type === BaseItemKind.Series
    ) {
      return (
        <JellyfinSeriesDetail
          userId={userId}
          serverId={serverId}
          forwardedData={itemData}
        />
      );
    } else if (itemData?.Type === BaseItemKind.Movie) {
      return (
        <JellyfinMovieDetail
          userId={userId}
          serverId={serverId}
          forwardedData={itemData}
        />
      );
    } else if (itemData?.Type === BaseItemKind.CollectionFolder) {
      return (
        <JellyfinCollectionFolderDetail
          userId={userId}
          serverId={serverId}
          forwardedData={itemData}
        />
      );
    } else {
      return <JellyfinMediaNotSupported />;
    }
  };

  return <>{itemData && <Suspense>{getComponentToRender()}</Suspense>}</>;
};

export default JellyfinDetail;
