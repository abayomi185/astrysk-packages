import React from "react";
import { RefreshControl } from "react-native";
import { getLocales } from "expo-localization";
import { useNavigation, useFocusEffect } from "expo-router";
import {
  SeriesResource,
  useGetApiV3Qualityprofile,
  useGetApiV3SeriesId,
} from "../../api";
import { XStack, YStack } from "tamagui";
import { useSonarrStore } from "../../store";
import { useSonarrDetailHeader } from "../useHeader";
import { useTranslation } from "react-i18next";
import { FlashList } from "@shopify/flash-list";
import { SettingsOption } from "@astrysk/components";
import { SettingsOptionProps, TabContext } from "@astrysk/types";
import { TFunction } from "i18next";
import SonarrSeriesDetailHeader from "./seriesDetailHeader";
import { sonarrColors } from "../../colors";
import { useQueryEvents } from "@astrysk/utils";

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
      value: t(`sonarr:${seriesData?.seriesType}`) as string,
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
      value: t(`sonarr:${seriesData?.status}`) as string,
    },
    {
      key: "sonarr:nextAiring",
      type: "label",
      value: seriesData?.nextAiring
        ? new Date(seriesData.nextAiring as string).toLocaleString(
            getLocales()[0].languageCode ?? "en-US",
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
      value: `${seriesData?.year}`,
    },
    {
      key: "sonarr:network",
      type: "label",
      value: seriesData?.network as string,
    },
    {
      key: "sonarr:runtime",
      type: "label",
      value: `${seriesData?.runtime} ${t("sonarr:mins")}`,
    },
    {
      key: "sonarr:rating",
      type: "label",
      value: seriesData?.certification
        ? `${seriesData?.certification}`
        : `${t("sonarr:na")}`,
    },
    {
      key: "sonarr:genres",
      type: "label",
      value: seriesData?.genres as string[],
    },
    {
      key: "sonarr:alternateTitles",
      type: "label",
      value:
        seriesData?.alternateTitles && seriesData?.alternateTitles?.length > 0
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

  const seriesData = useGetApiV3SeriesId(forwardedData.id as number, {
    query: {
      initialData: () => forwardedData,
    },
  });
  useQueryEvents(seriesData, {
    onSuccess: (seriesData) => {
      useSonarrStore.setState((state) => ({
        sonarrSeriesCache: {
          ...state.sonarrSeriesCache,
          [forwardedData.id as number]: seriesData,
        },
      }));
    },
  });

  const refetchSeries = () => {
    seriesData.refetch();
  };

  useFocusEffect(
    React.useCallback(() => {
      // Could check if data isStale first
      refetchSeries();
      return () => {};
    }, [])
  );

  useSonarrDetailHeader(navigation, forwardedData.title as string);

  return (
    <YStack flex={1}>
      <FlashList
        data={getSonarrSeriesDetailOptions(
          t,
          seriesData.data as SeriesResource,
          monitoredStatus
        )}
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
            forwardedData={seriesData.data as SeriesResource}
            tabContext={tabContext}
          />
        }
        ListFooterComponent={() => <XStack height="$5"></XStack>}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={refetchSeries}
            tintColor={sonarrColors.accentColor}
          />
        }
      />
    </YStack>
  );
};

export default SonarrSeriesDetail;
