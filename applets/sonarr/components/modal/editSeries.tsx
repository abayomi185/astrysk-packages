import React from "react";
import { SeriesResource } from "../../api";
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
  return <></>;
};

export default SonarrEditSeries;
