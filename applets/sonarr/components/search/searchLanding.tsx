import React, { Suspense } from "react";
import { RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import {
  SeriesResource,
  useGetApiV3Languageprofile,
  useGetApiV3Qualityprofile,
  useGetApiV3Series,
  useGetApiV3SeriesLookup,
} from "../../api";
import { H6, YStack, Text, XStack, Spinner, H4 } from "tamagui";
import { Image, ImageSource } from "expo-image";
import { FlashList } from "@shopify/flash-list";
import {
  SonarrDetailScreenContext,
  SonarrSearchFilterContext,
} from "../../types";
import { useSonarrStore } from "../../store";
import { goToSonarrDetailScreen } from "../../utils";
import {
  setLoadingSpinner,
  useLoadingSpinner,
  useRefreshHandler,
} from "@astrysk/utils";
import { Actions } from "@astrysk/constants";
import { sonarrColors } from "../../colors";
import { TabContext } from "@astrysk/types";
import { useTranslation } from "react-i18next";

const SonarrSearchResultItem: React.FC<{
  searchContext: SonarrSearchFilterContext;
  index: number;
  data: SeriesResource;
  isSearching: boolean;
}> = ({ searchContext, data, isSearching }) => {
  const router = useRouter();
  const token = useSonarrStore.getState().token;
  const baseURL = useSonarrStore.getState().baseURL;

  return (
    <YStack
      height="$18"
      width="$11"
      padding="$2"
      pressStyle={{ scale: 0.97 }}
      animation="delay"
      onPress={() =>
        goToSonarrDetailScreen({
          router,
          searchItemId: data.id as number,
          tabContext: TabContext.Search,
          screenContext: SonarrDetailScreenContext.SearchItem,
          searchContext,
        })
      }
    >
      <YStack height="$13" borderRadius="$6" backgroundColor="$gray6">
        <Image
          style={{ flex: 1, overflow: "hidden", borderRadius: 15 }}
          source={
            {
              uri: `${baseURL}/api/MediaCover/${data.id}/poster.jpg?apikey=${token}`,
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

const SonarrSearchLanding: React.FC<{
  searchTerm: string;
}> = ({ searchTerm }) => {
  const { t } = useTranslation();
  const seriesData = useGetApiV3Series(
    {},
    {
      query: {
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
      },
    }
  );
  useGetApiV3Qualityprofile({
    query: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      onSuccess: (data) => {
        useSonarrStore.setState({
          sonarrQualityProfiles: data,
        });
      },
      staleTime: Infinity,
    },
  });
  useGetApiV3Languageprofile({
    query: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      onSuccess: (data) => {
        useSonarrStore.setState({
          sonarrLanguageProfiles: data,
        });
      },
      staleTime: Infinity,
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

  const getSeries = React.useCallback(() => {
    const seriesDataToReturn = seriesData.data || [];

    if (searchTerm && seriesDataToReturn.length > 0) {
      const filteredSeries = seriesDataToReturn.filter((data) =>
        data.title?.includes(searchTerm)
      );
      if (filteredSeries.length > 0) {
        return filteredSeries;
      } else {
        return (searchResults.data || []).sort((a, b) => {
          // Check if 'a' should be prioritized
          if (new Date(a.added as string).getTime() > 0) return -1;
          // Check if 'b' should be prioritized
          if (new Date(b.added as string).getTime() > 0) return 1;
          // If neither 'a' nor 'b' should be prioritized, don't change order
          return 0;
        });
      }
    }

    return seriesDataToReturn;
  }, [seriesData.data, searchResults.data, searchTerm]);

  useLoadingSpinner(SonarrSearchLanding.name);

  return (
    <Suspense>
      <YStack flex={1} height="100%" width="100%" paddingTop="$2">
        <FlashList
          contentContainerStyle={{
            paddingHorizontal: "7",
          }}
          horizontal={false}
          numColumns={3}
          data={getSeries()}
          renderItem={({ item, index }) => (
            <SonarrSearchResultItem
              searchContext={SonarrSearchFilterContext.Search}
              index={index}
              data={item}
              isSearching={!!searchTerm}
            />
          )}
          estimatedItemSize={208}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor={sonarrColors.primary}
            />
          }
          ListEmptyComponent={() => (
            <XStack justifyContent="center" marginTop="$5">
              {seriesData.status === "loading" ||
              searchResults.status === "loading" ? (
                <Spinner color={sonarrColors.accentColor} size="large" />
              ) : (
                <H4 color="$gray11">{t("sonarr:noSeriesFound")}</H4>
              )}
            </XStack>
          )}
        />
      </YStack>
    </Suspense>
  );
};

export default SonarrSearchLanding;
