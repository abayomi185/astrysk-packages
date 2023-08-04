import React, { Suspense } from "react";
import { RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { SeriesResource, useGetApiV3Series } from "../../api";
import { H6, Spinner, XStack, YStack, Text } from "tamagui";
import { Image, ImageSource } from "expo-image";
import { FlashList } from "@shopify/flash-list";
import {
  SonarrDetailScreenContext,
  SonarrSearchFilterContext,
} from "../../types";
import { useSonarrStore } from "../../store";
import { goToSonarrSearchedItemDetailScreen } from "../../utils";
import {
  setLoadingSpinner,
  useLoadingSpinner,
  useRefreshHandler,
} from "@astrysk/utils";
import { Actions } from "@astrysk/constants";
import { sonarrColors } from "../../colors";

const SonarrSearchResultItem: React.FC<{
  searchContext: SonarrSearchFilterContext;
  index: number;
  data: SeriesResource;
}> = ({ searchContext, data }) => {
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
      onPress={() => {
        goToSonarrSearchedItemDetailScreen(
          router,
          // Screen Context
          SonarrDetailScreenContext.SearchItem,
          // Search Context
          searchContext,
          data.id as number
        );
      }}
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
        <Text color="$color" opacity={0.6} numberOfLines={1}>
          {data.year}
        </Text>
      </YStack>
    </YStack>
  );
};

const SonarrSearchLanding: React.FC<{
  searchTerm: string;
}> = () => {
  const baseURL = useSonarrStore.getState().baseURL as string;

  const seriesData = useGetApiV3Series(
    {},
    {
      query: {
        onSuccess: (data) => {
          useSonarrStore.setState((state) => ({
            sonarrCache: {
              ...state.sonarrCache,
              [baseURL]: {
                seriesCache: data,
              },
            },
          }));
          setLoadingSpinner(SonarrSearchLanding.name, Actions.DONE);
        },
      },
    }
  );

  const { isRefetching, refetch } = useRefreshHandler(seriesData.refetch);

  useLoadingSpinner(SonarrSearchLanding.name);

  return (
    <Suspense>
      <YStack
        flex={1}
        height="100%"
        width="100%"
        paddingHorizontal="$2"
        paddingTop="$2"
      >
        <FlashList
          horizontal={false}
          numColumns={3}
          data={seriesData.data}
          renderItem={({ item, index }) => (
            <SonarrSearchResultItem
              searchContext={SonarrSearchFilterContext.Search}
              index={index}
              data={item}
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
        />
      </YStack>
    </Suspense>
  );
};

export default SonarrSearchLanding;
