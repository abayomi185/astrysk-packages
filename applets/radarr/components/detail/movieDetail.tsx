import React from "react";
import { RefreshControl } from "react-native";
import { useNavigation, useFocusEffect } from "expo-router";
import { MovieResource, useGetApiV3MovieId } from "../../api";
import { XStack, YStack } from "tamagui";
import { useRadarrStore } from "../../store";
import { useRadarrDetailHeader } from "../useHeader";
import { useTranslation } from "react-i18next";
import { FlashList } from "@shopify/flash-list";
import { SettingsOption } from "@astrysk/components";
import { SettingsOptionProps, TabContext } from "@astrysk/types";
import { TFunction } from "i18next";
import RadarrMovieDetailHeader from "./movieDetailHeader";
import { radarrColors } from "../../colors";
import { useQueryEvents, useQueryLoadingSpinner } from "@astrysk/utils";
import { useQueryClient } from "@tanstack/react-query";

const getRadarrSeriesDetailOptions = (
  t: TFunction,
  movieData: MovieResource,
  monitored: boolean
): SettingsOptionProps[] => {
  return [
    {
      key: "radarr:monitoring",
      type: "label",
      value: monitored ? `${t("common:yes")}` : `${t("common:no")}`,
      firstItem: true,
    },
    {
      key: "radarr:status",
      type: "label",
      value: t(`radarr:${movieData?.status}`) as string,
    },
    {
      key: "common:path",
      type: "label",
      value: movieData?.path as string,
    },
    {
      key: "common:quality",
      type: "label",
      value: useRadarrStore
        .getState()
        ?.radarrQualityProfiles?.find(
          (profile) => profile.id === movieData?.qualityProfileId
        )?.name as string,
    },
    {
      key: "common:language",
      type: "label",
      value: movieData?.originalLanguage?.name as string,
    },
    {
      key: "common:year",
      type: "label",
      value: `${movieData?.year}`,
    },
    {
      key: "radarr:studio",
      type: "label",
      value: movieData?.studio as string,
    },
    {
      key: "radarr:runtime",
      type: "label",
      value: `${movieData?.runtime} ${t("radarr:mins")}`,
    },
    {
      key: "radarr:rating",
      type: "label",
      value: movieData?.certification
        ? `${movieData?.certification}`
        : `${t("radarr:na")}`,
    },
    {
      key: "radarr:genres",
      type: "label",
      value: movieData?.genres as string[],
    },
    {
      key: "radarr:alternateTitles",
      type: "label",
      value:
        movieData?.alternateTitles && movieData?.alternateTitles?.length > 0
          ? (movieData.alternateTitles?.map(
              (alternateTitle) => alternateTitle.title
            ) as string[])
          : `${t("radarr:na")}`,
      lastItem: true,
    },
  ];
};

export const RadarrMovieDetail: React.FC<{
  forwardedData: MovieResource;
  tabContext: TabContext;
}> = ({ forwardedData, tabContext }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const monitoredStatus = useRadarrStore(
    (state) =>
      state.radarrMovieCache?.[forwardedData.id as number]?.monitored as boolean
  );

  const movieData = useGetApiV3MovieId(forwardedData.id as number, {
    query: {
      initialData: () => forwardedData,
    },
  });
  useQueryEvents(movieData, {
    onSuccess: (seriesData) => {
      useRadarrStore.setState((state) => ({
        radarrMovieCache: {
          ...state.radarrMovieCache,
          [forwardedData.id as number]: seriesData,
        },
      }));
    },
  });

  const refetchSeries = () => {
    movieData.refetch();
  };

  useFocusEffect(
    React.useCallback(() => {
      // Could check if data isStale first
      refetchSeries();
      return () => {};
    }, [])
  );

  useRadarrDetailHeader(navigation, forwardedData.title as string);

  useQueryLoadingSpinner(movieData);

  return (
    <YStack flex={1}>
      <FlashList
        data={getRadarrSeriesDetailOptions(
          t,
          movieData.data as MovieResource,
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
          <RadarrMovieDetailHeader
            forwardedData={movieData.data as MovieResource}
            tabContext={tabContext}
          />
        }
        ListFooterComponent={() => <XStack height="$5"></XStack>}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={refetchSeries}
            tintColor={radarrColors.accentColor}
          />
        }
      />
    </YStack>
  );
};

export default RadarrMovieDetail;
