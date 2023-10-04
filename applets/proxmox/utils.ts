import React from "react";

import { create_axios_instance } from "@astrysk/api";
import * as Crypto from "expo-crypto";
import { useProxmoxStore } from "./store";

import { Screens } from "@astrysk/constants";
import { FilterOrder, Router, TabContext, ViewType } from "@astrysk/types";
import {
  ProxmoxDetailScreenContext,
  ProxmoxDetailScreenProps,
  ProxmoxSearchFilterContext,
} from "./types";

// NOTE: LOGIN / AUTHENTICATION / CONFIGURE
export const configureAxiosForProxmox = (
  baseURL: string,
  token?: string | null,
  customHeaders?: object,
  callback?: () => void
) => {
  const axiosConfig = {
    baseURL: baseURL,
    params: {
      apikey: token,
    },
  };
  create_axios_instance(axiosConfig);
  callback && callback();
};

// Proxmox configure function that all screens can run
// to authenticate and set up the applet appropriately
export const configureProxmox = () => {
  const isConfigured = useProxmoxStore.getState().isConfigured;

  // Check if token and baseURL exists
  const baseURL = useProxmoxStore.getState().baseURL;
  const token = useProxmoxStore.getState().token;
  const customHeaders = useProxmoxStore.getState().customHeaders;

  if (!baseURL) {
    return false;
  }

  if (isConfigured) {
    return true;
  }

  configureAxiosForProxmox(baseURL, token, customHeaders);

  useProxmoxStore.setState({ isConfigured: true });

  return true;
};

export const useProxmoxConfigurator = () => {
  return React.useEffect(() => {
    configureProxmox();
  }, []);
};

export const deConfigureProxmox = () => {
  useProxmoxStore.setState({ isConfigured: false });
};

// NOTE: SEARCH / COLLECTION UTILS
export const goToProxmoxDetailScreen = ({
  router,
  searchItemId,
  tabContext,
  seasonNumber,
  screenContext,
  searchContext,
}: {
  router: Router;
  searchItemId: number;
  tabContext: TabContext;
  seasonNumber?: number;
  screenContext?: ProxmoxDetailScreenContext;
  searchContext?: ProxmoxSearchFilterContext;
}) => {
  const screenRoute =
    tabContext === TabContext.Search
      ? Screens.SEARCH_SCREEN_DETAIL_ROUTE
      : Screens.HOME_SCREEN_DETAIL_ROUTE;
  router.push({
    pathname: `/${screenRoute}+${Crypto.randomUUID()}`,
    params: {
      context: screenContext,
      itemId: searchItemId, // Use id to check cache for data
      tabContext: tabContext,
      seasonNumber: seasonNumber,
    } as ProxmoxDetailScreenProps,
  });
};

export const filterProxmoxSearchData = <T extends any>(
  data: T[],
  searchFilters: Record<string, any> | undefined
) => {
  let filteredData = data;

  // if (searchFilters?.["sonarr:status"]) {
  //   const searchFilter = searchFilters?.["sonarr:status"];
  //   if (searchFilter.value === "sonarr:monitored") {
  //     filteredData = filteredData.filter((data) => data.monitored === true);
  //   } else if (searchFilter.value === "sonarr:unmonitored") {
  //     filteredData = filteredData.filter((data) => data.monitored === false);
  //   } else if (searchFilter.value === "sonarr:continuing") {
  //     filteredData = filteredData.filter(
  //       (data) => data.status === SeriesStatusType.continuing
  //     );
  //   } else if (searchFilter.value === "sonarr:ended") {
  //     filteredData = filteredData.filter((data) => {
  //       return data.status === SeriesStatusType.ended;
  //     });
  //   } else if (searchFilter.value === "sonarr:missing") {
  //     filteredData = filteredData.filter(
  //       (data) => data.statistics?.percentOfEpisodes !== 100
  //     );
  //   }
  // }

  // if (searchFilters?.["sonarr:order"]) {
  //   const searchFilter = searchFilters?.["sonarr:order"];
  //   if (searchFilter.value === "sonarr:alphabetical") {
  //     if (searchFilter.order === FilterOrder.ASCENDING) {
  //       filteredData = filteredData.sort((a, b) =>
  //         (a.title as string).localeCompare(b.title as string)
  //       );
  //     } else if (searchFilter.order === FilterOrder.DESCENDING) {
  //       filteredData = filteredData.sort((a, b) =>
  //         (b.title as string).localeCompare(a.title as string)
  //       );
  //     }
  //   } else if (searchFilter.value === "sonarr:dateAdded") {
  //     if (searchFilter.order === FilterOrder.ASCENDING) {
  //       filteredData = filteredData.sort(
  //         (a, b) =>
  //           new Date(a.added as string).getTime() -
  //           new Date(b.added as string).getTime()
  //       );
  //     } else if (searchFilter.order === FilterOrder.DESCENDING) {
  //       filteredData = filteredData.sort(
  //         (a, b) =>
  //           new Date(b.added as string).getTime() -
  //           new Date(a.added as string).getTime()
  //       );
  //     }
  //   } else if (searchFilter.value === "sonarr:size") {
  //     if (searchFilter.order === FilterOrder.ASCENDING) {
  //       filteredData = filteredData.sort(
  //         (a, b) =>
  //           (a.statistics?.sizeOnDisk as number) -
  //           (b.statistics?.sizeOnDisk as number)
  //       );
  //     } else if (searchFilter.order === FilterOrder.DESCENDING) {
  //       filteredData = filteredData.sort(
  //         (a, b) =>
  //           (b.statistics?.sizeOnDisk as number) -
  //           (a.statistics?.sizeOnDisk as number)
  //       );
  //     }
  //   } else if (searchFilter.value === "sonarr:nextAiring") {
  //     if (searchFilter.order === FilterOrder.ASCENDING) {
  //       filteredData = filteredData.sort(
  //         (a, b) =>
  //           new Date(a.nextAiring as string).getTime() -
  //           new Date(b.nextAiring as string).getTime()
  //       );
  //     } else if (searchFilter.order === FilterOrder.DESCENDING) {
  //       filteredData = filteredData.sort(
  //         (a, b) =>
  //           new Date(b.nextAiring as string).getTime() -
  //           new Date(a.nextAiring as string).getTime()
  //       );
  //     }
  //   } else if (searchFilter.value === "sonarr:episodes") {
  //     if (searchFilter.order === FilterOrder.ASCENDING) {
  //       filteredData = filteredData.sort(
  //         (a, b) =>
  //           (a.statistics?.episodeFileCount as number) -
  //           (b.statistics?.episodeFileCount as number)
  //       );
  //     } else if (searchFilter.order === FilterOrder.DESCENDING) {
  //       filteredData = filteredData.sort(
  //         (a, b) =>
  //           (b.statistics?.episodeFileCount as number) -
  //           (a.statistics?.episodeFileCount as number)
  //       );
  //     } else if (searchFilter.value === "sonarr:network") {
  //       if (searchFilter.order === FilterOrder.ASCENDING) {
  //         filteredData = filteredData.sort((a, b) =>
  //           (a.network as string).localeCompare(b.network as string)
  //         );
  //       } else if (searchFilter.order === FilterOrder.DESCENDING) {
  //         filteredData = filteredData.sort((a, b) =>
  //           (b.network as string).localeCompare(a.network as string)
  //         );
  //       }
  //     } else if (searchFilter.value === "sonarr:qualityProfile") {
  //       if (searchFilter.order === FilterOrder.ASCENDING) {
  //         filteredData = filteredData.sort(
  //           (a, b) =>
  //             (a.qualityProfileId as number) - (b.qualityProfileId as number)
  //         );
  //       } else if (searchFilter.order === FilterOrder.DESCENDING) {
  //         filteredData = filteredData.sort(
  //           (a, b) =>
  //             (b.qualityProfileId as number) - (a.qualityProfileId as number)
  //         );
  //       }
  //     } else if (searchFilter.value === "sonarr:type") {
  //       if (searchFilter.order === FilterOrder.ASCENDING) {
  //         filteredData = filteredData.sort((a, b) =>
  //           (a.seriesType as string).localeCompare(b.seriesType as string)
  //         );
  //       } else if (searchFilter.order === FilterOrder.DESCENDING) {
  //         filteredData = filteredData.sort((a, b) =>
  //           (a.seriesType as string).localeCompare(b.seriesType as string)
  //         );
  //       }
  //     }
  //   }
  // }

  return filteredData;
};

// NOTE: VIEW TYPE
export const PROXMOX_SUPPORTED_VIEW_TYPES = [ViewType.Grid, ViewType.List];
