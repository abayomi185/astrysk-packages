import React, { Suspense } from "react";
import { useSearchParams } from "expo-router";

import { useSonarrStore } from "../store";
import { SonarrDetailScreenContext, SonarrDetailScreenProps } from "../types";
import SonarrSeriesDetail from "../components/detail/seriesDetail";
import { SeriesResource } from "../api";
import SonarrAllSeasonsDetail from "../components/detail/allSeasonsDetail";

const SonarrDetail: React.FC = () => {
  const params = useSearchParams() as SonarrDetailScreenProps;
  const refParams = React.useRef(params);

  const baseURL = useSonarrStore.getState().baseURL as string;

  const itemData = React.useMemo(() => {
    if (refParams.current.context === SonarrDetailScreenContext.SearchItem) {
      return {
        ...useSonarrStore.getState().sonarrCache?.[baseURL]?.[
          refParams.current.itemId as number
        ],
        sonarrContext: params.context,
      };
    }
    if (refParams.current.context === SonarrDetailScreenContext.AllSeasons) {
      return {
        ...useSonarrStore.getState().sonarrCache?.[baseURL]?.[
          refParams.current.itemId as number
        ],
        sonarrContext: params.context,
      };
    }
  }, [refParams.current.itemId]);

  const getComponentToRender = () => {
    if (itemData?.sonarrContext === SonarrDetailScreenContext.SearchItem) {
      return <SonarrSeriesDetail forwardedData={itemData as SeriesResource} />;
    } else if (
      itemData?.sonarrContext === SonarrDetailScreenContext.AllSeasons
    ) {
      return (
        <SonarrAllSeasonsDetail forwardedData={itemData as SeriesResource} />
      );
    }
  };

  return <>{itemData && <Suspense>{getComponentToRender()}</Suspense>}</>;
};

export default SonarrDetail;
