import React, { Suspense } from "react";
import { useSearchParams } from "expo-router";

import { useSonarrStore } from "../store";
import { SonarrDetailScreenContext, SonarrDetailScreenProps } from "../types";
import SonarrSeriesDetail from "../components/detail/seriesDetail";
import { SeriesResource } from "../api";

const SonarrDetail: React.FC = () => {
  const params = useSearchParams() as SonarrDetailScreenProps;

  const baseURL = useSonarrStore.getState().baseURL as string;

  const itemData = React.useMemo(() => {
    if (params.context === SonarrDetailScreenContext.SearchItem) {
      return useSonarrStore
        .getState()
        .sonarrCache?.[baseURL].seriesCache.find(
          (series) => series.id === Number(params.itemId)
        );
    }
  }, [params.itemId]);

  // const itemData = () => {
  //   if (params.context === SonarrDetailScreenContext.SearchItem) {
  //     return useSonarrStore
  //       .getState()
  //       .sonarrCache?.[baseURL].seriesCache.find(
  //         (series) => series.id === Number(params.itemId)
  //       );
  //   }
  // };

  const getComponentToRender = () => {
    if (itemData) {
      // console.log(itemData);
      return <SonarrSeriesDetail forwardedData={itemData as SeriesResource} />;
    }
  };

  return <>{itemData && <Suspense>{getComponentToRender()}</Suspense>}</>;
};

export default SonarrDetail;
