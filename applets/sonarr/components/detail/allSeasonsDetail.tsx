import React from "react";
import { RefreshControl } from "react-native";
import { useNavigation, useRouter, useFocusEffect } from "expo-router";
import { XStack, YStack, Text, H3, Button } from "tamagui";
import {
  EpisodeResource,
  SeriesResource,
  useGetApiV3Episode,
  useGetApiV3SeriesId,
} from "../../api";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import { useSonarrDetailHeader } from "../useHeader";
import { getSizeOnDisk, goToSonarrDetailScreen } from "../../utils";
import { SonarrActionPanel } from "./actionPanel";
import { TabContext } from "@astrysk/types";
import { SonarrDetailScreenContext } from "../../types";
import { sonarrColors } from "../../colors";
import { useSonarrStore } from "../../store";

const SonarrAllSeasonsDetail: React.FC<{
  forwardedData: SeriesResource;
  tabContext: TabContext;
}> = ({ forwardedData, tabContext }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const router = useRouter();

  const seriesData = useGetApiV3SeriesId(forwardedData.id as number, {
    query: {
      initialData: () => forwardedData,
      onSuccess: (seriesData) => {
        useSonarrStore.setState((state) => ({
          sonarrSeriesCache: {
            ...state.sonarrSeriesCache,
            [forwardedData.id as number]: {
              ...state.sonarrSeriesCache?.[forwardedData.id as number],
              seasons: seriesData.seasons,
            },
          },
        }));
      },
    },
  });

  useGetApiV3Episode(
    {
      seriesId: forwardedData.id,
    },
    {
      query: {
        onSuccess: (data) => {
          useSonarrStore.setState((state) => ({
            sonarrEpisodeCache: {
              ...state.sonarrEpisodeCache,
              [forwardedData.id as number]: {
                ...state.sonarrEpisodeCache?.[forwardedData.id as number],
                ...data.reduce(
                  (acc: { [key: number]: EpisodeResource }, item) => {
                    if (item.id) acc[item.id as number] = item;
                    return acc;
                  },
                  {}
                ),
              },
            },
          }));
        },
      },
    }
  );

  const refetchSeasons = () => {
    seriesData.refetch();
  };

  useFocusEffect(
    React.useCallback(() => {
      refetchSeasons();
      return () => {};
    }, [])
  );

  useSonarrDetailHeader(
    navigation,
    `${t("sonarr:allSeasons")} - ${forwardedData.title}`
  );

  return (
    <YStack flex={1}>
      <FlashList
        data={(seriesData.data?.seasons as SeriesResource["seasons"])?.sort(
          (a, b) => (b.seasonNumber as number) - (a.seasonNumber as number)
        )}
        extraData={new Date()} // Temporary - for testing
        renderItem={({ item }) => (
          <Button
            height="$11.5"
            marginHorizontal="$3"
            paddingVertical="$2.5"
            paddingHorizontal="$3.5"
            marginTop="$2"
            backgroundColor="$gray1"
            borderRadius="$5"
            onPress={() => {
              goToSonarrDetailScreen({
                router,
                searchItemId: forwardedData.id as number,
                screenContext: SonarrDetailScreenContext.EpisodesList,
                seasonNumber: item.seasonNumber as number,
                tabContext,
              });
            }}
          >
            <YStack flex={1}>
              {item.seasonNumber === 0 ? (
                <H3>{`${t("sonarr:specials")}`}</H3>
              ) : (
                <H3>{`${t("sonarr:season")} ${
                  item.seasonNumber as number
                }`}</H3>
              )}
              <Text color="$gray11" marginTop="$1">{`${getSizeOnDisk(
                item.statistics?.sizeOnDisk as number
              )} ${t("sonarr:gb")}`}</Text>
              <Text
                color={
                  item.statistics?.percentOfEpisodes === 100
                    ? "$green9"
                    : item.statistics?.percentOfEpisodes === 0
                    ? "$red9"
                    : "$gray11"
                }
                marginTop="$1"
              >
                {`${
                  item.statistics?.percentOfEpisodes &&
                  item.statistics.percentOfEpisodes % 1 !== 0
                    ? item.statistics.percentOfEpisodes.toFixed(2)
                    : Math.floor(item.statistics?.percentOfEpisodes as number)
                }${t("sonarr:percent")} - ${
                  item.statistics?.episodeFileCount
                }/${item.statistics?.episodeCount} ${t("sonarr:episodes")}`}
              </Text>
              <XStack flex={1} marginTop="$2.5" justifyContent="center">
                <SonarrActionPanel
                  data={forwardedData}
                  seasonNumber={item.seasonNumber as number}
                  refetchSeasons={refetchSeasons}
                />
              </XStack>
            </YStack>
          </Button>
        )}
        estimatedItemSize={136}
        ListFooterComponent={<XStack height="$0.75" />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={refetchSeasons}
            tintColor={sonarrColors.accentColor}
          />
        }
      />
    </YStack>
  );
};

export default SonarrAllSeasonsDetail;
