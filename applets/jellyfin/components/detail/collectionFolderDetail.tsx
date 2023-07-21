import React from "react";
import { useNavigation } from "expo-router";
import { BaseItemDto, useGetItems } from "../../api";
import { YStack } from "tamagui";
import JellyfinSearchFilterBar from "../search/searchFilterBar";
import { JellyfinSearchFilterContext } from "../../types";
import { useJellyfinDetailHeader } from "../useHeader";
import { FlashList } from "@shopify/flash-list";
import { JellyfinSearchResultItem } from "../search/searchResults";
import { useJellyfinStore } from "../../store";

const JellyfinCollectionFolderDetail: React.FC<{
  userId: string;
  serverId: string;
  forwardedData: BaseItemDto;
}> = ({ userId, serverId, forwardedData }) => {
  const navigation = useNavigation();

  const collectionId = forwardedData?.Id as string;
  const headerTitle = forwardedData?.Name as string;

  const searchFilters = useJellyfinStore((state) => state.searchFilters);

  const filterCollectionData = (data: BaseItemDto[]) => {
    let filteredData = data;

    if (searchFilters?.[JellyfinSearchFilterContext.Collection]?.["Status"]) {
      if (
        searchFilters?.[JellyfinSearchFilterContext.Collection]?.["Status"] ===
        "Played"
      ) {
        filteredData = filteredData.filter(
          (data) => data.UserData?.Played === true
        );
      }
      if (
        searchFilters?.[JellyfinSearchFilterContext.Collection]?.["Status"] ===
        "Unplayed"
      ) {
        filteredData = filteredData.filter(
          (data) => data.UserData?.Played === false
        );
      }
      if (
        searchFilters?.[JellyfinSearchFilterContext.Collection]?.["Status"] ===
        "Liked"
      ) {
        filteredData = filteredData;
      }
      if (
        searchFilters?.[JellyfinSearchFilterContext.Collection]?.["Status"] ===
        "Favourite"
      ) {
        filteredData = filteredData.filter(
          (data) => data.UserData?.IsFavorite === true
        );
      }
    }

    if (searchFilters?.[JellyfinSearchFilterContext.Collection]?.["Order"]) {
      if (
        searchFilters?.[JellyfinSearchFilterContext.Collection]?.["Order"] ===
        "Ascending"
      ) {
        filteredData = filteredData.sort((a, b) =>
          (a.Name as string).localeCompare(b.Name as string)
        );
      } else if (
        searchFilters?.[JellyfinSearchFilterContext.Collection]?.["Order"] ===
        "Descending"
      ) {
        filteredData = filteredData.sort((a, b) =>
          (b.Name as string).localeCompare(a.Name as string)
        );
      }
    }

    return filteredData;
  };

  const collectionData = useGetItems(
    {
      userId: userId,
      parentId: collectionId,
      ...(searchFilters?.[JellyfinSearchFilterContext.Collection]?.["Genre"]
        ? {
            genres: [
              searchFilters?.[JellyfinSearchFilterContext.Collection]?.[
                "Genre"
              ],
            ],
          }
        : {}),
    },
    {
      query: {
        select: (data) => {
          return filterCollectionData(data.Items as BaseItemDto[]);
        },
        onSuccess: (data) => {
          useJellyfinStore.setState((state) => ({
            mediaCache: {
              [serverId]: {
                ...state.mediaCache?.[serverId],
                collectionMediaCache: {
                  data: data,
                },
              },
            },
          }));
        },
      },
    }
  );

  useJellyfinDetailHeader(navigation, headerTitle);

  return (
    <YStack flex={1}>
      <JellyfinSearchFilterBar
        context={JellyfinSearchFilterContext.Collection}
        style={{
          backgroundColor: "$background",
        }}
      />
      <YStack flex={1}>
        <FlashList
          horizontal={false}
          numColumns={3}
          data={collectionData.data}
          renderItem={({ item, index }) => (
            <JellyfinSearchResultItem
              searchContext={JellyfinSearchFilterContext.Collection}
              index={index}
              data={item}
            />
          )}
          estimatedItemSize={233}
        />
      </YStack>
    </YStack>
  );
};

export default JellyfinCollectionFolderDetail;
