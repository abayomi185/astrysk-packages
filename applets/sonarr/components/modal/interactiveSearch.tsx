import React from "react";
import { SeriesResource, useGetApiV3Release } from "../../api";
import { YStack } from "tamagui";

const SonarrInteractiveSearch: React.FC<{
  data: SeriesResource;
  seasonNumber?: number;
}> = ({ data, seasonNumber }) => {
  const releaseQuery = useGetApiV3Release(
    {
      seriesId: data.id,
      seasonNumber: seasonNumber,
    },
    {
      query: {
        onSuccess: (data) => {},
      },
    }
  );

  return <YStack></YStack>;
};

export default SonarrInteractiveSearch;
