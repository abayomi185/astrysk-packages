import React, { Suspense } from "react";
import { RefreshControl } from "react-native";
import { useFocusEffect } from "expo-router";
import { YStack, XStack } from "tamagui";
import {
  OllamaConversationHistoryDetailItems,
  OllamaSearchFilterContext,
} from "../../types";
import { useOllamaStore } from "../../store";
import {
  filterOllamaSearchData,
  getOllamaConversationHistoryDetailItems,
} from "../../utils";
import {
  getFlashListColumnsFromViewType,
  useGetListColumnNumber,
  useQueryLoadingSpinner,
  useRefreshHandler,
} from "@astrysk/utils";
import { ollamaColors } from "../../colors";
import { ExtendedAppletColors, TabContext, ViewType } from "@astrysk/types";
import { useTranslation } from "react-i18next";
import { EmptyList } from "@astrysk/components";
import { customTokens } from "@astrysk/styles";
import { ListLocalModels200ModelsItem, useListLocalModels } from "../../api";
import { FlashList } from "@shopify/flash-list";
import { ModelListItem } from "./searchModels";
import { ChatHistoryListItem } from "./searchChatHistory";
import { getColorSchemeBasedAppletColor } from "@astrysk/utils/utils/colorScheme";

const OllamaSearchLanding: React.FC<{
  searchTerm: string;
}> = ({ searchTerm }) => {
  const { t } = useTranslation();

  const flashListColumns = useGetListColumnNumber(customTokens.size[11].val);

  const viewType = useOllamaStore((state) => state.viewType) ?? ViewType.Grid;

  const searchFilters = useOllamaStore((state) => state.searchFilters);

  React.useEffect(() => {
    useOllamaStore.setState((state) => ({
      searchFilters: {
        ...state.searchFilters,
        [OllamaSearchFilterContext.Search]: {
          "ollama:type": { order: undefined, value: "ollama:models" },
        },
      },
    }));
  }, []);

  const ollamaConversationHistory =
    useOllamaStore((state) => state.ollamaConversationHistory) ?? {};

  const ollamaConversationHistoryKeys = React.useMemo(
    () => Object.keys(ollamaConversationHistory),
    [ollamaConversationHistory]
  );

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
    const initialModelsData = [...(models.data ?? [])];
    let modelsDataToReturn = initialModelsData;

    if (searchTerm && initialModelsData.length > 0) {
      const filteredResources = initialModelsData.filter((data) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return data.name?.toLowerCase().includes(lowerCaseSearchTerm);
      });
      modelsDataToReturn = filteredResources;
    }
    modelsDataToReturn = filterOllamaSearchData<ListLocalModels200ModelsItem>(
      modelsDataToReturn,
      searchFilters?.[OllamaSearchFilterContext.Search]
    );

    return modelsDataToReturn;
  }, [models.data, searchTerm, searchFilters]);

  const getChatHistory = React.useCallback(() => {
    const chatHistory = getOllamaConversationHistoryDetailItems(
      ollamaConversationHistory,
      ollamaConversationHistoryKeys
    );

    const initialChatHistoryData = [...(chatHistory ?? [])];
    let chatHistoryDataToReturn = initialChatHistoryData;

    if (searchTerm && initialChatHistoryData.length > 0) {
      const filteredResources = initialChatHistoryData.filter((data) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return data.name?.toLowerCase().includes(lowerCaseSearchTerm);
      });
      chatHistoryDataToReturn = filteredResources;
    }
    chatHistoryDataToReturn =
      filterOllamaSearchData<OllamaConversationHistoryDetailItems>(
        chatHistoryDataToReturn,
        searchFilters?.[OllamaSearchFilterContext.Search]
      );

    return chatHistoryDataToReturn;
  }, [ollamaConversationHistoryKeys, searchTerm, searchFilters]);

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
            data={[...getModels(), ...getChatHistory()]}
            renderItem={({ item }) => {
              if ("digest" in item) {
                return <ModelListItem t={t} data={item} />;
              }
              return (
                <ChatHistoryListItem
                  t={t}
                  data={item as OllamaConversationHistoryDetailItems}
                />
              );
            }}
            estimatedItemSize={100}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={refetchModelsList}
                tintColor={getColorSchemeBasedAppletColor(
                  ollamaColors,
                  "accentColor"
                )}
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
