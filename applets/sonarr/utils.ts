import React from "react";

import { create_axios_instance } from "@astrysk/api";
import * as DeviceInfo from "expo-device";
import Constants from "expo-constants";
import * as Crypto from "expo-crypto";
import { useSonarrStore } from "./store";

import {
  registerLoadingComponent,
  unregisterLoadingComponent,
} from "@astrysk/components";
import { Actions, Screens } from "@astrysk/constants";
import { Router, TabContext } from "@astrysk/types";
import {
  SonarrDetailScreenContext,
  SonarrDetailScreenProps,
  SonarrSearchFilterContext,
} from "./types";

// NOTE: LOGIN / AUTHENTICATION / CONFIGURE
export const configureAxiosForSonarr = (
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

// Jellyfin configure function that all screens can run
// to authenticate and set up the applet appropriately
export const configureSonarr = () => {
  const isConfigured = useSonarrStore.getState().isConfigured;

  // Check if token and baseURL exists
  const baseURL = useSonarrStore.getState().baseURL;
  const token = useSonarrStore.getState().token;
  const customHeaders = useSonarrStore.getState().customHeaders;

  if (!baseURL) {
    return false;
  }

  if (isConfigured) {
    return true;
  }

  configureAxiosForSonarr(baseURL, token, customHeaders);

  useSonarrStore.setState({ isConfigured: true });

  return true;
};

export const useSonarrConfigurator = () => {
  return React.useEffect(() => {
    configureSonarr();
  }, []);
};

export const deConfigureSonarr = () => {
  useSonarrStore.setState({ isConfigured: false });
};

// NOTE: SEARCH / COLLECTION UTILS
export const goToSonarrDetailScreen = ({
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
  screenContext?: SonarrDetailScreenContext;
  searchContext?: SonarrSearchFilterContext;
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
    } as SonarrDetailScreenProps,
  });
};

export const goToSonarrModalScreen = ({
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
  screenContext?: SonarrDetailScreenContext;
  searchContext?: SonarrSearchFilterContext;
}) => {
  router.push({
    pathname: `/${Screens.ROOT_MODAL_ROUTE}`,
    params: {
      context: screenContext,
      itemId: searchItemId,
      seasonNumber: seasonNumber,
    } as SonarrDetailScreenProps,
  });
};

// NOTE: STATISTICS UTILS
export const getSizeOnDisk = (size: number) => {
  const sizeInGB = size / 1073741824;
  return sizeInGB.toFixed(2);
};

// NOTE: DATE UTILS
export const MILLISECONDS_TO_MINUTES_MULTIPLIER = 60 * 1000;

export const getStartAndEndOfWeek = (date: Date) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
  const startOfWeek = new Date(date.getFullYear(), date.getMonth(), diff);
  startOfWeek.setHours(0, 0, 0, 0); // set the start of week to the first hour
  const endOfWeek = new Date(date.getFullYear(), date.getMonth(), diff + 6);
  endOfWeek.setHours(23, 59, 59, 999); // set the end of week to the last hour

  return [startOfWeek, endOfWeek];
};

// export const getStartAndEndOfWeek = (date: Date) => {
//   const day = date.getDay();
//   const diffToMonday = date.getDate() - day + (day === 0 ? -6 : 1);
//   const startOfWeek = new Date(date.setDate(diffToMonday));

//   // // Reset the date
//   // date = new Date();

//   const diffToSunday = date.getDate() - day + (day === 0 ? 0 : 7);
//   const endOfWeek = new Date(date.setDate(diffToSunday));

//   return [startOfWeek, endOfWeek];
// };
