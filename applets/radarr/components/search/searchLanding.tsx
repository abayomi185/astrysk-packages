import React, { Suspense } from "react";
import { RefreshControl } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import {
  MovieResource,
  useGetApiV3Language,
  useGetApiV3Qualityprofile,
  useGetApiV3Movie,
  useGetApiV3MovieLookup,
} from "../../api";
import { H6, YStack, Text, XStack, Button, useTheme, getTokens } from "tamagui";
import { Image, ImageSource } from "expo-image";
import { FlashList } from "@shopify/flash-list";
import {
  RadarrDetailScreenContext,
  RadarrSearchFilterContext,
} from "../../types";
import { useRadarrStore } from "../../store";
import {
  filterRadarrSearchData,
  goToRadarrDetailScreen,
  goToRadarrModalScreen,
} from "../../utils";
import {
  getFlashListColumnsFromViewType,
  useGetListColumnNumber,
  useRefreshHandler,
  useQueryLoadingSpinner,
  useQueryEvents,
} from "@astrysk/utils";
import { radarrColors } from "../../colors";
import { ExtendedAppletColors, TabContext, ViewType } from "@astrysk/types";
import { useTranslation } from "react-i18next";
import { EmptyList } from "@astrysk/components";
import { Search } from "@tamagui/lucide-icons";
import { customTokens } from "@astrysk/styles";
import { Bookmark, CheckCircle2 } from "@tamagui/lucide-icons";

const RadarrSearchResultGridItem: React.FC<{
  searchContext: RadarrSearchFilterContext;
  index?: number;
  data: MovieResource;
  isSearching: boolean;
}> = ({ searchContext, data, isSearching }) => {
  const router = useRouter();
  const token = useRadarrStore.getState().token;
  const baseURL = useRadarrStore.getState().baseURL;

  return (
    <YStack
      height="auto"
      width="$11"
      padding="$2"
      pressStyle={{ scale: 0.97 }}
      animation="delay"
      onPress={() => {
        if (new Date(data.added as string).getTime() > 0) {
          goToRadarrDetailScreen({
            router,
            searchItemId: data.id as number,
            tabContext: TabContext.Search,
            screenContext: RadarrDetailScreenContext.SearchItem,
            searchContext,
          });
        } else {
          goToRadarrModalScreen({
            router,
            searchItemId: data.id as number,
            screenContext: RadarrDetailScreenContext.AddMovie,
            searchContext,
            imdbId: data.imdbId as string,
            tmdbId: data.tmdbId as number,
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
                ? `${baseURL}/api/v3/MediaCover/${data.id}/poster.jpg?apikey=${token}`
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

const RadarrSearchResultListItem: React.FC<{
  searchContext: RadarrSearchFilterContext;
  index?: number;
  data: MovieResource;
  isSearching: boolean;
}> = ({ searchContext, data, isSearching }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const token = useRadarrStore.getState().token;
  const baseURL = useRadarrStore.getState().baseURL;

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
          goToRadarrDetailScreen({
            router,
            searchItemId: data.id as number,
            tabContext: TabContext.Search,
            screenContext: RadarrDetailScreenContext.SearchItem,
            searchContext,
          });
        } else {
          goToRadarrModalScreen({
            router,
            searchItemId: data.id as number,
            screenContext: RadarrDetailScreenContext.AddMovie,
            searchContext,
            imdbId: data.imdbId as string,
            tmdbId: data.tmdbId as number,
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
                  ? `${baseURL}/api/v3/MediaCover/${data.id}/poster.jpg?apikey=${token}`
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
          <Text color="$color" marginTop="$2.5" opacity={0.6} numberOfLines={1}>
            {`${data.runtime} ${t("radarr:mins")}`}
          </Text>
          <Text color="$color" marginTop="$1.5" opacity={0.6} numberOfLines={1}>
            {data.studio}
          </Text>
          <XStack marginTop="$1.5" marginLeft="$-0.75" alignItems="center">
            <Bookmark
              size={16}
              color={data.monitored ? "$red8" : "$gray9"}
              fill={
                data.monitored
                  ? (radarrColors as ExtendedAppletColors)
                      .activeBookmarkFillColor
                  : "transparent"
              }
            />
            <CheckCircle2
              size={15}
              color={data.hasFile ? "$green8" : "$gray9"}
              fill={
                data.hasFile
                  ? (radarrColors as ExtendedAppletColors).activeCheckFillColor
                  : "transparent"
              }
            />
          </XStack>
        </YStack>
      </XStack>
    </Button>
  );
};

const RadarrSearchLanding: React.FC<{
  searchTerm: string;
}> = ({ searchTerm }) => {
  const { t } = useTranslation();

  const flashListColumns = useGetListColumnNumber(getTokens().size["$11"].val);

  const viewType = useRadarrStore((state) => state.viewType) ?? ViewType.Grid;

  const searchFilters = useRadarrStore((state) => state.searchFilters);

  const movieData = useGetApiV3Movie({});
  useQueryEvents(movieData, {
    onSuccess: (data) => {
      // console.log(JSON.stringify(data, null, 2));
      useRadarrStore.setState((state) => ({
        radarrMovieCache: {
          ...state.radarrMovieCache,
          ...data.reduce((acc: { [key: number]: MovieResource }, item) => {
            if (item.id) acc[item.id as number] = item;
            return acc;
          }, {}),
        },
      }));
    },
  });
  const qualityProfile = useGetApiV3Qualityprofile({
    query: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
    },
  });
  useQueryEvents(qualityProfile, {
    onSuccess: (data) => {
      useRadarrStore.setState({
        radarrQualityProfiles: data,
      });
    },
  });
  const languageProfile = useGetApiV3Language({
    query: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
    },
  });
  useQueryEvents(languageProfile, {
    onSuccess: (data) => {
      useRadarrStore.setState({
        radarrLanguageProfiles: data,
      });
    },
  });

  const searchResults = useGetApiV3MovieLookup(
    {
      term: searchTerm,
    },
    {
      query: {
        select: (data: unknown) => data as MovieResource[],
        enabled: !!searchTerm,
      },
    }
  );

  const { isRefetching, refetch } = useRefreshHandler(movieData.refetch);

  const [searchAll, setSearchAll] = React.useState(false);

  React.useEffect(() => {
    if (searchTerm === "" || searchTerm === undefined) {
      setSearchAll(false);
    }
  }, [searchTerm]);

  const getMovies = React.useCallback(() => {
    // Copying the array is necessary to avoid mutating the original data
    // Allowing for the movies to be restored when the search term is cleared
    // Or when data is refetched and only modifies nested properties
    const initialMovieData = [...((movieData.data as MovieResource[]) ?? [])];
    let movieDataToReturn = initialMovieData;

    if (searchTerm && initialMovieData.length > 0) {
      const filteredMovies = initialMovieData.filter((data) =>
        data.title?.includes(searchTerm)
      );
      if (filteredMovies.length > 0 && !searchAll) {
        movieDataToReturn = filteredMovies;
      } else {
        movieDataToReturn = (searchResults.data || []).sort((a, b) => {
          // Check if 'a' should be prioritized if it has an 'added' date
          if (new Date(a.added as string).getTime() > 0) return -1;
          // Check if 'b' should be prioritized
          if (new Date(b.added as string).getTime() > 0) return 1;
          // If neither 'a' nor 'b' should be prioritized, don't change order
          return 0;
        });
      }
    }
    movieDataToReturn = filterRadarrSearchData<MovieResource>(
      movieDataToReturn,
      searchFilters?.[RadarrSearchFilterContext.Search]
    );

    return movieDataToReturn;
  }, [
    movieData.data,
    searchResults.data,
    searchTerm,
    searchFilters,
    searchAll,
  ]);

  useFocusEffect(
    React.useCallback(() => {
      movieData.refetch();
      searchTerm && searchResults.refetch();
      return () => {};
    }, [])
  );

  useQueryLoadingSpinner(movieData);

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
          data={getMovies()}
          renderItem={({ item, index }) => {
            if (viewType === ViewType.Grid) {
              return (
                <RadarrSearchResultGridItem
                  searchContext={RadarrSearchFilterContext.Search}
                  index={index}
                  data={item}
                  isSearching={!!searchTerm}
                />
              );
            } else {
              return (
                <RadarrSearchResultListItem
                  searchContext={RadarrSearchFilterContext.Search}
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
              tintColor={radarrColors.primary}
            />
          }
          ListEmptyComponent={
            <EmptyList
              queryStatus={
                movieData.status === "pending" ||
                searchResults.status === "pending"
                  ? "pending"
                  : "success" // Success does not do anything in EmptyList
              }
              text={t("radarr:noDataFound")}
              accentColor={radarrColors.accentColor}
            />
          }
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
                    <Search size={32} color={radarrColors.accentColor} />
                  </YStack>
                  <YStack
                    paddingHorizontal="$1"
                    paddingTop="$1"
                    alignItems="center"
                  >
                    <H6 color="$color" ellipsizeMode="tail" numberOfLines={2}>
                      {t("radarr:searchAll")}
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

export default RadarrSearchLanding;
