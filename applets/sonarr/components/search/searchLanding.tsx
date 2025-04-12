import React, { Suspense } from "react";
import { RefreshControl } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import {
  SeriesResource,
  useGetApiV3Languageprofile,
  useGetApiV3Qualityprofile,
  useGetApiV3Series,
  useGetApiV3SeriesLookup,
} from "../../api";
import { H6, YStack, Text, XStack, Button, getTokens } from "tamagui";
import { Image, ImageSource } from "expo-image";
import { FlashList } from "@shopify/flash-list";
import {
  SonarrDetailScreenContext,
  SonarrSearchFilterContext,
} from "../../types";
import { useSonarrStore } from "../../store";
import {
  filterSonarrSearchData,
  getSonarrImageURLForId,
  goToSonarrDetailScreen,
  goToSonarrModalScreen,
} from "../../utils";
import {
  getFlashListColumnsFromViewType,
  setLoadingSpinner,
  useGetListColumnNumber,
  useLoadingSpinner,
  useQueryEvents,
  useRefreshHandler,
} from "@astrysk/utils";
import { Actions } from "@astrysk/constants";
import { sonarrColors } from "../../colors";
import { ExtendedAppletColors, TabContext, ViewType } from "@astrysk/types";
import { useTranslation } from "react-i18next";
import { EmptyList } from "@astrysk/components";
import { Search } from "@tamagui/lucide-icons";
import { customTokens } from "@astrysk/styles";
import { Bookmark, CheckCircle2 } from "@tamagui/lucide-icons";

const SonarrSearchResultGridItem: React.FC<{
  searchContext: SonarrSearchFilterContext;
  index?: number;
  data: SeriesResource;
  isSearching: boolean;
}> = ({ searchContext, data, isSearching }) => {
  const router = useRouter();
  const token = useSonarrStore.getState().token;
  const baseURL = useSonarrStore.getState().baseURL;

  return (
    <YStack
      height="auto"
      width="$11"
      padding="$2"
      pressStyle={{ scale: 0.97 }}
      animation="delay"
      onPress={() => {
        if (new Date(data.added as string).getTime() > 0) {
          goToSonarrDetailScreen({
            router,
            searchItemId: data.id as number,
            tabContext: TabContext.Search,
            screenContext: SonarrDetailScreenContext.SearchItem,
            searchContext,
          });
        } else {
          // TODO: Go to modal screen to add series
          goToSonarrModalScreen({
            router,
            searchItemId: data.id as number,
            screenContext: SonarrDetailScreenContext.AddSeries,
            searchContext,
            tvdbId: data.tvdbId as number,
          });
        }
      }}
    >
      <YStack height="$13" borderRadius="$6" backgroundColor="$gray6">
        <Image
          style={{ flex: 1, overflow: "hidden", borderRadius: 15 }}
          source={
            {
              uri: data.id
                ? getSonarrImageURLForId(data.id)
                : data.remotePoster,
            } as ImageSource
          }
          transition={200}
          recyclingKey={`${data.id}`}
        />
      </YStack>
      <YStack paddingHorizontal="$1" paddingTop="$1">
        <H6 color="$color" ellipsizeMode="tail" numberOfLines={2}>
          {data.title}
        </H6>
        <XStack alignItems="center">
          <Text color="$color" opacity={0.6} numberOfLines={1}>
            {data.year}
          </Text>
          {new Date(data.added as string).getTime() > 0 && isSearching && (
            <Text
              color="$green9"
              fontSize={22}
              lineHeight={22}
              marginLeft="$1"
              opacity={0.9}
            >
              {"•"}
            </Text>
          )}
        </XStack>
      </YStack>
    </YStack>
  );
};

const SonarrSearchResultListItem: React.FC<{
  searchContext: SonarrSearchFilterContext;
  index?: number;
  data: SeriesResource;
  isSearching: boolean;
}> = ({ searchContext, data, isSearching }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const token = useSonarrStore.getState().token;
  const baseURL = useSonarrStore.getState().baseURL;

  return (
    <Button
      flex={1}
      height="auto"
      padding="$2"
      animation="delay"
      marginBottom="$2"
      borderRadius="$6"
      backgroundColor="$gray1"
      onPress={() => {
        if (new Date(data.added as string).getTime() > 0) {
          goToSonarrDetailScreen({
            router,
            searchItemId: data.id as number,
            tabContext: TabContext.Search,
            screenContext: SonarrDetailScreenContext.SearchItem,
            searchContext,
          });
        } else {
          // TODO: Go to modal screen to add series
          goToSonarrModalScreen({
            router,
            searchItemId: data.id as number,
            screenContext: SonarrDetailScreenContext.AddSeries,
            searchContext,
            tvdbId: data.tvdbId as number,
          });
        }
      }}
    >
      <XStack>
        <YStack
          height="$11"
          width="$8"
          borderRadius="$5"
          backgroundColor="$gray6"
        >
          <Image
            style={{ flex: 1, overflow: "hidden", borderRadius: 10 }}
            source={
              {
                uri: data.id
                  ? `${baseURL}/MediaCover/${data.id}/poster.jpg?apikey=${token}`
                  : data.remotePoster,
              } as ImageSource
            }
            transition={200}
            recyclingKey={`${data.id}`}
          />
        </YStack>
        <YStack flex={1} marginLeft="$2.5" paddingHorizontal="$1">
          <H6 color="$color" ellipsizeMode="tail" numberOfLines={2}>
            {data.title}
          </H6>
          <Text color="$color" opacity={0.6} numberOfLines={1}>
            {data.year}
          </Text>
          <Text color="$color" marginTop="$1.5" opacity={0.6} numberOfLines={1}>
            {t(`sonarr:${data?.seriesType}`) + " • " + data.network}
          </Text>
          <XStack marginTop="$1.5" marginLeft="$-0.75" alignItems="center">
            <Bookmark
              size={16}
              color={data.monitored ? "$red8" : "$gray9"}
              fill={
                data.monitored
                  ? (sonarrColors as ExtendedAppletColors)
                      .activeBookmarkFillColor
                  : "transparent"
              }
            />
          </XStack>
        </YStack>
      </XStack>
    </Button>
  );
};

const SonarrSearchLanding: React.FC<{
  searchTerm: string;
}> = ({ searchTerm }) => {
  const { t } = useTranslation();

  const flashListColumns = useGetListColumnNumber(getTokens().size["$11"].val);

  const viewType = useSonarrStore((state) => state.viewType) ?? ViewType.Grid;

  const searchFilters = useSonarrStore((state) => state.searchFilters);

  const seriesData = useGetApiV3Series();
  useQueryEvents(seriesData, {
    onSuccess: (data) => {
      useSonarrStore.setState((state) => ({
        sonarrSeriesCache: {
          ...state.sonarrSeriesCache,
          ...data.reduce((acc: { [key: number]: SeriesResource }, item) => {
            if (item.id) acc[item.id as number] = item;
            return acc;
          }, {}),
        },
      }));
      setLoadingSpinner(SonarrSearchLanding.name, Actions.DONE);
    },
  });
  const qualityProfiles = useGetApiV3Qualityprofile({
    query: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
    },
  });
  useQueryEvents(qualityProfiles, {
    onSuccess: (data) => {
      useSonarrStore.setState({
        sonarrQualityProfiles: data,
      });
    },
  });
  const languageProfiles = useGetApiV3Languageprofile({
    query: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
    },
  });
  useQueryEvents(languageProfiles, {
    onSuccess: (data) => {
      useSonarrStore.setState({
        sonarrLanguageProfiles: data,
      });
    },
  });

  const searchResults = useGetApiV3SeriesLookup(
    {
      term: searchTerm,
    },
    {
      query: {
        select: (data: unknown) => data as SeriesResource[],
        enabled: !!searchTerm,
      },
    }
  );

  const { isRefetching, refetch } = useRefreshHandler(seriesData.refetch);

  const [searchAll, setSearchAll] = React.useState(false);

  React.useEffect(() => {
    if (searchTerm === "" || searchTerm === undefined) {
      setSearchAll(false);
    }
  }, [searchTerm]);

  const getSeries = React.useCallback(() => {
    const initialSeriesData = [
      ...((seriesData.data as SeriesResource[]) ?? []),
    ];
    let seriesDataToReturn = initialSeriesData;

    if (searchTerm && initialSeriesData.length > 0) {
      const filteredSeries = initialSeriesData.filter((data) =>
        data.title?.includes(searchTerm)
      );
      if (filteredSeries.length > 0 && !searchAll) {
        seriesDataToReturn = filteredSeries;
      } else {
        seriesDataToReturn = (searchResults.data ?? []).sort((a, b) => {
          // Check if 'a' should be prioritized
          if (new Date(a.added as string).getTime() > 0) return -1;
          // Check if 'b' should be prioritized
          if (new Date(b.added as string).getTime() > 0) return 1;
          // If neither 'a' nor 'b' should be prioritized, don't change order
          return 0;
        });
      }
    }
    seriesDataToReturn = filterSonarrSearchData<SeriesResource>(
      seriesDataToReturn,
      searchFilters?.[SonarrSearchFilterContext.Search]
    );

    return seriesDataToReturn;
  }, [
    seriesData.data,
    searchResults.data,
    searchTerm,
    searchFilters,
    searchAll,
  ]);

  useFocusEffect(
    React.useCallback(() => {
      seriesData.refetch();
      searchTerm && searchResults.refetch();
      return () => {};
    }, [])
  );

  useLoadingSpinner(SonarrSearchLanding.name);

  return (
    <Suspense>
      <YStack flex={1} height="100%" width="100%" paddingTop="$2">
        <FlashList
          contentContainerStyle={{
            paddingHorizontal: 7,
          }}
          horizontal={false}
          numColumns={getFlashListColumnsFromViewType(
            viewType,
            flashListColumns
          )}
          data={getSeries()}
          renderItem={({ item, index }) => {
            if (viewType === ViewType.Grid) {
              return (
                <SonarrSearchResultGridItem
                  searchContext={SonarrSearchFilterContext.Search}
                  index={index}
                  data={item}
                  isSearching={!!searchTerm}
                />
              );
            } else {
              return (
                <SonarrSearchResultListItem
                  searchContext={SonarrSearchFilterContext.Search}
                  index={index}
                  data={item}
                  isSearching={!!searchTerm}
                />
              );
            }
          }}
          estimatedItemSize={208}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor={sonarrColors.primary}
            />
          }
          ListEmptyComponent={() => (
            <EmptyList
              queryStatus={
                seriesData.status === "pending" ||
                searchResults.status === "pending"
                  ? "pending"
                  : "success" // Success does not do anything in EmptyList
              }
              text={t("sonarr:noDataFound")}
              accentColor={sonarrColors.accentColor}
            />
          )}
          ListFooterComponent={
            <>
              {!searchAll && searchTerm && (
                <YStack
                  height="$18"
                  width="$11"
                  padding="$2"
                  pressStyle={{ scale: 0.97 }}
                  animation="delay"
                  onPress={() => {
                    setSearchAll(true);
                  }}
                >
                  <YStack
                    height="$13"
                    borderRadius="$6"
                    backgroundColor="$gray6"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Search size={32} color={sonarrColors.accentColor} />
                  </YStack>
                  <YStack
                    paddingHorizontal="$1"
                    paddingTop="$1"
                    alignItems="center"
                  >
                    <H6 color="$color" ellipsizeMode="tail" numberOfLines={2}>
                      {t("sonarr:searchAll")}
                    </H6>
                  </YStack>
                </YStack>
              )}
            </>
          }
        />
      </YStack>
    </Suspense>
  );
};

export default SonarrSearchLanding;
