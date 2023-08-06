import React, { Suspense } from "react";
import { useSearchParams } from "expo-router";

import { useSonarrStore } from "../store";
import { SonarrDetailScreenContext, SonarrDetailScreenProps } from "../types";
import SonarrSeriesDetail from "../components/detail/seriesDetail";
import { SeriesResource } from "../api";
import SonarrAllSeasonsDetail from "../components/detail/allSeasonsDetail";
import { TabContext } from "@astrysk/types";
import SonarrAllEpisodesDetail from "../components/detail/allEpisodesDetail";

const SonarrDetail: React.FC = () => {
  const params = useSearchParams() as SonarrDetailScreenProps;
  const refParams = React.useRef(params);

  const baseURL = useSonarrStore.getState().baseURL as string;

  const itemData = React.useMemo(() => {
    const dataToForward = {
      ...useSonarrStore.getState().sonarrCache?.[baseURL]?.[
        refParams.current.itemId as number
      ],
      sonarrContext: params.context,
      tabContext: params.tabContext,
    };

    // if (refParams.current.context === SonarrDetailScreenContext.SearchItem) {
    //   return dataToForward;
    // }
    // if (refParams.current.context === SonarrDetailScreenContext.AllSeasons) {
    //   return dataToForward;
    // }
    // if (refParams.current.context === SonarrDetailScreenContext.EpisodesList) {
    //   return dataToForward;
    // }
    return dataToForward;
  }, [refParams.current.itemId]);

  const getComponentToRender = () => {
    if (itemData?.sonarrContext === SonarrDetailScreenContext.SearchItem) {
      return (
        <SonarrSeriesDetail
          forwardedData={itemData as SeriesResource}
          tabContext={itemData.tabContext as TabContext}
        />
      );
    } else if (
      itemData?.sonarrContext === SonarrDetailScreenContext.AllSeasons
    ) {
      return (
        <SonarrAllSeasonsDetail
          forwardedData={itemData as SeriesResource}
          tabContext={itemData.tabContext as TabContext}
        />
      );
    } else if (
      itemData?.sonarrContext === SonarrDetailScreenContext.EpisodesList
    ) {
      return (
        <SonarrAllEpisodesDetail
          forwardedData={itemData as SeriesResource}
          tabContext={itemData.tabContext as TabContext}
        />
      );
    }
  };

  return <>{itemData && <Suspense>{getComponentToRender()}</Suspense>}</>;
};

export default SonarrDetail;
