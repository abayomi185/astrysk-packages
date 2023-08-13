import React from "react";
import { SeriesResource, usePostApiV3Series } from "../../api";
import { useSonarrStore } from "../../store";
import { TFunction } from "i18next";
import { SettingsOptionProps } from "@astrysk/types";

const getSonarrEditDetailOptions = (
  t: TFunction,
  seriesData: SeriesResource
): SettingsOptionProps[] => {
  return [
    {
      key: "sonarr:monitoring",
      type: "label",
      value: "",
      firstItem: true,
    },
    {
      key: "sonarr:seriesType",
      type: "label",
      value: seriesData?.seriesType,
    },
    {
      key: "common:path",
      type: "label",
      value: seriesData?.path as string,
    },
    {
      key: "common:quality",
      type: "label",
      value: useSonarrStore
        .getState()
        ?.sonarrQualityProfiles?.find(
          (profile) => profile.id === seriesData?.qualityProfileId
        )?.name as string,
    },
  ];
};

const SonarrEditSeries: React.FC<{
  data: SeriesResource;
}> = () => {
  const series = usePostApiV3Series({
    mutation: {
      onSuccess: () => {},
    },
  });

  return <></>;
};

export default SonarrEditSeries;
