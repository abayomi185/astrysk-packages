import React from "react";
import { Dimensions } from "react-native";

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
import { GetClusterResourcesResponseResponseDataItem } from "./api";
import { TFunction } from "i18next";

// NOTE: LOGIN / AUTHENTICATION / CONFIGURE
export const API2_JSON_PATH = "/api2/json";

export const configureAxiosForProxmox = (
  baseURL: string,
  userRealm?: string,
  tokenId?: string,
  token?: string | null,
  customHeaders?: object,
  callback?: () => void
) => {
  const axiosConfig = {
    baseURL: baseURL,
    headers: {
      Authorization: `PVEAPIToken=${userRealm}!${tokenId}=${token}`,
      ...(customHeaders ? customHeaders : {}),
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

  // Proxmox specific configuration
  const userRealm = useProxmoxStore.getState().userRealm;
  const tokenId = useProxmoxStore.getState().tokenId;

  if (!baseURL) {
    return false;
  }

  if (isConfigured) {
    return true;
  }

  configureAxiosForProxmox(baseURL, userRealm, tokenId, token, customHeaders);

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
  screenContext,
  searchContext,
}: {
  router: Router;
  searchItemId: string;
  tabContext: TabContext;
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
    } as ProxmoxDetailScreenProps,
  });
};

export const goToProxmoxModalScreen = ({
  router,
  node,
  resource,
  screenContext,
  searchContext,
}: {
  router: Router;
  node: string;
  resource: number | string;
  screenContext?: ProxmoxDetailScreenContext;
  searchContext?: ProxmoxSearchFilterContext;
}) => {
  router.push({
    pathname: `/${Screens.ROOT_MODAL_ROUTE}`,
    params: {
      context: screenContext,
      node: node,
      itemId: resource,
    } as ProxmoxDetailScreenProps,
  });
};

export const filterProxmoxSearchData = <
  T extends GetClusterResourcesResponseResponseDataItem
>(
  data: T[],
  searchFilters: Record<string, any> | undefined
) => {
  let filteredData = data;

  if (searchFilters?.["proxmox:type"]) {
    const searchFilter = searchFilters?.["proxmox:type"];
    if (searchFilter.value === "proxmox:qemu") {
      filteredData = filteredData.filter((data) => data.type === "qemu");
    } else if (searchFilter.value === "proxmox:lxc") {
      filteredData = filteredData.filter((data) => data.type === "lxc");
    } else if (searchFilter.value === "proxmox:storage") {
      filteredData = filteredData.filter((data) => data.type === "storage");
    } else if (searchFilter.value === "proxmox:node") {
      filteredData = filteredData.filter((data) => data.type === "node");
    } else if (searchFilter.value === "proxmox:sdn") {
      filteredData = filteredData.filter((data) => data.type === "sdn");
    }
  }

  if (searchFilters?.["proxmox:order"]) {
    const searchFilter = searchFilters?.["proxmox:order"];
    if (searchFilter.value === "proxmox:id") {
      filteredData.sort((a, b) => {
        return searchFilter.order === FilterOrder.ASCENDING
          ? (a.vmid ?? Infinity) - (b.vmid ?? Infinity)
          : (b.vmid || 0) - (a.vmid || 0);
      });
    } else if (searchFilter.value === "proxmox:alphabetical") {
      filteredData.sort((a, b) => {
        return searchFilter.order === FilterOrder.ASCENDING
          ? (
              (a.name || a.storage || a.node || a.sdn || a.id) as string
            ).localeCompare(
              (b.name || b.storage || b.node || a.sdn || b.id) as string
            )
          : (
              (b.name || b.storage || b.node || a.sdn || b.id) as string
            ).localeCompare(
              (a.name || a.storage || a.node || a.sdn || a.id) as string
            );
      });
    }
  }

  return filteredData;
};

// NOTE: TIME UTILS
export const convertSecondsToReadable = (seconds: number): string => {
  let date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8);
};

export const convertSecondsToDays = (seconds: number): number =>
  Math.floor(seconds / 86400);

export const convertSecondsToHHMMSS = (t: TFunction, seconds: number) => {
  let hrs = Math.floor(seconds / 3600);
  let mins = Math.floor((seconds % 3600) / 60);
  let secs = seconds % 60;

  let timeString = `${hrs} ${t("proxmox:hour(s)")} ${mins} ${t(
    "proxmox:minute(s)"
  )} ${secs} ${t("proxmox:second(s)")}`;

  return timeString;
};

export const generateChartTimestamps = (epochList: number[]) => {
  let timestamps = [];
  for (let i = 0; i < epochList.length; i++) {
    let time = new Date(epochList[i] * 1000); // Convert to milliseconds
    let localTime = new Date(time.getTime() - time.getTimezoneOffset() * 60000);
    timestamps.push(localTime.toISOString().substring(11, 16));
  }
  return timestamps;
};

// Usage in your chart options remains the same.

// NOTE: STORAGE UTILS
export const convertBytesToGB = (bytes: number): number => {
  const gb = bytes / Math.pow(1024, 3);
  return Math.round(gb * 100) / 100;
};

export const getBytesToGBMultiplier = (): number => 1 / 1024 ** 3;

export const getBytesToTBMultiplier = (): number => 1 / 1024 ** 4;

export const getBytesToMegabitsMultiplier = () => 8 / 1024 / 1024;

// NOTE: VIEW TYPE
export const PROXMOX_SUPPORTED_VIEW_TYPES = [ViewType.Grid, ViewType.List];

// NOTE: SCREEN UTILS
export const SCREEN_HEIGHT = Dimensions.get("screen").height;
