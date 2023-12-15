import React from "react";

import { create_axios_instance } from "@astrysk/api";
import { useOllamaStore } from "./store";

import { FilterOrder, Router, TabContext, ViewType } from "@astrysk/types";
import {
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
}: {
  router: Router;
  searchItemId: string;
  tabContext: TabContext;
  screenContext?: OllamaDetailScreenContext;
  searchContext?: OllamaSearchFilterContext;
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
  });
};

export const goToOllamaModalScreen = ({
  router,
  node,
  resource,
  screenContext,
  searchContext,
}: {
  router: Router;
  node: string;
  resource: number | string;
  screenContext?: OllamaDetailScreenContext;
  searchContext?: OllamaSearchFilterContext;
}) => {
  goToModalScreen<
    OllamaDetailScreenContext,
    OllamaSearchFilterContext,
    OllamaDetailScreenProps
  >({
    router,
    node,
    resource,
    screenContext,
    searchContext,
  });
};

export const filterOllamaSearchData = <T extends ListLocalModels200ModelsItem>(
  data: T[],
  searchFilters: Record<string, any> | undefined
) => {
  let filteredData = data;

  if (searchFilters?.["ollama:order"]) {
    const searchFilter = searchFilters?.["ollama:order"];
    if (searchFilter.value === "ollama:alphabetical") {
      if (searchFilter.order === FilterOrder.ASCENDING) {
        filteredData.sort((a, b) => a.name!.localeCompare(b.name!));
      } else if (searchFilter.order === FilterOrder.DESCENDING) {
        filteredData.sort((a, b) => b.name!.localeCompare(a.name!));
      }
    } else if (searchFilter.value === "ollama:size") {
      if (searchFilter.order === FilterOrder.ASCENDING) {
        filteredData.sort((a, b) => a.size! - b.size!);
      } else if (searchFilter.order === FilterOrder.DESCENDING) {
        filteredData.sort((a, b) => b.size! - a.size!);
      }
    } else if (searchFilter.value === "ollama:modified_date") {
      if (searchFilter.order === FilterOrder.ASCENDING) {
        filteredData.sort(
          (a, b) =>
            new Date(a.modified_at!).getTime() -
            new Date(b.modified_at!).getTime()
        );
      } else if (searchFilter.order === FilterOrder.DESCENDING) {
        filteredData.sort(
          (a, b) =>
            new Date(b.modified_at!).getTime() -
            new Date(a.modified_at!).getTime()
        );
      }
    }
  }

  return filteredData;
};

// NOTE: VIEW TYPE
export const OLLAMA_SUPPORTED_VIEW_TYPES = [ViewType.Grid, ViewType.List];
