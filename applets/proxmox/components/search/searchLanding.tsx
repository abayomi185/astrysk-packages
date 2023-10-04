import React, { Suspense } from "react";
import { RefreshControl } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { H6, YStack, Text, XStack, Button } from "tamagui";
import { Image, ImageSource } from "expo-image";
import { FlashList } from "@shopify/flash-list";
import {
  ProxmoxDetailScreenContext,
  ProxmoxSearchFilterContext,
} from "../../types";
import { useProxmoxStore } from "../../store";
import { filterProxmoxSearchData, goToProxmoxDetailScreen } from "../../utils";
import {
  getFlashListColumnsFromViewType,
  setLoadingSpinner,
  useGetListColumnNumber,
  useLoadingSpinner,
  useRefreshHandler,
} from "@astrysk/utils";
import { Actions } from "@astrysk/constants";
import { proxmoxColors } from "../../colors";
import { TabContext, ViewType } from "@astrysk/types";
import { useTranslation } from "react-i18next";
import { EmptyList } from "@astrysk/components";
import { Search } from "@tamagui/lucide-icons";
import { customTokens } from "@astrysk/styles";
import { Bookmark, CheckCircle2 } from "@tamagui/lucide-icons";

const ProxmoxSearchResultGridItem: React.FC<{
  searchContext: ProxmoxSearchFilterContext;
  index?: number;
  data: SeriesResource;
  isSearching: boolean;
}> = ({ searchContext, data, isSearching }) => {
  const router = useRouter();
  const token = useProxmoxStore.getState().token;
  const baseURL = useProxmoxStore.getState().baseURL;

  return (
    <YStack
      height="auto"
      width="$11"
      padding="$2"
      pressStyle={{ scale: 0.97 }}
      animation="delay"
      onPress={() => {
        if (new Date(data.added as string).getTime() > 0) {
          goToProxmoxDetailScreen({
            router,
            searchItemId: data.id as number,
            tabContext: TabContext.Search,
            screenContext: ProxmoxDetailScreenContext.SearchItem,
            searchContext,
          });
        } else {
          // TODO: Go to modal screen to add series
          goToProxmoxModalScreen({
            router,
            searchItemId: data.id as number,
            screenContext: ProxmoxDetailScreenContext.AddSeries,
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
                ? `${baseURL}/api/MediaCover/${data.id}/poster.jpg?apikey=${token}`
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

const ProxmoxSearchResultListItem: React.FC<{
  searchContext: ProxmoxSearchFilterContext;
  index?: number;
  data: SeriesResource;
  isSearching: boolean;
}> = ({ searchContext, data, isSearching }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const token = useProxmoxStore.getState().token;
  const baseURL = useProxmoxStore.getState().baseURL;

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
          goToProxmoxDetailScreen({
            router,
            searchItemId: data.id as number,
            tabContext: TabContext.Search,
            screenContext: ProxmoxDetailScreenContext.SearchItem,
            searchContext,
          });
        } else {
          // TODO: Go to modal screen to add series
          goToProxmoxModalScreen({
            router,
            searchItemId: data.id as number,
            screenContext: ProxmoxDetailScreenContext.AddSeries,
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
                  ? `${baseURL}/api/MediaCover/${data.id}/poster.jpg?apikey=${token}`
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
                  ? proxmoxColors.activeBookmarkFillColor
                  : "transparent"
              }
            />
          </XStack>
        </YStack>
      </XStack>
    </Button>
  );
};

const ProxmoxSearchLanding: React.FC<{
  searchTerm: string;
}> = ({ searchTerm }) => {
  const { t } = useTranslation();

  const flashListColumns = useGetListColumnNumber(customTokens.size[11].val);

  const viewType = useProxmoxStore((state) => state.viewType) ?? ViewType.Grid;

  const searchFilters = useProxmoxStore((state) => state.searchFilters);

  const seriesData = useGetApiV3Series(
    {},
    {
      query: {
        onSuccess: (data) => {
          useProxmoxStore.setState((state) => ({
            sonarrSeriesCache: {
              ...state.sonarrSeriesCache,
              ...data.reduce((acc: { [key: number]: SeriesResource }, item) => {
                if (item.id) acc[item.id as number] = item;
                return acc;
              }, {}),
            },
          }));
          setLoadingSpinner(ProxmoxSearchLanding.name, Actions.DONE);
        },
      },
    }
  );

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
    seriesDataToReturn = filterProxmoxSearchData<SeriesResource>(
      seriesDataToReturn,
      searchFilters?.[ProxmoxSearchFilterContext.Search]
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

  useLoadingSpinner(ProxmoxSearchLanding.name);

  return (
    <Suspense>
      <YStack flex={1} height="100%" width="100%" paddingTop="$2">
        <FlashList
          contentContainerStyle={{
            paddingHorizontal: "7",
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
                <ProxmoxSearchResultGridItem
                  searchContext={ProxmoxSearchFilterContext.Search}
                  index={index}
                  data={item}
                  isSearching={!!searchTerm}
                />
              );
            } else {
              return (
                <ProxmoxSearchResultListItem
                  searchContext={ProxmoxSearchFilterContext.Search}
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
              tintColor={proxmoxColors.primary}
            />
          }
          ListEmptyComponent={() => (
            <EmptyList
              queryStatus={
                seriesData.status === "loading" ||
                searchResults.status === "loading"
                  ? "loading"
                  : "success" // Success does not do anything in EmptyList
              }
              text={t("proxmox:noDataFound")}
              accentColor={proxmoxColors.accentColor}
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
                    <Search size={32} color={proxmoxColors.accentColor} />
                  </YStack>
                  <YStack
                    paddingHorizontal="$1"
                    paddingTop="$1"
                    alignItems="center"
                  >
                    <H6 color="$color" ellipsizeMode="tail" numberOfLines={2}>
                      {t("proxmox:searchAll")}
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

export default ProxmoxSearchLanding;
