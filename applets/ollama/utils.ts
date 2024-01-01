import React from "react";
import { Alert } from "react-native";

import { create_axios_instance } from "@astrysk/api";
import { useOllamaStore } from "./store";

import { FilterOrder, Router, TabContext, ViewType } from "@astrysk/types";
import {
  OllamaConversationHistory,
  OllamaConversationHistoryDetailItems,
  OllamaDetailScreenContext,
  OllamaDetailScreenProps,
  OllamaSearchFilterContext,
} from "./types";
import { TFunction } from "i18next";
import { goToDetailScreen, goToModalScreen } from "@astrysk/utils";
import { ListLocalModels200ModelsItem } from "./api";
import { goToFullScreenDetailScreen } from "@astrysk/utils/utils/router";

// NOTE: LOGIN / AUTHENTICATION / CONFIGURE
export const configureAxiosForOllama = (
  baseURL: string,
  token?: string | null,
  customHeaders?: object,
  callback?: () => void
) => {
  const axiosConfig = {
    baseURL: baseURL,
    headers: {
      // Authorization: `Bearer ${token}`,
      ...(customHeaders ? customHeaders : {}),
    },
  };
  create_axios_instance(axiosConfig);
  callback && callback();
};

// Ollama configure function that all screens can run
// to authenticate and set up the applet appropriately
export const configureOllama = () => {
  const isConfigured = useOllamaStore.getState().isConfigured;

  // Check if token and baseURL exists
  const baseURL = useOllamaStore.getState().baseURL;
  const token = useOllamaStore.getState().token;
  const customHeaders = useOllamaStore.getState().customHeaders;

  if (!baseURL) {
    return false;
  }

  if (isConfigured) {
    return true;
  }

  configureAxiosForOllama(baseURL, token, customHeaders);

  useOllamaStore.setState({ isConfigured: true });

  return true;
};

export const useOllamaConfigurator = () => {
  return React.useEffect(() => {
    configureOllama();
  }, []);
};

export const deConfigureOllama = () => {
  useOllamaStore.setState({ isConfigured: false });
};

// NOTE: SEARCH / COLLECTION UTILS
export const goToOllamaDetailScreen = ({
  router,
  searchItemId,
  tabContext,
  screenContext,
  searchContext,
}: {
  router: Router;
  searchItemId: string;
  tabContext: TabContext;
  screenContext?: OllamaDetailScreenContext;
  searchContext?: OllamaSearchFilterContext;
}) => {
  goToDetailScreen<
    OllamaDetailScreenContext,
    OllamaSearchFilterContext,
    OllamaDetailScreenProps
  >({
    router,
    itemId: searchItemId,
    tabContext,
    screenContext,
    searchContext,
  });
};

export const goToOllamaFsDetailScreen = ({
  router,
  searchItemId,
  tabContext,
  screenContext,
  searchContext,
  conversationId,
}: {
  router: Router;
  searchItemId: string;
  tabContext: TabContext;
  screenContext?: OllamaDetailScreenContext;
  searchContext?: OllamaSearchFilterContext;
  conversationId?: string;
}) => {
  goToFullScreenDetailScreen<
    OllamaDetailScreenContext,
    OllamaSearchFilterContext,
    OllamaDetailScreenProps
  >({
    router,
    itemId: searchItemId,
    tabContext,
    screenContext,
    searchContext,
    otherParams: { conversationId },
  });
};

export const goToOllamaModalScreen = ({
  router,
  itemId,
  screenContext,
  searchContext,
}: {
  router: Router;
  itemId: string;
  screenContext?: OllamaDetailScreenContext;
  searchContext?: OllamaSearchFilterContext;
}) => {
  goToModalScreen<
    OllamaDetailScreenContext,
    OllamaSearchFilterContext,
    OllamaDetailScreenProps
  >({
    router,
    itemId,
    screenContext,
    searchContext,
  });
};

export const filterOllamaSearchData = <
  T extends ListLocalModels200ModelsItem | OllamaConversationHistoryDetailItems
>(
  data: T[],
  searchFilters: Record<string, any> | undefined
) => {
  let filteredData = data;

  const isListLocalModels200ModelsItem = (
    data: any
  ): data is ListLocalModels200ModelsItem => {
    return "name" in data && "size" in data && "modified_at" in data;
  };

  const isOllamaConversationHistoryDetailItem = (
    data: any
  ): data is OllamaConversationHistoryDetailItems => {
    return "conversationId" in data;
  };

  if (searchFilters?.["ollama:order"]) {
    const searchFilter = searchFilters["ollama:order"];

    if (searchFilter.value === "ollama:alphabetical") {
      filteredData = filteredData.sort((a, b) => {
        if (
          isListLocalModels200ModelsItem(a) &&
          isListLocalModels200ModelsItem(b)
        ) {
          return searchFilter.order === FilterOrder.ASCENDING
            ? a.name!.localeCompare(b.name!)
            : b.name!.localeCompare(a.name!);
        }
        return 0;
      });
    } else if (searchFilter.value === "ollama:size") {
      filteredData = filteredData.sort((a, b) => {
        if (
          isListLocalModels200ModelsItem(a) &&
          isListLocalModels200ModelsItem(b)
        ) {
          return searchFilter.order === FilterOrder.ASCENDING
            ? a.size! - b.size!
            : b.size! - a.size!;
        }
        return 0;
      });
    } else if (searchFilter.value === "ollama:modified_date") {
      filteredData = filteredData.sort((a, b) => {
        if (
          isListLocalModels200ModelsItem(a) &&
          isListLocalModels200ModelsItem(b)
        ) {
          const dateA = new Date(a.modified_at!).getTime();
          const dateB = new Date(b.modified_at!).getTime();
          return searchFilter.order === FilterOrder.ASCENDING
            ? dateA - dateB
            : dateB - dateA;
        }
        return 0;
      });
    }
  }

  if (searchFilters?.["ollama:type"]) {
    const searchFilter = searchFilters?.["ollama:type"];
    if (searchFilter.value === "ollama:models") {
      filteredData = filteredData.filter((data) => {
        if (isListLocalModels200ModelsItem(data)) {
          return data?.digest;
        }
      });
    } else if (searchFilter.value === "ollama:chatHistory") {
      filteredData = filteredData.filter((data) => {
        if (isOllamaConversationHistoryDetailItem(data)) {
          return data?.conversationId;
        }
      });
    }
  }

  return filteredData;
};

// NOTE: VIEW TYPE
export const OLLAMA_SUPPORTED_VIEW_TYPES = [ViewType.Grid, ViewType.List];

export const createOllamaActionAlert = (
  t: TFunction,
  title: string,
  message?: string,
  onPress?: () => void
) => {
  return Alert.alert(
    title,
    message,
    [
      {
        text: `${t("common:cancel")}`,
        style: "default",
      },
      {
        text: `${t("common:ok")}`,
        onPress: onPress,
        style: "destructive",
      },
    ],
    {}
  );
};

export const getOllamaConversationHistoryDetailItems = (
  ollamaConversationHistory: OllamaConversationHistory,
  ollamaConversationHistoryKeys: string[]
) => {
  const ollamaConversationHistoryDetailItems: OllamaConversationHistoryDetailItems[] =
    React.useMemo(() => {
      return ollamaConversationHistoryKeys
        .map((key) => ({
          conversationId: key,
          model: ollamaConversationHistory[key].model!,
          modelName: ollamaConversationHistory[key].modelName,
          name:
            ollamaConversationHistory[key].name ??
            ollamaConversationHistory[key].conversation[
              ollamaConversationHistory[key].conversation.length - 1
            ]?.text ??
            "",
          lastUpdated: ollamaConversationHistory[key].lastUpdated,
          conversationLength:
            ollamaConversationHistory[key].conversation.length,
        }))
        .sort(
          (a, b) =>
            new Date(b.lastUpdated ?? 0).getTime() -
            new Date(a.lastUpdated ?? 0).getTime()
        );
    }, [ollamaConversationHistoryKeys]);
  return ollamaConversationHistoryDetailItems;
};
