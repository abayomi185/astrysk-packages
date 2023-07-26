import React, { Suspense } from "react";
import { useSearchParams } from "expo-router";

import { useSonarrStore } from "../store";
import { SonarrDetailScreenContext, SonarrDetailScreenProps } from "../types";
// import JellyfinSeriesDetail from "../components/detail/seriesDetail";
// import JellyfinMovieDetail from "../components/detail/movieDetail";
// import JellyfinCollectionFolderDetail from "../components/detail/collectionFolderDetail";
// import JellyfinMediaNotSupported from "../components/detail/mediaNotSupported";

const SonarrDetail: React.FC = () => {
  const params = useSearchParams() as SonarrDetailScreenProps;

  // const userId = useSonarrStore.getState().userDetails?.Id as string;
  // const serverId = useSonarrStore.getState().userDetails?.ServerId as string;

  // const itemData = React.useMemo(() => {
  //   if (params.context === JellyfinDetailScreenContext.NextUp) {
  //     return useSonarrStore.getState().mediaCache?.[serverId]
  //       ?.nextUpMediaCache?.data?.Items?.[Number(params.itemCacheIndex)];
  //   }

  //   if (params.context === JellyfinDetailScreenContext.RecentlyAdded) {
  //     return useSonarrStore.getState().mediaCache?.[serverId]
  //       ?.latestMediaCache?.data?.[Number(params.itemCacheIndex)];
  //   }

  //   if (params.context === JellyfinDetailScreenContext.Views) {
  //     return useSonarrStore.getState().mediaCache?.[serverId]?.viewsMediaCache
  //       ?.data?.[Number(params.itemCacheIndex)];
  //   }

  //   if (params.context === JellyfinDetailScreenContext.SearchSuggestionItem) {
  //     return useSonarrStore.getState().mediaCache?.[serverId]
  //       ?.searchSuggestionsMediaCache?.data?.[Number(params.itemCacheIndex)];
  //   }

  //   if (params.context === JellyfinDetailScreenContext.SearchItem) {
  //     return useSonarrStore.getState().mediaCache?.[serverId]
  //       ?.searchMediaCache?.data?.[
  //       Number(params.itemCacheIndex)
  //     ] as BaseItemDto;
  //   }

  //   if (params.context === JellyfinDetailScreenContext.CollectionItem) {
  //     return useSonarrStore.getState().mediaCache?.[serverId]
  //       ?.collectionMediaCache?.data?.[Number(params.itemCacheIndex)];
  //   }
  // }, []);

  // const getComponentToRender = () => {
  //   if (
  //     itemData?.Type === BaseItemKind.Episode ||
  //     itemData?.Type === BaseItemKind.Series
  //   ) {
  //     return (
  //       <JellyfinSeriesDetail
  //         userId={userId}
  //         serverId={serverId}
  //         forwardedData={itemData}
  //       />
  //     );
  //   } else if (itemData?.Type === BaseItemKind.Movie) {
  //     return (
  //       <JellyfinMovieDetail
  //         userId={userId}
  //         serverId={serverId}
  //         forwardedData={itemData}
  //       />
  //     );
  //   } else if (itemData?.Type === BaseItemKind.CollectionFolder) {
  //     return (
  //       <JellyfinCollectionFolderDetail
  //         userId={userId}
  //         serverId={serverId}
  //         forwardedData={itemData}
  //       />
  //     );
  //   } else {
  //     return <JellyfinMediaNotSupported />;
  //   }
  // };

  // return <>{itemData && <Suspense>{getComponentToRender()}</Suspense>}</>;
  return <></>;
};

export default SonarrDetail;
