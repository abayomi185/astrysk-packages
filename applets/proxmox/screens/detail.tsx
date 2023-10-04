import React, { Suspense } from "react";
import { useSearchParams } from "expo-router";

import { useProxmoxStore } from "../store";
import { SeriesResource } from "../api";
import { TabContext } from "@astrysk/types";
import { ProxmoxDetailScreenContext, ProxmoxDetailScreenProps } from "../types";

const SonarrDetail: React.FC = () => {
  const params = useSearchParams() as ProxmoxDetailScreenProps;
  const refParams = React.useRef(params);

  const itemData = React.useMemo(() => {
    const dataToForward: ExtendedSeriesResource = {
      ...useSonarrStore.getState().sonarrSeriesCache?.[
        refParams.current.itemId as number
      ],
      sonarrContext: params.context,
      sonarrTabContext: params.tabContext,
    };

    if (refParams.current.context === ProxmoxDetailScreenContext.EpisodesList) {
      return {
        ...dataToForward,
        sonarrSeasonNumber: params.seasonNumber,
      } as ExtendedSeriesResource;
    }
    return dataToForward;
  }, [refParams.current.itemId]);

  const getComponentToRender = () => {
    if (itemData?.sonarrContext === ProxmoxDetailScreenContext.SearchItem) {
      return (
        <ProxmoxSeriesDetail
          forwardedData={itemData as SeriesResource}
          tabContext={itemData.sonarrTabContext as TabContext}
        />
      );
    }
  };

  return <>{itemData && <Suspense>{getComponentToRender()}</Suspense>}</>;
};

export default SonarrDetail;
