import React, { Suspense } from "react";
import { useRouter } from "expo-router";
import { Spinner, XStack, YStack, Text, H6 } from "tamagui";
import { useGet } from "../../api/api";
import { FlashList } from "@shopify/flash-list";
import { useJellyfinStore } from "../../store";
import { BaseItemDto, BaseItemKind, SearchHint } from "../../api";
import { Image, ImageSource } from "expo-image";
import {
  filterJellyfinSearchData,
  goToJellyfinSearchedItemDetailScreen,
} from "../../utils";
import {
  JellyfinDetailScreenContext,
  JellyfinSearchFilterContext,
} from "../../types";
import { useTranslation } from "react-i18next";

export const JellyfinSearchResultItem: React.FC<{
  searchContext: JellyfinSearchFilterContext;
  index: number;
  data: SearchHint | BaseItemDto;
}> = ({ searchContext, index, data }) => {
  const router = useRouter();
  const token = useJellyfinStore.getState().token;
  const baseURL = useJellyfinStore.getState().baseURL;

  let primaryImageTag;
  let imageBlurHash;
  let seriesName;

  if ("PrimaryImageTag" in data) {
    primaryImageTag = data.PrimaryImageTag;
    seriesName = data.Series;
  } else if ("ImageTags" in data) {
    primaryImageTag = data.ImageTags?.Primary;
  }

  if ("ImageBlurHashes" in data) {
    imageBlurHash = data.ImageBlurHashes?.Primary?.[
      primaryImageTag as string
    ] as string;
  }

  const imageId = data.Id;

  return (
    <YStack
      height="$18"
      width="$11"
      padding="$2"
      pressStyle={{ scale: 0.97 }}
      animation="delay"
      onPress={() => {
        goToJellyfinSearchedItemDetailScreen({
          router,
          // Screen Context
          screenContext:
            searchContext === JellyfinSearchFilterContext.Search
              ? JellyfinDetailScreenContext.SearchItem
              : JellyfinDetailScreenContext.CollectionItem,
          // Search Context
          searchContext,
          searchItemId: data.Id as string,
          searchItemIndex: index.toString(),
        });
      }}
    >
      <YStack height="$13" borderRadius="$6" backgroundColor="$gray6">
        <Image
          style={{ flex: 1, overflow: "hidden", borderRadius: 15 }}
          source={
            {
              uri: `${baseURL}/Items/${imageId}/Images/Primary?quality=80`,
              headers: {
                "X-Emby-Authorization": token,
              },
            } as ImageSource
          }
          placeholder={imageBlurHash}
          transition={200}
          recyclingKey={imageId}
          placeholderContentFit="cover"
        />
      </YStack>
      <YStack paddingHorizontal="$1" paddingTop="$1">
        <H6 color="$color" ellipsizeMode="tail" numberOfLines={2}>
          {data.Type === BaseItemKind.Episode ? seriesName : data.Name}
        </H6>
        <Text color="$color" opacity={0.6} numberOfLines={1}>
          {data.Type === BaseItemKind.Movie && data.ProductionYear}
          {data.Type === BaseItemKind.Series && data.ProductionYear}
          {data.Type === BaseItemKind.Episode &&
            (data.ParentIndexNumber
              ? `S${data.ParentIndexNumber} - E${data.IndexNumber}`
              : `${data.Name}`)}
          {data.Type === BaseItemKind.Genre && data.Type}
        </Text>
      </YStack>
    </YStack>
  );
};

const JellyfinSearchResults: React.FC<{
  searchTerm: string;
}> = ({ searchTerm }) => {
  const { t } = useTranslation();
  const userId = useJellyfinStore.getState().userDetails?.Id as string;
  const serverId = useJellyfinStore.getState().userDetails?.ServerId as string;

  const searchFilters = useJellyfinStore((state) => state.searchFilters);

  const [isLoading, setIsLoading] = React.useState(true);

  const searchResults = useGet(
    {
      userId: userId,
      searchTerm: searchTerm,
      ...(searchFilters?.[JellyfinSearchFilterContext.Search]
        ? {
            includeItemTypes: [
              t(
                searchFilters?.[JellyfinSearchFilterContext.Search]?.[
                  "jellyfin:type"
                ]?.value as string
              ),
            ] as BaseItemKind[],
          }
        : {}),
      limit: 50,
    },
    {
      query: {
        select: (data) => {
          return filterJellyfinSearchData<SearchHint>(
            data.SearchHints as SearchHint[],
            searchFilters?.[JellyfinSearchFilterContext.Search]
          );
        },
        onSuccess: (data) => {
          useJellyfinStore.setState((state) => ({
            mediaCache: {
              [serverId]: {
                ...state.mediaCache?.[serverId],
                searchMediaCache: {
                  data: data,
                },
              },
            },
          }));
        },
        onError: (error) => {
          // WARN: Do something on Error
          // console.log(error);
        },
        refetchOnMount: false,
      },
    }
  );

  const customOrder: { [key: string]: number } = {
    Movie: 1,
    Episode: 2,
    Series: 3,
    Season: 4,
    Person: 5,
  };

  // Function to compare two BaseItemDto objects based on their Type property and the customOrder
  function compareSearchResultItems(a: SearchHint, b: SearchHint): number {
    const aValue = a.Type
      ? customOrder[a.Type] || Number.MAX_SAFE_INTEGER
      : Number.MAX_SAFE_INTEGER;
    const bValue = b.Type
      ? customOrder[b.Type] || Number.MAX_SAFE_INTEGER
      : Number.MAX_SAFE_INTEGER;

    return aValue - bValue;
  }
  const sortSearchResults = (data: SearchHint[]) => {
    return data.sort(compareSearchResultItems);
  };

  const sortedSearchResults = React.useMemo(() => {
    return searchResults?.data ? sortSearchResults(searchResults?.data) : [];
  }, [searchResults.data]);

  return (
    <>
      <Suspense>
        <YStack
          flex={1}
          height="100%"
          width="100%"
          // paddingHorizontal="$2"
          paddingTop="$2"
        >
          <FlashList
            contentContainerStyle={{
              paddingHorizontal: "7",
            }}
            horizontal={false}
            numColumns={3}
            data={sortedSearchResults}
            renderItem={({ item, index }) => (
              <JellyfinSearchResultItem
                searchContext={JellyfinSearchFilterContext.Search}
                index={index}
                data={item}
              />
            )}
            // showsVerticalScrollIndicator={false}
            estimatedItemSize={208}
          />
        </YStack>
        {!isLoading && (
          <XStack flex={1} justifyContent="center">
            <Spinner />
          </XStack>
        )}
      </Suspense>
    </>
  );
};

export default JellyfinSearchResults;
