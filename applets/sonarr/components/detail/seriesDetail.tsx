import React from "react";
import { getLocales } from "expo-localization";
import { useNavigation, useSearchParams } from "expo-router";
import { SeriesResource } from "../../api";
import { XStack, YStack } from "tamagui";
import { useSonarrStore } from "../../store";
import { useSonarrDetailHeader } from "../useHeader";
import { useTranslation } from "react-i18next";
import { FlashList } from "@shopify/flash-list";
import { SettingsOption } from "@astrysk/components";
import { SettingsOptionProps, TabContext } from "@astrysk/types";
import { TFunction } from "i18next";
import SonarrSeriesDetailHeader from "./seriesDetailHeader";

const getSonarrSeriesDetailOptions = (
  t: TFunction,
  seriesData: SeriesResource,
  monitored: boolean
): SettingsOptionProps[] => {
  return [
    {
      key: "sonarr:monitoring",
      type: "label",
      value: monitored ? `${t("common:yes")}` : `${t("common:no")}`,
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
      value: seriesData.nextAiring
        ? new Date(seriesData.nextAiring as string).toLocaleString(
            getLocales()[0].languageCode,
            {
              dateStyle: "medium",
              timeStyle: "short",
            }
          )
        : `${t("sonarr:na")}`,
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
      value: `${seriesData.runtime} ${t("sonarr:mins")}`,
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
      value:
        seriesData.alternateTitles && seriesData.alternateTitles?.length > 0
          ? (seriesData.alternateTitles?.map(
              (alternateTitle) => alternateTitle.title
            ) as string[])
          : `${t("sonarr:na")}`,
      lastItem: true,
    },
  ];
};

export const SonarrSeriesDetail: React.FC<{
  forwardedData: SeriesResource;
  tabContext: TabContext;
}> = ({ forwardedData, tabContext }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const monitoredStatus = useSonarrStore(
    (state) =>
      state.sonarrSeriesCache?.[forwardedData.id as number]
        ?.monitored as boolean
  );

  useSonarrDetailHeader(navigation, forwardedData.title as string);

  return (
    <YStack flex={1}>
      <FlashList
        data={getSonarrSeriesDetailOptions(t, forwardedData, monitoredStatus)}
        extraData={monitoredStatus}
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
          <SonarrSeriesDetailHeader
            forwardedData={forwardedData}
            tabContext={tabContext}
          />
        }
        ListFooterComponent={() => <XStack height="$5"></XStack>}
      />
    </YStack>
  );
};

export default SonarrSeriesDetail;
