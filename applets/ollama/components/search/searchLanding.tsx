import React, { Suspense } from "react";
import { RefreshControl } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { YStack, XStack } from "tamagui";
import { Image, ImageSource } from "expo-image";
import {
  OllamaDetailScreenContext,
  OllamaSearchFilterContext,
} from "../../types";
import { useOllamaStore } from "../../store";
import { filterOllamaSearchData, goToOllamaDetailScreen } from "../../utils";
import {
  getFlashListColumnsFromViewType,
  useGetListColumnNumber,
  useQueryLoadingSpinner,
  useRefreshHandler,
} from "@astrysk/utils";
import { ollamaColors } from "../../colors";
import { TabContext, ViewType } from "@astrysk/types";
import { useTranslation } from "react-i18next";
import { EmptyList } from "@astrysk/components";
import { customTokens } from "@astrysk/styles";
import { ListLocalModels200ModelsItem, useListLocalModels } from "../../api";
import { FlashList } from "@shopify/flash-list";
import { ModelListItem } from "./searchModels";

const OllamaSearchLanding: React.FC<{
  searchTerm: string;
}> = ({ searchTerm }) => {
  const { t } = useTranslation();

  const flashListColumns = useGetListColumnNumber(customTokens.size[11].val);

  const viewType = useOllamaStore((state) => state.viewType) ?? ViewType.Grid;

  const searchFilters = useOllamaStore((state) => state.searchFilters);

  const models = useListLocalModels({
    query: {
      select: (data) => data.models,
      onSuccess: (data) => {
        useOllamaStore.setState((state) => ({
          ollamaCache: {
            ...state.ollamaCache,
            models: data?.reduce((acc, curr) => {
              if (curr.digest) {
                acc[curr.digest] = curr;
              }
              return acc;
            }, {} as Record<string, ListLocalModels200ModelsItem>), // Initialize as a partial record
          },
        }));
      },
    },
  });

  const refetchModelsList = () => {
    models.refetch();
  };

  const getModels = React.useCallback(() => {
    const initialResourcesData = [...(models.data ?? [])];
    let resourcesDataToReturn = initialResourcesData;

    if (searchTerm && initialResourcesData.length > 0) {
      const filteredResources = initialResourcesData.filter((data) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return data.name?.toLowerCase().includes(lowerCaseSearchTerm);
      });
      resourcesDataToReturn = filteredResources;
    }
    resourcesDataToReturn =
      filterOllamaSearchData<ListLocalModels200ModelsItem>(
        resourcesDataToReturn,
        searchFilters?.[OllamaSearchFilterContext.Search]
      );

    return resourcesDataToReturn;
  }, [models.data, searchTerm, searchFilters]);

  useFocusEffect(
    React.useCallback(() => {
      searchTerm && models.refetch();
      return () => {};
    }, [])
  );

  useQueryLoadingSpinner(models);

  return (
    <Suspense>
      <YStack flex={1} height="100%" width="100%" paddingTop="$2">
        <YStack flex={1}>
          <FlashList
            contentContainerStyle={{ paddingHorizontal: "7" }}
            data={getModels()}
            renderItem={({ item }) => <ModelListItem t={t} data={item} />}
            estimatedItemSize={100}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={refetchModelsList}
                tintColor={ollamaColors.accentColor}
              />
            }
            ListEmptyComponent={
              <EmptyList
                queryStatus={models.status}
                text={t("ollama:noResourcesFound")}
                accentColor={ollamaColors.accentColor}
              />
            }
            ListFooterComponent={<XStack height="$2" />}
          />
        </YStack>
      </YStack>
    </Suspense>
  );
};

export default OllamaSearchLanding;
