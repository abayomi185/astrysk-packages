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
import { filterJellyfinSearchData } from "../../utils";
import {
  setLoadingSpinner,
  useGetListColumnNumber,
  useLoadingSpinner,
  useQueryEvents,
} from "@astrysk/utils";
import { Actions } from "@astrysk/constants";
import { customTokens } from "@astrysk/styles";

const JellyfinCollectionFolderDetail: React.FC<{
  userId: string;
  serverId: string;
  forwardedData: BaseItemDto;
}> = ({ userId, serverId, forwardedData }) => {
  const navigation = useNavigation();

  const flashListColumns = useGetListColumnNumber(customTokens.size["$11"].val);

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
              ].value as string, // Only 1 genre can be selected at a time
            ],
          }
        : {}),
    },
    {
      query: {
        select: (data) => {
          const filteredData = filterJellyfinSearchData<BaseItemDto>(
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
      },
    }
  );
  useQueryEvents(collectionData, {
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
  });

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
          contentContainerStyle={{
            paddingHorizontal: 7,
            paddingBottom: 5,
          }}
          numColumns={flashListColumns}
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
