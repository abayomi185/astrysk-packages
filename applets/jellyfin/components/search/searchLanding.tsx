import React, { Suspense } from "react";
import { RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { YStack, H3, XStack, H6, Text } from "tamagui";
import { Image, ImageSource } from "expo-image";
import { BaseItemDto, BaseItemKind, useGetSuggestions } from "../../api";
import { useJellyfinStore } from "../../store";
import { useTranslation } from "react-i18next";
import { FlashList } from "@shopify/flash-list";
import { goToJellyfinSearchedItemDetailScreen } from "../../utils";
import {
  JellyfinDetailScreenContext,
  JellyfinSearchFilterContext,
} from "../../types";
import { useRefreshHandler } from "@astrysk/utils";

const JellyfinSearchLandingItem: React.FC<{
  index: number;
  data: BaseItemDto;
}> = ({ index, data }) => {
  const router = useRouter();

  const token = useJellyfinStore.getState().token;
  const baseURL = useJellyfinStore.getState().baseURL;

  const primaryBlurHash: string = data.ImageTags?.["Primary"] as string;

  return (
    <YStack flex={1} alignItems="center" marginTop="$3">
      <YStack
        width="$13"
        pressStyle={{ scale: 0.97 }}
        animation="delay"
        justifyContent="center"
        onPress={() =>
          goToJellyfinSearchedItemDetailScreen({
            router,
            screenContext: JellyfinDetailScreenContext.SearchSuggestionItem,
            searchContext: JellyfinSearchFilterContext.Search,
            searchItemId: data.Id as string,
            searchItemIndex: index.toString(),
          })
        }
      >
        <YStack height="$10" borderRadius="$6" backgroundColor="$gray6">
          <Image
            style={{ flex: 1, overflow: "hidden", borderRadius: 15 }}
            source={
              {
                uri: `${baseURL}/Items/${data.Id}/Images/Primary`,
                headers: {
                  "X-Emby-Authorization": token,
                },
              } as ImageSource
            }
            placeholder={
              data.ImageBlurHashes?.Primary?.[primaryBlurHash] as string
            }
          />
        </YStack>
        <YStack paddingHorizontal="$1" paddingTop="$1">
          <H6 color="$color" ellipsizeMode="tail" numberOfLines={1}>
            {(data.Type === BaseItemKind.Season || BaseItemKind.Episode) &&
              data?.SeriesName}
            {data.Type === BaseItemKind.Series && data?.Name}
            {data.Type === BaseItemKind.Movie && data?.Name}
          </H6>
          <Text color="$color" numberOfLines={1} opacity={0.6}>
            {data.Type === BaseItemKind.Episode && data?.Name}
            {data.Type === BaseItemKind.Movie && data?.ProductionYear}
          </Text>
        </YStack>
      </YStack>
    </YStack>
  );
};

const JellyfinSearchLanding = () => {
  const { t } = useTranslation();

  const userId = useJellyfinStore.getState().userDetails?.Id as string;
  const serverId = useJellyfinStore.getState().userDetails?.ServerId as string;

  const filterSuggestionsData = (data: BaseItemDto[]) => {
    return data.filter((item) => item.Type !== BaseItemKind.Folder);
  };

  const suggestions = useGetSuggestions(
    userId,
    { limit: 6 },
    {
      query: {
        select: (data) => {
          return filterSuggestionsData(data.Items as BaseItemDto[]);
        },
        onSuccess: (data) => {
          useJellyfinStore.setState((state) => ({
            mediaCache: {
              [serverId]: {
                ...state.mediaCache?.[serverId],
                searchSuggestionsMediaCache: {
                  data: data,
                },
              },
            },
          }));
        },
        refetchOnMount: false,
      },
    }
  );

  const { isRefetching, refetch } = useRefreshHandler(suggestions.refetch);

  // WARN: Add pull to refresh
  return (
    <YStack flex={1} alignItems="center">
      <XStack
        width="$23"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Suspense>
          <FlashList
            horizontal={false}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={suggestions.data}
            renderItem={({ item, index }) => (
              <JellyfinSearchLandingItem index={index} data={item} />
            )}
            ListHeaderComponent={
              <XStack flex={1} marginTop="$6" justifyContent="center">
                <H3>{t("jellyfin:suggestions")}</H3>
              </XStack>
            }
            refreshControl={
              <RefreshControl
                refreshing={isRefetching}
                onRefresh={refetch}
                tintColor="#8E4EC6"
              />
            }
            estimatedItemSize={143}
          />
        </Suspense>
      </XStack>
    </YStack>
  );
};

export default JellyfinSearchLanding;
