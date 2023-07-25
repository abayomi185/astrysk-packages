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
import {
  filterSearchData,
  setLoadingSpinner,
  useLoadingSpinner,
} from "../../utils";
import { Actions } from "@astrysk/constants";

const JellyfinCollectionFolderDetail: React.FC<{
  userId: string;
  serverId: string;
  forwardedData: BaseItemDto;
}> = ({ userId, serverId, forwardedData }) => {
  const navigation = useNavigation();

  const collectionId = forwardedData?.Id as string;
  const headerTitle = forwardedData?.Name as string;

  const searchFilters = useJellyfinStore((state) => state.searchFilters);

  const collectionData = useGetItems(
    {
      userId: userId,
      parentId: collectionId,
      ...(searchFilters?.[JellyfinSearchFilterContext.Collection]?.[
        "jellyfin:genre"
      ]
        ? {
            genres: [
              searchFilters?.[JellyfinSearchFilterContext.Collection]?.[
                "jellyfin:genre"
              ],
            ],
          }
        : {}),
    },
    {
      query: {
        select: (data) => {
          const filteredData = filterSearchData<BaseItemDto>(
            data.Items as BaseItemDto[],
            searchFilters?.[JellyfinSearchFilterContext.Collection]
          );
          useJellyfinStore.setState((state) => ({
            mediaCache: {
              [serverId]: {
                ...state.mediaCache?.[serverId],
                collectionMediaCache: {
                  data: filteredData,
                },
              },
            },
          }));
          return filteredData;
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
          setLoadingSpinner(JellyfinCollectionFolderDetail.name, Actions.DONE);
        },
      },
    }
  );

  const handleClearAllFilters = () => {
    collectionData.refetch();
  };

  useJellyfinDetailHeader(navigation, headerTitle);

  useLoadingSpinner(JellyfinCollectionFolderDetail.name);

  return (
    <YStack flex={1}>
      <JellyfinSearchFilterBar
        context={JellyfinSearchFilterContext.Collection}
        handleClearAllFilters={handleClearAllFilters}
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
