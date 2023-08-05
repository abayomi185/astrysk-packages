import React from "react";
import { useNavigation } from "expo-router";
import { SeriesResource } from "../../api";
import { XStack, YStack } from "tamagui";
import { useSonarrStore } from "../../store";
import { useSonarrDetailHeader } from "../useHeader";
import { useTranslation } from "react-i18next";
import { FlashList } from "@shopify/flash-list";
import { SettingsOption } from "@astrysk/components";
import { SettingsOptionProps } from "@astrysk/types";
import { TFunction } from "i18next";
import SonarrSeriesDetailHeader from "./seriesDetailHeader";

const getSonarrSeriesDetailOptions = (
  t: TFunction,
  seriesData: SeriesResource
): SettingsOptionProps[] => {
  return [
    {
      key: "sonarr:monitoring",
      type: "label",
      value: seriesData.monitored ? `${t("common:yes")}` : `${t("common:no")}`,
      firstItem: true,
    },
    {
      key: "sonarr:seriesType",
      type: "label",
      value: seriesData.seriesType,
    },
    {
      key: "common:path",
      type: "label",
      value: seriesData.path as string,
    },
    {
      key: "common:quality",
      type: "label",
      value: useSonarrStore
        .getState()
        ?.sonarrQualityProfiles?.find(
          (profile) => profile.id === seriesData.qualityProfileId
        )?.name as string,
    },
    // {
    //   key: "common:language",
    //   type: "label",
    //   value: useSonarrStore
    //     .getState()
    //     ?.sonarrLanguageProfiles?.find(
    //       (profile) => profile.id === seriesData.languageProfileId
    //     )?.name as string,
    // },
    {
      key: "common:status",
      type: "label",
      value: seriesData.status,
    },
    {
      key: "sonarr:nextAiring",
      type: "label",
      value: seriesData.nextAiring?.toLocaleString() ?? `${t("sonarr:na")}`,
    },
    {
      key: "common:year",
      type: "label",
      value: `${seriesData.year}`,
    },
    {
      key: "sonarr:network",
      type: "label",
      value: seriesData.network as string,
    },
    {
      key: "sonarr:runtime",
      type: "label",
      value: `${seriesData.runtime}`,
    },
    {
      key: "sonarr:rating",
      type: "label",
      value: `${seriesData.certification}`,
    },
    {
      key: "sonarr:genres",
      type: "label",
      value: seriesData.genres as string[],
    },
    {
      key: "sonarr:alternateTitles",
      type: "label",
      value: seriesData.alternateTitles?.map(
        (alternateTitle) => alternateTitle.title
      ) as string[],
      lastItem: true,
    },
  ];
};

export const SonarrSeriesDetail: React.FC<{
  forwardedData: SeriesResource;
}> = ({ forwardedData }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  useSonarrDetailHeader(navigation, forwardedData.title as string);

  // React.useEffect(() => {
  //   console.log(JSON.stringify(forwardedData, null, 2));
  // }, []);

  return (
    <YStack flex={1}>
      <FlashList
        data={getSonarrSeriesDetailOptions(t, forwardedData)}
        renderItem={({ item }) => {
          return (
            <SettingsOption
              t={t}
              item={item}
              alignCenter
              style={{
                marginHorizontal: "$3",
                overflow: "hidden",
              }}
            />
          );
        }}
        estimatedItemSize={76}
        ListHeaderComponent={
          <SonarrSeriesDetailHeader forwardedData={forwardedData} />
        }
        ListFooterComponent={() => <XStack height="$5"></XStack>}
      />
    </YStack>
  );
};

export default SonarrSeriesDetail;
