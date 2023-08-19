import React, { Suspense } from "react";
import { useSearchParams } from "expo-router";

import { useRadarrStore } from "../store";
import {
  ExtendedMovieResource,
  RadarrDetailScreenContext,
  RadarrDetailScreenProps,
} from "../types";
import RadarrMovieDetail from "../components/detail/movieDetail";
import { MovieResource } from "../api";
import { TabContext } from "@astrysk/types";

const RadarrDetail: React.FC = () => {
  const params = useSearchParams() as RadarrDetailScreenProps;
  const refParams = React.useRef(params);

  const itemData = React.useMemo(() => {
    const dataToForward: ExtendedMovieResource = {
      ...useRadarrStore.getState().radarrMovieCache?.[
        refParams.current.itemId as number
      ],
      radarrContext: params.context,
      radarrTabContext: params.tabContext,
    };

    // if (refParams.current.context === RadarrDetailScreenContext.EpisodesList) {
    //   return {
    //     ...dataToForward,
    //     sonarrSeasonNumber: params.seasonNumber,
    //   } as ExtendedMovieResource;
    // }
    return dataToForward;
  }, [refParams.current.itemId]);

  const getComponentToRender = () => {
    if (itemData?.radarrContext === RadarrDetailScreenContext.SearchItem) {
      return (
        <RadarrMovieDetail
          forwardedData={itemData as MovieResource}
          tabContext={itemData.radarrTabContext as TabContext}
        />
      );
    }
  };

  return <>{itemData && <Suspense>{getComponentToRender()}</Suspense>}</>;
};

export default RadarrDetail;
